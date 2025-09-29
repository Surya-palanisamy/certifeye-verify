import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, Shield, Eye, QrCode, Building, FileText, TrendingUp } from 'lucide-react';

const AnalysisResults = ({ analysis, certificateId }) => {
  if (!analysis) return null;

  const getStatusIcon = (isAuthentic) => {
    if (isAuthentic) {
      return <CheckCircle className="w-5 h-5 text-success" />;
    }
    return <XCircle className="w-5 h-5 text-destructive" />;
  };

  const getStatusColor = (isAuthentic) => {
    return isAuthentic ? 'success' : 'destructive';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-destructive';
  };

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
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className={`text-lg font-bold ${getConfidenceColor(analysis.confidence)}`}>
                {analysis.confidence}%
              </span>
            </div>
            <Progress value={analysis.confidence} className="h-3" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Fraud Risk Score</span>
              <span className="text-lg font-bold text-destructive">
                {analysis.fraudScore}%
              </span>
            </div>
            <Progress value={analysis.fraudScore} className="h-3" />
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

        {/* Text Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5" />
              Text Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Text Extracted</span>
                <Badge variant="outline">
                  {analysis.details?.textLength || 0} chars
                </Badge>
              </div>
              {analysis.extractedText && (
                <div className="text-sm text-muted-foreground max-h-20 overflow-y-auto">
                  <p className="font-medium mb-1">Sample Text:</p>
                  <p className="italic">"{analysis.extractedText.substring(0, 200)}..."</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

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