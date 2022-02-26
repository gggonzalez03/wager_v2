import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import CButton from '../CButton/CButton';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import CCircleButton from '../CCircleButton/CCircleButton';

class MakeABetFormModal extends Component {

  state = {
    participantUsername: "",
    stake: "",
    isMonetary: false,
    isPublic: false,
    betDescription: "",
  }

  onCancel = (e) => {
    this.props.toggle(false)
    this.setState({
      participantUsername: "",
      stake: "",
      isMonetary: false,
      isPublic: false,
      betDescription: "",
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state)
    this.setState({
      participantUsername: "",
      stake: "",
      isMonetary: false,
      isPublic: false,
      betDescription: "",
    })
  }

  onModalHide = () => {
    this.props.onModalHide()
  }

  updateIsMonetary = (e) => {
    if (e != null)
      this.setState({ isMonetary: e })
  }

  updateIsPublic = (e) => {
    if (e != null)
      this.setState({ isPublic: e })
  }

  updateParticipantUsername = (e) => {
    this.setState({ participantUsername: e})
  }

	updateStake = (e) => {
		this.setState({stake: e});
	}
	updateBetDescription = (e) => {
		this.setState({betDescription: e});
	}

  render() {
    const { blue0, blue1, red0, em, gray } = require('../../helpers/constants.json');
    let { makebetmodalvisible } = this.props
    let { participantUsername, stake, isMonetary, isPublic, betDescription } = this.state
    return (
      <Modal
          isVisible={makebetmodalvisible}
          onBackdropPress={this.onCancel}
          onModalHide={this.onModalHide}
          >
        <View style={[styles.container]}>
          <Text style={[ styles.header, { alignSelf: 'center' }]}>Make a Bet</Text>
          <TextInput
            style={[styles.textinput]}
            onChangeText={e => this.updateParticipantUsername(e)}
            value={participantUsername}
            autoCapitalize={"none"}
            placeholder={"Username"}
          ></TextInput>
          <View style={[styles.stakeview]}>
            <CCircleButton
              image={require('./img/worldwide.png')}
              style={{ alignSelf: 'center', marginRight: 0.5 * em}}
              activecolor={blue0}
              inactivecolor={gray}
              onPress={this.updateIsPublic}
            ></CCircleButton>
            <CCircleButton
              image={require('./img/dollar-symbol.png')}
              style={{ alignSelf: 'center', marginRight: 0.5 * em}}
              activecolor={blue0}
              inactivecolor={gray}
              onPress={this.updateIsMonetary}
            ></CCircleButton>
            <TextInput
              style={[styles.textinput, {marginBottom: 0}]}
              onChangeText={e => this.updateStake(e)}
              value={stake}
              placeholder={"Stake"}
            ></TextInput>
          </View>
          <TextInput
            style={[styles.textinput, { flex: 3, paddingTop: em/2 }]}
            multiline = {true}
            numberOfLines = {4}
            onChangeText={e => this.updateBetDescription(e)}
            value={betDescription}
            placeholder={"Description"}
          ></TextInput>
          <View>
            {/* The privacy buttons */}
          </View>
          <View style={[styles.buttonsContainer]}>
            <CButton style={[styles.button, {marginRight: em/2}]} onPress={this.onCancel} text={"Cancel"} color={red0} selected={true}></CButton>
            <CButton style={[styles.button, {marginLeft: em/2}]} onPress={this.onSubmit} text={"Bet!"} color={blue1} selected={true}></CButton>
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
    height: 27 * em,
  },
  header: {
    fontSize: 1.2 * em,
    marginBottom: 1.5 * em,
    color: darkgray,
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
  textinput: {
    flex: 1,
		borderColor: gray,
		borderWidth: 1,
		fontSize: em,
		borderRadius: em,
    padding: em / 2,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: em,
  },
  stakeview: {
    flex: 1, 
    display: 'flex',
    flexDirection: 'row',
    marginBottom: em,
  }
})

export default MakeABetFormModal