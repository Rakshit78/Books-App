import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Boolist from '../components/Booklist';
import FavList from '../components/FavList';
const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='MyTabs' options={{ headerShown: false }}>
      <Stack.Screen
        name='MyTabs'
        component={MyTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#101010' },
      }}
    >
      <Tab.Screen
        name='BookList'
        component={Boolist}
        options={{
          title: 'BookList',
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name='list-alt'
                size={24}
                color={focused ? '#C4B4A0' : '#3A3A3A'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Fav'
        component={FavList}
        options={{
          title: 'Fav',
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name='heart'
                size={24}
                color={focused ? '#C4B4A0' : '#3A3A3A'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
