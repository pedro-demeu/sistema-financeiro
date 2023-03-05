import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { totalValueAtom } from '@/atoms/transactions';

interface FooterProps {
  inHomePage?: boolean; 
  userHaveTransactions?: boolean;
}
export const FooterBar: React.FC<FooterProps> = ({ inHomePage = false, userHaveTransactions = false }) => {
  const { t } = useTranslation();
  const healthFinantial = useRecoilValue(totalValueAtom);
  const theme = useTheme();

  const isPositive = healthFinantial > -1 ? true : false;

  if (!inHomePage || !userHaveTransactions) {
    return (
      <Box component="footer" display="flex" gap="1rem" justifyContent="center" mb={2}>
        <Typography color={theme.palette.common.white}>
          © Pedro Demeu - 2023
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="footer" display="flex" gap="1rem" justifyContent="center" mb={2}>
      <Typography color={isPositive ? theme.palette.success.main : theme.palette.error.main}>
        {
          isPositive ? t('_common:good_health_finantial') : t('_common:bad_health_finantial')
        }

      </Typography>
      {isPositive ? (<TagFacesIcon sx={{ color: theme.palette.success.main }} />) : (<SentimentVeryDissatisfiedIcon sx={{ color: theme.palette.error.main }} />)}
    </Box>
  );
};