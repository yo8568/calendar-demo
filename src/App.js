import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import AvailableTimeCalendar from './pages/AvailableTimeCalendar'
import { HistoryContext } from './history'

class App extends React.Component {
  render() {
    return (
      <HistoryContext.Provider value={this.props.history}>
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route path="/" exact component={AvailableTimeCalendar} />
          </Switch>
        </ConnectedRouter>
      </HistoryContext.Provider>
    )
  }
}

App.propTypes = {
  history: PropTypes.object
}

App.contextTypes = {
  store: PropTypes.object
}

export default App
