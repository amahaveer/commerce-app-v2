import ModalPopup from "@/components/atoms/ModalPopup";
import { Box, InputBase, Typography } from '@mui/material';
import { IAddOrganizationProps } from "../type";
import useTranslate from "hooks/useTranslate";
import PrefixInputBase from "@/components/atoms/PrefixInputBase";
import { useState } from "react";


const AddOrganization = (props: IAddOrganizationProps) => {

	const { open, setOpen, onSave } = props;
	const { translate } = useTranslate();

	const [organizationName, setOrganizationName] = useState("");

	return (
		<ModalPopup
			open={open}
			setOpen={setOpen}
			title={translate("account.createNewOrganization")}
			cancelBtn={true}
			submitBtn={{ label: translate("common.save"), onClick: () => onSave(organizationName) }}
		>
			<Box className="w-[40.125rem] flex flex-col gap-2 px-2">
				<Typography className="text-[0.875rem] text-commerceBlack">
					{translate("account.provideTheOrganizationWithName")}
				</Typography>
				<Typography className="mt-2 text-[0.875rem] text-commerceBlack font-medium">
					{translate("account.organizationName")}
					<span className="text-red-600"> *</span>
				</Typography>
				<PrefixInputBase prefix={null} onChange={setOrganizationName} />
			</Box>
		</ModalPopup>
	)
}

export default AddOrganization;