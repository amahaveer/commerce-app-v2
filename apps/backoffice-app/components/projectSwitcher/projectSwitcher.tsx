'use client'
import React, { useState } from 'react';
import SelectDropdown from '../atoms/SelectDropdown';
import { useAppContext } from 'context/application.context';

const ProjectSwitcher = () => {

  const { projectList, selectedProject, setSelectedProject } = useAppContext()
  if (!projectList || !projectList.length) return;

  const handleChange = (id: string) => {
    const name: any = projectList.find((item) => item._id === id)?.name
    setSelectedProject(name);
  };
  
  return (
    <SelectDropdown 
      options={projectList} 
      onSelect={handleChange}
      defaultValue={selectedProject}
      valueAlias='_id'
      labelAlias='name'
      sx={{
        background: 'white',
        border: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid blue'
        }
      }}
    />
  )
}


export default ProjectSwitcher;
