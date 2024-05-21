import React, {useState, useEffect} from 'react';
import {View, Image, Animated, Text} from 'react-native';

const EmptyScreen = ({}) => {
  const [bounceAnim] = useState(new Animated.Value(0));
  const bounceHeight = 20;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: bounceHeight,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Image
        source={require('../../assets/manthinking.png')}
        style={{
          width: '100%',
          height: 400,
          transform: [{translateY: bounceAnim}],
        }}
      />
      <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
        Joshua and Luupli
      </Text>
      <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>
        CAN change the World 😃😃
      </Text>
    </View>
  );
};

export default EmptyScreen;
