import { Button } from "@/components/ui/enhanced-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Security", href: "#security" },
    { name: "Pricing", href: "#pricing" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">EduSeal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="hero"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card border-secondary">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-bold text-gradient">EduSeal</span>
                  </div>
                </div>

                <nav className="flex-1 space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left py-3 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-smooth"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                <div className="pt-6 space-y-3 border-t border-secondary">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/login");
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/login");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;