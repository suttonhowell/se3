import { createRoot } from 'react-dom/client';
import { Main } from './pages/Main';
import React from 'react';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(<React.StrictMode><Main /></React.StrictMode>);
