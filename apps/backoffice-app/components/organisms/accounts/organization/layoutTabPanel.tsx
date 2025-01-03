'use client'
import IconTextLink from '@/components/atoms/IconTextLink';
import { Box, Typography, IconButton, Tabs, Tab, } from '@mui/material';
import ConnectApplicationPage from "app/(dashboard)/account/organizations/[organizationId]/connect/page";
import TeamsPage from "app/(dashboard)/account/organizations/[organizationId]/teams/page";
import useTranslate from 'hooks/useTranslate';
import { useEffect, useState } from 'react';
import { List } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


const OrganizationTabPanel = () => {

    const { translate } = useTranslate();
    const router = useRouter();
    const [value, setValue] = useState(0);

    const tabData: Array<any> = [
        {
            label: 'Teams',
            path: "teams",
            component: TeamsPage,
        },
        {
            label: 'Connect',
            path: "connect",
            component: ConnectApplicationPage,
        },
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathArray = window.location.pathname.split("/");
            const pathName = pathArray[pathArray.length - 1];
            const index = tabData.findIndex((item) => item.path === pathName);
            setValue(index);
        }
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`${tabData[newValue].path}`)
    };

    return (
        <Box className='mt-2 px-8'>
            <Box>
                <IconTextLink
                    text={translate("account.toOrganization")}
                    textClass='text-[0.875rem]'
                    icon={<List className='w-4 h-4' />}
                    onClick={() => router.push('/account/organizations')}
                />
            </Box>
            <Box className={`flex flex-row relative border-b border-gray-300 mt-4`}>
                <Tabs className='' value={value} onChange={handleChange} aria-label="global tabs">
                    {tabData.map((tab, index) => (
                        <Tab className='font-inter text-[1.125rem] normal-case text-commerceBlack' label={tab.label} key={index} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    )
}
export default OrganizationTabPanel;