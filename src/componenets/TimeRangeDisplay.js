import React from 'react'
import PropTypes from 'prop-types'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import countries from 'i18n-iso-countries'
import moment from 'moment'

const useStyles = createUseStyles({
  root: {
   dispaly: 'flex',
  },
  buttonGroup: {
    display: 'flex'
  },
  button: {},
  sup: {
    marginTop: 4,
    marginRight: 1
  },
  dateRange: {
    marginTop: 4
  },
  timezone: {
    fontSize: 'small',
  },
  '@media screen and (max-width: 900px)': {
    timezone: {
      width: 150,
      fontSize: 'xx-small',
    }
  }
})


function TimeRangeDisplay (props) {
  const classes = useStyles()
  const { countryCode, dateRange } = props
  const { i18n, t } = useTranslation()
  const countryLan = i18n.language.includes('zh') ? 'zh' : 'en'
  const timezoneText = `${countryCode ? countries.getName(countryCode, countryLan) : 'None'} (GMT${moment().format('Z')})`
  return (
    <React.Fragment>
      <span className={classes.dateRange}>{dateRange}</span>
      <span style={{ flex: 1 }} />
      <span className={classes.timezone}><sup className={classes.sup}>*</sup>{t('all_the_timings_listed_are_in_your_timezone', { timezone: timezoneText })}</span>
    </React.Fragment>
  )
}

TimeRangeDisplay.propTypes = {
  countryCode: PropTypes.string,
  dateRange: PropTypes.string,
}

TimeRangeDisplay.defaultProps = {
  countryCode: '',
  dateRange: '',
}

export default TimeRangeDisplay
