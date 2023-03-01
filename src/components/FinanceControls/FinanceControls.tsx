import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { totalValueAtom } from '@/atoms/transactions';
const GreenText = styled(Typography)({
  color: "#4affab",
});

const RedText = styled(Typography)({
  color: "#DE1F53",
});

const BlackText = styled(Typography)({
  color: "#F6D325",
});

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

  const setTotalValueAtom = useSetRecoilState(totalValueAtom)

  React.useEffect(() => {
    setTotalValueAtom(total);
  }, [total])
  return (
    <Box sx={{ display: "flex", width: '100%', justifyContent: 'center' }} gap="6rem" mt={10}>
      <Paper sx={{ p: 2, bgcolor: '#363440', width: '270px' }} >
        <GreenText variant="h6" mb={2} textTransform="uppercase">
          {t('_common:total_income')}
        </GreenText>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: "#4affab" }} />
          <Typography variant="h6" component="span">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalIncome)}
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, bgcolor: '#363440', width: '270px' }} >
        <RedText variant="h6" mb={2} textTransform="uppercase">
          {t('_common:total_spending')}
        </RedText>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: '#DE1F53' }} />
          <Typography variant="h6" component="span">
            {Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalSpending)}
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, bgcolor: '#363440', width: '270px' }} >
        <BlackText variant="h6" mb={2} textTransform="uppercase">
          {t('_common:total')}
        </BlackText>
        <Box sx={{ display: "flex", alignItems: "center" }} gap="0.5rem">
          <MonetizationOnIcon sx={{ color: '#F6D325' }} />
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
