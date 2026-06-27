import { useTranslations } from 'next-intl';
import { use } from 'react';

export default function Home({ params }) {
  const { locale } = use(params);

  const t = useTranslations();

  return <div>{t('greeting')}</div>;
}

