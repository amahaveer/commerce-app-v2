"use client"
import { Box, IconButton, Typography } from '@mui/material';
import { getMemberByTeamId, inviteMemberInTeam } from 'app/api/teamMember';
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IMemberAndPermissionManagerProps } from '../type';
import CustomButton from '@/components/atoms/Button';
import InviteMember from './inviteMember';
import { toast } from 'react-toastify';

const TeamMembers = (props: IMemberAndPermissionManagerProps) => {

    const { teamId, organizationId } = props;
    const { translate } = useTranslate();
    const [members, setMembers] = useState([]);
    const [openInviteModal, setOpenInviteModal] = useState(false);

    const initData = async () => {
        const data = await getMemberByTeamId(teamId);
        setMembers(data);
    }

    const onInviteMember = async (email: string) => {
        if (!email) return toast.error("Email is required!");
        const payload = {
            orgId: organizationId,
            teamId: teamId,
            email
        }
        const data = await inviteMemberInTeam(payload);
        if (!data) return;
        initData()
        setOpenInviteModal(false);
        toast.success(data.msg);
        if (typeof window !== "undefined" && data.token) {
            const url = `${window.location.origin}/invite-member/${data.token}`
            window.open(url, "_blank");
        }
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        <Box className="flex flex-col px-4 pt-4">
            <Box className="flex flex-row items-center justify-between px-10">
                <Typography className='text-[1.125rem] font-medium text-commerceBlack'>
                    {`${translate("account.members")} (${members.length})`}
                </Typography>
                <CustomButton.Add title={translate("account.inviteMember")} onClick={() => setOpenInviteModal(true)} />
            </Box>

            <Box className="mt-6 flex flex-row flex-wrap gap-4">
                {members.map((item: any, index) => (
                    <Box key={index} className="w-[38rem] border-b p-2 pb-4">
                        <Box className="flex flex-row items-center gap-4">
                            <Avatar className='text-[#624fd8] bg-[#beb3ff]'>
                                {`${item.user.firstName[0]}${item.user.lastName[0]}`}
                            </Avatar>
                            <Box className="flex flex-col gap-0">
                                <Typography className='text-[1rem] font-semibold text-commerceBlack'>
                                    {`${item.user.firstName} ${item.user.lastName}`}
                                </Typography>
                                <Typography className='text-[1rem] text-commerceBlack'>{item.user.email}</Typography>
                            </Box>
                            <IconButton className='ml-auto' disabled>
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))}

            </Box>

            <InviteMember 
                open={openInviteModal} 
                setOpen={setOpenInviteModal} 
                onSave={onInviteMember} 
                members={members}
            />
        </Box>
    )
}

export default TeamMembers;