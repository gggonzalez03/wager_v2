import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  DrawerContentScrollView,
  getIsDrawerOpenFromState
} from '@react-navigation/drawer';
import CNotificationCard from '../CNotificationCard/CNotificationCard';
import GLOBAL from '../../screens/global.js'
import { getBetNotifications, updateBetsParticipated, getBet, updateBetStatus } from '../../api-functions/Bet';
import CNotificationCardModal from '../CNotificationCardModal/CNotificationCardModal';
import CStatusSnack from '../CStatusSnack/CStatusSnack';
import { getBalance } from '../../api-functions/User';
import InsufficientFundsModal from '../InsufficientFundsModal/InsufficientFundsModal';

class CDrawer extends Component {
  state = {
    notifItems: [],
    tappedNotificationBet: undefined,
    tappedNotificationBetModalToggle: false,
    isDrawerOpen: false,
    insufficientfunds: false,
    makeinsfundsmodalvisible: false,
  }

  componentDidUpdate() {
    const isOpen = getIsDrawerOpenFromState(this.props.state);
    const { user_details } = this.props

    if (this.state.isDrawerOpen != isOpen) {
      if (isOpen == true) {
        getBetNotifications(user_details && user_details.username, (data) => {
          // console.log("Calling getBetNotifications ", data.betNotif, "\n")
          this.setState({ notifItems: data.betNotif, isDrawerOpen: isOpen })
        }, (e) => {
          this.setState({ notifItems: [], isDrawerOpen: isOpen })
          console.log(e)
        })

        GLOBAL.app.getBalance();
      }
      else if (isOpen == false) {
        this.setState({ isDrawerOpen: isOpen })
      }
    }
  }

  openNotification = (id) => {
    getBet(id, (data) => {
      console.log("Calling getBet ", data, "\n")
      this.props.navigation.closeDrawer()
      this.setState({ tappedNotificationBet: data.betData, tappedNotificationBetModalToggle: true })
    }, (e) => {
      console.log(e)
    })
  }

  closeNotification = () => {
    this.setState({ tappedNotificationBet: undefined, tappedNotificationBetModalToggle: false })
  }

  toggleInsFundsModal = (e) => {
    if (e != undefined)
      this.setState({makeinsfundsmodalvisible: e})
    else
      this.setState({makeinsfundsmodalvisible: !this.state.makeinsfundsmodalvisible})

    this.setState({ insufficientfunds: false })
  }

  respondToBet = (bet, response, previousStatus) => {
    const { user_details } = this.props
    if (response == "ongoing") {
        // Only accept the bet when both the owner and the participant have enough funds
        if (bet.isMonetary) {
          getBalance(bet.owner, (b) => {
            if (b >= bet.stake && user_details.balance >= bet.stake) {
              GLOBAL.app.subtractFromBalance({ username: bet.owner, amount: bet.stake })
              GLOBAL.app.subtractFromBalance({ username: user_details.username, amount: bet.stake })
              // TODO: Change this when the database has been fixed
              updateBetsParticipated({ username: user_details && user_details.username, betId: bet.betId }, (data) => {
                updateBetStatus({ betId: bet.betId, status: response, prevStatus: previousStatus }, (data) => {
                  this.setState({ tappedNotificationBet: undefined, tappedNotificationBetModalToggle: false })
                }, (e) => {
                  console.log(e)
                })
              }, (e) => {
                console.log(e)
              })
            }
            else {
              // Either the participant or the owner has insufficient funds
              this.setState({ insufficientfunds: true }, () => { this.closeNotification();})
            }
          }, (e) => console.log(e))
        }
        else {
          // TODO: Change this when the database has been fixed
          updateBetsParticipated({ username: user_details && user_details.username, betId: bet.betId }, (data) => {
            updateBetStatus({ betId: bet.betId, status: response, prevStatus: previousStatus }, (data) => {
              this.setState({ tappedNotificationBet: undefined, tappedNotificationBetModalToggle: false })
            }, (e) => {
              console.log(e)
            })
          }, (e) => {
            console.log(e)
          })
        }
    }
    else if (response == "declined") {
      // TODO: Change this when the database has been fixed
      updateBetsParticipated({ username: user_details && user_details.username, betId: bet.betId }, (data) => {
        updateBetStatus({ betId: bet.betId, status: response, prevStatus: previousStatus }, (data) => {
          this.setState({ tappedNotificationBet: undefined, tappedNotificationBetModalToggle: false })
        }, (e) => {
          console.log(e)
        })
      }, (e) => {
        console.log(e)
      })
    }
  }

  logoutUser = () => {
    GLOBAL.app.setState({ user_details: undefined }, () => {
      this.props.navigation.navigate("Login")
    })
  }

  showSnack = (count) => {
    if (count == 0) {
      return (<CStatusSnack text="No new notifications"></CStatusSnack>)
    }

    return
  }

