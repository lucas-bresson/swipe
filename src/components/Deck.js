import React, { useRef, useMemo } from 'react';
import { View, PanResponder, Animated, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_TRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({ data, renderCard, onSwipeLeft, onSwipeRight }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // dx, dy are the accumulated distance of the gesture since the touch has started
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < -SWIPE_TRESHOLD) {
          forceSwipe('left');
        } else if (gesture.dx > SWIPE_TRESHOLD) {
          forceSwipe('right');
        } else {
          resetPosition();
        }
      },
    }),
  );

  const forceSwipe = direction => {
    const x = direction === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = direction => {
    direction === 'left' ? onSwipeLeft() : onSwipeRight();
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return renderCard(item);
    });
  };

  return <View>{renderCards()}</View>;
};

export default Deck;

// https://facebook.github.io/react-native/docs/panresponder
// https://facebook.github.io/react-native/docs/animated

/**
Why useRef? 

useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). 
The returned object will persist for the full lifetime of the component.

Since we want one animated value that we continually update we want it to persist through the full lifetime of the component, 
rather than being re-created each time the component updates (each time the count increments in this case).
 */
