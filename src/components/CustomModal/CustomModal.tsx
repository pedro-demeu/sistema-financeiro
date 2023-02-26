import { Modal, Box } from '@mui/material';
import React from 'react';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#3A3844',
  border: '2px solid #000',
  borderRadius: '25px',
  boxShadow: 24
};
interface CustomModalProps {
  children: React.ReactNode
  open: boolean
  setOpen: (value: boolean) => void
}
export const CustomModal: React.FC<CustomModalProps> = ({
  children,
  open = false,
  setOpen
}) => {
  const handleClose = (): void => { setOpen(false); };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};
