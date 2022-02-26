import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

class CStatusSnack extends Component {
  render() {
    let { style } = this.props
    return (
      <View style={[styles.container, style]} onTouchEnd={this.props.onTap != undefined ? this.props.onTap : () => {}}>
          <View style={[styles.textContainer]}>
          < Text style={[styles.text]}>{this.props.text}</Text>
          </View>
      </View>
    )
  }
}

const { em, gray } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: gray,
    borderRadius: 1 * em,
    padding: 0.2 * em,
    paddingRight: 1 * em,
    paddingLeft: 1 * em,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 0.8 * em,
  }
})

export default CStatusSnack