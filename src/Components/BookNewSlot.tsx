import React, {useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from "@mui/x-date-pickers";


export const BookNewSlot: React.FC<{isOpen: boolean, handleClose: () => void, handleSave: (payload: SlotPayload) => void}> = ({isOpen, handleClose, handleSave}) => {

    const [name, setName] = useState<string>();
    const [start, setStart] = useState<string>();
    const [end, setEnd] = useState<string>();


    const save = () => {
        handleSave({name, start, end})
    }


    return (
        <Modal open={isOpen} onClose={handleClose}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h4" style={{border: 100, textAlign: "center"}}>
                    Réserver un créneau
                </Typography>
                <div style={{height: 30}} />
                <TextField id="outlined-basic" label="Nom" variant="outlined" value={name} onChange={e => setName(e.target.value)} style={{width: "50%"}} />
                <div style={{height: 10}} />
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <DatePicker value={start} onChange={e => setStart(e)} format="DD/MM/YYYY" label="Date de début"/>
                    <DatePicker value={end} onChange={e => setEnd(e)} format="DD/MM/YYYY" label="Date de fin"/>
                </div>
                <Button onClick={() => save()}>Enregistrer</Button>
            </Box>
            </LocalizationProvider>
        </Modal>
    );
};



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'background.paper',
    border: '0',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center"

};

export type SlotPayload = {
    name: string; start: string; end: string
};
