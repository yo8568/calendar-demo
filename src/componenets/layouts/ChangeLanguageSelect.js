import React from 'react'
import { Select } from 'element-react'
import { useTranslation } from 'react-i18next'

const languages = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'zh-TW' }
]

function ChangeLanguageSelect (props) {
  const { i18n, t } = useTranslation()

  return (
    <Select value={i18n.language} placeholder={t('languages')} onChange={(option) => i18n.changeLanguage(option)}>
    {languages.map(el => {
      return <Select.Option key={el.value} label={el.label} value={el.value} />
    })}
    </Select>
  )
}

export default ChangeLanguageSelect
