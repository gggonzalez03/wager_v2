import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import HistoryView from '../components/HistoryView/HistoryView';
import CHeader from '../components/CHeader/CHeader';
import { getBetHistoryByUsername } from '../api-functions/Bet';
import GLOBAL from './global.js'

class HistoryScreen extends Component {

  state = {
    userData: undefined,
    items: undefined,
    count: 0,
  }

  constructor(props) {
		super(props)
		GLOBAL.history = this;
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.updateScreen()
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateScreen = () => {

    const { user_details } = this.props

    if (user_details != undefined) {
      var alldata = []
      console.log("Loading History Screen")
      getBetHistoryByUsername(user_details.username, (data) => {
        // betsByMeHistory, betsParticipatedHistory
        if (data.betsByMeHistory != undefined) {
          alldata = alldata.concat(data.betsByMeHistory)
        }
        if (data.betsParticipatedHistory != undefined)
          alldata = alldata.concat(data.betsParticipatedHistory)

        this.setState({ items: alldata, userData: user_details });
      },
      (err) => { console.log(err) });
    }
  }

  render() {
    const { user_details } = this.props
    return (
      <View style={[styles.container]}>
        <CHeader headerTitle={"History"} {...this.props} user_details={user_details}></CHeader>
        <HistoryView style={[styles.historyview]} items={this.state.items} username={user_details && user_details.username} user_details={user_details} onTapUpdate={this.updateScreen}></HistoryView>
      </View>
    )
  }
}

const { blue1, em } = require('../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  historyview: {
    height: 40 * em,
    flex: 1,
  },
})

export default HistoryScreen