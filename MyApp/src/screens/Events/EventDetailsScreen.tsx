import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EventDetailsScreen() {
  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>🍳 Breakfast at Restaurant</Text>

      {/* Détails de l'événement */}
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>⏰ 10:30 - 12:00</Text>
        <Text style={[styles.detailText, styles.linkText]}>📍 3214 rue Globe, H92 3T4</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>📝 Details</Text>
        <Text style={styles.description}>
          Meet directly at the restaurant.
        </Text>
      </View>

      {/* Participants */}
      <View style={styles.participantsContainer}>
        <Text style={styles.sectionTitle}>👥 Participants</Text>
        <Text style={styles.participantName}>Camille Hella</Text>
        <Text style={styles.participantName}>Fati Johnson</Text>
      </View>

      {/* Bouton de confirmation */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>I'm Coming</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  detailContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  participantsContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  participantName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#40E0D0',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#40E0D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
