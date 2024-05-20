import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const homeIcon = require('../assets/homeIcon.png');
const homeIconActive = require('../assets/homeIconActive.png');
const bellIcon = require('../assets/bellIcon.png');
const bellIconActive = require('../assets/bellIconActive.png');
const accountIcon = require('../assets/accountIcon.png');
const accountIconActive = require('../assets/accountIconActive.png');

export default function MyTabBar({state, descriptors, navigation}: any) {
  const showBottomBar = true;
  return (
    <View style={{backgroundColor: 'black'}}>
      <View
        style={[
          styles.container,
          {
            display: showBottomBar ? 'flex' : 'none',
            backgroundColor: 'black',
            bottom: 0,
          },
        ]}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, {});
              // navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          console.log({isFocused});
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}>
              {isFocused ? (
                <>
                  {route.name === 'Dashboard' ? (
                    <View style={styles.menubox}>
                      <Entypo name="home" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : route.name === 'Discover' ? (
                    <View style={styles.menubox}>
                      <Feather name="search" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : route.name === 'Add' ? (
                    <View style={[styles.addbox]}>
                      <FontAwesome6
                        name="plus"
                        size={24}
                        style={styles.menu}
                        color="black"
                      />
                    </View>
                  ) : route.name === 'Inbox' ? (
                    <View style={styles.menubox}>
                      <MaterialCommunityIcons
                        name="message-minus"
                        size={24}
                        color="white"
                      />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : (
                    <View style={styles.menubox}>
                      <Entypo name="home" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  )}
                </>
              ) : (
                <>
                  {route.name === 'Home' ? (
                    <View style={styles.menubox}>
                      <Ionicons name="home-outline" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : route.name === 'Discover' ? (
                    <View style={styles.menubox}>
                      <Feather name="search" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : route.name === 'Add' ? (
                    <View style={[styles.addbox]}>
                      <FontAwesome6
                        name="plus"
                        size={24}
                        style={styles.menu}
                        color="black"
                      />
                    </View>
                  ) : route.name === 'Inbox' ? (
                    <View style={styles.menubox}>
                      <MaterialCommunityIcons
                        name="message-minus-outline"
                        size={24}
                        color="white"
                      />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  ) : (
                    <View style={styles.menubox}>
                      <AntDesign name="user" size={24} color="white" />
                      <Text style={styles.menutxt}>{label}</Text>
                    </View>
                  )}
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  menubox: {
    // width: '15%',
    height: 90,
    alignItems: 'center',
  },
  menutxt: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  addbox: {
    width: 70,
    height: 30,
    marginBottom: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menu: {
    position: 'absolute',
  },
});
