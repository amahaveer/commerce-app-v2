import { Box, IconButton, Typography } from '@mui/material';
import { tabConfigurations } from './tabDef';
import { usePermissions } from 'context/permissions.context';
import useTranslate from 'hooks/useTranslate';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TabsComponent from '@/components/atoms/tabs';
import { IMemberAndPermissionManagerProps } from './type';
import { useEffect, useState } from 'react';
import { getTeamById } from 'app/api/team.api';


const MemberAndPermissionManager = (props: IMemberAndPermissionManagerProps) => {

	const { teamId, organizationId } = props;
	const { hasPermission } = usePermissions();
	const { translate } = useTranslate();
	const [teamInfo, setTeamInfo] = useState<any>(null);

	const initData = async () => {
		const data = await getTeamById(teamId);
		if (!data) return;
		setTeamInfo(data);
	}
	useEffect(() => {
		initData();
	}, [teamId, organizationId])

	const tabsData = tabConfigurations
		.filter(tab => !tab.permission || hasPermission(tab.permission))
		.map(tab => ({
			label: translate(tab.label), 
			path: tab.path,
			content: <tab.component teamId={teamId} organizationId={organizationId} role={teamInfo?.role} />,
		}));

	const getTabsChildren = (): React.ReactNode => {
		return (
			<Box className="ml-auto pr-4 flex flex-row pb-2">
				<Box className="border-l ml-2">
					<IconButton>
						<DeleteOutlinedIcon />
					</IconButton>
				</Box>

			</Box>
		)
	}


	return (
		<Box className="flex flex-col gap-4">
			<Box className="mt-2">
				<Typography className='text-[1.5rem] font-semibold'>
					{`Team ${teamInfo?.organization?.name} in the Organization ${teamInfo?.name}`}
				</Typography>
			</Box>

			<Box>
				<TabsComponent
					tabs={tabsData}
					tabsWrapperClass='px-6'
					contentClass='h-[65vh] overflow-y-auto'
				  	tabsChildren={getTabsChildren()}
				/>
			</Box>
		</Box>
	)
}

export default MemberAndPermissionManager;