import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const Marquee = ({
  text,
  duration = 5000,
}: {
  text: string;
  duration?: number;
}) => {
  const [textWidth, setTextWidth] = useState(0);
  const translateX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
  }, [textWidth, text, duration]);

  const onLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, {width: textWidth}]}>
      <Animated.View
        style={[
          styles.marqueeContainer,
          {transform: [{translateX: translateX}]},
        ]}>
        <Text style={styles.text} numberOfLines={1} onLayout={onLayout}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 20,
    justifyContent: 'center',
  },
  marqueeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    lineHeight: 17,
    color: 'white',
  },
});

export default Marquee;
