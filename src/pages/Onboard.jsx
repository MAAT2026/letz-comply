import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";
import StepFundOverview from "@/components/onboard/steps/StepFundOverview";
import StepInvestorsAndTerms from "@/components/onboard/steps/StepInvestorsAndTerms";
import StepServicesAndReview from "@/components/onboard/steps/StepServicesAndReview";

const STEPS = [
  { id: 1, label: "Fund Overview", icon: "📋" },
  { id: 2, label: "Investors", icon: "👥" },
  { id: 3, label: "Services & Review", icon: "✅" },
];

export default function Onboard() {
  const [step, setStep] = useState(1);
  const [overview, setOverview] = useState({});
  const [entities, setEntities] = useState({ fund: { enabled: true } });
  const [investorProfile, setInvestorProfile] = useState({});
  const [services, setServices] = useState({});
  const [projectId, setProjectId] = useState(null);

  const saveProject = async (data = {}) => {
    try {
      const payload = { overview, entities, investorProfile, services, ...data };
      if (projectId) {
        await base44.entities.Project.update(projectId, { data: payload });
      } else {
        const project = await base44.entities.Project.create({
          name: overview.fundName || "Untitled Fund",
          type: "onboarding",
          status: "in-progress",
          data: payload,
        });
        setProjectId(project.id);
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Fund Onboarding Intake</h1>
        <p className="text-sm text-muted-foreground">Capture a new client mandate and generate a full onboarding overview.</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="relative flex justify-between">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-lux-blue transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((s) => (
            <div key={s.id} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base mb-1.5 transition-all ${step >= s.id ? "bg-lux-blue" : "bg-secondary"}`}>
                {s.icon}
              </div>
              <span className="text-[10px] font-medium text-center hidden sm:block">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span>Step {step}: {STEPS[step - 1].label}</span>
            <Badge variant="outline">{step}/3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <StepFundOverview
              overview={overview}
              onChangeOverview={setOverview}
              entities={entities}
              onChangeEntities={setEntities}
              onNext={(finalOverview, finalEntities) => {
                setOverview(finalOverview);
                setEntities(finalEntities);
                saveProject({ overview: finalOverview, entities: finalEntities });
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepInvestorsAndTerms
              data={investorProfile}
              onChange={setInvestorProfile}
              onNext={(d) => { setInvestorProfile(d); saveProject({ investorProfile: d }); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepServicesAndReview
              overview={overview}
              entities={entities}
              investorProfile={investorProfile}
              services={services}
              onChangeServices={setServices}
              onBack={() => setStep(2)}
              onSave={() => saveProject()}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}