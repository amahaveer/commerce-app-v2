import DataTable from '@/components/atoms/DataTable';
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getManageConnectorColumns } from './columns';
import { useEffect, useState } from 'react';
import { getExtensionConfigByOrganization, uninstallExtensionApp } from 'app/api/extensionApp';

interface IManageConnectorProps {
    organizationId: string;
}

const ManageExtensionApp = (props: IManageConnectorProps) => {

    const { translate } = useTranslate();
    const { organizationId } = props;
    const [connectors, setConnectors] = useState([]);

    const onUninstall = async (row: any) => {
       await uninstallExtensionApp(row._id)
       initData()
    }

    const initData = async () => {
        const data = await getExtensionConfigByOrganization(organizationId);
        setConnectors(data);
    }

    useEffect(() => {
        initData()
    }, [])

    const payload = {
        onUninstall
    }
    const columns = getManageConnectorColumns(payload)

    return (
        <Box className="flex flex-col px-8 pb-8 gap-5" >
            <Box className="flex flex-col border-b pb-4 mt-5">
                <Box className="flex flex-row justify-between items-center">
                    <Typography className='text-[1.5rem] leading-[2.125rem] font-semibold'>
                        {translate("account.manageConnectors")}
                    </Typography>
                </Box>
            </Box>

            <Box className="h-[66vh] overflow-auto">
                <Box>
                    <DataTable
                        rows={connectors}
                        columns={columns}
                        getRowId={(row) => row._id}
                    />
                </Box>

            </Box>

        </Box>
    )
}

export default ManageExtensionApp;