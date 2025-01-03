'use client'

import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { smtpExtensionSchema } from './schema';
import useTranslate from 'hooks/useTranslate';
import IconTextLink from '@/components/atoms/IconTextLink';
import { List } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/atoms/Button';
import { installExtensionApp } from 'app/api/extensionApp';
import { IConnectedAppProps } from '../type';
import { toast } from 'react-toastify';
import { projectSelectionSchema } from '../schema';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import { useAppContext } from 'context/application.context';
import { useState } from 'react';


const SmtpConfiguration = (props: IConnectedAppProps) => {

    const { organizationId, selectedApp } = props;
    const router = useRouter();
    const { translate } = useTranslate()
    const { projectList } = useAppContext()
    const [selectedProject, setSelectedProject] = useState("");

    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {}
    });

    const smtpFields = smtpExtensionSchema(translate);
    const projectSelectionField = projectSelectionSchema(translate);

    const submitForm = async (data: any) => {
        if (!selectedProject) {
            return toast.error("Select project!")
        }
        const payload: any = {
            configuaration: data,
            organization: organizationId,
            project: projectList.find((item) => item.name === selectedProject)?._id,
            key: selectedApp.key
        }
        const response = await installExtensionApp(payload)
        if (!response) return null;
        reset()
        toast.success("Extension added successfully")
    }

    const onProjectSelectionHandler = (value: string) => {
        const selectedProject = projectList.find((item) => item._id === value);
        if (!selectedProject) return;
        setSelectedProject(selectedProject?.name);
    }

    return (
        <Box className="h-[78vh] overflow-y-auto px-8 pb-8" component={"form"} onSubmit={handleSubmit(submitForm)}>

            {/* Header Section */}
            <Box className="flex flex-col border-b pb-4 mt-5">
                <Box className="flex flex-row justify-between items-center ">
                    <Typography className='font-semibold text-[1.5rem] text-commerceBlack'>
                        {`${translate("projectConfig.projectSettings")} of "SMTP"`}
                    </Typography>
                    <Box className="flex flex-row gap-2">
                        <SelectDropdown
                            options={projectList || []}
                            labelAlias='name'
                            valueAlias='_id'
                            placeholder='Select project'
                            className='w-[20rem]'
                            onSelect={onProjectSelectionHandler}
                            defaultValue={selectedProject}
                        />
                        <CustomButton
                            type='submit'
                            className='text-white'
                            title={translate("common.save")}
                            variant='contained'
                        />
                    </Box>

                </Box>
            </Box>

            <Box className="flex flex-row  gap-4  pt-3">
                <Box className="w-[90%]  p-6  ">
                    <Box className="grid grid-cols-2 mt-4  gap-4">
                        <CustomFieldMapper
                            formFields={smtpFields}
                            formData={{}}
                            register={register}
                            errors={errors}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SmtpConfiguration;