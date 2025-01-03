import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { eSearchFields } from 'constants/search.constants';

interface AlertBasicDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function AlertBasicDialog({
  open,
  handleClose
}: AlertBasicDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <div className="p-6">
            <h1 className="text-2xl font-semibold">
              {eSearchFields.Dialoge_title}
            </h1>
            <hr className="my-4 border-gray-300" />
            <p className="mb-6">{eSearchFields.Dialoge_title_1}</p>

            <div className="mb-6">
              <h2 className="text-xl font-medium">
                {eSearchFields.Dialoge_title_2}
              </h2>
              <p className="mt-2 text-gray-700">
                {eSearchFields.Dialoge_Content}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium">
                {eSearchFields.Dialoge_title_3}
              </h2>
              <p className="mt-2 text-gray-700">{eSearchFields.Dialoge_Content_1}</p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>{/* Add dialog actions here if needed */}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
