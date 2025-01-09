import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './components/BottomMenuBar';
import { RootStackParamList, Event } from './types';
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
import AddBucketListScreen from './src/screens/Bucketlists/AddBucketListScreen';

// Vote Screens
import VoteScreen from './src/screens/Votes/VoteScreen';


// Settings Screens
import GeneralSettingsScreen from './src/screens/Settings/GeneralSettingsScreen';
import SyncCalendarScreen from './src/screens/Settings/SyncCalendarScreen'

// Placeholder imports for missing screens (add these imports when available)
import CalendarScreen from './src/screens/Calendar/CalendarScreen';
import CalendarDetailsScreen from './src/screens/Calendar/CalendarDetailsScreen';

import NotificationsScreen from './src/screens/Notifications/NotificationsScreen';
import NotificationsSettingsScreen from './src/screens/Notifications/NotificationsSettingsScreen';
import UserProfileScreen from './src/screens/Profile/UserProfileScreen';
import ChangePasswordScreen from './src/screens/Profile/ChangePasswordScreen'

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
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
          options={{headerShown: false }}
        />

        {/* Main App Navigator */}
        <Stack.Screen
          name="Main"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
{/* Teams Screens */}
<Stack.Group screenOptions={{ presentation: 'card' }}>
  <Stack.Screen
    name="Teams"
    component={TeamsScreen}
    options={{
      headerShown: true,
      headerTitle: "Mes Équipes",
      headerBackTitle: "Retour",
    }}
  />
  <Stack.Screen
    name="AddTeam"
    component={AddTeamScreen}
    options={{
      headerShown: true,
      headerTitle: "Ajouter une équipe",
      headerBackTitle: "Retour",
      presentation: 'modal', // Défini comme une modal pour un style distinct
    }}
  />
  <Stack.Screen
    name="TeamDetails"
    component={TeamDetailsScreen}
    options={{
      headerShown: true,
      headerTitle: "Détails de l'équipe",
      headerBackTitle: "Retour",
    }}
  />
</Stack.Group>
 {/* VOte Screens */}
 <Stack.Screen
 name="VoteScreen"
 component={VoteScreen}
 options={{ title: 'Votes', headerShown: false }}
 />


        {/* Events Screens */}
        <Stack.Screen
  name="AddEvent"
  component={AddEventScreen}
  options={{
    headerShown: true,
    headerTitle: 'Créer un nouvel événement',
    headerStyle: {
      backgroundColor: '#7F57FF',
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }}
/>

        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={{ title: 'Event Details', headerShown: false }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{ title: 'Edit Event', headerShown: false }}
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
        <Stack.Screen
  name="AddBucketlist"
  component={AddBucketListScreen}
  options={{
    title: 'Ajouter une Bucketlist',
    headerShown: true,
    headerBackTitle: 'Retour',
  }}
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
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications', headerShown: false }}
        />
        <Stack.Screen
          name="NotificationsSettings"
          component={NotificationsSettingsScreen}
          options={{ title: 'Notifications Settings', headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ title: 'Profile', headerShown: true }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{
            title: 'Change Password',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={GeneralSettingsScreen}
          options={{ title: 'Settings', headerShown: true }}
        />
        <Stack.Screen
          name="SyncCalendar"
          component={SyncCalendarScreen}
          options={{
            title: 'Sync Calendar',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}