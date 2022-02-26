import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

class CFooter extends Component {

  state = {
    selected: 0,
  }

  updateSelected = (e) => {
    this.setState({selected: e})
    this.props.onUpdate(e)
  }

  render() {
    let { selected } = this.state
    let { style } = this.props
    const { blue1, gray } = require('../../helpers/constants.json');
    
    return (
      <View style={[styles.container, style]}>
        <View style={styles.tabContainer} onTouchEnd={() => this.updateSelected(0)}>
          <Image style={[styles.tabIcon, {tintColor: selected == 0 ? blue1 : gray}]} source={require('../../screens/img/worldwide.png')}></Image>
          <Text style={[styles.text, {color: selected == 0 ? blue1 : gray}]}>World</Text>
        </View>
        <View style={styles.tabContainer} onTouchEnd={() => this.updateSelected(1)}>
          <Image style={[styles.tabIcon, {tintColor: selected == 1 ? blue1 : gray}]} source={require('../../screens/img/bet.png')}></Image>
          <Text style={[styles.text, {color: selected == 1 ? blue1 : gray}]}>Open Bets</Text>
        </View>
      </View>
    )
  }
}

const { em } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: em,
    paddingBottom: 2 * em,
  },
  tabIcon: {
    height: 1.5 * em,
    width: 1.5 * em,
  },
  tabContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginTop: em / 2,
    fontSize: em - 2,
  }
})

export default CFooter