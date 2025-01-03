"use client"

import CustomButton from '@/components/atoms/Button';
import { Box, Typography, IconButton } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import Image from 'next/image';
import Apps from "./connectApp.json";
import { useEffect, useState } from 'react';
import AppDrawer from '@/components/atoms/AppDrawer';
import { eConnectedApp } from '@/shared-types/index';
import { IConnectAppList } from './type';
import CommercetoolConfiguration from '@/components/organisms/connectedApp/commercetool/configForm';
import SmtpConfiguration from '@/components/organisms/connectedApp/smtp/configForm';
import { getExtensionConfigByOrganization, uninstallExtensionApp } from 'app/api/extensionApp';
import IconTextLink from '@/components/atoms/IconTextLink';
import ManageExtensionApp from '@/components/organisms/connectedApp/manageExtensionApp';

const ConnectApplicationPage = ({params}: any) => {

    const { translate } = useTranslate();
    const [selectedApp, setSelectedApp] = useState<IConnectAppList | null>();
    const [installedConfigIds, setInstalledConfigIds] = useState<Array<any>>([]);
    const [manageApp, setManageApp] = useState<boolean>(false);

    const getFormComponent = () => {
        if (!selectedApp) return;
        if (selectedApp.key === eConnectedApp.COMMERCETOOL) {
            return <CommercetoolConfiguration organizationId={params.organizationId} selectedApp={selectedApp} />
        
        } else if (selectedApp.key === eConnectedApp.SMTP) {
            return <SmtpConfiguration organizationId={params.organizationId} selectedApp={selectedApp}/>
        }
    }

    const initData = async () => {
        const data: Array<any> = await getExtensionConfigByOrganization(params.organizationId);
        setInstalledConfigIds(data);
    }

    const isInstalled = (extensionKey: string) => {
        if (installedConfigIds.find((item) => item.key === extensionKey)) return true;
        return false;
    }

    const cardBtnTitle = (extensionKey: string) => {
        if (isInstalled(extensionKey)) return translate("common.uninstall");
        return translate("common.install");
    }

    const onInstallBtn = async (item: any) => {

        setSelectedApp(item);
    }

    useEffect(() => {
        initData();
    }, [])

    return (
        <Box className="flex flex-col px-16 gap-5">
            <Box className="flex flex-row justify-between">
                <Typography className='font-semibold text-[1.5rem] text-commerceBlack' >
                    {`${translate("account.discoverAllAvailableConnectors")}`}
                </Typography>
                <IconTextLink
                    text={`${translate("account.manageConnectors")}`}
                    onClick={() => setManageApp(true)}
                />
            </Box>
            <Box className="flex flex-row gap-6">
                {Apps.map((item, index) => (
                    <Box key={index} className="flex flex-col gap-2 w-[17.5rem] h-[21.62rem] border">
                        <Image width={232} height={34} alt="" src={item.logo} className='h-16 object-contain' />
                        <Typography className='px-4 text-[1rem] font-medium text-commerceBlack'>{item.title}</Typography>
                        <Typography className='px-4 text-customGray text-[0.875rem]'>{item.description}</Typography>
                        <Box className="flex flex-row justify-between mt-auto p-4">
                            <CustomButton
                                onClick={() => onInstallBtn(item)}
                                className='bg-primary-common text-white'
                                title={translate("common.install")}
                            />
                            <CustomButton className='border-none' title={translate("common.learnMore")} />
                        </Box>
                    </Box>
                ))}
            </Box>

            {selectedApp &&
                <AppDrawer open={!!selectedApp} onClose={() => setSelectedApp(null)} breadcrumb={[]}>
                    <>{getFormComponent()}</>
                </AppDrawer>
            }

            {manageApp && 
                <AppDrawer open={manageApp} onClose={() => setManageApp(false)} breadcrumb={[]}>
                    <ManageExtensionApp organizationId={params.organizationId}/>
                </AppDrawer>
            }

        </Box>
    )
}

export default ConnectApplicationPage;