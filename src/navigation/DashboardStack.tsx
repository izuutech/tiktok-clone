import {createStackNavigator} from '@react-navigation/stack';
import MyBottomTabs from './bottomTabs';

const Stack = createStackNavigator();

export default function DashboardStack({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={MyBottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
