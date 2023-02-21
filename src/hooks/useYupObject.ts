import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default function useYupObject() {
  const { t } = useTranslation('forms');

  yup.setLocale({
    mixed: {
      required: t('mixed_required') as string,
      notType: t('mixed_notType') as string,
    },
    string: {
      email: t('string_email') as string,
      url: t('string_url') as string,
      max: ({ max }) => t('string_max', { max }),
    },
    number: {
      min: ({ min }) => t('number_min', { min }),
      moreThan: ({ more }) => t('number_moreThan', { more }),
      max: ({ max }) => t('number_max', { max }),
      integer: t('number_integer') as string,
      positive: t('number_positive') as string,
    },
  });

  return {
    ...yup,
    t
  };
}
