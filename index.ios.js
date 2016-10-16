import React, {Component} from 'react'
import {Kittens} from './kittens'
import {
  AppRegistry,
  Text,
  View
} from 'react-native';


class main extends Component {
  info(){
    return ""+ KittenTest
  }
  render() {
    // return <View><Text>{this.info()}</Text></View>
    return <Kittens/>
  }
}

AppRegistry.registerComponent('kittens', () => main);
