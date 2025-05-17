import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'react-toastify';

const ConnectWallet = ({ onSuccess }) => {
  const { connectors, connect, error, isLoading, pendingConnector } = useConnect({
    onSuccess: (data) => {
      toast.success('Wallet connected successfully!');
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to connect wallet');
    }
  });
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      toast.info('Wallet disconnected');
    }
  });
  
  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // If connected, show address and disconnect button
  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="font-medium">{formatAddress(address)}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Disconnect
        </button>
      </div>
    );
  }
  
  // If not connected, show connect button
  return (
    <div className="flex flex-col space-y-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={!connector.ready || isLoading}
          className={`
            px-4 py-2 rounded-lg font-medium 
            ${connector.ready 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {isLoading && pendingConnector?.id === connector.id ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            `Connect with ${connector.name}`
          )}
        </button>
      ))}
      
      {error && (
        <div className="text-red-600 text-sm mt-2">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;