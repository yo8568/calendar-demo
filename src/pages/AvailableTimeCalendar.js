import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../store/action'
import { Layout } from 'element-react'
import WeekPickerButtonGroup from '../componenets/WeekPickerButtonGroup'
import ＷeekCalendar from '../componenets/ＷeekCalendar'
import TimeRangeDisplay from '../componenets/TimeRangeDisplay'
import AppWrapper from '../componenets/layouts/AppWrapper'

function AvailableTimeCalendar (props) {
  const { fetchSchedule, fetchGeoInfo } = props
  const [baseDate, setBaseDate] = useState(moment())
  const firstDayOfWeek = (() => {
    return moment(baseDate).startOf('week')
  })()
  const endDayOfWeek = (() => {
    return moment(baseDate).endOf('week')
  })()

  useEffect(() => {
    fetchSchedule()
    fetchGeoInfo()
  }, [fetchSchedule, fetchGeoInfo])

  const handlePickerChange = (value) => {
    if (value === 'previous') {
      const changed = baseDate.subtract(1, 'week')
      setBaseDate(changed)
      props.fetchSchedule({
        start: changed.startOf('week').format('YYYY-MM-DD'),
        end: changed.endOf('week').format('YYYY-MM-DD')
      })
    }

    if (value === 'next') {
      const changed = baseDate.add(1, 'week')
      setBaseDate(changed)
      props.fetchSchedule({
        start: changed.startOf('week').format('YYYY-MM-DD'),
        end: changed.endOf('week').format('YYYY-MM-DD')
      })
    }
  }

  return (
    <AppWrapper>
      <Layout.Row type="flex" gutter="10" justify="start">
        <WeekPickerButtonGroup
          disabledPrevious={firstDayOfWeek.isBefore(moment())}
          onClick={handlePickerChange}
        />
        <TimeRangeDisplay
          dateRange={`${firstDayOfWeek.format('YYYY/MM/DD')} - ${endDayOfWeek.format('DD')}`}
          countryCode={props.geo ? props.geo.countryCode : ''}
        />
      </Layout.Row>
      <Layout.Row>
        <ＷeekCalendar
          startDate={firstDayOfWeek.format('YYYY-MM-DD')}
          endDate={endDayOfWeek.format('YYYY-MM-DD')}
          availableTime={props.availableTime}
          bookedTimes={props.bookedTimes}
        />
      </Layout.Row>
      
    </AppWrapper>
  )
}

AvailableTimeCalendar.propTypes = {
  availableTime: PropTypes.array,
  bookedTimes: PropTypes.array,
  geo: PropTypes.object,
  loadPage: PropTypes.func
}

export default connect(
  (state, props) => ({
    availableTime: state.available,
    bookedTimes: state.booked,
    geo: state.geo,
  }),
  (dispatch) => ({
    fetchSchedule: (payload) => dispatch(actions.fetchSchedule(payload)),
    fetchGeoInfo: () => dispatch(actions.fetchGeoInfo()),
  })
)(AvailableTimeCalendar)
