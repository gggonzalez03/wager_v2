import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import CButton from '../CButton/CButton';
import CCircleButton from '../CCircleButton/CCircleButton';

class CCard extends Component {

  state = {
    sisliked: this.props.isliked,
    sonTapLike: this.props.onTapLike,
    sonTapLost: this.props.onTapLost,
    sonTapWon: this.props.onTapWon,
    sonTapFinalize: this.props.onTapFinalize,
    sselected: this.props.selected,
    stoggleable: this.props.toggleable,
    custombuttons: this.props.custombuttons,
  }

  onTapLike = () => {
    const { sisliked, sonTapLike } = this.state
    if (sisliked != null)
      this.setState({ sisliked: !sisliked}, () => {
        this.props.onTapLike(this.state.sisliked);
      })
  }

  onTapLost = () => {
    const { sselected, sonTapLost, stoggleable } = this.state

    if (!stoggleable)
      return
    
    
    var previousSelected = sselected
    if (sselected == "lost")
      this.setState({ sselected: ""}, () => {
        this.props.onTapLost(this.state.sselected, previousSelected);
      })
    else {
      this.setState({ sselected: "lost"}, () => {
        this.props.onTapLost(this.state.sselected, previousSelected);
      })
    }
  }

  onTapWon = () => {
    const { sselected, sonTapWon, stoggleable } = this.state

    if (!stoggleable)
      return
    
    var previousSelected = sselected
    if (sselected == "won") 
      this.setState({ sselected: ""}, () => {
        this.props.onTapWon(this.state.sselected, previousSelected);
      })
    else {
      this.setState({ sselected: "won"}, () => {
        this.props.onTapWon(this.state.sselected, previousSelected);
      })
    }
  }

  onTapFinalize = (selected) => {
    const { sonTapFinalize, stoggleable } = this.state

    if (!stoggleable)
      return
    
    this.props.onTapFinalize(selected);
  }

  getButtons = (props) => {
    const { em, blue1, red0, green0, green1, gray } = require('../../helpers/constants.json');
    const { onTapWon, onTapLost, onTapLike, onTapFinalize } = props
    const { sisliked, sselected } = this.state

    if (this.state.custombuttons != undefined) {
      return (<View style={[styles.buttonsContainer]}>{this.state.custombuttons}</View>)
    }

    return (
      <View style={[styles.buttonsContainer]}>
        <Image
          style={[styles.likeButton, {display: (onTapLike != undefined && sisliked != undefined && sisliked == true) ? 'flex' : 'none'}]}
          source={require('./img/likefilled.png')}
          onTouchEnd={() => this.onTapLike()}
        ></Image>
        <Image
          style={[styles.likeButton, {display: (onTapLike != undefined && sisliked != undefined && sisliked == false) ? 'flex' : 'none'}]}
          source={require('./img/like.png')}
          onTouchEnd={() => this.onTapLike()}
        ></Image>
        <CButton 
          text="Lost"
          color={red0} 
          style={[styles.actionButton, {marginRight: em, display: (onTapLost != undefined) ? 'flex' : 'none'}]}
          selected={(sselected == "lost") ? true : false}
          onPress={() => this.onTapLost()}
        ></CButton>
        <CButton
          text="Won"
          color={blue1}
          style={[styles.actionButton, {marginRight: em, display: (onTapWon != undefined) ? 'flex' : 'none'}]}
          selected={(sselected == "won") ? true : false}
          onPress={() => this.onTapWon()}
        ></CButton>
        <View style={[styles.actionButton, {marginRight: em, display: (onTapFinalize != undefined) ? 'flex' : 'none', alignItems: 'flex-start', padding: 0}]}>
          <CCircleButton
            style={{ padding: 0.8 * em, height: 1.5 * em, width: 1.5 * em }}
            imagestyle={{ height: 0.8 * em, width: 0.8 * em }}
            image={require('./img/check.png')}
            activecolor={green0}
            inactivecolor={gray}
            onPress={(selected) => this.onTapFinalize(selected)}
          ></CCircleButton>
        </View>
      </View>
    );
  }

  render() {
    let { style, ownername, ownerimage, participantname, participantimage, timeago, privacy, betdesc, stake, ismonetary, isliked, likesnum, selected,  } = this.props
    const { em, blue1, red0 } = require('../../helpers/constants.json');

    // <CButton
    //       text={(
    //         <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor:  }}>
    //           {/* <Image source={require('./img/check.png')} style={{ height: 1.5 * em, width: 1.5 * em, marginRight: 0.5 * em, backgroundColor: 'red' }}></Image> */}
    //           <Text style={{ color: '#FFFFFF' }}>Finalize</Text>
    //         </View>)}
    //       color={blue1}
    //       style={[styles.actionButton, {marginRight: em, display: (onTapWon != undefined) ? 'flex' : 'none', padding: 0}]}
    //       selected={(sselected == "won") ? true : false}
    //       onPress={() => this.onTapFinalize()}
    //     ></CButton>
    return (
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
                <Text style={[{fontWeight: '300', fontSize: 0.8 * em, marginTop: 0.2 * em}]}>
                  <Text>{timeago} </Text>
                  <Text>• </Text>
                  <Image style={[styles.privacyImage]} source={privacy == "public" ? require('./img/worldwide.png') : require('./img/friends.png')}></Image>
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.stake, {marginTop: 5}]}>{ismonetary ? "$" : ""}{stake}</Text>
        </View>

        <View style={[styles.betDetailsContainer]}>
          <View style={[styles.userImageContainer]}>
            <Image style={[styles.participantImage]} source={participantimage}></Image>
          </View>
          <View style={[styles.betDetails]}>
            <Text style={[styles.betDescription]}>{betdesc}</Text>
            {this.getButtons(this.props)}
          </View>
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
    justifyContent: 'center'
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
    marginBottom: -3,
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

export default CCard