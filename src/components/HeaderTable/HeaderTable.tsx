import React from 'react';
import { Box, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useRecoilState } from 'recoil';
import { transactionModalAtom } from '../../atoms/transactions';

export const HeaderTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    transactionModalAtom
  );
  const handleModalState = (): void => { setIsModalOpen(!isModalOpen); };

  return (
    <Box
      sx={{
        marginBottom: '1rem',
        borderBottom: '1px solid #6eca9f',
        paddingBottom: '0.5rem',
        display: 'flex',
        justifyContent: 'end'
      }}
    >
      <Button>
        <DownloadRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
      </Button>
      <Button onClick={handleModalState}>
        <AddCircleRoundedIcon fontSize="medium" sx={{ color: 'white' }} />
      </Button>
    </Box>
  );
};
