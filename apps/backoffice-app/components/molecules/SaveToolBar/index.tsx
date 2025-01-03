import React from 'react';
import { Box } from '@mui/material';
import { eToolbarButtonActions, ISaveToolbarProps } from './type';
import CustomButton from '../../atoms/Button';

const SaveToolbar = (props: ISaveToolbarProps) => {

  const { isVisible, showBack, showNext, showSave, onClickAction } = props;
  const { BACK, NEXT, SAVE, CANCEL } = eToolbarButtonActions;
  
  return (
    <Box className={`rounded-t-md fixed bottom-0 left-0 right-0 flex justify-between p-2.5 bg-deepIndigo 
      shadow-[0px_-2px_5px_rgba(0,0,0,0.1)] w-[85%] ml-[100px] z-[1000] 
      transition-transform duration-300 ease-in-out px-5
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <Box className="flex flex-1 justify-start">
          <CustomButton type='button' className='bg-white normal-case' title='Cancel' onClick={() => onClickAction(CANCEL)} />
      </Box>
      <Box className="flex flex-1 justify-end" gap={1}>
        {showBack && 
          <CustomButton type='button' className='bg-white normal-case' title='Back' onClick={() => onClickAction(BACK)} />
        }
        {showNext &&
          <CustomButton type='submit' className='bg-primary-common text-white normal-case ' title='Next' onClick={() => onClickAction(NEXT)} />
        }
        {showSave && 
          <CustomButton type='submit' className='bg-primary-common text-white normal-case' title='Save' onClick={() => onClickAction(SAVE)} />
        }
      </Box>
    </Box>
  );
};

export default SaveToolbar;
