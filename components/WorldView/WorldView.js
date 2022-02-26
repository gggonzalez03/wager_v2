import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getPublicBets, likeABet, unlikeABet } from '../../api-functions/Bet';
import CCard from '../CCard/CCard';
import CStatusSnack from '../CStatusSnack/CStatusSnack';

class WorldView extends Component {

  state = {
    items: undefined
  }

  componentDidMount = () => {
    this.updateBetsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible == true) {
      this.updateBetsList();
    }
  }

  updateBetsList = () => {
    const { user_details } = this.props
    if (user_details.username != undefined) {
      console.log("Loading World View")
      getPublicBets((data) => {
        this.setState({ items: data.bets });
      },
      (err) => { console.log(err) });
    }
  }

  isLikedByMe = (liked_by, username) => {
    var isliked = liked_by.find(user => user == username)
    return (isliked != undefined ? true : false)
  }

  like = (betid, username) => {
    console.log(betid, username)
    likeABet({ betId: betid, username: username }, (data) => { console.log(data) }, (e) => { console.log(e) })
  }

  unlike = (betid, username) => {
    console.log(betid, username, { betId: betid, username: username })
    unlikeABet({ betId: betid, username: username }, (data) => { console.log(data) }, (e) => { console.log(e) })
  }

  showSnack = (count) => {

    if (count == 0 || count == undefined) {
      return (<CStatusSnack text="No new world bets"></CStatusSnack>)
    }

    return
  }

  render() {
    let { style } = this.props
    let { items } = this.state

    const { user_details } = this.props
    const { em } = require('../../helpers/constants.json');

    return (
      <View style={[styles.container, style]}>
        <ScrollView style={[styles.cardsContainer]}>
        <CStatusSnack text={"Tap to Update"} onTap={this.updateBetsList} style={{ marginBottom: 1 * em }}></CStatusSnack>
        {items && items.map((item, index) => (
          <CCard
            key={item.betId + index}
            ownername={item.owner}
            ownerimage={require('../../screens/img/bluesample.png')}
            participantname={item.participant}
            participantimage={require('../../screens/img/pinksample.png')}
            timeago={"Started 2h ago"}
            isliked={this.isLikedByMe(item && item.liked_by, user_details.username)}
            privacy={item.privacy}
            betdesc={item.description}
            stake={item.stake}
            ismonetary={item.isMonetary}
            likesnum={3}
            style={[styles.card]}
            onTapLike={(isliked) => { isliked ? this.like(item.betId, user_details.username) : this.unlike(item.betId, user_details.username) }}
          ></CCard>
        ))}
        {items && this.showSnack(items.length)}
        <View style={{ height: 20 * em }}>
        </View>
        </ScrollView>
      </View>
    )
  }
}

const { em } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  cardsContainer: {
    flex: 1,
    display: 'flex',
    padding: 1 * em,
  },
  card: {
    marginBottom: 1.2 * em,
  }
})

export default WorldView