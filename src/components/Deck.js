import React, { useMemo } from 'react';
import { View, PanResponder, Animated } from 'react-native';

const Deck = ({ data, renderCard }) => {
  const position = new Animated.ValueXY();
  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {},
    }),
  );

  const renderCards = () => data.map(item => renderCard(item));

  return (
    <Animated.View {...panResponder.panHandlers} style={position.getLayout()}>
      {renderCards()}
    </Animated.View>
  );
};

export default Deck;

// Animated.spring(position, {
//   toValue: { x: 200, y: 500}
// }).start()
