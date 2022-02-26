import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import CButton from '../CButton/CButton';

class CNotificationCard extends Component {

  state = {
    sonTap: this.props.onTap,
    sid: this.props.id
  }

  onTap = () => {
    const { sonTap, sid } = this.state
    if (sonTap != undefined)
      sonTap(sid);
  }

  render() {
    let { style, ownername, ownerimage, participantname, participantimage, timeago, privacy, betdesc, stake, ismonetary, isliked, likesnum, selected,  } = this.props
    const { em, blue1, red0 } = require('../../helpers/constants.json');
    return (
      <View style={[styles.container, style]} onTouchEnd={this.onTap}>
        <View style={[styles.userDetailsContainer]}>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            <View style={[styles.userImageContainer]}>
              <Image style={[styles.userImage]} source={ownerimage}></Image>
            </View>
            <View style={[styles.userDetails]}>
              <View>
                <Text style={[{fontWeight: '300', fontSize: 0.8 * em}]}>
                  <Text style={[ styles.boldText]}>{ownername} </Text>
                  <Text>bet </Text>
                  <Text style={[ styles.boldText]}>{participantname}</Text>
                </Text>
              </View>
              <View>
                <Text style={[{fontWeight: '300', fontSize: 0.8 * em, marginTop: 0.2 * em}]}>
                  <Text>{timeago} </Text>
                  <Text>• </Text>
                  <Image style={[styles.privacyImage]} source={privacy == "public" ? require('./img/worldwide.png') : require('./img/friends.png')}></Image>
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.stake, {marginTop: 4, fontWeight: '300', fontSize: 0.8 * em}]}>{ismonetary ? "$" : ""}{stake}</Text>
        </View>
      </View>
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
    backgroundColor: '#FFFFFF',
  },
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  userImageContainer: {
    display: 'flex',
    width: 3 * em,
    marginRight: 0.5 * em,
    alignItems: 'center',
  },
  userImage: {
    height: 2.5 * em,
    width: 2.5 * em,
    borderRadius: 6 * em,
  },
  participantImage: {
    height: 1.5 * em,
    width: 1.5 * em,
    borderRadius: em,
  },
  privacyImage: {
    height: 0.8 * em,
    width: 0.8 * em,
    marginBottom: -2,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 2 * em,
    paddingTop: 0.25 * em,
    paddingBottom: 0.25 * em,
    marginTop: 1 * em,
  },
  likeButton: {
    height: 1.2 * em,
    width: 1.2 * em,
    marginRight: em,
    marginTop: 1 * em,
  }
})

export default CNotificationCard