import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function TabIndicator({active}: {active: 'fyp' | 'following'}) {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text
          style={[
            styles.text,
            {color: active === 'following' ? 'white' : '#ffffff60'},
          ]}>
          Following
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={[
            styles.text,
            {color: active === 'fyp' ? 'white' : '#ffffff80'},
          ]}>
          For You
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 30,
    top: 50,
  },
  text: {
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
});
