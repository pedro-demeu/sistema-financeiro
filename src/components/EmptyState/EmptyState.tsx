import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';

interface EmptyStateProps {
  title: string
  description: string
  onClick: () => void
  mt?: string | number
}
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  onClick,
  description,
  mt
}) => {
  const theme = useTheme();
  
  return (
    <Box width="500px" padding="2rem" marginTop={mt}>
      <Typography
        component="h1"
        color="white"
        fontSize="1.7rem"
        marginBottom={4}
        fontWeight="bold"
        align="center"
      >
        {title}
      </Typography>
      <Typography component="p" align="center" color="white">
        {description}
      </Typography>
      <Box display="flex" marginTop="2rem" justifyContent="center" width="100%">
        <Box
          sx={{
            borderBottom: `2px solid ${theme.palette.warning.main}`
          }}
        >
          <Button onClick={onClick}>
            <PaidIcon fontSize="large" sx={{ color: `${theme.palette.warning.main}` }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
