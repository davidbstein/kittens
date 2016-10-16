import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Kittens} from './kittens'

class main extends Component {
  render() {
    return <Kittens />
  }
}

AppRegistry.registerComponent('kittens', () => main);
