"use client"
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { PersonOutlineOutlined, FolderOpenOutlined } from '@mui/icons-material';
import BubbleChartIcon from '@/components/atoms/CustomIcons/bubbleChartIcon';
import { usePathname } from 'next/navigation';

const AccountSelectionPanel = () => {

	const pathname = usePathname();
	
	const tabData: Array<any> = [
		{ icon: PersonOutlineOutlined, label: 'My Profile', path: '/account/profile' },
		{ icon: FolderOpenOutlined, label: 'Projects', path: '/account/projects' },
		{ icon: BubbleChartIcon, label: 'Organizations & teams', path: '/account/organizations' },
	]

	const getHighlight = (item: any) => pathname.includes(item.path) && 'bg-customBlue-moderate text-white'

	return (
		<Box className="flex flex-row gap-4 shadow-custom-light h-[4.625rem] px-4 items-center">
			{tabData.map((item: any, index: number) => (
				<Link
					href={item.path}
					key={index}
					className={`flex flex-col items-center px-4 h-[100%] justify-center ${getHighlight(item)}`}
				>
					{<item.icon />}
					<Typography>{item.label}</Typography>
				</Link>
			))}
		</Box>
	)
}

export default AccountSelectionPanel;