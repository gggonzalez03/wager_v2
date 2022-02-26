import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getOpenBetsByUsername, updateOutcome, updateOppositeOutcome, updateBetStatus } from '../../api-functions/Bet';
import CCard from '../CCard/CCard';
import GLOBAL from '../../screens/global.js'
import CStatusSnack from '../CStatusSnack/CStatusSnack';

class OpenBetsView extends Component {

  state = {
    items: undefined,
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
    let { user_details } = this.props
    if (user_details.username != undefined) {
      console.log("Loading Open Bets View")
      getOpenBetsByUsername(user_details.username, (data) => {
        var allopenbets = []
        this.setState({ items: allopenbets.concat(data.openBetsParticipated ? data.openBetsParticipated : []).concat(data.openBetsByMe ? data.openBetsByMe : []) });
        // concat(data.openBetsParticipated)
      },
      (err) => { console.log(err) });
    }
  }

  updateBetOutcome = (outcome, prev, username, bet) => {
    if (bet.owner == username) {
      console.log({ betId: bet.betId, outcome: outcome, prevOutcome: bet.outcome })
      updateOutcome({ betId: bet.betId, outcome: outcome, prevOutcome: prev }, (res) => {
      }, (e) => {
        console.log(e)
      })
    }
    else if (bet.participant == username) {
      console.log({ betId: bet.betId, oppositeOutcome: outcome, prevOppositeOutcome: prev })
      updateOppositeOutcome({ betId: bet.betId, oppositeOutcome: outcome, prevOppositeOutcome: prev }, (res0) => {
        console.log("First: ", res0)
      }, (e) => {
        console.log(e)
      })
    }
    else {
      console.log("I'm not even involved here")
    }
  }

  finalizeOutcome = (final, username, item) => {
    console.log(final, username, item)

    if (item.isMonetary == true && item.outcome == "won") {
      GLOBAL.app.addToBalance({ username: item.owner, amount: item.stake * 2 });
    }
    if (item.isMonetary == true && item.oppositeOutcome == "won") {
      GLOBAL.app.addToBalance({ username: item.participant, amount: item.stake * 2 });
    }

    var status = (final == true) ? "completed" : "ongoing";
    var prevStatus = (final == true) ? "ongoing" : "completed";

    console.log(status, prevStatus)

    updateBetStatus({ betId: item.betId, prevStatus: prevStatus, status: status }, (res) => {
      console.log(res)
    }, (e) => {
      console.log(e)
    })
  }

  canFinalize = (username, bet) => {
    if (bet.owner != username)
      return false
    if (bet.outcome == "" || bet.oppositeOutcome == "")
      return false
    if (bet.outcome == bet.oppositeOutcome) {
      return undefined
    }
    if (bet.outcome != bet.oppositeOutcome)
      return true
  }

  showSnack = (count) => {

    if (count == 0 || count == undefined) {
      return (<CStatusSnack text="No new open bets"></CStatusSnack>)
    }

    return
  }
  
  render() {
    let { style } = this.props
    let { items } = this.state
    let { user_details } = this.props
    return (
      <View style={[styles.container, style]}>
        <ScrollView style={[styles.cardsContainer]}>
        <CStatusSnack text={"Tap to Update"} onTap={this.updateBetsList} style={{ marginBottom: 1 * em }}></CStatusSnack>
          {items && items.map((item, index) => (
            <CCard
            key={item.betId + index + ""}
            ownername={item.owner}
            ownerimage={require('../../screens/img/bluesample.png')}
            participantname={item.participant}
            participantimage={require('../../screens/img/pinksample.png')}
            timeago={"Accepted 2h ago"}
            privacy={item.privacy}
            betdesc={item.description}
            stake={item.stake}
            ismonetary={item.isMonetary}
            likesnum={3}
            style={[styles.card]}
            onTapWon={(selected, prev) => { this.updateBetOutcome(selected ? selected : "", prev, user_details.username, item) }}
            onTapLost={(selected, prev) => { this.updateBetOutcome(selected ? selected: "", prev, user_details.username, item) }}
            onTapFinalize={ this.canFinalize(user_details.username, item) ? (res) => { this.finalizeOutcome(res, user_details.username, item) } : undefined}
            selected={user_details.username == item.owner ? item.outcome : item.oppositeOutcome}
            toggleable={true}
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

export default OpenBetsView