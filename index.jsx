import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create Web3 context provider
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base, baseGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, baseGoerli],
  [publicProvider()]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'FraudGuard',
        headlessMode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Base Wallet',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// Initialize Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={4000} />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>
);

// For measuring app performance
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

reportWebVitals();