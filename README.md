# EduSeal - AI-Powered Certificate Verification Platform

A comprehensive MERN stack application for verifying academic certificates using AI forensics, OCR, and blockchain technology.

## Features

- **AI-Powered Analysis**: Advanced computer vision for tampering detection
- **OCR Text Extraction**: Extract and analyze text from certificates
- **Institution Verification**: Cross-reference with trusted institution databases
- **QR Code & Blockchain**: Verify tamper-proof QR codes and blockchain records
- **Real-time Dashboard**: Monitor verification statistics and history
- **File Upload**: Support for PDF, JPG, and PNG formats

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- React Query for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Multer for file uploads
- Tesseract.js for OCR
- Sharp for image processing
- PDF-Parse for PDF text extraction

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/eduseal
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup
1. Install frontend dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Usage

1. **Upload Certificate**: Click "Get Started" and upload a certificate file
2. **AI Analysis**: The system will automatically analyze the document using:
   - OCR text extraction
   - Tampering detection
   - Institution verification
   - QR code validation
   - Blockchain verification
3. **View Results**: Get detailed analysis results with confidence scores
4. **Dashboard**: Monitor all verification activities and statistics

## API Endpoints

- `POST /api/upload-certificate` - Upload and analyze certificate
- `GET /api/certificate/:id` - Get specific certificate details
- `GET /api/certificates` - Get all certificates
- `GET /api/stats` - Get verification statistics

## Analysis Features

### AI Forensics
- Pixel-level analysis for tampering detection
- Metadata consistency checks
- Compression artifact analysis

### Text Analysis
- OCR extraction from images and PDFs
- Institution name verification
- Content validation

### Security Verification
- QR code detection and validation
- Blockchain record verification
- Fraud risk scoring

## Development

The application uses a modular architecture with:
- Separate frontend and backend
- RESTful API design
- MongoDB for data persistence
- Real-time analysis pipeline

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details