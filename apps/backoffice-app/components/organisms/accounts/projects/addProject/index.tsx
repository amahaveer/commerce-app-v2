import { Box, Typography } from '@mui/material';
import ModalPopup from "@/components/atoms/ModalPopup";
import useTranslate from 'hooks/useTranslate';
import { useState } from 'react';
import BeginScreenStep from './beginScreen';
import FinalStepScreen from './finalScreen';

const AddProject = (props: any) => {

    const { open, setOpen, onCreateProject } = props;
    const [step, setStep] = useState(0);
    const { translate } = useTranslate();
    const [selectedOrganization, setSelectedOrganization] = useState("")
    const [projectName, setProjectName] = useState("");

    const onContinue = () => {
        setStep(1)
    }

    const onBack = () => setStep(0);

    const submitBtn = step === 0 ? 
        { 
            label: translate("common.continue"), 
            onClick: onContinue 
        } :
        { 
            label: translate("common.complete"), 
            onClick: () => onCreateProject(selectedOrganization, projectName) 
        }


    return (
        <ModalPopup
            open={open}
            setOpen={setOpen}
            title={translate("account.letsCreateNewProject")}
            cancelBtn={false}
            submitBtn={submitBtn}
            backBtn={step===1}
            onClickBack={onBack}
        >
            <Box className="">
                {step === 0 ?
                    <BeginScreenStep/> 
                    :
                    <FinalStepScreen 
                        projectName={projectName}
                        setSelectedOrganization={setSelectedOrganization}
                        setProjectName={setProjectName}
                    />
                }
            </Box>
        </ModalPopup>
    )
}

export default AddProject;