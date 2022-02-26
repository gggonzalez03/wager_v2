import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import CButton from '../CButton/CButton';
import Modal from 'react-native-modal';
import CCard from '../CCard/CCard';

class CNotificationCardModal extends Component {

  state = {
    
  }

  onCancel = () => {
    if (this.props.onCancel != undefined)
        this.props.onCancel()
  }

  onSubmit = () => {
    if (this.props.onSubmit != undefined)
        this.props.onSubmit()
  }

  onClose = () => {
    if (this.props.onClose != undefined)
        this.props.onClose()
  }

  onModalHide = () => {
    this.props.onModalHide()
  }

  render() {
    const { blue0, blue1, red0, em, gray } = require('../../helpers/constants.json');
    let { makebetmodalvisible, data } = this.props
    return (
      <Modal
          isVisible={makebetmodalvisible}
          onBackdropPress={this.onClose}
          onModalHide={this.onModalHide}
          >
        <View style={[styles.container]}>
            <CCard
                ownername={data && data.owner}
                ownerimage={require('../../screens/img/bluesample.png')}
                participantname={data && data.participant}
                participantimage={require('../../screens/img/pinksample.png')}
                timeago={"2m ago"}
                privacy={data && data.privacy}
                betdesc={data && data.description}
                stake={data && data.stake}
                ismonetary={data && data.isMonetary}
                likesnum={3}
                style={[styles.card]}
                toggleable={false}
                custombuttons={(
                <View style={[styles.buttonsContainer]}>
                    <CButton style={[styles.button, {marginRight: em / 2}]} onPress={this.onCancel} text={"Decline"} color={red0} selected={true}></CButton>
                    <CButton style={[styles.button, {marginLeft: em / 2}]} onPress={this.onSubmit} text={"Accept"} color={blue1} selected={true}></CButton>
                </View>
                )}
            ></CCard>
        </View>
      </Modal>
    )
  }
}

const { gray, em, darkgray } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    marginTop: -20 * em,
  },
  header: {

  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    marginTop: 1 * em,
  },
  button: {
    flex: 1,
    padding: 0.8 * em
  },
})

export default CNotificationCardModal