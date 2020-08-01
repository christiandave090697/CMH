import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import Initial from '../screens/Auth/Initial';

import Home from '../screens/Main/Home';
import Library from '../screens/Main/Library';
import Search from '../screens/Main/Search';
import Category from '../screens/Main/Category';

import BottomTab from '../components/BottomTab';

const authStack = createStackNavigator();
const appStack = createStackNavigator();
const mainTabStack = createBottomTabNavigator();

const MainTabStackScreen = () => (
  <mainTabStack.Navigator tabBar={(props) => <BottomTab {...props} />}>
    <mainTabStack.Screen name="Home" component={Home} />
    <mainTabStack.Screen name="Search" component={Search} />
    <mainTabStack.Screen name="Category" component={Category} />
    <mainTabStack.Screen name="Library" component={Library} />
  </mainTabStack.Navigator>
);

const AuthStackScreen = () => (
  <authStack.Navigator screenOptions={{headerShown: false}}>
    <authStack.Screen name="Initial" component={Initial} />
    <authStack.Screen name="Login" component={Login} />
    <authStack.Screen name="Register" component={Register} />
  </authStack.Navigator>
);

const AppStackScreen = () => (
  <appStack.Navigator>
    <appStack.Screen
      name="Auth"
      component={AuthStackScreen}
      options={{headerShown: false}}
    />
    <appStack.Screen name="Main" component={MainTabStackScreen} />
  </appStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppStackScreen />
  </NavigationContainer>
);
