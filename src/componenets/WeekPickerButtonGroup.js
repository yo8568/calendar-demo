import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'element-react'
import { createUseStyles } from 'react-jss'

const availableColor = '#02cab9'

const useStyles = createUseStyles({
  root: {
   dispaly: 'flex',
   width: 100
  },
  buttonGroup: {
    display: 'flex'
  },
  button: {
    '&:active': {
      borderColor: `${availableColor} !important`,
      color: `${availableColor} !important`
    },
    '&:hover': {
      borderColor: `${availableColor} !important`,
      color: `${availableColor} !important`
    },
    '&:focus': {
      borderColor: `${availableColor} !important`,
      color: `${availableColor} !important`
    }
  }
})


function WeekPickerButtonGroup (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button.Group className={classes.buttonGroup}>
        <Button className={classes.button} size="small" plain icon="arrow-left" disabled={props.disabledPrevious} onClick={() => props.onClick('previous')} />
        <Button className={classes.button} size="small" plain icon="arrow-right" onClick={() => props.onClick('next')} />
      </Button.Group>
    </div>
  )
}

WeekPickerButtonGroup.propTypes = {
  disabledPrevious: PropTypes.bool,
  onClick: PropTypes.func
}

WeekPickerButtonGroup.defaultProps = {
  disabledPrevious: false,
  onClick: () => ({})
}

export default WeekPickerButtonGroup
