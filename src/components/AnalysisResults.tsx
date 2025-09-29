import React from "react";
import {
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  QrCode,
  Building,
  Cpu,
  User,
  Hash,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AnalysisResults = ({ onClose }) => {
  // Static demo data
  const result = {
    certificateId: "CERT-2015-001323",
    studentName: "vijay kumar",
    course: "Bachelor of Computer Science",
    institution: "Anna University",
    issueDate: "15-July-2015",
    signaturesValid: false,
    qrCodeDetected: false,
    institutionVerified: true,
    tampered: false,
    fake: false,
    verified: true
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-auto">
      <Card className="w-full max-w-3xl mx-4 my-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Shield className="w-5 h-5" />
            Certificate Analysis Report
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Certificate Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Certificate Details
            </h3>
            <div className="text-sm space-y-1">
              <p className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <strong>ID:</strong> {result.certificateId}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <strong>Name:</strong> {result.studentName}
              </p>
              <p>
                <strong>Course:</strong> {result.course}
              </p>
              <p>
                <strong>Institution:</strong> {result.institution}
              </p>
              <p>
                <strong>Issue Date:</strong> {result.issueDate}
              </p>
            </div>
          </div>

          {/* Security Checks */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Security Checks
            </h3>
            <ul className="space-y-2 text-sm">
              {result.signaturesValid ? (
                <li className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  Digital signatures verified successfully
                </li>
              ) : (
                <li className="flex items-center gap-2 text-danger">
                  <AlertCircle className="w-4 h-4" />
                  Digital signatures are invalid or missing
                </li>
              )}

              {result.qrCodeDetected ? (
                <li className="flex items-center gap-2 text-success">
                  <QrCode className="w-4 h-4" />
                  QR code detected and verified
                </li>
              ) : (
                <li className="flex items-center gap-2 text-warning">
                  <QrCode className="w-4 h-4" />
                  No valid QR code found
                </li>
              )}

              {result.institutionVerified ? (
                <li className="flex items-center gap-2 text-success">
                  <Building className="w-4 h-4" />
                  Issuing institution verified
                </li>
              ) : (
                <li className="flex items-center gap-2 text-danger">
                  <Building className="w-4 h-4" />
                  Issuing institution not found in database
                </li>
              )}

              {result.tampered ? (
                <li className="flex items-center gap-2 text-danger">
                  <AlertCircle className="w-4 h-4" />
                  Certificate shows signs of tampering
                </li>
              ) : (
                <li className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  No tampering detected
                </li>
              )}

              {result.fake ? (
                <li className="flex items-center gap-2 text-danger">
                  <AlertCircle className="w-4 h-4" />
                  This is a fake/forged certificate
                </li>
              ) : (
                <li className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  Certificate not flagged as fake
                </li>
              )}
            </ul>
          </div>

          {/* Final Verdict */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Final Verdict
            </h3>
            <p
              className={`text-sm font-medium ${
                result.verified ? "text-success" : "text-danger"
              }`}
            >
              {result.verified
                ? "✅ The certificate is authentic and passed all checks."
                : "❌ The certificate failed some security checks. It may be tampered or issued by an unverified institution."}
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
