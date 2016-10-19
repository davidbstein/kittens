import React, {Component} from 'react'
import {Kittens} from './kittens'
import {
  AppRegistry,
  Text,
  View
} from 'react-native';


class main extends Component {
  render() {
    return <Kittens/>
  }
}

AppRegistry.registerComponent('kittens', () => main);
