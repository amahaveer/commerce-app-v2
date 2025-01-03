import { Box } from '@mui/material';
import AccountSelectionPanel from '@/components/organisms/accounts/accountSelectionPanel';
import OrganizationTabPanel from '@/components/organisms/accounts/organization/layoutTabPanel';
import IconTextLink from '@/components/atoms/IconTextLink';

const OrganizationPageLayout = ({ children, params }: any) => {

    return (
        <Box className="flex flex-col gap-4">
            <OrganizationTabPanel  />
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default OrganizationPageLayout;