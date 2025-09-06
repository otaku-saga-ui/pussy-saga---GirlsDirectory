import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import type { Character } from './models/Character.ts';

const characters: Record<string, Character> = await fetch('/GirlsDirectory_en.json').then((r) =>
  r.json()
);

window.x = characters

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App characters={characters} />
  </StrictMode>
);
