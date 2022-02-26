import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import CButton from '../CButton/CButton';
import Modal from 'react-native-modal';

class InsufficientFundsModal extends Component {

  state = {
    
  }

  onSubmit = () => {
    this.props.onSubmit(false)
  }

  render() {
    const { blue0, blue1, red0, em, gray } = require('../../helpers/constants.json');
    let { makeinsfundsmodalvisible, header, message } = this.props
    return (
      <Modal
          isVisible={makeinsfundsmodalvisible}
          onBackdropPress={this.onSubmit}
          >
        <View style={[styles.container]}>
          <Text style={[ styles.header, { alignSelf: 'center' }]}>{header}</Text>
          <Text style={[styles.message]}>{message}</Text>
          <View style={[styles.buttonsContainer]}>
            <CButton style={[styles.button, {marginLeft: em/2}]} onPress={this.onSubmit} text={"Okay"} color={blue1} selected={true}></CButton>
          </View>
        </View>
      </Modal>
    )
  }
}

const { gray, em, darkgray } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    marginTop: -20 * em,
    borderRadius: 1 * em,
    padding: 1 * em,
    paddingTop: 2 * em,
  },
  header: {
    fontSize: 1.2 * em,
    marginBottom: 1.5 * em,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginBottom: 1 * em,
  },
  message: {
    textAlign: 'center',
    marginBottom: 2 * em,
  }
})

export default InsufficientFundsModal