import React, { useState } from 'react';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { uploadCertificate } from '@/services/api';
import { toast } from '@/components/ui/sonner';

const CertificateUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadCertificate(file);
      toast.success('Certificate uploaded and analyzed successfully!');
      onUploadComplete?.(result);
      setFile(null);
    } catch (error) {
      toast.error('Failed to upload certificate: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Certificate for Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="space-y-4">
              <FileText className="w-12 h-12 mx-auto text-primary" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setFile(null)}
                disabled={uploading}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  Drag and drop your certificate here
                </p>
                <p className="text-muted-foreground">
                  or click to browse files
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer" disabled={uploading}>
                  Browse Files
                </Button>
              </label>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Supported formats: PDF, JPG, PNG
          </p>
          <p className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            Maximum file size: 10MB
          </p>
        </div>

        {file && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
            variant="hero"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Certificate...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload & Verify Certificate
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateUpload;