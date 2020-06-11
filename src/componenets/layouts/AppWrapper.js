import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { createUseStyles } from 'react-jss'
import { Layout } from 'element-react'
import ChangeLanguageSelect from './ChangeLanguageSelect'

const useStyles = createUseStyles({
  root: {
    minHeight: '100vh',
    paddingLeft: 5,
    paddingRight: 5
  },
  appbar: {
    padding: '0px 0px 0px 23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottom: '1px solid #ADADAD'
  },
  content: {
    padding: '15px 15px',
  }
})

function AppWrapper (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <DocumentTitle title="Calender Testing" />
      <Layout.Row type="flex" gutter="10" justify="space-between" className={classes.appbar}>
        <Layout.Col span="12"><h4>{'Calender Testing'}</h4></Layout.Col>
        <Layout.Col span="6"><ChangeLanguageSelect /></Layout.Col>
      </Layout.Row>
      <Layout.Row gutter="10" className={classes.content}>
        <Layout.Col span="24">{props.children}</Layout.Col>
      </Layout.Row>
    </div>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppWrapper
