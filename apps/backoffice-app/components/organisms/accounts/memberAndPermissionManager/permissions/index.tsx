import AccordianUnControlled from '@/components/atoms/Accordian';
import SelectDropdown from '@/components/atoms/SelectDropdown';
import { eProductPermissions, productPermissionLabels } from '@/shared-types/permissions/productPermissions.type';
import { IProjectPermissionData } from '@/shared-types/permissions';
import { Box, IconButton, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import Checkbox from '@mui/material/Checkbox';
import { eOrderPermissions, orderPermissionLabels } from '@/shared-types/permissions/orderPermissions.type';
import { IMemberAndPermissionManagerProps } from '../type';
import React, { useEffect, useState } from 'react';
import { getProjectsByOrganizationId } from 'app/api/project.api';
import { getPermissionsByTeamId, updatePermission } from 'app/api/permissions.api';
import ProductPermissions from './product';
import CustomButton from '@/components/atoms/Button';
import { toast } from 'react-toastify';
import OrderPermissions from './order';
import CustomerPermissions from './customer';


const TeamPermissions = (props: IMemberAndPermissionManagerProps) => {

    const { teamId, organizationId, role } = props;
    const { translate } = useTranslate();
    const [projects, setProjects] = useState<Array<any>>([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [projectPermissions, setProjectPermissions] = useState<IProjectPermissionData | any>(null)
    const [productPermissionList, setProductPermissionsList] = useState<string[]>([]);
    const [orderPermissionList, setOrderPermissionsList] = useState<string[]>([]);
    const [customerPermissionList, setCustomerPermissionsList] = useState<string[]>([]);
    const [enableSaveBtn, setEnableSaveBtn] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const initData = async () => {
        const data = await getProjectsByOrganizationId(organizationId)
        setProjects(data);
    }

    const getPermissions = async (projectId: string = '') => {
        if (!projectId) {
            projectId = (projects.find(item => item.name === selectedProject))._id
            console.log("project id", projectId)
        }
        const data = await getPermissionsByTeamId(teamId, projectId);
        if (!data) return;
        setProjectPermissions({
            ...data,
            orders: data.orders || [],
            customers: data.customers || [],
            products: data.products || [],
        });
        setProductPermissionsList(data.products);
        setOrderPermissionsList(data.orders);
    }

    const onProjectSelection = async (value: string) => {
        setSelectedProject(projects.find(item => item._id === value)?.name)
        getPermissions(value)
    }

    useEffect(() => {
        if (!selectedProject) return;
        const isPermissionChanged =
            productPermissionList.length !== projectPermissions?.products?.length ||
            orderPermissionList.length !== projectPermissions?.orders?.length
        if (!enableSaveBtn && isPermissionChanged) {
            setEnableSaveBtn(true);
        }
        if (enableSaveBtn && !isPermissionChanged) {
            setEnableSaveBtn(false)
        }
    }, [productPermissionList.length, orderPermissionList.length, projectPermissions])

    useEffect(() => {
        initData()
    }, [])

    const onSavePermission = async () => {
        const body = {
            products: productPermissionList,
            orders: orderPermissionList,
            customers: customerPermissionList,
            _id: projectPermissions._id,
        }
        const result = await updatePermission(body)
        if (result) {
            toast.success("Permission updated")
        }
        getPermissions()
        setEnableSaveBtn(false)
    }

    if (role === 'Administrators') {
        return (
            <Box className="px-8 pt-6 flex flex-col gap-3 h-[60vh] overflow-y-auto">
                <Typography>{translate("account.permissionsForTeamAdministratorsCannotEdited")}</Typography>
            </Box>
        )

    }

    return (
        <Box className="px-8 pt-6 flex flex-col gap-3 h-[60vh] overflow-y-auto">
            <Box className="flex flex-row gap-2 items-center">
                <Typography>{translate("account.selectProject")}</Typography>
                <SelectDropdown
                    className='w-[30rem]'
                    options={projects}
                    labelAlias='name'
                    valueAlias='_id'
                    defaultValue={selectedProject}
                    onSelect={onProjectSelection}
                    placeholder={translate("account.selectTheProject")}
                />
                <Box className="flex ml-auto" gap={1}>
                    <CustomButton disabled={!enableSaveBtn} type='button' title={translate("common.reset")} />
                    <CustomButton
                        disabled={!enableSaveBtn}
                        type='submit'
                        className='text-white'
                        title={translate("common.save")}
                        variant='contained'
                        onClick={onSavePermission}
                    />
                </Box>
            </Box>

            {!selectedProject &&
                <Typography className='mt-5'>{translate("account.noProjectSelected")}</Typography>
            }

            {selectedProject &&
                <React.Fragment>
                    <ProductPermissions
                        projectPermissions={projectPermissions?.products || []}
                        selectedPermissions={productPermissionList}
                        setSelectedPermissions={setProductPermissionsList}
                    />

                    <OrderPermissions
                        projectPermissions={projectPermissions?.orders || []}
                        selectedPermissions={orderPermissionList}
                        setSelectedPermissions={setOrderPermissionsList}
                    />

                    <CustomerPermissions
                        projectPermissions={projectPermissions?.customers || []}
                        selectedPermissions={customerPermissionList}
                        setSelectedPermissions={setCustomerPermissionsList}
                    />
                </React.Fragment>
            }
        </Box>

    )
}

export default TeamPermissions;