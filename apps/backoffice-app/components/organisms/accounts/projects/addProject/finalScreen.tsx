import AutoCompleteDropdown from '@/components/atoms/AutoCompleteDropdown';
import UserNDocIcon from '@/components/atoms/CustomIcons/userNDocIcon';
import PrefixInputBase from '@/components/atoms/PrefixInputBase';
import { Box, Typography } from '@mui/material';
import { getUserOrganizations } from 'app/api/organization.api';
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import { IfinalScreenProp } from './type';

const FinalStepScreen = (props: IfinalScreenProp) => {

    const { projectName ,setProjectName, setSelectedOrganization } = props;
    const { translate } = useTranslate();
    const [organizations, setOrganizations] = useState([]);


    const initData = async () => {
        const data = await getUserOrganizations();
        setOrganizations(data);
    }

    const onSelectOrganization = (value: any) => {
        setSelectedOrganization(value);
    }

    const onChangeProjectName = (value: string) => {
        setProjectName(value);
    }

    useEffect(() => {
        initData();
    },[])

    return (
        <Box className="flex flex-col w-[43.125rem] gap-5 px-4">
            <Box className="">
                <Typography className='text-[0.875rem] text-commerceBlack'>
                    {translate("account.projectBelongsToSelectedOrganization")}
                </Typography>
            </Box>

            <Box className="flex flex-row gap-4">
                <Box>
                    <UserNDocIcon className='w-[9.875rem] h-[13.68rem]' />
                </Box>
                <Box className="flex flex-col w-full gap-4">
                    <Box className="flex flex-col gap-1">
                        <Typography className='text-[0.87rem] font-medium'>{translate("account.organizationName")}
                            <span className="text-red-600"> *</span>
                        </Typography>
                        <AutoCompleteDropdown
                            options={organizations}
                            labelAlias='name'
                            valueAlias='_id'
                            onSelect={onSelectOrganization}
                            height='2.5rem'
                            fullWidth
                        />
                    </Box>

                    <Box className="flex flex-col gap-1">
                        <Typography className='text-[0.87rem] font-medium'>{translate("account.projectName")}
                            <span className="text-red-600"> *</span>
                        </Typography>
                        <PrefixInputBase prefix={null} onChange={onChangeProjectName} value={projectName} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


export default FinalStepScreen;