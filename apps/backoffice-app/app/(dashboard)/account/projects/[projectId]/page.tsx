'use client'

import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { commerceExtensionSchema, smtpExtensionSchema } from './schema';
import useTranslate from 'hooks/useTranslate';
import IconTextLink from '@/components/atoms/IconTextLink';
import { List } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/atoms/Button';


const ProjectConfigurationPage = ({ params }: any) => {

    const router = useRouter();
    const { translate } = useTranslate()
    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {}
    });

    const commerceFields = commerceExtensionSchema(translate);
    const smtpFields = smtpExtensionSchema(translate);

    const submitForm = (e: any) => {
        e?.preventDefault();
    }

    return (
        <Box className="h-[78vh] overflow-y-auto px-8 pb-8" component={"form"} onSubmit={handleSubmit(submitForm)}>
            <IconTextLink
                text={translate("projectConfig.toProjects")}
                textClass='text-[0.875rem]'
                icon={<List className='w-4 h-4' />}
                onClick={() => router.back()}
            />
            <Box className="flex flex-row justify-between">
                <Typography className='font-semibold text-[1.5rem] text-commerceBlack'>
                    {`${translate("projectConfig.projectSettings")} of "commerce tool accelarator"`}
                </Typography>
                <CustomButton
                    type='submit'
                    className='text-white'
                    title={translate("common.save")}
                    variant='contained'
                />
            </Box>

            <Box className="flex flex-row  gap-4  pt-3">
                <Box className="w-[48%] border p-6  ">
                    <Typography className='font-semibold'>
                        {translate("projectConfig.commercetoolsComposableCommerceExtension")}
                    </Typography>
                    <Box className="mt-4 flex flex-col gap-2">
                        <CustomFieldMapper
                            formFields={commerceFields}
                            formData={{}}
                            register={register}
                            errors={errors}
                        />
                    </Box>
                </Box>

                <Box className="w-[48%] border p-6 ">
                    <Typography className='font-semibold'>
                        {translate("projectConfig.smtpEmailExtension")}
                    </Typography>
                    <Box className="mt-4 flex flex-col gap-2">
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

export default ProjectConfigurationPage;