  render() {
    let { navigation, user } = this.props
    let { notifItems, tappedNotificationBetModalToggle, tappedNotificationBet, makeinsfundsmodalvisible } = this.state
    const { user_details } = this.props
    // console.log(user_details && user_details)

    if (user_details == undefined)
      return (<View></View>)
    
    return (
      <View style={[styles.container]}>
        <View style={[styles.userDetailsContainer]}>
          <View style={[styles.userImageContainer]}>
            <Image style={[styles.userImage]} source={user_details && user_details.profile}></Image>
          </View>
          <View style={[styles.userContainer]}>
            <Text style={[styles.name]}>{user_details.firstName} {user_details.lastName}</Text>
            <Text style={[styles.details]}>
              <Text style={[styles.username]}>@{user_details.username} </Text>
              <Text>• </Text>
              <Text>{user_details.friendsCount} </Text>
              <Image style={[styles.friendsIcon]} source={require('./img/friends.png')}></Image>
            </Text>
          </View>
        </View>
        <DrawerContentScrollView {...this.props} style={{ flex: 1, }}>
          <View style={[styles.mainMenu]}>
            <Text style={{ alignSelf: 'center', marginBottom: em }}>Notifications</Text>
            <View style={[styles.notificationsContainer]}>
            <CNotificationCardModal
              makebetmodalvisible={tappedNotificationBetModalToggle}
              data={{...tappedNotificationBet, participant: "you"}}
              // onCancel in this case is Decline
              onCancel={() => this.respondToBet(tappedNotificationBet && tappedNotificationBet, "declined", tappedNotificationBet && tappedNotificationBet.status)}
              onSubmit={() => this.respondToBet(tappedNotificationBet && tappedNotificationBet, "ongoing", tappedNotificationBet && tappedNotificationBet.status)}
              onClose={this.closeNotification}
              onModalHide={() => { if(this.state.insufficientfunds) { this.toggleInsFundsModal(true) } }}
            ></CNotificationCardModal>
            <InsufficientFundsModal
              makeinsfundsmodalvisible={makeinsfundsmodalvisible}
              toggle={this.toggleInsFundsModal}
              onSubmit={this.toggleInsFundsModal}
              header={"Insufficient Funds"}
              message={<Text>Either you or the other user has insufficient funds.</Text>}
            ></InsufficientFundsModal>
            {notifItems && notifItems.map((item, index) => (
              <CNotificationCard
                key={item.betId + index + "notification"}
                id={item.betId}
                ownername={item.owner}
                ownerimage={require('../../screens/img/bluesample.png')}
                participantname={"you"}
                timeago={"2m ago"}
                privacy={item.privacy}
                stake={item.stake}
                ismonetary={item.isMonetary}
                style={[styles.notifcard]}
                onTap={(id) => { this.openNotification(id) }}
              >
              </CNotificationCard>
            ))}
            {notifItems && this.showSnack(notifItems.length)}
            </View>
            <Text style={{ alignSelf: 'center', marginBottom: em }}>Menu</Text>
            <View style={[styles.screensContainer]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.screenNavs]} onTouchEnd={() => navigation.navigate("Home")}>Home</Text>
                <Text style={[styles.screenNavs]} onTouchEnd={() => navigation.navigate("History")}>History</Text>
                <Text style={[styles.screenNavs]} onTouchEnd={() => navigation.navigate("Profile")}>Profile</Text>
                <Text style={[styles.screenNavs, {color: gray}]}>Friends</Text>
                <Text style={[styles.screenNavs, {color: gray}]}>Privacy</Text>
                <Text style={[styles.screenNavs, {color: gray}]}>Payment Method</Text>
                <Text style={[styles.screenNavs]} onTouchEnd={this.logoutUser}>Logout</Text>
              </View>
            </View>
            <View style={[styles.balanceContainer]} onTouchEnd={() => navigation.navigate("Profile")}>
              <Text style={[styles.balance]}>Balance</Text>
              <Text style={[styles.balance]}>$ {user_details.balance}</Text>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    )
  }
}

const { em, gray, darkgray } = require('../../helpers/constants.json');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 1 * em,
    marginTop: 3 * em,
    marginBottom: 0.5 * em,
    padding: em,
  },
  userImageContainer: {
    marginRight: em,
  },
  userImage: {
    height: 3 * em,
    width: 3 * em,
    borderRadius: 3 * em,
  },
  friendsIcon: {
    height: 0.8 * em,
    width: 0.8 * em,
    marginBottom: -1,
  },
  userContainer: {
    color: darkgray
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 0.8 * em,
    fontWeight: '300',
  },
  mainMenu: {
    flex: 1,
    display: 'flex',
    minHeight: 10 * em,
    borderRadius: em / 2,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    shadowOffset: { width: 1,  height: 1 },
    shadowColor: gray,
    shadowOpacity: 0.6,
    backgroundColor: '#F8F8F8',
    marginRight: 8,
    marginTop: -2.5 * em,
    padding: em,
  },
  screensContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    padding: em,
    paddingBottom: 0.5* em,
    borderRadius: em / 2,
    shadowOffset: { width: 1,  height: 1 },
    shadowColor: gray,
    shadowOpacity: 0.6,
    backgroundColor: '#FFFFFF',
  },
  balanceContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: em / 2,
    shadowOffset: { width: 1,  height: 1 },
    shadowColor: gray,
    shadowOpacity: 0.6,
    backgroundColor: '#FFFFFF',
    marginTop: 1 * em,
    padding: 1 * em,
    paddingBottom: 0.75 * em,
    paddingTop: 0.75 * em,
  },
  balance: {
    color: darkgray,
  },
  screenNavs: {
    flex: 1, 
    paddingTop: 0.5 * em,
    paddingBottom: 0.5 * em,
    marginBottom: 0.5 * em,
    color: darkgray,
  },
  notifcard: {
    marginBottom: 1.2 * em,
  },
  notificationsContainer: {
    marginBottom: 1 * em,
  }
})

export default CDrawer