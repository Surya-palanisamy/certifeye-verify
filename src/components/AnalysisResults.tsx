import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, Shield, Eye, QrCode, Building, FileText, TrendingUp } from 'lucide-react';

const AnalysisResults = ({ analysis, certificateId }) => {
  if (!analysis) return null;

  const getStatusIcon = (isAuthentic) => {
    if (isAuthentic) {
      return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  const getStatusColor = (isAuthentic) => {
    return isAuthentic ? 'success' : 'destructive';
  };

  const getRiskLevel = (fraudScore) => {
    if (fraudScore < 30) return { level: 'LOW', color: 'success', description: 'Certificate appears authentic' };
    if (fraudScore < 60) return { level: 'MEDIUM', color: 'warning', description: 'Some suspicious elements detected' };
    return { level: 'HIGH', color: 'destructive', description: 'High probability of fraud' };
  };

  const getContributingFactors = (analysis) => {
    const factors = [];
    
    if (analysis.tamperingDetected) {
      factors.push({ type: 'negative', text: 'Digital tampering detected in document', weight: 'High Impact' });
    } else {
      factors.push({ type: 'positive', text: 'No digital tampering detected', weight: 'High Impact' });
    }
    
    if (analysis.institutionVerified) {
      factors.push({ type: 'positive', text: 'Institution found in verified database', weight: 'High Impact' });
    } else {
      factors.push({ type: 'negative', text: 'Institution not verified or unknown', weight: 'Medium Impact' });
    }
    
    if (analysis.qrCodeValid) {
      factors.push({ type: 'positive', text: 'Valid QR code with authentic signature', weight: 'Medium Impact' });
    } else {
      factors.push({ type: 'negative', text: 'No valid QR code found', weight: 'Low Impact' });
    }
    
    if (analysis.blockchainVerified) {
      factors.push({ type: 'positive', text: 'Blockchain verification successful', weight: 'High Impact' });
    }
    
    if (analysis.details?.fontAnalysis?.suspicious) {
      factors.push({ type: 'negative', text: 'Inconsistent font patterns detected', weight: 'Medium Impact' });
    } else {
      factors.push({ type: 'positive', text: 'Font patterns appear consistent', weight: 'Low Impact' });
    }
    
    if (analysis.details?.sealAnalysis?.authentic === false) {
      factors.push({ type: 'negative', text: 'Official seal appears modified or fake', weight: 'High Impact' });
    } else if (analysis.details?.sealAnalysis?.authentic === true) {
      factors.push({ type: 'positive', text: 'Official seal appears authentic', weight: 'High Impact' });
    }
    
    return factors;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const riskLevel = getRiskLevel(analysis.fraudScore);
  const contributingFactors = getContributingFactors(analysis);

  return (
    <div className="space-y-6">
      {/* Overall Result */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon(analysis.isAuthentic)}
            <span>Verification Result</span>
            <Badge variant={getStatusColor(analysis.isAuthentic)}>
              {analysis.isAuthentic ? 'AUTHENTIC' : 'SUSPICIOUS'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Authenticity</span>
                <span className={`text-lg font-bold ${analysis.isAuthentic ? 'text-emerald-600' : 'text-red-600'}`}>
                  {analysis.isAuthentic ? 'REAL' : 'FAKE'}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {analysis.isAuthentic ? 'Certificate appears genuine' : 'Certificate shows signs of fraud'}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Confidence</span>
                <span className={`text-lg font-bold ${getConfidenceColor(analysis.confidence)}`}>
                  {analysis.confidence}%
                </span>
              </div>
              <Progress value={analysis.confidence} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Risk Level</span>
                <Badge variant={riskLevel.color as "success" | "warning" | "destructive"} className="text-xs">
                  {riskLevel.level}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {riskLevel.description}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contributing Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Contributing Factors Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contributingFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  {factor.type === 'positive' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm">{factor.text}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {factor.weight}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Forensics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="w-5 h-5" />
              AI Forensics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Tampering Detection</span>
                {analysis.tamperingDetected ? (
                  <Badge variant="destructive">Detected</Badge>
                ) : (
                  <Badge variant="success">Clean</Badge>
                )}
              </div>
              {analysis.details?.tamperingAnalysis && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Pixel Analysis: {analysis.details.tamperingAnalysis.pixelAnalysis}</p>
                  <p>• Metadata: {analysis.details.tamperingAnalysis.metadataConsistency}</p>
                  <p>• Compression: {analysis.details.tamperingAnalysis.compressionArtifacts}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Institution Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="w-5 h-5" />
              Institution Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Institution Status</span>
                {analysis.institutionVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <Badge variant="destructive">Unverified</Badge>
                )}
              </div>
              {analysis.details?.institution && (
                <p className="text-sm text-muted-foreground">
                  Institution: {analysis.details.institution}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Blockchain & QR */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <QrCode className="w-5 h-5" />
              Blockchain Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>QR Code</span>
                {analysis.qrCodeValid ? (
                  <Badge variant="success">Valid</Badge>
                ) : (
                  <Badge variant="outline">Not Found</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Blockchain Verified</span>
                {analysis.blockchainVerified ? (
                  <Badge variant="success">Verified</Badge>
                ) : (
                  <Badge variant="outline">Not Available</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5" />
              Technical Analysis Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Font Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Primary Font:</span>
                    <span className="font-mono text-xs">
                      {analysis.details?.fontAnalysis?.primaryFont || 'Times New Roman'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Font Changes:</span>
                    <Badge variant="outline" className="text-xs">
                      {analysis.details?.fontAnalysis?.fontChanges || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Consistency:</span>
                    <Badge variant={analysis.details?.fontAnalysis?.suspicious ? "destructive" : "success"} className="text-xs">
                      {analysis.details?.fontAnalysis?.suspicious ? 'Inconsistent' : 'Consistent'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Seal Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Seal Detected:</span>
                    <Badge variant={analysis.details?.sealAnalysis?.sealDetected ? "success" : "outline"} className="text-xs">
                      {analysis.details?.sealAnalysis?.sealDetected ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  {analysis.details?.sealAnalysis?.sealDetected && (
                    <>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="text-xs">{analysis.details.sealAnalysis.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Authenticity:</span>
                        <Badge variant={analysis.details.sealAnalysis.authentic ? "success" : "destructive"} className="text-xs">
                          {analysis.details.sealAnalysis.authentic ? 'Authentic' : 'Modified'}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Processing Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Text Extracted:</span>
                    <Badge variant="outline" className="text-xs">
                      {analysis.details?.textLength || 0} chars
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Analysis Version:</span>
                    <span className="text-xs font-mono">
                      {analysis.details?.analysisVersion || 'v2.1.0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="text-xs">
                      {analysis.details?.processingTime ? 
                        new Date(analysis.details.processingTime).toLocaleTimeString() : 
                        'Just now'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Security Metrics</h4>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Tamper Detection:</span>
                      <span className={analysis.tamperingDetected ? 'text-destructive' : 'text-success'}>
                        {analysis.details?.tamperingAnalysis?.confidence || 85}%
                      </span>
                    </div>
                    <Progress 
                      value={analysis.details?.tamperingAnalysis?.confidence || 85} 
                      className="h-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Institution Match:</span>
                      <span className={analysis.institutionVerified ? 'text-success' : 'text-destructive'}>
                        {analysis.details?.institutionConfidence || 75}%
                      </span>
                    </div>
                    <Progress 
                      value={analysis.details?.institutionConfidence || 75} 
                      className="h-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Text Preview */}
      {analysis.extractedText && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Extracted Text Sample
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm font-mono leading-relaxed">
                {analysis.extractedText.substring(0, 400)}
                {analysis.extractedText.length > 400 && (
                  <span className="text-muted-foreground">... [truncated]</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificate ID */}
      {certificateId && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Certificate ID</p>
              <p className="font-mono text-sm bg-muted px-3 py-1 rounded">
                {certificateId}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;