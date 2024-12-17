import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './components/BottomMenuBar';
import { RootStackParamList } from './types';
// Auth Screens
import ForgotPasswordScreen from './src/screens/Auth/ForgotPasswordScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';

// Home Screens
import HomeScreen from './src/screens/Home/HomeScreen';
import GetStartedScreen from './src/screens/Home/GetStartedScreen';

// Teams Screens
import TeamsScreen from './src/screens/Teams/TeamsScreen';
import AddTeamScreen from './src/screens/Teams/AddTeamScreen';
import TeamDetailsScreen from './src/screens/Teams/TeamDetailsScreen';

// Events Screens
import AddEventScreen from './src/screens/Events/AddEventScreen';
import EventDetailsScreen from './src/screens/Events/EventDetailsScreen';
import EditEventScreen from './src/screens/Events/EditEventScreen';

// Bucketlists Screens
import BucketlistsScreen from './src/screens/Bucketlists/BucketlistsScreen';
import BucketlistDetailsScreen from './src/screens/Bucketlists/BucketlistDetailsScreen';

// Settings Screens
import GeneralSettingsScreen from './src/screens/Settings/GeneralSettingsScreen';

// Placeholder imports for missing screens (add these imports when available)
import CalendarScreen from './src/screens/Calendar/CalendarScreen';
import CalendarDetailsScreen from './src/screens/Calendar/CalendarDetailsScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import NotificationsScreen from './src/screens/Notifications/NotificationsScreen';
import NotificationsSettingsScreen from './src/screens/Notifications/NotificationsSettingsScreen';
import UserProfileScreen from './src/screens/Profile/UserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Forgot Password', headerShown: true }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: true }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up', headerShown: true }}
        />

        {/* Home Screens */}
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerShown: false }}
        />

        {/* Main App Navigator */}
        <Stack.Screen
          name="Main"
          component={AppNavigator}
          options={{ headerShown: false }}
        />

        {/* Teams Screens */}
        <Stack.Screen
          name="Teams"
          component={TeamsScreen}
          options={{ title: 'Teams', headerShown: true }}
        />
        <Stack.Screen
          name="AddTeam"
          component={AddTeamScreen}
          options={{ title: 'Add a Team', headerShown: true }}
        />
        <Stack.Screen
          name="TeamDetails"
          component={TeamDetailsScreen}
          options={{ title: 'Team Details', headerShown: true }}
        />

        {/* Events Screens */}
        <Stack.Screen
          name="AddEvent"
          component={AddEventScreen}
          options={{ title: 'Add Event', headerShown: true }}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ title: 'Event Details', headerShown: false }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{ title: 'Edit Event', headerShown: true }}
        />

        {/* Bucketlists Screens */}
        <Stack.Screen
          name="Bucketlists"
          component={BucketlistsScreen}
          options={{ title: 'Bucketlists', headerShown: true }}
        />
        <Stack.Screen
          name="BucketlistDetails"
          component={BucketlistDetailsScreen}
          options={{ title: 'Bucketlist Details', headerShown: true }}
        />

        {/* Calendar Screens */}
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: 'Calendar', headerShown: true }}
        />
        <Stack.Screen
          name="CalendarDetails"
          component={CalendarDetailsScreen}
          options={{ title: 'Calendar Details', headerShown: true }}
        />

        {/* General Screens */}
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Dashboard', headerShown: true }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications', headerShown: true }}
        />
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsSettingsScreen}
          options={{ title: 'Notifications Settings', headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ title: 'Profile', headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={GeneralSettingsScreen}
          options={{ title: 'Settings', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
