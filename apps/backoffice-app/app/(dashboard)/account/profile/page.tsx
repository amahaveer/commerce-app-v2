"use client"
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import Avatar from '@mui/material/Avatar';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useForm } from 'react-hook-form';
import CustomFieldMapper from '@/components/organisms/customFieldMapper';
import { profileSchema } from './schema';
import { useEffect, useState } from 'react';
import { getUserData } from 'app/api/me.api';

const MyProfile = () => {

    const { translate } = useTranslate();
    const [userData, setUserData] = useState<any>();
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {}
    });
    const formFields = profileSchema(translate);

    const initData = async () => {
        const data = await getUserData();
        reset(data)
        setUserData(data)
    }

    useEffect(() => {
        initData()
    }, [])

    return (
        <Box className="flex flex-col px-10 gap-10">
            <Box className="flex flex-col border-b pb-4">
                <Typography className='font-semibold text-[1.5rem] text-commerceBlack' >
                    {`${translate("account.myProfile")}`}
                </Typography>

                <Box className="p-2 pb-4">
                    <Box className="flex flex-row items-center gap-4">
                        <Avatar className='text-[#624fd8] bg-[#beb3ff] w-24 h-24 text-[2.5rem]'>
                        {`${userData?.firstName?.[0]}${userData?.lastName?.[0]}`}
                        </Avatar>
                        <Box className="flex flex-col gap-0">
                            <Typography className='text-[1.25rem] font-semibold text-commerceBlack'>
                                {`${userData?.firstName} ${userData?.lastName}`}
                            </Typography>
                            <Typography className='text-[1rem] text-commerceBlack'>{userData?.email}</Typography>
                        </Box>
                        <IconButton className='ml-auto' >
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Box className="flex flex-col items-center gap-3">
                <Box className="w-[46.37rem] flex flex-row gap-3">
                    <CustomFieldMapper
                        formFields={formFields.slice(0,2)}
                        formData={{}}
                        register={register}
                        errors={errors}
                    />
                </Box>
                <Box className="w-[46.37rem] flex flex-col gap-3">
                    <CustomFieldMapper
                        formFields={formFields.slice(2,formFields.length)}
                        formData={{}}
                        register={register}
                        errors={errors}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default MyProfile;