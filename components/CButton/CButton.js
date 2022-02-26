import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

class CButton extends Component {
  render() {

    let { style, text, onPress, selected, color } = this.props
    return (
      <View
        style={[styles.buttonContainer, style, {backgroundColor: selected ? color : "white", borderColor: color}]}
        onTouchEnd={onPress}>
        <Text style={[styles.buttonText, {color: selected ? 'white' : color}]}>{text}</Text>
      </View>
    )
  }
}

const { em } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 1.5 * em, 
        padding: em,
    },
    buttonText: {
        
    }
})

export default CButton