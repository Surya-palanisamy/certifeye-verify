import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { 
  Upload, 
  Scan, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Shield,
  Database
} from "lucide-react";
import securityPattern from "@/assets/security-pattern.jpg";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Certificate",
      description: "Drag and drop your certificate from → click to browse. Supports PDF, JPG, PNG formats.",
      detail: "Our secure upload handles any certificate format with military-grade encryption"
    },
    {
      step: "02", 
      icon: Scan,
      title: "AI Powered OCR Forensics",
      description: "Advanced computer vision scans and extracts text, seals and photos",
      detail: "Neural networks analyze pixel patterns, detect tampering with 99.7% accuracy"
    },
    {
      step: "03",
      icon: Database,
      title: "Trust Registry Network",
      description: "Real-time cross-reference against institutional databases and API integrations with accredited organizations",
      detail: "Instant validation against 500+ institutional databases worldwide"
    },
    {
      step: "04",
      icon: Shield,
      title: "Blockchain QR Security",
      description: "Secure proof-of-authenticity blockchain validation for tamper-proof verification",
      detail: "Immutable verification records secured on distributed ledger"
    },
    {
      step: "05",
      icon: CheckCircle,
      title: "Fraud Analysis Dashboard",
      description: "Real-time fraud analysis and early warning systems to identify forgery patterns before they spread",
      detail: "ML-powered dashboards track trends and generate actionable insights"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.97)), url(${securityPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <FileText className="w-4 h-4 mr-2" />
            Verification Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">How EduSeal Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our hybrid approach combines AI forensics, cryptographic security, and 
            institutional validation for the most comprehensive certificate verification available.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-primary/50 to-transparent"></div>
              )}
              
              <Card className="mb-8 bg-gradient-card backdrop-blur-xl border-secondary/20 shadow-elevated group hover:shadow-glow transition-all duration-500">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {step.step}
                        </span>
                        {index < steps.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground lg:hidden" />
                        )}
                      </div>
                      <CardTitle className="text-xl lg:text-2xl mb-3">{step.title}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="glass-effect rounded-lg p-4 border-primary/10">
                        <p className="text-sm text-primary font-medium">
                          💡 {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 lg:p-12 border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gradient">
              Ready to Secure Your Hiring?
            </h3>
            <p className="text-muted-foreground mb-8 lg:text-lg">
              Join hundreds of organizations using EduSeal to verify academic credentials with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                <Shield className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="xl" className="border-primary/30 hover:bg-primary/5">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;