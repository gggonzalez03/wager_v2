import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

class CCard extends Component {
  render() {
    let { style } = this.props
    return (
      <View style={[styles.container, style]}>

        <View style={[styles.userDetailsContainer]}>
          <View style={[styles.userImageContainer]}>
            <Image style={[styles.userDetailsContainer]}></Image>
          </View>
          <View style={[styles.container]}>
            <View style={[styles.container]}></View>
          </View>
          <Text></Text>
        </View>


        <View style={[styles.container]}>
          <View style={[styles.container]}>
            <Image style={[styles.userDetailsContainer]}></Image>
          </View>
          <View style={[styles.container]}></View>
          <Text></Text>
        </View>
      </View>
    )
  }
}

const { em } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  userDetailsContainer: {

  },
  userImageContainer: {

  },
  userImage: {

  },

})

export default CCard