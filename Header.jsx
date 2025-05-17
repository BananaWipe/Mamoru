import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useAuthContext } from '../hooks/useAuth';

const Header = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const { user, isLoggedIn, logout } = useAuthContext();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };
  
  const handleDisconnect = () => {
    disconnect();
    logout();
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">FraudGuard</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/verify" className="text-gray-600 hover:text-blue-600 font-medium">
              Verify Website
            </Link>
            <Link to="/report" className="text-gray-600 hover:text-blue-600 font-medium">
              Report Fraud
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">
              About
            </Link>
            
            {isLoggedIn && (
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            )}
            
            {isConnected ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="font-medium truncate max-w-[100px]">
                    {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connected'}
                  </span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {isLoggedIn && (
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleDisconnect}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                  Connect Wallet
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => handleConnect(connector)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      disabled={!connector.ready || isLoading}
                    >
                      {connector.name}
                      {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200">
            <Link 
              to="/" 
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/verify" 
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Verify Website
            </Link>
            <Link 
              to="/report" 
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Fraud
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className="block py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {isConnected ? (
              <div className="py-2">
                <div className="flex items-center space-x-2 text-blue-600 font-medium mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="truncate max-w-[200px]">
                    {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connected'}
                  </span>
                </div>
                
                <button 
                  onClick={handleDisconnect}
                  className="text-red-600 hover:text-red-700"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="py-2">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                    className="block mb-2 text-blue-600 hover:text-blue-700 font-medium"
                    disabled={!connector.ready || isLoading}
                  >
                    Connect with {connector.name}
                    {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;