import React from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { toast } from 'react-toastify';

const ConnectWalletButton = ({ onSuccess }) => {
  const { connectors, connect, error, isLoading, pendingConnector } = useConnect({
    onSuccess: (data) => {
      toast.success('Wallet connected successfully!');
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to connect wallet');
    }
  });
  
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      toast.info('Wallet disconnected');
    }
  });
  
  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Disconnect Wallet
      </button>
    );
  }
  
  // Get Base-compatible connectors
  const baseConnectors = connectors.filter(c => c.ready);
  
  return (
    <div className="space-y-2">
      {baseConnectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isLoading && pendingConnector?.id === connector.id}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center w-full justify-center"
        >
          {isLoading && pendingConnector?.id === connector.id ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect with {connector.name}
            </>
          )}
        </button>
      ))}
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;