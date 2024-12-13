import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Titre principal */}
      <Text style={styles.headerText}>Manage Your Teams & Events</Text>

      {/* Icône principale */}
      <Image
        style={styles.icon}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png', // Une icône d'équipe par défaut
        }}
      />

      {/* Boutons principaux */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={() => navigation.navigate('AddTeam' as never)}
          accessibilityLabel="Create a new team"
          accessible={true}
        >
          <Text style={styles.buttonText}>Create a Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.joinButton]}
          onPress={() => navigation.navigate('JoinTeam' as never)}
          accessibilityLabel="Join an existing team"
          accessible={true}
        >
          <Text style={styles.buttonText}>Join a Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.addEventButton]}
          onPress={() => navigation.navigate('AddEvent' as never)}
          accessibilityLabel="Add an event"
          accessible={true}
        >
          <Text style={styles.buttonText}>Add Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.viewEventButton]}
          onPress={() => navigation.navigate('EventDetails' as never)}
          accessibilityLabel="View an event"
          accessible={true}
        >
          <Text style={styles.buttonText}>View Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.notifButton]}
          onPress={() => navigation.navigate('Notifications' as never)}
          accessibilityLabel="View notifications"
          accessible={true}
        >
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.dashboardButton]}
          onPress={() => navigation.navigate('Dashboard' as never)}
          accessibilityLabel="Go to dashboard"
          accessible={true}
        >
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#40E0D0', // Turquoise
    boxShadow: '0px 4px 10px rgba(64, 224, 208, 0.4)', // Nouvelle syntaxe
  },
  joinButton: {
    backgroundColor: '#FF6CB8', // Rose pastel
    boxShadow: '0px 4px 10px rgba(255, 108, 184, 0.4)', // Nouvelle syntaxe
  },
  addEventButton: {
    backgroundColor: '#FFA500', // Orange vif
    boxShadow: '0px 4px 10px rgba(255, 165, 0, 0.4)', // Nouvelle syntaxe
  },
  viewEventButton: {
    backgroundColor: '#87CEEB', // Bleu clair
    boxShadow: '0px 4px 10px rgba(135, 206, 235, 0.4)', // Nouvelle syntaxe
  },
  notifButton: {
    backgroundColor: '#98FB98', // Vert clair
    boxShadow: '0px 4px 10px rgba(152, 251, 152, 0.4)', // Nouvelle syntaxe
  },
  dashboardButton: {
    backgroundColor: '#D3D3D3', // Gris clair
    boxShadow: '0px 4px 10px rgba(211, 211, 211, 0.4)', // Nouvelle syntaxe
  },
});
