import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {styles} from './styles'


export class Kittens extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats: [],
      time: 0
    };
    setInterval(this._incrementTime.bind(this), 100);
  }
  _removeCat(){
    this.setState({cats: this.state.cats.slice(1)})
  }
  _incrementTime(){
    this.setState({time: this.state.time+1})
  }
  _onPress() {
    console.log("Kittens?");
    this.setState({cats: [...this.state.cats, this.state.time]});
    setTimeout(this._removeCat.bind(this), 2000);
  }
  render() {
    return (
      <TouchableHighlight
        onPress={this._onPress.bind(this)}
        style={styles.container}
        underlayColor="#ffffff"
        >
        <View>
          <Text style={styles.welcome}>
            Hello Wrold!
          </Text>
          <Text style={styles.instructions}>
            {this.state.time}
          </Text>
          <Text style={styles.instructions}>
            {JSON.stringify(this.state.cats)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

