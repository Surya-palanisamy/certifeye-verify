import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Shield, 
  QrCode, 
  BarChart3, 
  Globe, 
  Smartphone,
  Eye,
  Database,
  Lock
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Forensics",
      subtitle: "Deep learning analysis",
      description: "Advanced computer vision AI forensics → detects tampering (text, seals, photos)",
      color: "bg-success/10 border-success/20 hover:shadow-success/20",
      iconColor: "text-success"
    },
    {
      icon: Database,
      title: "Trust Registry",
      subtitle: "Real-time verification",
      description: "Trust Registry + Institution APIs → cross-checks authenticity in real-time", 
      color: "bg-primary/10 border-primary/20 hover:shadow-primary/20",
      iconColor: "text-primary"
    },
    {
      icon: QrCode,
      title: "Blockchain QR",
      subtitle: "Tamper-proof security",
      description: "Tamper-proof QR/Blockchain → ensures future certificates are unforgeable",
      color: "bg-warning/10 border-warning/20 hover:shadow-warning/20", 
      iconColor: "text-warning"
    },
    {
      icon: BarChart3,
      title: "Fraud Analytics Dashboard",
      subtitle: "Smart insights",
      description: "Admin Dashboard → fraud trends, blacklisting, monitoring",
      color: "bg-destructive/10 border-destructive/20 hover:shadow-destructive/20",
      iconColor: "text-destructive"
    },
    {
      icon: Globe,
      title: "Legacy & Modern Support",
      subtitle: "Universal compatibility",
      description: "Works for legacy + new certificates with hybrid trust verification",
      color: "bg-accent/10 border-accent/20 hover:shadow-accent/20",
      iconColor: "text-accent"
    },
    {
      icon: Smartphone,
      title: "Mobile Field Verification",
      subtitle: "Offline QR checks",
      description: "Offline QR verification for field checks without internet connectivity",
      color: "bg-secondary/10 border-secondary/20 hover:shadow-secondary/20",
      iconColor: "text-secondary-foreground"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Eye className="w-4 h-4 mr-2" />
            AI Powered Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">How EduSeal Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our hybrid approach combines AI forensics, cryptographic security, and institutional validation 
            for the most comprehensive certificate verification available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group ${feature.color} backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-elevated`}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-card rounded-2xl flex items-center justify-center shadow-card group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-primary font-medium">
                  {feature.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Innovation Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8 text-gradient">Innovation & Uniqueness</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: "Triple Shield", desc: "AI + Crypto + Registry" },
              { icon: Globe, title: "Universal", desc: "Legacy + New certificates" },
              { icon: Smartphone, title: "Offline Ready", desc: "Field verification" },
              { icon: BarChart3, title: "Early Detection", desc: "Forgery heatmaps" }
            ].map((item) => (
              <div key={item.title} className="glass-effect rounded-xl p-6 border-primary/10">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;