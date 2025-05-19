import { useState } from "preact/hooks";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MUIDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { JSX } from "preact/jsx-runtime";

type DialogProps = {
  triggerText: string;
  title: string;
  content: JSX.Element;
};

const CustomDialog = styled(MUIDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export default function Dialog({ triggerText, title, content }: DialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
      >
        {triggerText}
      </Button>
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2
          }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right:    8,
            top:      8,
            color:    theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {content}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
}