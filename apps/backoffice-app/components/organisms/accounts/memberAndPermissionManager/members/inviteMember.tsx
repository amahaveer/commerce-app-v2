import ModalPopup from "@/components/atoms/ModalPopup";
import { Box, Typography } from '@mui/material';
import useTranslate from "hooks/useTranslate";
import PrefixInputBase from "@/components/atoms/PrefixInputBase";
import { useState } from "react";
import { IInviteMemberProps } from "./type";
import AutoCompleteDropdown from "@/components/atoms/AutoCompleteDropdown";


const InviteMember = (props: IInviteMemberProps) => {

	const { open, setOpen, onSave } = props;
	const { translate } = useTranslate();

	const [memberEmail, setMemberEmail] = useState("");


	return (
		<ModalPopup
			open={open}
			setOpen={setOpen}
			title={translate("account.inviteMembersToTheTeam")}
			cancelBtn={true}
			submitBtn={{ label: translate("common.save"), onClick: () => onSave(memberEmail) }}
		>
			<Box className="w-[40.125rem] flex flex-col gap-2 px-2">
				<Typography className="text-[0.875rem] text-commerceBlack">
					{`${translate("account.addExistingMemberOfTheOrganization")} 
					test_empty2 
					${translate("account.inviteNewMemberByEnteringEmailAddresstheNewMemberInheritsTeamPermissions")}`}
				</Typography>
				<Typography className="mt-2 text-[0.875rem] text-commerceBlack font-medium">
					{translate("account.searchForAMember")}
					<span className="text-red-600"> *</span>
				</Typography>
				<PrefixInputBase
					prefix={null}
					onChange={(value) => setMemberEmail(value)}
				/>
			</Box>
		</ModalPopup>
	)
}

export default InviteMember;