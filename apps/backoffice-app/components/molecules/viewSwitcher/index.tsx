"use client"

import { Box, IconButton } from '@mui/material';
import { SearchOutlined, CodeOutlined } from '@mui/icons-material';
import { eSwitchIcons, ISwitchViewerData, IViewSwitcherProps } from './type';
import { useState } from 'react';

const iconList: any = {
	[eSwitchIcons.SEARCH]: SearchOutlined,
	[eSwitchIcons.CODE]: CodeOutlined,
}

const ViewSwitcher = (props: IViewSwitcherProps) => {

	const { switchData, defaultSelected, onClick } = props;
	const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

	const getIcon = (iconType: string) => {
		const IconComponent = iconList[iconType];
		return <IconComponent />;
	}

	return (
		<Box className="flex border border-lavender-light rounded-[4px] h-[2.5rem]">
			{switchData.map((item: ISwitchViewerData, index: number) => (
				<IconButton
					key={index}
					className={`w-[3.6rem] rounded-l-[0px] rounded-r-[0px] p-0 px-4 text-primary-common   
											${selectedIndex === index && 'bg-lavender-white'}`}
					aria-label="Info"
					onClick={() => { setSelectedIndex(index); onClick(item) }}
				>
					{getIcon(item.icon)}
				</IconButton>
			))}
		</Box>
	)
}

export default ViewSwitcher;