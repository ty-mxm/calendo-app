import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EventDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breakfast at restaurant</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>⏰ 10:30 - 12:00</Text>
        <Text style={[styles.detailText, styles.linkText]}>📍 3214 rue globe, H92 3T4</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.description}>
          Meet directly  at the restaurant.
        </Text>
      </View>

      <View style={styles.participantsContainer}>
        <Text style={styles.sectionTitle}>Participants</Text>
        <Text style={styles.participantName}>Camille Hella</Text>
        <Text style={styles.participantName}>Fati Johnson</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>I'm coming</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  participantsContainer: {
    marginBottom: 20,
  },
  participantName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
