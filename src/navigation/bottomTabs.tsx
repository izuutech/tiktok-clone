import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Dashboard from '../screens/dashboard';
import MyTabBar from '../components/MyTabBar';
import EmptyScreen from '../screens/others/EmptyScreen';

export type RootBottomTabParamList = {
  Home: undefined;
  Discover: undefined;
  Add: undefined;
  Inbox: undefined;
  Me: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function MyBottomTabs({}) {
  return (
    <RootBottomTab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <RootBottomTab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Discover"
        component={EmptyScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Add"
        component={EmptyScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Inbox"
        component={EmptyScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Me"
        component={EmptyScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </RootBottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
