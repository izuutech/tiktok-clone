import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';

const Marquee = ({text, duration = 5000}) => {
  const screenWidth = Dimensions.get('window').width;
  const textWidth = useRef(0);
  const translateX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth.current,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
  }, [duration]);

  const onLayout = event => {
    textWidth.current = event.nativeEvent.layout.width;
  };

  return (
    <View style={[styles.container, {width: textWidth.current}]}>
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
    backgroundColor: 'red',
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
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Marquee;
