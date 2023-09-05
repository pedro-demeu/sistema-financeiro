import { Modal, Box, useTheme } from '@mui/material';
import React from 'react';


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
  const theme = useTheme();
  const handleClose = (): void => { setOpen(false); };
  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: theme.palette.info.main,
    border: `2px solid ${theme.palette.common.black}`,
    borderRadius: '25px',
    boxShadow: 24
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};
