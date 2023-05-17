import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
  content: string,
  title: string,
  open: boolean, 
  onCloseFn: (isAgree: boolean) => void;

}
export const ConfirmationDialog: React.FC<Props> = ({ content, title, open, onCloseFn }) => {

  async function handleClose(isAgree: boolean) {
    onCloseFn(isAgree);
  }

  return <Box>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Disagree</Button>
        <Button onClick={() => handleClose(true)} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
  </Box>
}
export default ConfirmationDialog;