import React from "react";
import Actions from "./Actions";
import { useAppContext } from "./AppWrapper";

export default function ActionsPage() {
  const { userProfile, onFunctionChange, onXPChange } = useAppContext();
  return <Actions userProfile={userProfile} onFunctionChange={onFunctionChange} onXPChange={onXPChange} />;
}