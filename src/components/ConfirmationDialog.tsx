import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

type Props = {
  dialogContent: string,
  dialogTitle: string,
  id: string,
  setId: any,
  deletion: any,
  isAgree: boolean, 
  setIsAgree: any

}
export const ConfirmationDialog: React.FC<Props> = ({ dialogContent, dialogTitle, id, setId, deletion, isAgree, setIsAgree }) => {
  function handleDisagree(): void {
    setIsAgree(false);
    setId('');
  }
  async function handleAgree(): Promise<void> {
    deletion(id)
    setId('');
  }

  return <div>
    <Dialog
      open={isAgree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
  </div>
}
export default ConfirmationDialog;