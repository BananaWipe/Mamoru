# FraudGuard - Blockchain-Powered Fraud Detection Platform

FraudGuard is a comprehensive fraud detection platform built on the Base blockchain that helps protect users from fraudulent websites. It leverages community reports and blockchain technology to create a transparent and immutable database of known scam websites.

## Features

- **Website Verification**: Instantly check if a website has been reported as fraudulent
- **Community Reporting**: Submit reports for suspicious websites with evidence
- **Blockchain Verification**: Reports are stored on-chain for transparency and immutability
- **Browser Extension**: Real-time protection as you browse the web
- **Reputation System**: Trusted reporters earn reputation tokens for accurate reports

## Tech Stack

### Frontend
- React.js with Tailwind CSS
- Wagmi for Base blockchain integration
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB for off-chain storage
- JWT authentication with wallet signatures

### Blockchain
- Solidity smart contracts on Base
- FraudRegistry for storing reports
- ReputationToken for reputation system
- Governance for community validation

### Extension
- Chrome Extension API
- Real-time website checking

## Project Structure

- `frontend/` - React application for the web interface
- `backend/` - Node.js API server
- `contracts/` - Solidity smart contracts for the Base blockchain
- `extension/` - Browser extension for real-time protection

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB
- Base wallet (Coinbase Wallet recommended)
- Hardhat for smart contract development

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fraudguard.git
   cd fraudguard
   ```

2. Install dependencies for each component:
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   
   # Contracts
   cd ../contracts
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each directory
   - Update values as needed for your environment

4. Deploy smart contracts:
   ```bash
   cd contracts
   npm run deploy:testnet
   ```
   
   Update contract addresses in your `.env` files.

5. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## Browser Extension

To install the browser extension in development mode:

1. Build the extension:
   ```bash
   cd extension
   # If you're using a build script
   ```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension` folder

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for the Base Buildathon
- Powered by Coinbase's developer platform
- Inspired by the need for improved online security