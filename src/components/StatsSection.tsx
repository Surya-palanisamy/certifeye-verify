import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Building } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: CheckCircle,
      value: "99.7%",
      label: "Detection Accuracy",
      description: "AI-powered fraud detection rate"
    },
    {
      icon: Clock,
      value: "< 5s",
      label: "Verification Time",
      description: "Average processing speed"
    },
    {
      icon: Users,
      value: "500K+",
      label: "Certificates Verified",
      description: "Across global institutions"
    },
    {
      icon: Building,
      value: "150+",
      label: "Institutional Connections",
      description: "Verified education partners"
    }
  ];

  return (
    <section className="py-16 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-gradient-card backdrop-blur-xl border-secondary/20 shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;