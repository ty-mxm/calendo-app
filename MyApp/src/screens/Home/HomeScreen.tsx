import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Event } from  '../../../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events] = useState<Event[]>([
    { id: '1', title: '🍳 Petit-déjeuner au restaurant', location: '123 Rue Principale', date: '2023-12-15', time: '10:00 - 12:00', category: 'Nourriture' },
    { id: '2', title: '🏃‍♂️ Course au parc', location: 'Parc Central', date: '2023-12-16', time: '14:00 - 15:30', category: 'Exercice' },
    { id: '3', title: '🎬 Soirée cinéma', location: 'Cinéma City', date: '2023-12-20', time: '19:00 - 22:00', category: 'Loisir' },
  ]);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const renderEventCard: ListRenderItem<Event> = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      {renderEvent(item)}
    </TouchableOpacity>
  );

  const renderEvent = (event: Event) => (
    <View style={[styles.eventCard, getCategoryStyle(event.category)]}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventDetails}>📍 {event.location}</Text>
      <Text style={styles.eventDetails}>⏰ {event.time}</Text>
      <Text style={styles.eventCategory}>{event.category}</Text>
    </View>
  );

  return (
    <FlatList
      data={selectedDate ? filteredEvents : events}
      keyExtractor={(item) => item.id}
      renderItem={renderEventCard}
      ListHeaderComponent={() => (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bienvenue sur Calendo</Text>
            <Text style={styles.headerSubtitle}>Gardez un œil sur vos prochains événements</Text>
          </View>

          {/* Calendrier */}
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#87CEEB' },
            }}
            theme={{
              todayTextColor: '#FF69B4',
              arrowColor: '#7F57FF',
              textSectionTitleColor: '#7F57FF',
            }}
            style={styles.calendar}
          />

          {/* Séparateur avec bouton "Ajouter un événement" */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddEvent')}
            >
              <Ionicons name="add-circle-outline" size={30} color="#7F57FF" />
              <Text style={styles.addButtonText}>Ajouter un événement</Text>
            </TouchableOpacity>
            <View style={styles.separatorLine} />
          </View>

          {/* Sous-titre */}
          <Text style={styles.subHeader}>Prochains événements</Text>
        </>
      )}
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Nourriture':
      return { borderLeftColor: '#FFA07A' };
    case 'Exercice':
      return { borderLeftColor: '#40E0D0' };
    case 'Loisir':
      return { borderLeftColor: '#FFD700' };
    default:
      return { borderLeftColor: '#E0E0E0' };
  }
};

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 30 },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#7F57FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0' },
  calendar: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7F57FF',
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#7F57FF',
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 16,
  },
  eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  eventDetails: { fontSize: 14, color: '#666' },
  eventCategory: { fontSize: 12, fontWeight: 'bold', color: '#7F57FF' },
});