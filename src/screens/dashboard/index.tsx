import * as React from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Following from './Following';
import Fyp from './FYP';
import RouteContext from '../../contexts/routecontext';

const renderScene = SceneMap({
  following: Following,
  fyp: Fyp,
});

export default function Dashboard() {
  const layout = useWindowDimensions();
  const {setToggle} = React.useContext(RouteContext);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'following', title: 'Following'},
    {key: 'fyp', title: 'For You'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      getLabelText={({route}) => (
        <Text style={{color: 'white'}}>{route.title}</Text>
      )}
      indicatorStyle={{
        backgroundColor: '#ffffff00',
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff00',
      }}
      style={{
        backgroundColor: '#ffffff00',
        // position: 'absolute',
        display: 'none',
        zIndex: 10,
        top: 70,
        left: 0,
      }}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      onSwipeEnd={() => setToggle((prev: boolean) => !prev)}
    />
  );
}
