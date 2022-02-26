import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { updateBalance } from '../api-functions/User.js';
import CButton from '../components/CButton/CButton';
import GLOBAL from './global.js'

class ProfileScreen extends Component {

  state = {
    deposit_amount: 0,
  }

  constructor(props) {
    super(props)
    GLOBAL.profile = this;
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.updateScreen()
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateBalanceInput = (e) => {
    this.setState({ deposit_amount: e });
  }

  depositFunds = (e) => {
    console.log(e);
    updateBalance(e, (res) => {
      console.log("Funds deposited.")
    }, (e) => console.log(e))
  }

  updateScreen = () => {

    const { user_details } = this.props

    if (user_details != undefined) {

    }
  }

  render() {
    const { user_details } = this.props
    const { deposit_amount } = this.state
    return (
      <View style={[styles.container]}>
        <KeyboardAvoidingView behavior={"position"}>
          <View style={styles.formContainer}>
            <Text>Deposit Funds</Text>
            <TextInput
              style={{ ...styles.linput, flex: 1, marginRight: 7 }}
              onChangeText={e => this.updateBalanceInput(e)}
              value={deposit_amount}
              placeholder={"Deposit Amount ($)"}
            />
            <CButton
              text={"Deposit"}
              style={styles.button}
              color={blue1}
              onPress={e => this.depositFunds({ username: user_details.username, balance: deposit_amount })}
              selected={true}
            ></CButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const { blue1, em, gray } = require('../helpers/constants.json');
const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    margin: 2 * em,
    marginTop: 10 * em,
    alignItems: 'center',
    height: 10 * em,
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  historyview: {
    height: 40 * em,
    flex: 1,
  },
  linput: {
    height: 3 * em,
    borderColor: gray,
    borderWidth: 1,
    fontSize: em,
    borderRadius: em,
    padding: em / 2,
    width: '100%',
    marginTop: em,
  },
  button: {
    marginTop: 2 * em,
    width: 10 * em,
  }
})

export default ProfileScreen