import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Elemento raiz da página não encontrado.');
createRoot(root).render(<App />);
