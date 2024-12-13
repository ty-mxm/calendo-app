import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../src/screens/Home/HomeScreen';
import AddTeamScreen from '../src/screens/Teams/AddTeamScreen';
import TeamsScreen from '../src/screens/Teams/TeamsScreen';
import NotificationsScreen from '../src/screens/Notifications/NotificationsScreen';
import UserProfileScreen from '../src/screens/Profile/UserProfileScreen';
import AddEventScreen from '../src/screens/Events/AddEventScreen';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Pas d'entête en haut
        tabBarStyle: styles.tabBar, // Style de la barre
        tabBarShowLabel: true, // Afficher les labels des onglets
        tabBarActiveTintColor: '#7F57FF', // Couleur active
        tabBarInactiveTintColor: '#555', // Couleur inactive
      }}
    >
      {/* Onglet Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />

      {/* Onglet Teams */}
      <Tab.Screen
        name="Teams"
        component={TeamsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
          tabBarLabel: 'Teams',
        }}
      />

      {/* Bouton central pour ajouter un événement */}
      <Tab.Screen
  name="AddEvent"
  component={AddEventScreen}
  options={{
    tabBarButton: (props: BottomTabBarButtonProps) => {
      // Gestion des valeurs par défaut pour éviter les problèmes de typage
      const style = props.style || {};
      const delayLongPress = props.delayLongPress ?? 0; // Utilise 0 si null/undefined
      const disabled = props.disabled ?? false; // Utilise false si null/undefined

      return (
        <TouchableOpacity
          style={[styles.addButton, style as ViewStyle]} // Ajout du style personnalisé
          onPress={(event) => props.onPress && props.onPress(event)}
          delayLongPress={delayLongPress} // Passe la valeur corrigée
          disabled={disabled} // Passe la valeur corrigée
        >
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      );
    },
    tabBarLabel: '', // Pas de label sous le bouton central
  }}
/>


      {/* Onglet Notifications */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Notif',
        }}
      />

      {/* Onglet Profile */}
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
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
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    height: 70, // Hauteur de la barre
  },
  addButton: {
    backgroundColor: '#7F57FF',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Remonte légèrement le bouton
    shadowColor: '#7F57FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
