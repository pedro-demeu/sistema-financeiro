import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { totalValueAtom } from '@/atoms/transactions';

interface MyComponentProps {
  totalIncome: number;
  totalSpending: number;
  total: number;
}

export const FinanceControls: React.FC<MyComponentProps> = ({
  totalIncome,
  totalSpending,
  total,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const setTotalValueAtom = useSetRecoilState(totalValueAtom);

  React.useEffect(() => {
    setTotalValueAtom(total);
  }, [total]);
  return (
    <Box sx={{ display: "flex", width: '100%', justifyContent: 'center' }} gap="6rem" mt={10}>
      <Paper sx={{ p: 2, bgcolor: theme.palette.info.main, width: '270px' }} >
        <Typography variant="h6" mb={2} textTransform="uppercase" color={theme.palette.success.main}>
          {t('_common:total_income')}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: theme.palette.success.main }} />
          <Typography variant="h6" component="span">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalIncome)}
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, bgcolor: theme.palette.info.main, width: '270px' }} >
        <Typography variant="h6" mb={2} textTransform="uppercase" color={theme.palette.error.main}>
          {t('_common:total_spending')}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: theme.palette.error.main }} />
          <Typography variant="h6" component="span">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalSpending)}
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, bgcolor: theme.palette.info.main, width: '270px' }} >
        <Typography variant="h6" mb={2} textTransform="uppercase" color={theme.palette.warning.main}>
          {t('_common:total')}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: theme.palette.warning.main }} />
          <Typography variant="h6" component="span">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(total)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
