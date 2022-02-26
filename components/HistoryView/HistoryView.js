import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CCard from '../CCard/CCard';
import CStatusSnack from '../CStatusSnack/CStatusSnack';

class HistoryView extends Component {

  state = {

  }

  componentDidMount() {

  }

  showStaticButton = (username, item) => {

    if (username == undefined || item == undefined)
      return undefined
    var outcome = (username == item.owner) ? item.outcome : item.oppositeOutcome
    if (outcome == undefined || outcome == "")
      return undefined
    else if (outcome == "won")
      return true
  }

  showSnack = (count) => {

    if (count == 0 || count == undefined) {
      return (<CStatusSnack text="No new world bets"></CStatusSnack>)
    }

    return
  }

  render() {
    let { style, items, user_details } = this.props

    if (items == undefined)
      return <View></View>

    return (
      <View style={[styles.container, style]}>
        <ScrollView style={[styles.cardsContainer]}>
        <CStatusSnack text={"Tap to Update"} onTap={this.props.onTapUpdate} style={{ marginBottom: 1 * em }}></CStatusSnack>
          {items && items.map((item, index) => (
            <CCard
            key={item && item.betId + index}
            ownername={item && item.owner}
            ownerimage={require('../../screens/img/bluesample.png')}
            participantname={item && item.participant}
            participantimage={require('../../screens/img/pinksample.png')}
            timeago={"Concluded 1d ago"}
            privacy={item && item.privacy}
            betdesc={item && item.description}
            stake={item && item.stake}
            ismonetary={item && item.isMonetary}
            likesnum={3}
            style={[styles.card]}
            onTapWon={ this.showStaticButton(user_details.username, item) ? () => {} : undefined }
            onTapLost={ !this.showStaticButton(user_details.username, item) ? () => {} : undefined }
            selected={user_details.username == item.owner ? item.outcome : item.oppositeOutcome}
            toggleable={false}
          ></CCard>
          ))}
          {items && this.showSnack(items.length)}
          <View style={{ height: 20}}></View>
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

export default HistoryView