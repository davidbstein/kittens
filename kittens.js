import React, {Component} from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {KITTEN_IMAGES} from './kitten_images'
import {styles, WIDTH, HEIGHT} from './styles'

const LEFT = 0;
const TOP = 1;
const RIGHT = 2;
const BOT = 3;
const IMG_WIDTH = WIDTH / 4;
const IMG_HEIGHT = IMG_WIDTH * 1.5;
const KITTEN_DURATION = 3000;


class KittenImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slidePerc: new Animated.Value(0),
    };
  }
  gen_style() {
    let style = {
      position: "absolute",
      width: IMG_WIDTH,
      height: IMG_HEIGHT,
      transform: [],
      flex: 1
    }
    switch (this.props.side){
      case LEFT:
        return {
          ...style,
          left: 0,
          top: ((HEIGHT - IMG_WIDTH) * this.props.position),
          transform: [
            ...style.transform,
            {rotate: "90deg"},
            {translateY: this.state.slidePerc}
          ]
        }
      case RIGHT:
        return {
          ...style,
          right: 0,
          top: ((HEIGHT - IMG_WIDTH) * this.props.position),
          transform: [
            ...style.transform,
            {rotate: "270deg"},
            {translateY: this.state.slidePerc}
          ]
        }
      case TOP:
        return {
          ...style,
          top: 0,
          left: ((WIDTH - IMG_WIDTH) * this.props.position),
          transform: [
            ...style.transform,
            {rotate: "180deg"},
            {translateY: this.state.slidePerc}
          ]
        }
      case BOT:
        return {
          ...style,
          bottom: 0,
          left: ((WIDTH - IMG_WIDTH) * this.props.position),
          transform: [
            ...style.transform,
            {rotate: "0deg"},
            {translateY: this.state.slidePerc}
          ]
        }
      default:
        return style
    }
  }
  render() {
    console.log("foobar" + JSON.stringify(this.gen_style()));
    return (
      <Animated.Image
        source={KITTEN_IMAGES[this.props.kitten_num]}
        style={this.gen_style()}
      />
    );
  }
  componentDidMount() {
    this.state.slidePerc.setValue(IMG_HEIGHT);
    Animated.sequence([
    Animated.spring(
      this.state.slidePerc,
      {
        toValue: 30,
        bounciness: 10
      }
    ),
    Animated.delay(KITTEN_DURATION - 2000),
    Animated.timing(
      this.state.slidePerc,
      {
        toValue: IMG_HEIGHT,
        duration: 400
      })
    ]
    ).start();
  }
}


export class Kittens extends Component {
  constructor(props){
    super(props);
    this.state = {
      kittens: [],
      time: 0
    };
    this.counter = 0;
  }
  _removeCat(){
    this.setState({
      kittens: this.state.kittens.slice(1)
    })
  }
  _incrementTime(){
    this.setState({
      time: this.state.time+1
    })
  }
  _onPress() {
    new_kitten = {
      id: this.counter++,
      kitten_num: Math.floor(Math.random() * KITTEN_IMAGES.length),
      side: Math.floor(Math.random() * 4),
      position: Math.random(),
    }
    this.setState({
      kittens: [...this.state.kittens, new_kitten]
    });
    setTimeout(this._removeCat.bind(this), KITTEN_DURATION);
  }
  render() {
    return (
      <TouchableHighlight
        onPress={this._onPress.bind(this)}
        underlayColor="#ffffff"
        style={styles.container}
        >
        <View style={styles.innerContainer}>
          <Image source={require("./img/title.png")}/>
          {this.state.kittens.map(kitten =>
          <KittenImg
            key={kitten.id}
            kitten_num={kitten.kitten_num}
            side={kitten.side}
            position={kitten.position}
          />
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
