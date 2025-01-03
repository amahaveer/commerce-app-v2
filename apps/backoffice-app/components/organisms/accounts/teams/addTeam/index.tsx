import ModalPopup from "@/components/atoms/ModalPopup";
import { Box, InputBase, Typography } from '@mui/material';
import { IAddTeamProps } from "../type";
import useTranslate from "hooks/useTranslate";
import PrefixInputBase from "@/components/atoms/PrefixInputBase";
import { useState } from "react";


const CreateNewTeam = (props: IAddTeamProps) => {

	const { open, setOpen, onSave } = props;
	const { translate } = useTranslate();

	const [teamName, setTeamName] = useState("");

	return (
		<ModalPopup
			open={open}
			setOpen={setOpen}
			title={translate("account.createNewTeam")}
			cancelBtn={true}
			submitBtn={{ label: translate("common.save"), onClick: () => onSave(teamName) }}
		>
			<Box className="w-[40.125rem] flex flex-col gap-2 px-2">
				<Typography className="mt-2 text-[0.875rem] text-commerceBlack font-medium">
					{translate("common.name")}
					<span className="text-red-600"> *</span>
				</Typography>
				<PrefixInputBase prefix={null} onChange={setTeamName} />
			</Box>
		</ModalPopup>
	)
}

export default CreateNewTeam;