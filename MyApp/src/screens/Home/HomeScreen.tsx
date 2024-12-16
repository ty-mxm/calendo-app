import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Event } from '../../types';;

// Typage de la navigation
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Bienvenue sur Calendo</Text>
            <Text style={styles.headerSubtitle}>Gardez un œil sur vos prochains événements</Text>
          </View>
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
          />
        </>
      )}
      contentContainerStyle={styles.contentContainer}
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
  contentContainer: { paddingBottom: 20 },
  header: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#7F57FF' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 18, color: '#E0E0E0' },
  eventCard: { backgroundColor: '#FFF', padding: 16, borderLeftWidth: 5, marginVertical: 8 },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  eventDetails: { fontSize: 14, color: '#666' },
  eventCategory: { fontSize: 12, fontWeight: 'bold', color: '#666' },
});
