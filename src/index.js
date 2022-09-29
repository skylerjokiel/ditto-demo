import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init, Ditto } from "@dittolive/ditto"

const start = async () => {
  const identity = {
    type: 'onlinePlayground',
    appID: '39a47153-9a90-442c-9e81-9fec5f9d8b33',
    token: '6b1fa154-30d8-4536-a51d-4bb01d9c1295',
  }

  // we need the async wrapper because of this
  await init();
  const ditto = new Ditto(identity);
  ditto.startSync();
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App ditto={ditto} />
    </React.StrictMode>
  );
}

start();
