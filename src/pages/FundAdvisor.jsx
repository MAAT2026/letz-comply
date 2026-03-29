import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import StepAssetClasses from "@/components/advisor/StepAssetClasses";
import StepGeography from "@/components/advisor/StepGeography";
import StepInvestorProfile from "@/components/advisor/StepInvestorProfile";
import StepFundSize from "@/components/advisor/StepFundSize";
import StepDistribution from "@/components/advisor/StepDistribution";
import StepRegulatoryPreference from "@/components/advisor/StepRegulatoryPreference";
import StepLegalForm from "@/components/advisor/StepLegalForm";
import StepTaxConsiderations from "@/components/advisor/StepTaxConsiderations";
import StepTimeline from "@/components/advisor/StepTimeline";
import StepAdditionalRequirements from "@/components/advisor/StepAdditionalRequirements";
import FundRecommendations from "@/components/advisor/FundRecommendations";
import { analyzeFundStructure } from "@/lib/fundAdvisor";

const STEPS = [
  { number: 1, title: "Asset Classes", description: "What will the fund invest in?" },
  { number: 2, title: "Investment Geography", description: "Where will the fund invest?" },
  { number: 3, title: "Investor Profile", description: "Who are the target investors?" },
  { number: 4, title: "Fund Size", description: "Target fund size at launch?" },
  { number: 5, title: "Distribution Strategy", description: "Fund structure and distribution?" },
  { number: 6, title: "Regulatory Preferences", description: "Fund regime preference?" },
  { number: 7, title: "Legal Form", description: "Preferred legal structure?" },
  { number: 8, title: "Tax Considerations", description: "Tax optimization needs?" },
  { number: 9, title: "Timeline", description: "When do you need to launch?" },
  { number: 10, title: "Additional Requirements", description: "Any specific constraints?" },
];

export default function FundAdvisor() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    assetClasses: [],
    geography: "",
    geographySpecific: "",
    investorTypes: [],
    fundSize: "",
    fundLife: "",
    listing: "",
    distributionGeography: "",
    distributionGeoSpecific: "",
    regulatoryPreference: [],
    legalFormPreference: [],
    taxInvestorResidencies: [],
    taxTransparency: false,
    taxParentSubsidiary: false,
    taxDTT: false,
    taxVAT: false,
    taxSubscriptionSensitivity: false,
    timeline: "",
    sfdr: false,
    sfdrArticle: "",
    shariah: false,
    tokenization: false,
    masterFeeder: false,
    umbrella: false,
    sidePockets: false,
    eltif: false,
    euveca: false,
    eusef: false,
    freeText: "",
  });
  const [recommendations, setRecommendations] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const updateAnswers = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const goToStep = (stepNum) => {
    if (stepNum >= 1 && stepNum <= STEPS.length) {
      setStep(stepNum);
    }
  };

  const handleNext = () => {
    if (step < STEPS.length) {
      setStep(step + 1);
    } else {
      handleAnalyze();
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeFundStructure(answers);
      setRecommendations(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
    setAnalyzing(false);
  };

  if (recommendations) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRecommendations(null)}
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Wizard
        </Button>
        <FundRecommendations 
          recommendations={recommendations.recommendations}
          disqualified={recommendations.disqualified}
        />
      </div>
    );
  }

  const currentStep = STEPS[step - 1];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fund Structure Advisor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Step {step} of {STEPS.length}: {currentStep.title}
          </p>
        </div>
        <Link to="/app/tools" className="text-xs text-primary hover:underline">
          Exit wizard →
        </Link>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step nav pills (optional, clickable) */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STEPS.map((s) => (
          <button
            key={s.number}
            onClick={() => goToStep(s.number)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
              step === s.number
                ? "bg-primary text-white"
                : s.number < step
                ? "bg-green-100 text-green-800 cursor-pointer"
                : "bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200"
            }`}
          >
            {s.number}
          </button>
        ))}
      </div>

      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{currentStep.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && <StepAssetClasses answers={answers} updateAnswers={updateAnswers} />}
          {step === 2 && <StepGeography answers={answers} updateAnswers={updateAnswers} />}
          {step === 3 && <StepInvestorProfile answers={answers} updateAnswers={updateAnswers} />}
          {step === 4 && <StepFundSize answers={answers} updateAnswers={updateAnswers} />}
          {step === 5 && <StepDistribution answers={answers} updateAnswers={updateAnswers} />}
          {step === 6 && <StepRegulatoryPreference answers={answers} updateAnswers={updateAnswers} />}
          {step === 7 && <StepLegalForm answers={answers} updateAnswers={updateAnswers} />}
          {step === 8 && <StepTaxConsiderations answers={answers} updateAnswers={updateAnswers} />}
          {step === 9 && <StepTimeline answers={answers} updateAnswers={updateAnswers} />}
          {step === 10 && <StepAdditionalRequirements answers={answers} updateAnswers={updateAnswers} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => goToStep(step - 1)}
          disabled={step === 1}
          className="flex-1"
        >
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={analyzing}
          className="flex-1 gap-2"
        >
          {analyzing ? "Analyzing..." : step === STEPS.length ? "Get Recommendations" : "Next"} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}