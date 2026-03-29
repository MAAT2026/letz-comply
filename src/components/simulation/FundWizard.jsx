import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import StepFundSelection from "./steps/StepFundSelection";
import StepFundDetails from "./steps/StepFundDetails";
import StepRegulatoryValidation from "./steps/StepRegulatoryValidation";
import StepInvestorAssets from "./steps/StepInvestorAssets";
import StepReview from "./steps/StepReview";
import StepRegistrationResult from "./steps/StepRegistrationResult";

const STEPS = [
  { id: 1, label: "Fund Type", icon: "📋" },
  { id: 2, label: "Fund Details", icon: "📝" },
  { id: 3, label: "Regulatory Check", icon: "✅" },
  { id: 4, label: "Investors & Assets", icon: "💼" },
  { id: 5, label: "Review & Launch", icon: "🚀" },
  { id: 6, label: "Feedback & Challenges", icon: "📊" },
];

const INITIAL_FUND = {
  name: "",
  fundType: "",
  legalForm: "",
  managementStructure: "",
  minNetAssets: 0,
  targetInvestors: [],
  assetClasses: [],
  estimatedFees: 0,
  investors: [],
  assets: [],
};

export default function FundWizard() {
  const [state, setState] = useState({ currentStep: 1, fundData: INITIAL_FUND });
  const { currentStep, fundData } = state;
  const [loading, setLoading] = useState(false);

  const handleStepData = (data) => {
    setState(prev => ({
      fundData: { ...prev.fundData, ...data },
      currentStep: prev.currentStep < 5 ? prev.currentStep + 1 : prev.currentStep,
    }));
  };

  const handleLaunchFund = async () => {
    setLoading(true);
    try {
      await base44.entities.Fund.create({
        ...fundData,
        status: "regulatory-review",
      });
      // Move to results step instead of resetting
      setState(prev => ({ ...prev, currentStep: 6 }));
    } catch (error) {
      alert("Error creating fund: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setState({ currentStep: 1, fundData: INITIAL_FUND });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepFundSelection fundData={fundData} onNext={handleStepData} />;
      case 2:
        return <StepFundDetails fundData={fundData} onNext={handleStepData} />;
      case 3:
        return <StepRegulatoryValidation fundData={fundData} onNext={handleStepData} />;
      case 4:
        return <StepInvestorAssets fundData={fundData} onNext={handleStepData} />;
      case 5:
        return <StepReview fundData={fundData} onLaunch={handleLaunchFund} loading={loading} />;
      case 6:
        return <StepRegistrationResult fundData={fundData} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fund creation simulator</h1>
        <p className="text-muted-foreground">Navigate the regulatory journey to launch your Luxembourg investment fund</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="relative flex justify-between mb-4">
          {/* Connector line behind icons */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-lux-blue transition-all"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 transition-all ${
                  currentStep >= step.id
                    ? "bg-lux-blue"
                    : "bg-secondary"
                }`}
              >
                {step.icon}
              </div>
              <span className="text-xs font-medium text-center">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Step {currentStep}: {STEPS[currentStep - 1].label}</span>
            <Badge variant="outline">{currentStep <= 5 ? `${currentStep}/5` : "Complete"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      {currentStep < 6 && (
        <div className="flex gap-3 mt-6 justify-between">
          <Button
            variant="outline"
            onClick={() => setState(prev => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }))}
            disabled={currentStep === 1}
          >
            ← Back
          </Button>
          <Button
            variant="outline"
            onClick={() => setState(prev => ({ ...prev, currentStep: Math.min(5, prev.currentStep + 1) }))}
            disabled={currentStep === 5}
          >
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}