/** Native WebGL enhancement. The editorial image always remains the fallback. */
const vertexSource = `attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;
const fragmentSource = `precision mediump float;
uniform sampler2D scene;uniform vec2 res;uniform vec2 imageSize;uniform vec2 pointer;uniform float time;
varying vec2 v;
vec3 sampleScene(vec2 uv){float viewRatio=res.x/res.y;float sourceRatio=imageSize.x/imageSize.y;vec2 cover=vec2(1.);if(viewRatio>sourceRatio)cover.y=sourceRatio/viewRatio;else cover.x=viewRatio/sourceRatio;uv=(uv-.5)*cover+.5;return texture2D(scene,clamp(uv,0.001,0.999)).rgb;}
void main(){
 vec2 uv=v;vec2 p=pointer*.006;float artMask=smoothstep(.35,.8,uv.x);
 vec2 wave=vec2(sin(uv.y*9.+time*.28),cos(uv.x*8.+time*.22))*.0018*artMask;
 vec3 color=sampleScene((uv-.5)*.975+.5+p+wave);
 vec2 center=vec2(.83+sin(time*.16)*.012,.34+cos(time*.2)*.018)+pointer*.013;
 vec2 d=uv-center;d.x*=res.x/res.y;float radius=.069;float q=dot(d,d)/(radius*radius);
 if(q<1.){
  vec3 normal=normalize(vec3(d/radius,sqrt(1.-q)));vec2 lensUV=uv-normal.xy*.028*normal.z;
  vec3 refracted=vec3(sampleScene(lensUV+normal.xy*.0015).r,sampleScene(lensUV).g,sampleScene(lensUV-normal.xy*.0015).b);
  float fresnel=pow(1.-normal.z,3.);vec3 light=normalize(vec3(-.5,.8,1.));
  float spec=pow(max(dot(reflect(-light,normal),vec3(0.,0.,1.)),0.),38.);
  vec3 glass=mix(refracted,vec3(.76,.83,.66),fresnel*.5)+spec*.65;
  float edge=1.-smoothstep(.95,.995,q);color=mix(color,glass,edge);
 }
 float caustic=pow(max(0.,sin(uv.x*12.+uv.y*8.+time*.25)),14.)*.008*artMask;
 gl_FragColor=vec4(color+vec3(.8,.83,.65)*caustic,1.);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('WebGL indisponível.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error('Shader indisponível.');
  }
  return shader;
}

export function initializeGlass(root: HTMLElement): () => void {
  const hero = root.querySelector<HTMLElement>('.hero');
  const canvas = root.querySelector<HTMLCanvasElement>('#glass-canvas');
  const image = root.querySelector<HTMLImageElement>('#glass-source');
  if (!hero || !canvas || !image) return () => {};
  let disposeScene = () => {};
  let initialized = false;
  function start(): void {
    if (initialized || innerWidth < 701 || !hero || !canvas || !image) return;
    const context = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!context) return;
    initialized = true;
    disposeScene = createScene(context, hero, canvas, image);
  }
  window.addEventListener('resize', start);
  start();
  return () => {
    window.removeEventListener('resize', start);
    disposeScene();
  };
}

function createScene(
  gl: WebGLRenderingContext,
  hero: HTMLElement,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
): () => void {
  const program = gl.createProgram();
  if (!program) return () => {};
  let vertex: WebGLShader;
  let fragment: WebGLShader;
  try {
    vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
    fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('WebGL indisponível.');
  } catch {
    gl.deleteProgram(program);
    return () => {};
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = {
    scene: gl.getUniformLocation(program, 'scene'),
    res: gl.getUniformLocation(program, 'res'),
    imageSize: gl.getUniformLocation(program, 'imageSize'),
    pointer: gl.getUniformLocation(program, 'pointer'),
    time: gl.getUniformLocation(program, 'time'),
  };
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let active = true;
  let ready = false;
  let paused = media.matches && !document.documentElement.classList.contains('motion-opted-in');
  let frame = 0;
  let lastTime = 0;
  let targetX = 0,
    targetY = 0,
    x = 0,
    y = 0;
  let texture: WebGLTexture | null = null;
  const startTime = performance.now();

  function draw(now: number): void {
    frame = 0;
    if (!active || !ready || paused || document.hidden || innerWidth < 701) return;
    if (now - lastTime > 30) {
      x += (targetX - x) * 0.05;
      y += (targetY - y) * 0.05;
      gl.uniform2f(uniforms.pointer, x, y);
      gl.uniform1f(uniforms.time, (now - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      lastTime = now;
    }
    frame = requestAnimationFrame(draw);
  }
  function resume(): void {
    if (active && ready && !paused && !frame && !document.hidden && innerWidth > 700)
      frame = requestAnimationFrame(draw);
  }
  function stop(): void {
    cancelAnimationFrame(frame);
    frame = 0;
  }
  function resize(): void {
    const ratio = Math.min(devicePixelRatio || 1, 1.35);
    const rect = hero.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.res, canvas.width, canvas.height);
    if (innerWidth < 701) stop();
    else resume();
  }
  function load(): void {
    if (ready || !image.naturalWidth) return;
    try {
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform1i(uniforms.scene, 0);
      gl.uniform2f(uniforms.imageSize, image.naturalWidth, image.naturalHeight);
      resize();
      ready = true;
      canvas.classList.add('ready');
      resume();
    } catch {
      canvas.classList.remove('ready');
    }
  }
  function pointer(event: PointerEvent): void {
    const rect = hero.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetY = 1 - ((event.clientY - rect.top) / rect.height) * 2;
  }
  function leave(): void {
    targetX = 0;
    targetY = 0;
  }
  function motion(event: Event): void {
    paused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
    if (paused) stop();
    else resume();
  }
  function preference(event: MediaQueryListEvent): void {
    paused = event.matches;
    if (paused) stop();
    else resume();
  }
  function visibility(): void {
    if (document.hidden) stop();
    else resume();
  }
  function contextLost(event: Event): void {
    event.preventDefault();
    active = false;
    stop();
    canvas.classList.remove('ready');
  }
  const observer = new IntersectionObserver((entries) => {
    active = entries[0]?.isIntersecting ?? false;
    if (!active) stop();
    else resume();
  });
  observer.observe(hero);
  image.addEventListener('load', load);
  hero.addEventListener('pointermove', pointer, { passive: true });
  hero.addEventListener('pointerleave', leave);
  window.addEventListener('resize', resize);
  window.addEventListener('souly:motion', motion);
  document.addEventListener('visibilitychange', visibility);
  media.addEventListener('change', preference);
  canvas.addEventListener('webglcontextlost', contextLost);
  if (image.complete) load();
  return () => {
    stop();
    observer.disconnect();
    image.removeEventListener('load', load);
    hero.removeEventListener('pointermove', pointer);
    hero.removeEventListener('pointerleave', leave);
    window.removeEventListener('resize', resize);
    window.removeEventListener('souly:motion', motion);
    document.removeEventListener('visibilitychange', visibility);
    media.removeEventListener('change', preference);
    canvas.removeEventListener('webglcontextlost', contextLost);
    canvas.classList.remove('ready');
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    gl.deleteProgram(program);
  };
}
