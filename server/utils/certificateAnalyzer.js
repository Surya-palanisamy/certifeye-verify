const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');

// Mock AI/ML analysis functions
const analyzeImageForTampering = async (imagePath) => {
  // Simulate AI forensics analysis
  return new Promise((resolve) => {
    setTimeout(() => {
      const tamperingScore = Math.random() * 0.3; // Low score = less tampering
      resolve({
        tamperingDetected: tamperingScore > 0.15,
        confidence: (1 - tamperingScore) * 100,
        details: {
          pixelAnalysis: tamperingScore < 0.1 ? 'Clean' : 'Suspicious patterns detected',
          metadataConsistency: tamperingScore < 0.12 ? 'Consistent' : 'Inconsistent',
          compressionArtifacts: tamperingScore < 0.08 ? 'Normal' : 'Unusual compression'
        }
      });
    }, 2000);
  });
};

const extractTextFromImage = async (imagePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
      logger: m => console.log(m)
    });
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    return '';
  }
};

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    return '';
  }
};

const verifyInstitution = async (extractedText) => {
  // Mock institution verification
  const knownInstitutions = [
    'Harvard University', 'MIT', 'Stanford University', 'Oxford University',
    'Cambridge University', 'Yale University', 'Princeton University',
    'University of California', 'Columbia University', 'University of Chicago'
  ];
  
  const foundInstitution = knownInstitutions.find(inst => 
    extractedText.toLowerCase().includes(inst.toLowerCase())
  );
  
  return {
    verified: !!foundInstitution,
    institution: foundInstitution || 'Unknown',
    confidence: foundInstitution ? 95 : 20
  };
};

const checkQRCode = async (imagePath) => {
  // Mock QR code verification
  return new Promise((resolve) => {
    setTimeout(() => {
      const hasQR = Math.random() > 0.3;
      resolve({
        qrCodeFound: hasQR,
        qrCodeValid: hasQR ? Math.random() > 0.1 : false,
        blockchainVerified: hasQR ? Math.random() > 0.2 : false
      });
    }, 1500);
  });
};

const calculateFraudScore = (analysisData) => {
  let fraudScore = 0;
  
  if (analysisData.tamperingDetected) fraudScore += 40;
  if (!analysisData.institutionVerified) fraudScore += 30;
  if (!analysisData.qrCodeValid) fraudScore += 20;
  if (!analysisData.blockchainVerified) fraudScore += 10;
  
  // Add randomness for demonstration
  fraudScore += Math.random() * 10;
  
  return Math.min(100, Math.max(0, fraudScore));
};

const analyzeDocument = async (filePath) => {
  try {
    const fileExtension = path.extname(filePath).toLowerCase();
    let extractedText = '';
    let imagePath = filePath;

    // Extract text based on file type
    if (fileExtension === '.pdf') {
      extractedText = await extractTextFromPDF(filePath);
      // Convert first page of PDF to image for visual analysis
      // This is a simplified approach - in production, you'd use pdf2pic or similar
      imagePath = filePath; // For now, we'll skip image conversion
    } else {
      // Process image
      extractedText = await extractTextFromImage(filePath);
      
      // Optimize image for analysis
      const optimizedPath = filePath.replace(/\.[^/.]+$/, '_optimized.jpg');
      await sharp(filePath)
        .resize(1200, null, { withoutEnlargement: true })
        .jpeg({ quality: 90 })
        .toFile(optimizedPath);
      imagePath = optimizedPath;
    }

    // Run parallel analysis
    const [tamperingAnalysis, institutionVerification, qrAnalysis] = await Promise.all([
      fileExtension !== '.pdf' ? analyzeImageForTampering(imagePath) : { tamperingDetected: false, confidence: 85 },
      verifyInstitution(extractedText),
      fileExtension !== '.pdf' ? checkQRCode(imagePath) : { qrCodeFound: false, qrCodeValid: false, blockchainVerified: false }
    ]);

    const analysisData = {
      tamperingDetected: tamperingAnalysis.tamperingDetected,
      institutionVerified: institutionVerification.verified,
      qrCodeValid: qrAnalysis.qrCodeValid,
      blockchainVerified: qrAnalysis.blockchainVerified
    };

    const fraudScore = calculateFraudScore(analysisData);
    const overallConfidence = Math.max(0, 100 - fraudScore);
    const isAuthentic = fraudScore < 30 && overallConfidence > 70;

    return {
      isAuthentic,
      confidence: Math.round(overallConfidence),
      extractedText: extractedText.substring(0, 1000), // Limit text length
      institutionVerified: institutionVerification.verified,
      tamperingDetected: tamperingAnalysis.tamperingDetected,
      qrCodeValid: qrAnalysis.qrCodeValid,
      blockchainVerified: qrAnalysis.blockchainVerified,
      fraudScore: Math.round(fraudScore),
      details: {
        institution: institutionVerification.institution,
        tamperingAnalysis: tamperingAnalysis.details || {},
        qrAnalysis: {
          found: qrAnalysis.qrCodeFound,
          valid: qrAnalysis.qrCodeValid,
          blockchainVerified: qrAnalysis.blockchainVerified
        },
        textLength: extractedText.length,
        processingTime: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('Analysis error:', error);
    return {
      isAuthentic: false,
      confidence: 0,
      extractedText: '',
      institutionVerified: false,
      tamperingDetected: true,
      qrCodeValid: false,
      blockchainVerified: false,
      fraudScore: 100,
      details: {
        error: error.message
      }
    };
  }
};

module.exports = analyzeDocument;