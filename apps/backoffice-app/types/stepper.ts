import { Dispatch, ElementType, SetStateAction } from "react";
// import { IStepList } from "./common";

export interface IExposeStepper {
    activeStep: number;
    stepList: Array<any>;
    disableNextBtn: boolean;
    setDisableNextBtn: Dispatch<SetStateAction<boolean>>;
    setActiveStep: (index: number) => void,
    onNext: () => void;
    onBack: () => void;
    Component: ElementType,
}