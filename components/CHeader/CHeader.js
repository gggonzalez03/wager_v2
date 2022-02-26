import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import MakeABetFormModal from '../MakeABetFormModal/MakeABetFormModal';
import GLOBAL from '../../screens/global.js'
import { createBet, updateBetsOwned, updateBetsParticipated } from '../../api-functions/Bet';
import { getBalance, subtractFromBalance } from '../../api-functions/User';
import InsufficientFundsModal from '../InsufficientFundsModal/InsufficientFundsModal';

class CHeader extends Component {

  state = {
    makebetmodalvisible: false,
    makeinsfundsmodalvisible: false,
    insufficientfunds: false,
  }

  componentDidMount() {

  }

  toggleMakeBetModal = (e) => {

    if (e != undefined)
      this.setState({makebetmodalvisible: e})
    else
      this.setState({makebetmodalvisible: !this.state.makebetmodalvisible})
  }

  toggleInsFundsModal = (e) => {
    if (e != undefined)
      this.setState({makeinsfundsmodalvisible: e})
    else
      this.setState({makeinsfundsmodalvisible: !this.state.makeinsfundsmodalvisible})

    this.setState({ insufficientfunds: false })
  }

  makeABet = (e) => {
    const {betDescription, isMonetary, isPublic, participantUsername, stake} = e;
    const { user_details } = this.props
    var bet = {
      description: betDescription,
      isMonetary: isMonetary,
      participant: participantUsername, 
      privacy: isPublic ? "public" : "private", 
      stake: stake, 
      username: user_details && user_details.username,
      status: "pending"       
    }
    
    getBalance(user_details.username, (res) => {
      if (bet.isMonetary && res < bet.stake) {
        this.setState({ insufficientfunds: true })
        this.toggleMakeBetModal(false)
      }
      else {
        createBet(bet, (data) => {
          var bet0 = { betId: data.betId, username: data.owner }
          updateBetsOwned(bet0, () => {
            var bet1 = {betId: data.betId, username: data.participant }
            updateBetsParticipated(bet1, () => {
              this.toggleMakeBetModal(false)
            }, (e) => {
              console.log(e)
            })
          }, (e) => {
            console.log(e)
          })
        }, (e) => {
          console.log(e)
        })
      }
    }, (e) => {
      console.log(e)
    })
  }

  render() {
    let { headerTitle, style, user_details } = this.props
    let { makebetmodalvisible, makeinsfundsmodalvisible } = this.state

    const { em, darkgray, blue0 } = require('../../helpers/constants.json');

    return (
      <View style={[styles.container, style]}>
        <MakeABetFormModal makebetmodalvisible={makebetmodalvisible} toggle={this.toggleMakeBetModal} onSubmit={(e) => this.makeABet(e)} onModalHide={() => { if(this.state.insufficientfunds) this.toggleInsFundsModal(true) }}></MakeABetFormModal>
        <InsufficientFundsModal
          makeinsfundsmodalvisible={makeinsfundsmodalvisible}
          toggle={this.toggleInsFundsModal}
          onSubmit={this.toggleInsFundsModal}
          header={"Insufficient Funds"}
          message={<Text style={{ color: darkgray }}>Please transfer funds to your account.</Text>}
        ></InsufficientFundsModal>
        <View style={[styles.optionsContainer]}>
          <Image style={[styles.profile, {marginRight: 7}]} source={user_details.profile} onTouchEnd={ () => { this.props.navigation.openDrawer() }}></Image>
          <Image style={[styles.optionButton, { marginRight: 3.5 * em}]}></Image>
        </View>
        {/* {() => { return (headerTitle == null ? <Image style={[styles.headerImage]} source={require('./img/worldwide.png')}></Image> : <Text style={[styles.headerText]}>{headerTitle}</Text>)}} */}
        <Text style={[styles.headerText]}>{headerTitle}</Text>
        <View style={[styles.optionsContainer]}>
          <View style={[styles.optionContainer]} onTouchEnd={() => this.toggleMakeBetModal(true)}>
            <Image style={[styles.optionButton, {marginRight: em, tintColor: "#FFFFFF"}]} source={require('./img/bet.png')}></Image>
            <Text style={{ color: "#FFFFFF", fontSize: 1.1 * em }}>New Bet</Text>
          </View>
          {/* <Image style={[styles.optionButton]} source={require('./img/qr-code.png')}></Image> */}
        </View>
      </View>
    )
  }
}

const { em, darkgray, blue0 } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2.5 * em,
    padding: 1.5 * em,
    backgroundColor: 'white',
  },
  profile: {
    width: 3 * em,
    height: 3 * em,
    borderRadius: 3 * em,
  },
  headerImage: {
    width: 1.5 * em,
    height: 1.5 * em,
  },
  headerText: {
    fontSize: 1.2 * em,
    color: darkgray,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: blue0,
    padding: 1 * em,
    paddingRight: 1.5 * em,
    paddingLeft: 1.5 * em,
    borderRadius: 3 * em,
    alignItems: 'center',
  },
  optionButton: {
    width: 1.5 * em,
    height: 1.5 * em,
  }

})

export default CHeader