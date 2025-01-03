"use client"
import { Box, Typography, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createUserSchema } from './schema';
import CustomFieldMapper from '../../customFieldMapper';
import CustomButton from '@/components/atoms/Button';
import { useEffect, useState } from 'react';
import { getTeamByInvitedToken } from 'app/api/team.api';
import { toast } from 'react-toastify';
import { createUserAndJoinTeam } from 'app/api/teamMember';


const CreateUserForm = (props: any) => {

    const { token } = props;
    const [teamData, setTeamData] = useState<any>(null);
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {}
    });

    const formFields = createUserSchema()

    useEffect(() => {
        const initData = async () => {
            const data = await getTeamByInvitedToken(token);
            setTeamData(data);
            reset({email: data.email})
        }
        initData();
    }, [])

    const onSubmit = async (data: any) => {
        if (data.password !== data.confirmPassword) {
            toast.error("password and confirm password should be matched!")
        }
        
        delete data.confirmPassword
        delete data.email

        const body = {
            ...data,
            token
        }
        const response = await createUserAndJoinTeam(body);
        if (!response) return;
        toast.success("You have successfully joined the team");
        if (typeof window !== "undefined") {
            const url = `${window.location.origin}/login`
            window.open(url);
        }
    }

    if (!teamData) {
        return (
            <Box className="flex flex-col items-center w-full gap-4">
                <Typography className='text-[1.25rem] font-semibold text-commerceBlack'>
                    Something went wrong!
                </Typography>
            </Box>
        )
    }

    return (
        <Box className="flex flex-col items-center w-full gap-4" component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box className="mt-10">
                <Typography className='text-[1.25rem] font-semibold text-commerceBlack'>
                    {`You'r Invited in a team ${teamData?.name} of an organization ${teamData?.organization?.name}`}
                </Typography>
            </Box>
            <Box className="flex flex-col w-6/12 gap-3">
                <CustomFieldMapper
                    formFields={formFields}
                    formData={{}}
                    register={register}
                    errors={errors}
                />
            </Box>
            <Box>
                <CustomButton title='Join' type='submit' />
            </Box>
        </Box>
    )
}

export default CreateUserForm;