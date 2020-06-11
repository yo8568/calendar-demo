// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'element-react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import clsx from 'clsx'

const availableColor = '#02cab9'

const useStyles = createUseStyles({
  root: {
    marginTop: 10,
    padding: 5,
    width: '100%',
    overflow: 'auto',
    transition: 'width 2s ease-out 2s',
    height: 350
  },
  column: {
    padding: 5,
    paddingTop: 10,
    margin: 5,
    textAlign: 'center',
    borderTop: `3px solid ${availableColor}`
  },
  available: {
    color: availableColor
  },
  booked: {
    color: 'gray'
  },
  weekday: {
    fontSize: 'medium',
    padding: 3
  },
  date: {
    fontSize: 'medium',
    padding: 3
  },
  dateList: {
    fontSize: 'smaller',
    padding: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  disabled: {
    color: 'lightgray',
    borderTop: '3px solid lightgray'
  },
  hour: {
    height: 25
  }
})


/**
 * Generate the all hours of certain day that would be devided by 30 mins.
 * @param {Object} moment date - certain day
 * @returns {Array} result - moment object array
 */
const generateAllTimeOfDate = (date) => {
  let start = moment(date).hour(0)
  let results = []
  while (start <= moment(date).endOf('day')) {
    results = results.concat(moment(start))
    start = start.add(30, 'minutes')
  }
  return results
}


function ＷeekCalendar (props) {
  const classes = useStyles()
  const { i18n } = useTranslation()

  moment.locale(String(i18n.language).toLocaleLowerCase())

  let weekdates = []
  let start = moment(props.startDate)
  let end = moment(props.endDate)

  if (end.diff(start, 'days') <= 7) {
    while (start <= end) {
      weekdates = weekdates.concat(moment(start))
      start = start.add(1, 'days')
    }
  }

  const allTimeOfDate = (() => {
    return weekdates.map(date => {
      return { [date.format('YYYY-MM-DD')]: generateAllTimeOfDate(date) }
    }).reduce((result, item) => ({ ...result, ...item }), {})
  })()


  return (
    <Layout.Row type="flex" gutter="10" justify="space-between" className={classes.root}>
      {weekdates.map(weekdate => {
        // list all time of certain date
        const allTime = allTimeOfDate[weekdate.format('YYYY-MM-DD')]
        // get available range time of certain date
        const availableRangeOfweekdate = props.availableTime.filter(time => moment(time.start).date() === weekdate.date())
        // get booked range time of certain date
        const bookedRangeOfweekdate = props.bookedTimes.filter(time => moment(time.start).date() === weekdate.date())
        // get available time of certain date
        const availableTime = allTime.filter(time => {
          return availableRangeOfweekdate.some(range => moment() < moment(time) && moment(time) >= moment(range.start) && moment(time) <= moment(range.end))
        })
        // get booked time of certain date
        const bookedTimes = availableTime.filter(time => {
          return bookedRangeOfweekdate.some(range => moment(time) >= moment(range.start) && moment(time) <= moment(range.end))
        })

        const isDisalbed = weekdate.endOf('date') < moment()
        return (
          <Layout.Col className={clsx(classes.column, isDisalbed && classes.disabled)} key={String(weekdate)}>
            <div className={classes.weekday}>{weekdate.format('ddd')}</div>
            <div className={classes.date}>{weekdate.format('D')}</div>
            <div className={classes.dateList}>
              {availableTime.map(time => {
                return (
                  <span
                    key={`${time.format('YYYY_MM_DD_HH_mm')}`}
                    className={clsx(classes.hour, classes.available, bookedTimes.indexOf(time) > -1 && classes.booked)}
                    >
                      {time.format('HH:mm')}
                    </span>
                  )
              })}
            </div>
          </Layout.Col>
        )
      })}
    </Layout.Row>
  )
}

ＷeekCalendar.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  availableTime: PropTypes.array,
  bookedTimes: PropTypes.array,
}

ＷeekCalendar.defaultProps = {
  startDate: moment().startOf('week').toString(),
  endDate: moment().endOf('week').toString(),
  availableTime: [],
  bookedTimes: []
}

export default ＷeekCalendar
