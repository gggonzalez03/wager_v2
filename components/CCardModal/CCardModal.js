import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import CButton from '../CButton/CButton';
import Modal from 'react-native-modal';

class CCardModal extends Component {
  render() {
    let { style, ownername, ownerimage, participantname, participantimage, timeago, privacy, betdesc, stake, ismonetary, isliked, likesnum } = this.props
    const { em, blue1, red0 } = require('../../helpers/constants.json');
    return (
      <Modal
        // isVisible={makebetmodalvisible}
        // onBackdropPress={this.onCancel}
      >
        <View style={[styles.container, style]}>
          <View style={[styles.userDetailsContainer]}>
            <View style={{ display: 'flex', flexDirection: 'row'}}>
              <View style={[styles.userImageContainer]}>
                <Image style={[styles.userImage]} source={ownerimage}></Image>
              </View>
              <View style={[styles.userDetails]}>
                <View>
                  <Text>
                    <Text style={[ styles.boldText]}>{ownername} </Text>
                    <Text>bet </Text>
                    <Text style={[ styles.boldText]}>{participantname}</Text>
                  </Text>
                </View>
                <View>
                  <Text>
                    <Text>{timeago} </Text>
                    <Text>• </Text>
                    <Image style={[styles.privacyImage]} source={require('./img/friends.png')}></Image>
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.stake]}>{ismonetary ? "$" : ""}{stake}</Text>
          </View>

          <View style={[styles.betDetailsContainer]}>
            <View style={[styles.userImageContainer]}>
              <Image style={[styles.participantImage]} source={participantimage}></Image>
            </View>
            <View style={[styles.betDetails]}>
              <Text style={[styles.betDescription]}>{betdesc} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <View style={[styles.buttonsContainer]}>
                <CButton text="Lost" color={red0} style={[styles.actionButton, {marginRight: em}]}></CButton>
                <CButton text="Won" color={blue1} style={[styles.actionButton]}></CButton>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const { em, gray } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 1 * em,
    borderRadius: em / 2,
    shadowOffset: { width: 1,  height: 1 },
    shadowColor: gray,
    shadowOpacity: 0.6,
    backgroundColor: '#F8F8F8',
  },
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0.7 * em,
  },
  userDetails: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  userImageContainer: {
    display: 'flex',
    width: 3 * em,
    marginRight: em,
    alignItems: 'center',
  },
  userImage: {
    height: 3 * em,
    width: 3 * em,
    borderRadius: em,
  },
  participantImage: {
    height: 1.5 * em,
    width: 1.5 * em,
    borderRadius: em,
  },
  privacyImage: {
    height: 0.8 * em,
    width: 0.8 * em,
  },
  boldText: {
    fontWeight: '600'
  },
  betDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  betDetails: {
    flex: 1,
    paddingRight: 1.5 * em, 
  },
  stake: {
    alignSelf: 'flex-start'
  },
  betDescription: {
    fontWeight: '300',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionButton: {

  }
})

export default CCardModal