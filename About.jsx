import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About FraudGuard
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Protecting users from online fraud with blockchain-powered website verification
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 -mt-16 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              FraudGuard was created to help protect internet users from the growing threat of 
              fraudulent websites. Our mission is to build a safer internet by leveraging blockchain 
              technology and community-powered reporting to identify and flag scams, phishing sites, 
              malware, and other online threats before they can cause harm.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Community Reports</h3>
                <p className="text-gray-600 text-sm">
                  Users submit reports about fraudulent websites they encounter, including 
                  evidence and details about the type of fraud.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Blockchain Verification</h3>
                <p className="text-gray-600 text-sm">
                  Reports are stored on the Base blockchain, ensuring immutability, 
                  transparency, and resistance to censorship.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Instant Protection</h3>
                <p className="text-gray-600 text-sm">
                  Users can check any website against our database and receive 
                  real-time alerts through our website or browser extension.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Blockchain?</h2>
            <p className="text-gray-700 mb-6">
              We built FraudGuard on the Base blockchain for several key reasons:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>
                <strong>Immutability:</strong> Once a report is verified and recorded on the blockchain, 
                it cannot be tampered with or deleted, ensuring the integrity of our fraud database.
              </li>
              <li>
                <strong>Decentralization:</strong> By leveraging a decentralized network, we reduce 
                vulnerabilities to attacks that could compromise a centralized database.
              </li>
              <li>
                <strong>Transparency:</strong> Anyone can verify the reports on the blockchain, 
                creating trust in the system and accountability.
              </li>
              <li>
                <strong>Incentivization:</strong> Our reputation system rewards users for 
                submitting accurate reports, creating a self-sustaining ecosystem.
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Technology</h2>
            <p className="text-gray-700 mb-6">
              FraudGuard is built using a modern technology stack:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• React.js for a responsive user interface</li>
                  <li>• Tailwind CSS for clean, modern styling</li>
                  <li>• Wagmi for Base blockchain integration</li>
                  <li>• Chrome Extension API for browser protection</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Node.js with Express for API endpoints</li>
                  <li>• MongoDB for flexible data storage</li>
                  <li>• Solidity smart contracts on Base blockchain</li>
                  <li>• IPFS for decentralized evidence storage</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Open Source</h2>
            <p className="text-gray-700 mb-6">
              FraudGuard is proudly open source. We believe in transparent development and welcome 
              contributions from the community to help make the internet safer for everyone.
            </p>
            
            <div className="flex justify-center mb-8">
              <a 
                href="https://github.com/fraudguard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              FraudGuard was created by a team of developers passionate about blockchain 
              technology and internet safety. Our project was built for the Base buildathon 
              to showcase how blockchain can solve real-world problems.
            </p>
            
            {/* Call to Action */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Join Us in Making the Internet Safer
              </h3>
              <p className="text-gray-600 mb-4">
                Start using FraudGuard today to protect yourself and contribute to our 
                growing database of fraudulent websites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/verify" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Verify a Website
                </Link>
                <Link 
                  to="/report" 
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Report Fraud
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;