import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CanvasApp from './Canvas'; // Ensure this import points to your renamed file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CanvasApp />);
