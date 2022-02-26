import React, { Component } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import HistoryScreen from './screens/HistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import CDrawer from './components/CDrawer/CDrawer';
import GLOBAL from './screens/global.js'
import { addToBalance, getBalance, subtractFromBalance } from './api-functions/User';

const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {
    LogBox.ignoreAllLogs(true)
    super(props)
    GLOBAL.app = this;
  }

  state = {
    user_details: undefined
  }

  subtractFromBalance = (data) => {
    if (this.state.user_details) {
      subtractFromBalance(data, (res) => {
        this.setState({ user_details: {...this.state.user_details, balance: res.balance} })
      }, (e) => {
        console.log(e)
      });
    }
  }

  addToBalance = (data) => {
    if (this.state.user_details) {
      addToBalance(data, (res) => {
        this.setState({ user_details: {...this.state.user_details, balance: res.balance} })
      }, (e) => {
        console.log(e)
      });
    }
  }

  getBalance = () => {
    if (this.state.user_details) {
      getBalance(this.state.user_details.username, (res) => {
        if (res != this.state.user_details.balance) {
          this.setState({ user_details: {...this.state.user_details, balance: res} })
        }
      })
    }
  }

  render() {
    let { user_details } = GLOBAL.app && GLOBAL.app.state
    // return (
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //   </View>
    // )

    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slide" overlayColor="transparent"
          drawerContent={props => <CDrawer {...props}
            user_details={{...user_details, profile: { uri: user_details && user_details.imageUrl }, friendsCount: user_details && user_details.friendsList && user_details.friendsList.length }}>
            </CDrawer>}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={(props) => (<HomeScreen {...props} user_details={{...user_details, profile: { uri: user_details && user_details.imageUrl }}}></HomeScreen>)}/>
          <Drawer.Screen name="History" component={(props) => (<HistoryScreen {...props} user_details={{...user_details, profile: { uri: user_details && user_details.imageUrl }}}></HistoryScreen>)} />
          <Drawer.Screen name="Profile" component={(props) => (<ProfileScreen {...props} user_details={{...user_details, profile: { uri: user_details && user_details.imageUrl }}}></ProfileScreen>)} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;