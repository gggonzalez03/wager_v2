import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { getPublicBets, getOpenBetsByUsername } from '../api-functions/Bet';
import CFooter from '../components/CFooter/CFooter';
import CHeader from '../components/CHeader/CHeader';
import OpenBetsView from '../components/OpenBetsView/OpenBetsView';
import WorldView from '../components/WorldView/WorldView';
import GLOBAL from './global.js'


class HomeScreen extends Component {

  state = {
    selected: "world", // this can either be world or openbets
    publicBets: [],
    openbets: [],
  }

  constructor(props) {
		super(props)
		GLOBAL.home = this;
	}

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // this.updateSelected(0)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateSelected = (e) => {
    var s
    switch (e) {
      case 0: s = "world"; break;
      case 1: s = "openbets"; break;
      default: s = "world"
    }

    this.setState({ selected: s })
  }

  render() {
    let { selected } = this.state
    let { user_details } = this.props

    return (
      <View style={[styles.container]}>
        <CHeader headerTitle={"Wager"} {...this.props} user_details={user_details}></CHeader>
        <WorldView style={[styles.worldview, { display: selected == "world" ? 'flex' : 'none'}]} visible={selected == "world"} user_details={user_details}></WorldView>
        <OpenBetsView style={[styles.openbetsview, { display: selected == "openbets" ? 'flex' : 'none'}]} visible={selected == "openbets"} user_details={user_details}></OpenBetsView>
        <CFooter onUpdate={(e) => this.updateSelected(e)}></CFooter>
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
  worldview: {
    height: 40 * em,
    flex: 1,
  },
  openbetsview: {
    height: 40 * em,
    flex: 1,
  }
})

export default HomeScreen