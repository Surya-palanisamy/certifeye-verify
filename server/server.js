const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduseal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  uploadDate: { type: Date, default: Date.now },
  analysisResult: {
    isAuthentic: Boolean,
    confidence: Number,
    extractedText: String,
    institutionVerified: Boolean,
    tamperingDetected: Boolean,
    qrCodeValid: Boolean,
    blockchainVerified: Boolean,
    fraudScore: Number,
    details: Object
  },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Certificate analysis functions
const analyzeDocument = require('./utils/certificateAnalyzer');

// Routes
app.post('/api/upload-certificate', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create certificate record
    const certificate = new Certificate({
      filename: req.file.filename,
      originalName: req.file.originalname,
      status: 'pending'
    });

    await certificate.save();

    // Analyze the certificate
    const analysisResult = await analyzeDocument(req.file.path);
    
    // Update certificate with analysis results
    certificate.analysisResult = analysisResult;
    certificate.status = analysisResult.isAuthentic ? 'verified' : 'rejected';
    await certificate.save();

    res.json({
      success: true,
      certificateId: certificate._id,
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to process certificate' });
  }
});

app.get('/api/certificate/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ uploadDate: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const totalCertificates = await Certificate.countDocuments();
    const verifiedCertificates = await Certificate.countDocuments({ status: 'verified' });
    const rejectedCertificates = await Certificate.countDocuments({ status: 'rejected' });
    const pendingCertificates = await Certificate.countDocuments({ status: 'pending' });

    const avgConfidence = await Certificate.aggregate([
      { $match: { 'analysisResult.confidence': { $exists: true } } },
      { $group: { _id: null, avgConfidence: { $avg: '$analysisResult.confidence' } } }
    ]);

    res.json({
      totalCertificates,
      verifiedCertificates,
      rejectedCertificates,
      pendingCertificates,
      averageConfidence: avgConfidence[0]?.avgConfidence || 0,
      verificationRate: totalCertificates > 0 ? (verifiedCertificates / totalCertificates * 100).toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});