import { ethers } from 'ethers';
import FraudRegistryABI from '../abis/FraudRegistry.json';

// Contract addresses
const CONTRACT_ADDRESSES = {
  // Replace with actual deployed contract addresses on Base
  mainnet: {
    fraudRegistry: '0x...',
    reputationToken: '0x...',
    governance: '0x...'
  },
  testnet: {
    fraudRegistry: '0x...',
    reputationToken: '0x...',
    governance: '0x...'
  }
};

// Current network 
const NETWORK = process.env.REACT_APP_NETWORK || 'testnet';

// Get contract addresses for current network
const getContractAddress = (contractName) => {
  return CONTRACT_ADDRESSES[NETWORK][contractName];
};

// Create provider and signer
const getProvider = () => {
  // Check if window.ethereum is available
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  // Fallback to public RPC
  const rpcUrl = NETWORK === 'mainnet' 
    ? 'https://mainnet.base.org' 
    : 'https://goerli.base.org';
  
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};

// Initialize contract with signer or provider
const getContract = async (contractName, address, abi, withSigner = false) => {
  const provider = getProvider();
  
  if (withSigner) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      return new ethers.Contract(address, abi, signer);
    } catch (error) {
      console.error('Error getting signer:', error);
      // Fall back to read-only provider
      return new ethers.Contract(address, abi, provider);
    }
  }
  
  return new ethers.Contract(address, abi, provider);
};

// Get FraudRegistry contract instance
export const getFraudRegistryContract = async (withSigner = false) => {
  const address = getContractAddress('fraudRegistry');
  return getContract('fraudRegistry', address, FraudRegistryABI, withSigner);
};

// Report a fraudulent website
export const reportFraudulentWebsite = async (urlHash, category, description, evidenceHash) => {
  try {
    const contract = await getFraudRegistryContract(true);
    const tx = await contract.reportWebsite(urlHash, category, description, evidenceHash);
    return await tx.wait();
  } catch (error) {
    console.error('Error reporting fraudulent website:', error);
    throw error;
  }
};

// Check if a website is fraudulent
export const checkWebsiteFraudStatus = async (urlHash) => {
  try {
    const contract = await getFraudRegistryContract();
    return await contract.checkWebsite(urlHash);
  } catch (error) {
    console.error('Error checking website status:', error);
    throw error;
  }
};

// Get all reports for a website
export const getWebsiteReports = async (urlHash) => {
  try {
    const contract = await getFraudRegistryContract();
    return await contract.getReports(urlHash);
  } catch (error) {
    console.error('Error fetching website reports:', error);
    throw error;
  }
};

// Verify a website report (only for governance members or trusted reporters)
export const verifyWebsiteReport = async (reportId, isValid) => {
  try {
    const contract = await getFraudRegistryContract(true);
    const tx = await contract.verifyReport(reportId, isValid);
    return await tx.wait();
  } catch (error) {
    console.error('Error verifying report:', error);
    throw error;
  }
};

// Get user reputation
export const getUserReputation = async (address) => {
  try {
    const contract = await getFraudRegistryContract();
    return await contract.getReporterReputation(address);
  } catch (error) {
    console.error('Error fetching user reputation:', error);
    throw error;
  }
};

// Convert a URL to its hash for blockchain storage
export const hashUrl = (url) => {
  // Normalize URL (remove http/https, trailing slashes, etc.)
  const normalizedUrl = url.toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
    
  // Create keccak256 hash
  return ethers.utils.id(normalizedUrl);
};

export default {
  getProvider,
  getFraudRegistryContract,
  reportFraudulentWebsite,
  checkWebsiteFraudStatus,
  getWebsiteReports,
  verifyWebsiteReport,
  getUserReputation,
  hashUrl
};