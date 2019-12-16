import React from 'react';
import { View } from 'react-native';

const Ball = () => <View style={styles.ball}></View>;

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
};

export default Ball;
