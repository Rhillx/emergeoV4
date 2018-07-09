/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {app, auth, database} from './src/firebase';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
// location imports
import {accessPosition, watchPosition} from './src/actions/location_actions';
import rootReducers from './src/reducers';
// screens and components
import StartScreen from './src/components/StartScreen.js';
import ChatScreen from './src/components/Chat.js';
import CreateProfile from './src/components/CreateProfile.js';
import ProfileHome from './src/components/ProfileHome.js';
import ServiceList from './src/components/ServiceList.js';
import Auth from './src/components/Auth.js';


const AppStackNavigator = createStackNavigator({
  StartScreen: {screen: StartScreen},
    CreateProf: {screen: CreateProfile},
    MyProfile: {screen: ProfileHome},
    Message: {screen: ChatScreen}
})



class App extends Component {
  state = { loggedIn: null, currentUser: null}
componentWillMount(){
  app;

  auth.onAuthStateChanged(user=>{
    if(user){
      this.setState({loggedIn: true, currentUser: user.uid});
      this._requestLocation();
    };
  });

  

}


_requestLocation = async () =>{
  try{
    let status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      if(status === PermissionsAndroid.RESULTS.GRANTED){
        console.log('yoo')
      } else {
        console.log('ACESS DENIED')
      }
  } catch (err){
    console.warn(err)
  }
}





  render() {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(rootReducers);
    const {loggedIn, currentUser} = this.state;
    console.log(this.props)
    

    return (

      
      <Provider store={store}>
        <View style={styles.container}>
          <ServiceList screenProps={{loggedIn, currentUser}}/>
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default App;