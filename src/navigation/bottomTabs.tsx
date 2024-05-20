import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import Dashboard from '../screens/dashboard';
import MyTabBar from '../components/MyTabBar';

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
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Add"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Inbox"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <RootBottomTab.Screen
        name="Me"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

      {/* <RootBottomTab.Screen
        name="UserCampaigns"
        component={UserCampaigns}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      /> */}
    </RootBottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
