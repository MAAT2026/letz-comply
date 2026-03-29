import React, { useState } from "react";
import FundWizard from "@/components/simulation/FundWizard";

export default function FundSimulationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lux-blue/5 to-lux-red/5">
      <FundWizard />
    </div>
  );
}