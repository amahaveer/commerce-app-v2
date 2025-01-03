'use client'

import CustomButton from '@/components/atoms/Button';
import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getTeamsColumns } from './columns';
import AddOrganization from '@/components/organisms/accounts/organization/addOrganization';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import IconTextLink from '@/components/atoms/IconTextLink';
import { List } from '@mui/icons-material';
import { createTeam, getTeamsByOrganizationId } from 'app/api/team.api';
import CreateNewTeam from '@/components/organisms/accounts/teams/addTeam';
import { toast } from 'react-toastify';

const TeamsPage = ({ params }: any) => {

	const { organizationId } = params;
	const [open, setOpen] = useState(false);
	const [teams, setTeams] = useState([]);
	const { translate } = useTranslate();
    const router = useRouter();

	const columns = getTeamsColumns(translate)

	const initData = async () => {
		const data = await getTeamsByOrganizationId(organizationId);
		setTeams(data)
	}

	useEffect(() => {
		initData()
	}, [])

	const onSave = async (teamName: string) => {
		if (!teamName) return toast.error("Enter team name!");
		await createTeam(teamName, organizationId)
		setOpen(false)
		initData();
	}

    const onRowClick = (row: any) => {
        router.push(`teams/${row.id}`)
    }

	return (
		<Box className="px-8 ">
			<Box className="flex flex-col pb-6 border-b gap-2 pt-5">
				<Box className="flex flex-row  ">
					<Typography className='font-semibold text-[1.5rem] text-commerceBlack' >
						{`${translate("account.manageTeams")}`}
					</Typography>
					<CustomButton.Add
						className='ml-auto'
						title={translate("account.addTeam")}
						onClick={() => setOpen(true)}
					/>
				</Box>
				<Typography className='font-normal text-[1rem] text-commerceBlack'>
					{translate("account.selectTeamFromTheTableBelowToInviteMembersAndManagePermissions")}
				</Typography>
			</Box>

			<Box>
				<DataTable
					rows={teams}
					columns={columns}
					getRowId={(row) => row._id}
                    onRowClick={onRowClick}
				/>
			</Box>

			<CreateNewTeam open={open} setOpen={setOpen} onSave={onSave} />
		</Box>

	)
}

export default TeamsPage;