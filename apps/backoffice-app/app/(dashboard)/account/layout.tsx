import { Box } from '@mui/material';
import AccountSelectionPanel from '@/components/organisms/accounts/accountSelectionPanel';

const AccountPageLayout = ({ children, params }: any) => {

    return (
        <Box className="flex flex-col gap-4">
            <AccountSelectionPanel/>
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default AccountPageLayout;