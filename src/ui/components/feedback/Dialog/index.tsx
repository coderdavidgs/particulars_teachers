import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material'
import { Children, PropsWithChildren } from 'react';

interface DialogProps{
    isOpen?: boolean;
    onClose?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    title?: string;
}

export default function Dialog({isOpen = false, onClose, onCancel, onConfirm, title, children}: PropsWithChildren<DialogProps>){


    return(
        <MuiDialog open={isOpen} onClose={onClose}>
            <DialogTitle color={'primary'} fontSize={'small'} textAlign={'center'}>
                {title}
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                {onCancel && (
                    <Button variant='outlined' onClick={() => {onCancel}} sx={{ py:2, px: 3}}>Cancel</Button>
                )}

                <Button variant='contained' type='submit' fullWidth={onCancel == undefined} onClick={onConfirm}>Confirm</Button>
            </DialogActions>
        </MuiDialog>
    )
}