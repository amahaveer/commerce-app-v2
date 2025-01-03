import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ICustomModal } from './type';
import CustomButton from '../Button';
import { Box } from '@mui/material';
import useTranslate from 'hooks/useTranslate';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalPopup(props: ICustomModal) {

  const { open, children, title, setOpen, submitBtn, cancelBtn, backBtn, onClickBack } = props;
  const { translate } = useTranslate();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={'lg'}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className='border-t'>
        {children}
      </DialogContent>
      <DialogActions>
        <Box className="flex" gap={1}>
          {cancelBtn &&
            <CustomButton
              type='button'
              title={translate("common.cancel")}
              onClick={() => setOpen(false)}
            />
          }

          {backBtn &&
            <CustomButton
              type='button'
              title={translate("common.back")}
              onClick={onClickBack}
            />
          }

          {submitBtn &&
            <CustomButton
              type='submit'
              className='text-white'
              title={submitBtn?.label}
              variant='contained'
              onClick={submitBtn?.onClick}
            />
          }

        </Box>
      </DialogActions>
    </BootstrapDialog>
  );
}
