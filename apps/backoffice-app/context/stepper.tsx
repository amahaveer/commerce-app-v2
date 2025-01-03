"use client"

import { createContext, useContext, useState } from "react";

import { IExposeStepper } from "types/stepper";
import StepperComponent from "@/components/atoms/Stepper";

export const StepperContext = createContext<IExposeStepper>({
  activeStep: 0,
  disableNextBtn: false,
  stepList: [],
  onNext: () => {},
  onBack: () => {},
  setActiveStep: () => {},
  setDisableNextBtn: () => {},
  Component: () => <></>,
});

export const StepperProvider = ({ stepList, title, children }: any) => {
  
  const [activeStep, setActiveStep] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(true);

  const handleSteps = (index: number) => {
    setActiveStep(index);
    // navigate(step.path); 
  };

  const onNext = () => {
		if (activeStep !== stepList.length - 1) {
			setActiveStep(activeStep + 1);
		}
	}

	const onBack = () => {
		if (activeStep > 0) {
			setActiveStep(activeStep - 1);
		}
	}

  const Component = stepList[activeStep].component;

  const expose: IExposeStepper = {
    activeStep,
    stepList,
    disableNextBtn,
    setDisableNextBtn,
    setActiveStep: handleSteps,
    onNext,
    onBack,
    Component,
  };

  return (
    <StepperContext.Provider value={expose}>
        <StepperComponent title={title}>
          {children}
        </StepperComponent>
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);

  if (context === undefined) {
    throw new Error("Component Must be used within a Stepper Provider");
  }

  return context;
};
