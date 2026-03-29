import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RotateCcw } from "lucide-react";

export default function ProfilePage() {
  const { userProfile, onRestartOnboarding } = useOutletContext() || {};
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // BUGFIX: Add state for confirmation dialog

  const handleRestartClick = () => {
    setShowConfirmDialog(true); // BUGFIX: Show dialog instead of native confirm
  };

  const handleConfirmRestart = async () => {
    setShowConfirmDialog(false);
    await onRestartOnboarding(); // BUGFIX: Reset flag and save updated answers
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Profile</CardTitle>
          <CardDescription>Current onboarding information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Entity Type</p>
              <p className="text-sm font-medium">{userProfile.entityType || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Job Title</p>
              <p className="text-sm font-medium">{userProfile.jobTitle || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Function</p>
              <p className="text-sm font-medium">{userProfile.function || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase">Experience Points</p>
              <p className="text-sm font-medium">{userProfile.xp || 0} XP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-lg text-amber-900">Restart Onboarding</CardTitle>
          <CardDescription className="text-amber-800">Reset your profile and retake the onboarding wizard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-900 mb-4">
            This will clear your current profile data and restart the onboarding process. You can then update your information as needed.
          </p>
          <Button 
            variant="outline" 
            className="gap-2 border-amber-300 text-amber-900 hover:bg-amber-100"
            onClick={handleRestartClick}
          >
            <RotateCcw className="w-4 h-4" /> Restart Onboarding
          </Button>
        </CardContent>
      </Card>

      {/* BUGFIX: Add confirmation dialog with exact message */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restart Onboarding</AlertDialogTitle>
            <AlertDialogDescription>
              This will re-open the setup wizard with your current answers pre-filled. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmRestart}>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}