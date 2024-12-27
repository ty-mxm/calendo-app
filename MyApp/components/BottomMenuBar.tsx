import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../src/screens/Home/HomeScreen';
import TeamsScreen from '../src/screens/Teams/TeamsScreen';
import NotificationsScreen from '../src/screens/Notifications/NotificationsScreen';
import UserProfileScreen from '../src/screens/Profile/UserProfileScreen';
import AddEventScreen from '../src/screens/Events/AddEventScreen';



const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#7F57FF',
        tabBarInactiveTintColor: '#555',
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />

      {/* Teams Tab */}
      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="group" size={26} color={color} />
          ),
          tabBarLabel: 'Teams',
        }}
      />

      

      {/* Central Button for Adding Event */}
      <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.centralButton}
              onPress={(event) => props.onPress && props.onPress(event)}
            >
              <View style={styles.buttonInner}>
                <Ionicons name="add" size={26} color="#FFF" />
              </View>
            </TouchableOpacity>
          ),
          tabBarLabel: '',
        }}
      />

 

      {/* Notifications Tab */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={22} color={color} />
          ),
          tabBarLabel: 'Notif',
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF',
    height: 60,
    borderTopWidth: 0,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  centralButton: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    backgroundColor: '#7F57FF',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F57FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});
