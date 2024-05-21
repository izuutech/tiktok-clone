import {useRoute} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RouteContext from '../contexts/routecontext';

export default function TabIndicator({
  route,
  jumpTo,
}: {
  route: {key: string; title: string};
  jumpTo: (key: string) => void;
}) {
  const {setToggle} = useContext(RouteContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setToggle((prev: boolean) => !prev);
          jumpTo('following');
        }}>
        <Text
          style={[
            styles.text,
            {color: route.key === 'following' ? 'white' : '#ffffff60'},
          ]}>
          Following
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setToggle((prev: boolean) => !prev);
          jumpTo('fyp');
        }}>
        <Text
          style={[
            styles.text,
            {color: route.key === 'fyp' ? 'white' : '#ffffff80'},
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
    height: 100,
    justifyContent: 'center',
    paddingVertical: 30,
    top: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
});
