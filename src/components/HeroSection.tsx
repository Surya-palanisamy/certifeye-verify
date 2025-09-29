import { Button } from "@/components/ui/enhanced-button";
import { CheckCircle, Upload, Shield, Search } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = ({ onGetStarted }) => {

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-bounce transition-bounce">
            <CheckCircle className="w-4 h-4 mr-2" />
            Next-Gen Certificate Verification
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8">
            <span className="text-gradient">EduSeal</span>
            <br />
            <span className="text-foreground">
              Stop fake degrees in their tracks with{" "}
              <span className="text-gradient">AI-powered verification</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            A smart, secure, scalable platform to verify any academic certificate with OCR + AI forensics, 
            trust registry validation, and tamper-proof QR/Blockchain technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              variant="hero"
              size="xl"
              className="w-full sm:w-auto"
              onClick={onGetStarted}
            >
              <Shield className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="w-full sm:w-auto"
              onClick={onGetStarted}
            >
              Upload Certificate
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Search, text: "AI Forensics", color: "bg-success/10 text-success border-success/20" },
              { icon: Shield, text: "Trust Registry", color: "bg-primary/10 text-primary border-primary/20" },
              { icon: CheckCircle, text: "Blockchain QR", color: "bg-warning/10 text-warning border-warning/20" },
            ].map(({ icon: Icon, text, color }) => (
              <div
                key={text}
                className={`inline-flex items-center px-4 py-2 rounded-full border ${color} text-sm font-medium transition-smooth hover:scale-105`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {text}
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="max-w-md mx-auto">
            <div className="glass-effect rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4 text-gradient">Try It Now</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Upload any certificate to see our AI verification in action
              </p>
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/5"
                onClick={onGetStarted}
              >
                <Upload className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;