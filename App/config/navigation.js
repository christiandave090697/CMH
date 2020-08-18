import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import Initial from '../screens/Auth/Initial';

import Home from '../screens/Main/Home';
import Library from '../screens/Main/Library';
import Search from '../screens/Main/Search';
import Category from '../screens/Main/Category';

import Featured from '../screens/HomeTabs/Featured'
import Artists from '../screens/HomeTabs/Artists'
import Playlist from '../screens/HomeTabs/Playlist';
import Albums from '../screens/HomeTabs/Albums'

import BottomTab from '../components/BottomTab';
import HomeTabs from '../components/HomeTabs';

import SubCategory from '../screens/Main/Category/subCategory';


const authStack = createStackNavigator();
const appStack = createStackNavigator();
const mainTabStack = createBottomTabNavigator();
const homeTabStack = createMaterialTopTabNavigator();
const categoryStack = createStackNavigator();




const MainTabStackScreen = () => (
  <mainTabStack.Navigator tabBar={(props) => <BottomTab {...props} />}>
    <mainTabStack.Screen name="Home" component={HomeTabStack} />
    <mainTabStack.Screen name="Search" component={Search} />
    <mainTabStack.Screen name="Category" component={CategoryStackScreen} />
    <mainTabStack.Screen name="Library" component={Library} />
  </mainTabStack.Navigator>
);

const HomeTabStack = () => (
  <homeTabStack.Navigator swipeEnabled={false}  tabBar={(props) => <HomeTabs {...props} />}>
    <homeTabStack.Screen name="Featured" component={Featured} />
    <homeTabStack.Screen name="Artists" component={Artists} />
    <homeTabStack.Screen name="Albums" component={Albums} />
    <homeTabStack.Screen name="Playlist" component={Playlist} />
  </homeTabStack.Navigator>
);

const CategoryStackScreen = () => (
  <categoryStack.Navigator screenOptions={{headerShown: false}}>
    <categoryStack.Screen name="CategoryIndex" component={Category} />
    <categoryStack.Screen name="SubCategory" component={SubCategory} />
  </categoryStack.Navigator>
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
    {/* <appStack.Screen
      name="Auth"
      component={AuthStackScreen}
      options={{headerShown: false}}
    /> */}
    <appStack.Screen name="Main" component={MainTabStackScreen} />
  </appStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppStackScreen />
  </NavigationContainer>
);
