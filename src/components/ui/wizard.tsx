"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  validation?: () => boolean | Promise<boolean>;
}

interface StepComponentProps {
  isActive?: boolean;
  data?: Record<string, unknown>;
  onUpdate?: (data: Record<string, unknown>) => void;
}

interface WizardProps {
  steps: WizardStep[];
  onComplete?: (data: Record<string, unknown>) => void;
  className?: string;
  showProgress?: boolean;
  allowBackNavigation?: boolean;
  showSummary?: boolean;
}

export function Wizard({
  steps,
  onComplete,
  className,
  showProgress = true,
  allowBackNavigation = true,
  showSummary,
}: WizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(
    new Set()
  );
  const [isValidating, setIsValidating] = React.useState(false);

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  // const canProceed = completedSteps.has(currentStep);

  const goToStep = async (stepIndex: number) => {
    const currentStepData = steps[currentStep];
    if (currentStepData.validation) {
      setIsValidating(true);

      try {
        const isValid = await currentStepData.validation();
        if (isValid) {
          setCompletedSteps((prev) => new Set([...prev, currentStep]));
        } else {
          setCompletedSteps((prev) => {
            const newSet = new Set([...prev]);
            newSet.delete(currentStep);
            return newSet;
          });
        }
      } catch (error) {
        console.error("Validation failed:", error);
      } finally {
        setIsValidating(false);
      }
    }

    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const goToNextStep = async () => {
    const currentStepData = steps[currentStep];

    if (currentStepData.validation) {
      setIsValidating(true);
      try {
        const isValid = await currentStepData.validation();
        if (isValid) {
          setCompletedSteps((prev) => new Set([...prev, currentStep]));

          if (isLastStep) {
            onComplete?.({});
          } else {
            goToStep(currentStep + 1);
          }
        }
      } catch (error) {
        console.error("Validation failed:", error);
      } finally {
        setIsValidating(false);
      }
    } else {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));

      if (isLastStep) {
        onComplete?.({});
      } else {
        goToStep(currentStep + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep && allowBackNavigation) {
      goToStep(currentStep - 1);
    }
  };

  // need to check each previous not length
  const isFinalStepCanSubmit = [...Array(steps.length - 1).keys()].every(
    (step) => completedSteps.has(step)
  );
  const disableSubmit = isLastStep && !isFinalStepCanSubmit;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Header */}
      {showProgress && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-display">
                  Step {currentStep + 1} of {steps.length}
                </CardTitle>
                <CardDescription>{steps[currentStep].title}</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono">
                {Math.round(progress)}%
              </Badge>
            </div>
            <ProgressBar value={progress} className="h-2" />
          </CardHeader>
        </Card>
      )}

      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => goToStep(index)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  index === currentStep
                    ? "bg-moloch-500 text-white"
                    : completedSteps.has(index)
                    ? "bg-moloch-500 text-white hover:bg-scroll-400"
                    : "bg-moloch-800 text-moloch-500 hover:bg-moloch-500 hover:text-moloch-800"
                )}
              >
                {completedSteps.has(index) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* <Separator /> */}

      {/* Current Step Content */}
      <div>
        <div className="text-heading-md mb-7">{steps[currentStep].title}</div>
        {steps[currentStep].description && (
          <CardDescription>{steps[currentStep].description}</CardDescription>
        )}
        <div className="min-h-[300px]">
          {React.isValidElement(steps[currentStep].component)
            ? React.cloneElement(steps[currentStep].component, {
                isActive: true,
                data: {},
                onUpdate: () => {},
              } as StepComponentProps)
            : steps[currentStep].component}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-8">
        <Button
          variant="moloch"
          size="sm"
          onClick={goToPreviousStep}
          disabled={isFirstStep || !allowBackNavigation}
          className="flex items-center space-x-2 text-moloch-500 font-body uppercase text-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-2">
          {/* {!isLastStep && (
            <Button
              variant="ghost"
              onClick={() => goToStep(currentStep + 1)}
              disabled={!canProceed}
            >
              Skip
            </Button>
          )} */}
          <Button
            onClick={goToNextStep}
            disabled={isValidating || disableSubmit}
            className="flex items-center space-x-2 text-scroll-100 font-body uppercase text-sm"
            size="sm"
            variant={isLastStep ? "moloch" : "primary"}
          >
            <span>{isLastStep ? "Complete" : "Next"}</span>
            {!isLastStep && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Step Summary */}
      {showSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progress Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md",
                    completedSteps.has(index)
                      ? "bg-scroll-500/20 border border-scroll-500/30"
                      : index === currentStep
                      ? "bg-moloch-500/20 border border-moloch-500/30"
                      : "bg-muted/50"
                  )}
                >
                  <span className="text-sm font-medium">{step.title}</span>
                  <div className="flex items-center space-x-2">
                    {completedSteps.has(index) && (
                      <Badge
                        variant="secondary"
                        className="bg-scroll-500 text-black"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                    {index === currentStep && (
                      <Badge variant="moloch">Current</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
