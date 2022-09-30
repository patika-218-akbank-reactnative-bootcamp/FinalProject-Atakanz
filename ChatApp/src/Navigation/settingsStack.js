import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../Pages/Settings';
import EditProfile from '../Pages/EditProfile';

const Stack = createNativeStackNavigator();

export function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsScreen" component={Settings} />
      <Stack.Screen name="EditProfileScreen" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default SettingStack;