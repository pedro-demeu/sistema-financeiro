import { deleteTransactionModalAtom, useTransaction } from '@/atoms/transactions';
import { FormPattern } from '@/components/FormPattern/FormPattern';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { t } from 'i18next';
import React from 'react';
import { useSetRecoilState } from 'recoil';

interface DeleteFormProps {
  name: string
  id: string
}
export const DeleteForm: React.FC<DeleteFormProps> = ({ name, id }) => {
  const setOpenDeleteModal = useSetRecoilState(deleteTransactionModalAtom);
  const handleClose = (): void => { setOpenDeleteModal(false); };
  const { deleteTransaction } = useTransaction();
  const theme = useTheme();
  
  const onSubmit = (transactionID: string) => {
    try {
      deleteTransaction(transactionID);
    } catch (e) {
      alert(`Error: ${e}`)
    }
  }

  const formik = useFormik({
    initialValues: {
      id: ''
    },
    onSubmit: () => {
      onSubmit(id);
      handleClose()
    }
  });
  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={t('forms_actions:exclude')}
      borderColor="#DE1F53"
    >
      <Typography sx={{ color: 'white' }}>
        {t('_common:delete_alert')}
      </Typography>
      <Box paddingTop="3rem" paddingBottom="5rem" width="100%">
        <Typography align="left" sx={{ color: 'white' }}>
          - {name}
        </Typography>
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          bgcolor: theme.palette.error.main,
          '&:hover': {
            bgcolor: theme.palette.error.dark
          }
        }}
      >
        {t('forms_actions:confirm')}
      </Button>
    </FormPattern>
  );
};

export default DeleteForm;
