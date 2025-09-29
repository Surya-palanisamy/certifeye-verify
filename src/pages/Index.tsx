import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import FooterSection from "@/components/FooterSection";
import CertificateUpload from "@/components/CertificateUpload";
import AnalysisResults from "@/components/AnalysisResults";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [certificateId, setCertificateId] = useState(null);

  const handleGetStarted = () => {
    setCurrentView('upload');
  };

  const handleUploadComplete = (result) => {
    setAnalysisResult(result.analysis);
    setCertificateId(result.certificateId);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setAnalysisResult(null);
    setCertificateId(null);
  };

  const handleViewDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onGetStarted={handleGetStarted} />
      
      {currentView === 'home' && (
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <FooterSection />
        </>
      )}

      {currentView === 'upload' && (
        <div className="pt-20 pb-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <button
                onClick={handleBackToHome}
                className="text-primary hover:text-primary/80 transition-smooth mb-4"
              >
                ← Back to Home
              </button>
              <h1 className="text-3xl font-bold mb-4">Certificate Verification</h1>
              <p className="text-muted-foreground">
                Upload your certificate for AI-powered verification and analysis
              </p>
            </div>
            <CertificateUpload onUploadComplete={handleUploadComplete} />
          </div>
        </div>
      )}

      {currentView === 'results' && (
        <div className="pt-20 pb-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={handleBackToHome}
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  ← Back to Home
                </button>
                <button
                  onClick={() => setCurrentView('upload')}
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  Upload Another
                </button>
                <button
                  onClick={handleViewDashboard}
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  View Dashboard
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-4">Analysis Results</h1>
              <p className="text-muted-foreground">
                Comprehensive AI-powered certificate verification results
              </p>
            </div>
            <AnalysisResults analysis={analysisResult} certificateId={certificateId} />
          </div>
        </div>
      )}

      {currentView === 'dashboard' && (
        <div className="pt-20 pb-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={handleBackToHome}
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  ← Back to Home
                </button>
                <button
                  onClick={() => setCurrentView('upload')}
                  className="text-primary hover:text-primary/80 transition-smooth"
                >
                  Upload Certificate
                </button>
              </div>
              <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor certificate verification statistics and history
              </p>
            </div>
            <Dashboard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
