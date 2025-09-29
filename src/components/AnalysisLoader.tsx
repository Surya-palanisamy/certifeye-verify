import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, QrCode, Building, FileText, Cpu } from "lucide-react";

const AnalysisLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    { icon: FileText, label: "Extracting text content...", duration: 1500 },
    { icon: Eye, label: "Analyzing digital signatures...", duration: 2000 },
    { icon: Cpu, label: "Detecting tampering patterns...", duration: 1800 },
    {
      icon: Building,
      label: "Verifying institution database...",
      duration: 1200,
    },
    { icon: QrCode, label: "Scanning QR codes...", duration: 1000 },
    { icon: Shield, label: "Generating security report...", duration: 800 },
  ];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setCurrentStep(0);
      return;
    }

    let totalDuration = analysisSteps.reduce(
      (sum, step) => sum + step.duration,
      0
    );

    const runSteps = async () => {
      let currentDuration = 0;
      for (let i = 0; i < analysisSteps.length; i++) {
        setCurrentStep(i);
        const stepDuration = analysisSteps[i].duration;
        const startProgress = (currentDuration / totalDuration) * 100;
        const endProgress =
          ((currentDuration + stepDuration) / totalDuration) * 100;

        let startTime = null;
        const animateStep = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const stepComplete = Math.min(elapsed / stepDuration, 1);
          const currentProgress =
            startProgress + (endProgress - startProgress) * stepComplete;
          setProgress(currentProgress);
          if (stepComplete < 1) {
            requestAnimationFrame(animateStep);
          }
        };
        requestAnimationFrame(animateStep);

        await new Promise((resolve) => setTimeout(resolve, stepDuration));
        currentDuration += stepDuration;
      }

      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    };

    runSteps();
  }, [isLoading]);

  if (!isLoading) return null;
  const CurrentIcon = analysisSteps[currentStep]?.icon || Shield;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 50 * (1 - progress / 100)
                  }`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <CurrentIcon className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analyzing Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  {analysisSteps[currentStep]?.label}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Step {currentStep + 1} of {analysisSteps.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisLoader;
