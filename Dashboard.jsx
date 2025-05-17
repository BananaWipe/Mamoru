import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useAuthContext } from '../hooks/useAuth';
import { getUserReports, getDashboardStats, getTransactionStatus } from '../services/api';
import ConnectWalletButton from '../components/auth/ConnectWalletButton';
import DashboardStats from '../components/dashboard/DashboardStats';
import ReportsList from '../components/dashboard/ReportsList';
import TransactionsList from '../components/dashboard/TransactionsList';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { user, isLoggedIn, authToken } = useAuthContext();
  
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('reports');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isConnected || !isLoggedIn || !authToken) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch user reports and stats in parallel
        const [reportsData, statsData] = await Promise.all([
          getUserReports(authToken),
          getDashboardStats(authToken)
        ]);
        
        setReports(reportsData.reports || []);
        setStats(statsData);
        
        // Fetch transaction status for pending transactions
        const pendingTxs = reportsData.reports
          .filter(report => report.onchainStatus === 'pending')
          .map(report => report.transactionHash);
        
        if (pendingTxs.length > 0) {
          const txPromises = pendingTxs.map(tx => getTransactionStatus(tx));
          const txResults = await Promise.all(txPromises);
          
          setTransactions(txResults);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [isConnected, isLoggedIn, authToken]);
  
  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // If user is not logged in, show connect wallet prompt
  if (!isConnected || !isLoggedIn) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <svg className="w-16 h-16 text-blue-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-gray-600 mb-8">
              Please connect your wallet to access your dashboard and view your reports.
            </p>
            <div className="mb-6">
              <ConnectWalletButton />
            </div>
            <p className="text-sm text-gray-500">
              Don't have a wallet? <a href="https://coinbase.com/wallet" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Get started with Coinbase Wallet</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                {user && user.name 
                  ? `Welcome back, ${user.name}` 
                  : `Welcome back, ${address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'User'}`}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/report"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Report a Website
              </Link>
            </div>
          </div>
          
          {/* Stats Cards */}
          {stats && <DashboardStats stats={stats} />}
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => handleTabChange('reports')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'reports'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Your Reports
                </button>
                <button
                  onClick={() => handleTabChange('transactions')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'transactions'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => handleTabChange('reputation')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                    activeTab === 'reputation'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reputation
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="loading-spinner"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              ) : (
                <>
                  {/* Reports Tab */}
                  {activeTab === 'reports' && (
                    <div>
                      {reports.length > 0 ? (
                        <ReportsList reports={reports} />
                      ) : (
                        <div className="text-center py-12">
                          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No reports yet
                          </h3>
                          <p className="text-gray-600 mb-6">
                            You haven't submitted any fraud reports yet.
                          </p>
                          <Link
                            to="/report"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                          >
                            Submit Your First Report
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Transactions Tab */}
                  {activeTab === 'transactions' && (
                    <div>
                      {transactions.length > 0 ? (
                        <TransactionsList transactions={transactions} />
                      ) : (
                        <div className="text-center py-12">
                          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No transactions yet
                          </h3>
                          <p className="text-gray-600">
                            You don't have any blockchain transactions yet.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Reputation Tab */}
                  {activeTab === 'reputation' && (
                    <div>
                      <div className="text-center py-6">
                        <div className="mb-4">
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                            {stats ? stats.reputationScore : '—'}
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          Trust Score
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Your trust score increases as you submit accurate fraud reports 
                          that get verified by the community.
                        </p>
                        
                        {/* Reputation Progress */}
                        <div className="max-w-md mx-auto bg-gray-100 rounded-full h-4 mb-6">
                          <div 
                            className="bg-blue-600 h-4 rounded-full" 
                            style={{ width: `${stats ? Math.min(stats.reputationScore, 100) : 0}%` }}
                          ></div>
                        </div>
                        
                        {/* Achievements */}
                        <div className="border-t border-gray-200 pt-6 mt-6">
                          <h4 className="font-medium text-gray-800 mb-4">Your Achievements</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="text-2xl text-gray-800 font-bold mb-1">
                                {stats ? stats.reportsSubmitted : '0'}
                              </div>
                              <div className="text-sm text-gray-600">Reports Submitted</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="text-2xl text-gray-800 font-bold mb-1">
                                {stats ? stats.reportsVerified : '0'}
                              </div>
                              <div className="text-sm text-gray-600">Reports Verified</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="text-2xl text-gray-800 font-bold mb-1">
                                {stats ? stats.upvotesReceived : '0'}
                              </div>
                              <div className="text-sm text-gray-600">Upvotes Received</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="text-2xl text-gray-800 font-bold mb-1">
                                {stats ? stats.reputationTokens : '0'}
                              </div>
                              <div className="text-sm text-gray-600">Reputation Tokens</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;