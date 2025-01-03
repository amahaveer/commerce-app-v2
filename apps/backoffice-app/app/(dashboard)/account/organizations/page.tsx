'use client'

import CustomButton from '@/components/atoms/Button';
import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getOrganizationListColumns } from './columns';
import AddOrganization from '@/components/organisms/accounts/organization/addOrganization';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { createOrganizations, getUserOrganizations } from 'app/api/organization.api';
import { toast } from 'react-toastify';

const ManageOrganizations = () => {

	const [open, setOpen] = useState(false);
	const [organizations, setOrganizations] = useState([]);
	const { translate } = useTranslate();
	const router = useRouter();

	const columns = getOrganizationListColumns(translate)

	const initData = async () => {
		const data = await getUserOrganizations();
		setOrganizations(data)
	}

	useEffect(() => {
		initData()
	}, [])

	const onRowClick = (row: any) => {
		router.push(`organizations/${row.id}/teams`)
	}

	const onSave = async (organizationName: string) => {
		if (!organizationName) return toast.error("Enter organization name!")
		await createOrganizations(organizationName);
		initData()
		setOpen(false);
	}

	return (
		<Box className="p-8 ">
			<Box className="flex flex-col pb-6 border-b gap-2">
				<Box className="flex flex-row  ">
					<Typography className='font-semibold text-[1.5rem] text-commerceBlack' >
						{`${translate("account.manageOrganizations")}`}
					</Typography>
					<CustomButton.Add
						className='ml-auto'
						title={translate("account.addOrganization")}
						onClick={() => setOpen(true)}
					/>
				</Box>
				<Typography className='font-normal text-[1rem] text-commerceBlack'>
					{translate("account.selectOrganizationToManageTeamsInfo")}
				</Typography>
				<Typography className='font-normal text-[1rem] text-commerceBlack'>
					{translate("account.onlySeeOrganizationInWhichYouAreMemberOfAdminTeam")}
				</Typography>
			</Box>

			<Box>
				<DataTable
					rows={organizations}
					columns={columns}
					getRowId={(row) => row._id}
					onRowClick={onRowClick}
				/>
			</Box>

			<AddOrganization open={open} setOpen={setOpen} onSave={onSave} />
		</Box>

	)
}

export default ManageOrganizations;