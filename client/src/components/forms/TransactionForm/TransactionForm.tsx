import React from 'react';
import {
  FormControl,
  Box,
  Button,
  useTheme,
  Link,
  InputLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import {
  type Transaction,
  transactionModalAtom,
  editTransactionModalAtom,
  RepeatType
} from '../../../atoms/transactions';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { FormPattern, SelectRepeat, SelectTags, SelectTypeFinantial } from '@/components/';
import { useYupObject } from '@/hooks';

interface TransactionFormProps {
  initialValues: Transaction
  onSubmit: (newTransaction: Transaction) => void
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const { t } = useTranslation();
  const yup = useYupObject();
  const setModalClose = useSetRecoilState(transactionModalAtom);
  const setEditModalClose = useSetRecoilState(editTransactionModalAtom);
  const theme = useTheme();
  const [showAdvancedOptions, setShowAdvancedOptions] = React.useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      name: yup.string().required().max(55),
      value: yup.number().required().positive(),
      type: yup.string().required(),
      isDone: yup.boolean(),
      expireIn: yup.date()
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      onSubmit({
        ...values,
        expireIn: values.expireIn
      });
      setSubmitting(false)
        ; (initialValues.id !== '') ? setEditModalClose(false) : setModalClose(false);
    },
    enableReinitialize: true
  });


  console.log(formik.values.expireIn);

  return (
    <FormPattern
      onSubmit={formik.handleSubmit}
      title={
        (initialValues.id !== '') ? t('_common:change_your_finances') : t('_common:create_your_finance')
      }
      borderColor={(initialValues.id !== '') ? theme.palette.warning.main : theme.palette.success.main}
    >
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <TextField
          label={t('columns:name')}
          autoComplete="off"
          fullWidth
          id="name"
          name="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          type="text"
          helperText={formik.touched.name && formik.errors.name}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <TextField
          label={t('columns:value')}
          fullWidth
          id="value"
          autoComplete="off"
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          error={formik.touched.value && Boolean(formik.errors.value)}
          onBlur={formik.handleBlur}
          type="number"
          helperText={formik.touched.value && formik.errors.value}
        />
      </FormControl>
      <FormControl
        sx={{
          display: 'block',
          marginBottom: '1rem'
        }}
      >
        <SelectTypeFinantial
          id="type"
          name="type"
          label={t('_common:select_type')}
          currentValue={formik.values.type}
          onChange={(event) => {
            formik.handleChange(event);
          }}
        />
      </FormControl>

      <FormControl>
        <Link
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          sx={{
            cursor: 'pointer'
          }}
        >
          {t(!showAdvancedOptions ? '_common:show_advanced_options' : '_common:hidden_advanced_options')}
        </Link>
      </FormControl>
      {showAdvancedOptions && (
        <Box mt={2}>
          <SelectTags
            id="tags"
            name="tags"
            values={formik.values.tags}
            handleChange={formik.handleChange}
          />

          <SelectRepeat
            value={formik.values.repeat as RepeatType}
            handleChange={formik.handleChange}
          />
          <InputLabel sx={{
            mb: 1,
            mt: 1
          }} htmlFor='expireIn'>{t('_common:expire_in')}</InputLabel>
          <FormControl fullWidth>
            <TextField
              id="expireIn"
              onChange={formik.handleChange}
              value={formik.values.expireIn}
              defaultValue=""
              name="expireIn"
              placeholder=''
              type="date"
              inputProps={{

              }}
            />
          </FormControl>

          <InputLabel sx={{ mt: 2 }}>{t('_common:mark_to_done_task')}</InputLabel>
          <FormControl fullWidth>
            <Box>
              <Switch
                checked={formik.values.isDone}
                onChange={formik.handleChange}
                name="isDone"
                id="isDone"
              />
            </Box>
          </FormControl>

        </Box>
      )}
      <Box display="flex" justifyContent="end" width="100%" marginTop="1rem">
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '100%',
            bgcolor: (initialValues.id !== '') ? theme.palette.warning.main : theme.palette.success.main,
            '&:hover': {
              bgcolor: (initialValues.id !== '') ? theme.palette.warning.dark : theme.palette.success.dark
            }
          }}
        >
          {(formik.values.id !== '') ? t('forms_actions:edit') : t('forms_actions:add')}
        </Button>
      </Box>
    </FormPattern>
  );
};