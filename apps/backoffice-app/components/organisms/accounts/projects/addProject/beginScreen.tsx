import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import MultiPageIcon from '@/components/atoms/CustomIcons/multiPage';
import RadioButtonsGroup from '@/components/atoms/RadioGroup';
import { useState } from 'react';

const BeginScreenStep = () => {

    const { translate } = useTranslate();
    const [selectedOption, setSelectedOption] = useState('scratch');

    const radioData = [
        { label: translate("account.startFromScratch"), value: "scratch", },
        { label: translate("account.startWithSampleData"), value: "sampleData", },
    ]

    return (
        <Box className="flex flex-row gap-2 px-2 w-[40.125rem] ">
            <Box className="flex flex-col w-[12.37rem] gap-2">
                <Typography className="text-[0.875rem] text-commerceBlack">
                    {translate("account.howWouldYouLikeToBegin")}
                </Typography>
                <MultiPageIcon className="w-[11.125rem] h-[11.125rem]" />
            </Box>
            <Box className="pt-10 px-4 flex flex-col gap-2">
                <RadioButtonsGroup 
                    // value={selectedOption} 
                    options={[radioData[0]]} 
                    // onSelect={setSelectedOption}
                    labelClass='text-[0.875rem] font-medium text-commerBlack' 
                />
                <Box className="flex flex-col pl-6">
                    <Typography className='text-[0.875rem] text-commerBlack'>{translate("account.alreadyHaveYourOwnDataReady")}</Typography>
                    <Typography className='text-[0.875rem] text-commerBlack'>{translate("account.perfectletsGetYouStartedWithBlankProject")}</Typography>
                </Box>

                <RadioButtonsGroup 
                    // value={selectedOption} 
                    options={[radioData[1]]}
                    // onSelect={setSelectedOption}
                    labelClass='text-[0.875rem] font-medium text-commerBlack' 
                />
                <Box className="flex flex-col pl-6">
                    <Typography className='text-[0.875rem] text-commerBlack'>{translate("account.dontWantToUploadDataJustYet")}</Typography>
                    <Typography className='text-[0.875rem] text-commerBlack'>{translate("account.getStartedInstantlyWithOurSampleData")}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default BeginScreenStep;