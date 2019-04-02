import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  asset,
  Model,
  AmbientLight,
  PointLight,
  Animated
} from 'react-360';

import _ from 'lodash'

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class React360Demo extends React.Component {
  rotation = new Animated.Value(0);

  componentDidMount() {
    this.startModelRotate()
  }

  startModelRotate = () => {
    this.rotation.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.rotation, { toValue: 360, duration: 1000*5 }),
      ])
    )
      .start();
  }

  renderRotatingModels = (numModels = 10) => {
    models = []
    const getPosition = index => {
      let position = { x: 0, y: 0, z: 0 }

      const r = 10.35
      const cx = 0
      const cy = 0
      const a = Math.PI + parseFloat(index) * (Math.PI / (numModels / 2))
      position.x = cx + r * Math.cos(a)
      position.z = cy + r * Math.sin(a)
      return position
    }

    for (let x = 0; x < numModels; x++) {
      const pos = getPosition(x)
      models.push(
        <AnimatedModel
          lit={false}
          style={{
            transform: [
              {
                translate: [pos.x, pos.y, pos.z],
              },
              {
                scale: [10, 10, 10],
              }
              , {
                rotateY: this.rotation,
              }]
          }}
          source={{ gltf2: asset('cole.glb') }}
        />
      )
    }
    return models
  }

  render() {
    return (
      <View>
        <AmbientLight intensity={1.0} color={'#ffffff'} />
        <PointLight
          intensity={0.4}
          style={{ transform: [{ translate: [0, 4, -1] }] }}
        />
        {this.renderRotatingModels()}
      </View>
    );
  }
};

AppRegistry.registerComponent('React360Demo', () => React360Demo);