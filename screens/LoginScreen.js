import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import CButton from '../components/CButton/CButton';
import { base_url } from '../api-functions/User'
import GLOBAL from './global.js'

class LoginScreen extends Component {

	state = {
		// For login
		lemail: "",
		lpassword: "",
		// For signup
		semail: "",
		spassword: "",
		firstname: "",
		lastname: "",
    repeatpw: "",
    username: "",
		select: 0,
	}

	constructor(props) {
		super(props)
		GLOBAL.login = this;
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			console.log("Logged out")
		//   this.setState({ userData: GLOBAL.login.state.user_details })
		});
	  }
	
	componentWillUnmount() {
		this._unsubscribe();
	}

	updateFName = (e) => {
		this.setState({firstname: e});
	}

	updateLName = (e) => {
		this.setState({lastname: e});
	}

	updateEmail = (e) => {
		this.setState({semail: e});
	}
	updatePW = (e) => {
		this.setState({spassword: e});
  }
  
  updateUsername = (e) => {
    this.setState({ username: e})
  }

	updateLEmail = (e) => {
		this.setState({lemail: e});
	}
	updateLPW = (e) => {
		this.setState({lpassword: e});
	}

	updatReapeatPW = (e) => {
		this.setState({repeatpw: e});
	}

	submitSignup = async (e) => {
		const {firstname, lastname, semail, spassword, repeatpw, username} = this.state

		console.log(firstname, lastname, semail, spassword, repeatpw, username)

		const params = {
			firstName: firstname,
			lastName: lastname,
			email: semail,
			password: spassword,
			confirmPassword: repeatpw,
			username: username,
		}

		try {
			fetch(base_url + "signUpUser", {
			  	method: "POST",
			  	body: JSON.stringify(params),
			}).then((data) =>
			  	data.json().then((res) => {
						// console.log("Sign up", res.newUser)
						if (res.newUser != undefined) {
							GLOBAL.login.setState({
								user_details: res.newUser,
								token: res.token
							}, () => {
								GLOBAL.app.setState({
									user_details: res.newUser,
									token: res.token
								}, () => {
									this.props.navigation.navigate('Home')
								})
							});
						} else {
							console.log(res)
						}
			  	})
			);
		} catch (err) {
			console.log(err)
		}
	}

	submitLogin = (e) => {
		const {lemail, lpassword} = this.state
		const params = {
			email: lemail,
			password: lpassword,
		}

		try {
			fetch(base_url + "loginUser", {
			  	method: "POST",
			  	body: JSON.stringify(params),
			}).then((data) =>
			  	data.json().then((res) => {
						// console.log("Login", res)
				if (res.userData != undefined) {
					GLOBAL.login.setState({
						user_details: res.userData,
						token: res.token
					}, () => {
						GLOBAL.app.setState({
							user_details: res.userData,
							token: res.token
						}, () => {
							this.props.navigation.navigate('Home')
						})
					});
				} else {
					console.log(res)
				}
			  })
			);
		} catch (err) {
			console.log(err)
		}
	}

	toggleSignupLogin = (e) => {
		this.setState({
			select: !this.state.select,
			// For login
			lemail: "",
			lpassword: "",
			// For signup
			semail: "",
			spassword: "",
			firstname: "",
			lastname: "",
			repeatpw: "",
		})
	}

  render() {

		const { firstname, lastname, semail, spassword, lemail, lpassword, repeatpw, select, username } = this.state;
		const { blue1, em } = require('../helpers/constants.json');

    return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
				<KeyboardAvoidingView behavior={"position"}>
				<View style={[styles.formContainer, {display: select ? 'none' : "flex" }]}>
					<Image style={styles.logo} source={require('./img/bet.png')}/>
					<View style={styles.firstRowContainer}>
						<TextInput
							style={{...styles.linput, flex: 1, marginRight: 7}}
							onChangeText={e => this.updateFName(e)}
							value={firstname}
							placeholder={"First"}
						/>
						<TextInput
							style={{...styles.linput, flex: 1, marginLeft: 7}}
							onChangeText={e => this.updateLName(e)}
							value={lastname}
							placeholder={"Last"}
						/>
					</View>
          <TextInput
						style={styles.linput}
						onChangeText={e => this.updateUsername(e)}
						value={username}
            placeholder={"Username"}
            autoCapitalize={"none"}
					/>
					<TextInput
						style={styles.linput}
						onChangeText={e => this.updateEmail(e)}
						value={semail}
            placeholder={"Email"}
            autoCapitalize={"none"}
					/>
					<TextInput
						style={styles.linput}
						onChangeText={e => this.updatePW(e)}
						value={spassword}
            placeholder={"Password"}
            secureTextEntry={true}
            autoCapitalize={"none"}
					/>
					<TextInput
						style={styles.linput}
						onChangeText={e => this.updatReapeatPW(e)}
						value={repeatpw}
            placeholder={"Repeat Password"}
            secureTextEntry={true}
            autoCapitalize={"none"}
					/>
					<CButton
						text={"Signup"}
						style={styles.button}
						color={blue1}
            onPress={e => this.submitSignup(e)}
            selected={true}
						></CButton>
					<Text onTouchEnd={this.toggleSignupLogin} style={{marginTop: em, fontSize: em - 2, color: blue1}}>Login</Text>
				</View>


				<View style={[styles.formContainer, {display: select ? 'flex' : "none" }]}>
					<Image style={styles.logo} source={require('./img/bet.png')}/>
					<TextInput
						style={styles.linput}
						onChangeText={e => this.updateLEmail(e)}
						value={lemail}
            placeholder={"Email"}
            autoCapitalize={"none"}
					/>
					<TextInput
						style={styles.linput}
						onChangeText={e => this.updateLPW(e)}
						value={lpassword}
            placeholder={"Password"}
            autoCapitalize={"none"}
            secureTextEntry={true}
					/>
					<CButton
						text={"Login"}
						style={styles.button}
						color={blue1}
            onPress={e => this.submitLogin(e)}
            selected={true}
						></CButton>
					<Text onTouchEnd={this.toggleSignupLogin} style={{marginTop: em, fontSize: em - 2, color: blue1}}>Signup</Text>
				</View>
				</KeyboardAvoidingView>
      </View>
    )
  }
}

const { em, gray } = require('../helpers/constants.json');
const styles = StyleSheet.create({
	formContainer: {
		display: 'flex',
		margin: 2 * em,
		marginTop: 10 * em,
		alignItems: 'center'
	},
	logo: {
		height: 10 * em,
		width: 10 * em,
		marginBottom: 2 * em,
	},
	firstRowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
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

export default LoginScreen