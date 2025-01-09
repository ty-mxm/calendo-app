import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GetStartedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Titre principal */}
      <Text style={styles.title}>Synchronisez votre calendrier avec vos amis</Text>

      {/* Boutons de synchronisation */}
      <TouchableOpacity style={styles.syncButton}>
        <Text style={styles.syncButtonText}>Synchroniser avec Google Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.syncButtonBlack}>
        <Text style={styles.syncButtonText}>Synchroniser avec Apple Calendar</Text>
      </TouchableOpacity>

      {/* Bouton pour commencer */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Main' as never)}
      >
        <Text style={styles.getStartedButtonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  syncButton: {
    backgroundColor: '#6495ED', // Bleu cornflower
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  syncButtonBlack: {
    backgroundColor: '#000', // Noir
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 30,
    width: '80%',
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  getStartedButton: {
    backgroundColor: '#7F57FF', // Violet
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  getStartedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
