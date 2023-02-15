import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 4,
};


function LayoutPopup1() {
    
    const [open, setOpen] = useState(false);
    return (
        <Modal open={open}>
            <Box sx={style}>
            <Typography variant="h6" component="h2">
                팝업
            </Typography>
            <Typography sx={{ mt: 2 }}>
                팝업입니다.
            </Typography>
            </Box>
        </Modal>
    );
}

export { LayoutPopup1 }