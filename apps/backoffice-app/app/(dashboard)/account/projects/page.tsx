'use client'

import CustomButton from '@/components/atoms/Button';
import DataTable from '@/components/atoms/DataTable';
import { Box, Typography } from '@mui/material';
import useTranslate from 'hooks/useTranslate';
import { getProjectColumns } from './columns';
import { useEffect, useState } from 'react';
import AddProject from '@/components/organisms/accounts/projects/addProject';
import { createProject, getMyProjects } from 'app/api/project.api';

const ProjectsPage = () => {

    const [open, setOpen] = useState(false);
    const [projects, setProjects] = useState([])
    const { translate } = useTranslate();
    
    const columns = getProjectColumns(translate)

    const onCreateProject = async (selectedOrg: any, projectName: string) => {
        await createProject(selectedOrg._id, projectName);
        initData()
    }

    const initData = async () => {
        const data = await getMyProjects()
        setProjects(data);
    }
    

    useEffect(() => {
        initData();
    }, [])

    return (
        <Box className="p-8 ">
            <Box className="flex flex-col pb-6 border-b gap-2">
                <Box className="flex flex-row  ">
                    <Typography className='font-semibold text-[1.5rem] text-commerceBlack' >
                        {`${translate("account.manageProjects")}`}
                    </Typography>
                    <CustomButton.Add 
                        className='ml-auto' 
                        title={translate("account.createNewProject")} 
                        onClick={() => setOpen(true)}
                    />
                </Box>
                <Typography className='font-normal text-[1rem] text-commerceBlack'>
                    {translate("account.viewableProjectsLimitedToAdminTeam")}
                </Typography>
            </Box>

            <Box>
                <DataTable
                    rows={projects}
                    columns={columns}
                    getRowId={(row) => row._id}
                />
            </Box>

            <AddProject open={open} setOpen={setOpen} onCreateProject={onCreateProject} />
        </Box>

    )
}

export default ProjectsPage;