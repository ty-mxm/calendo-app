import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Interface pour les événements
interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  category: string;
}

const DashboardScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: '🍳 Breakfast at restaurant', location: '123 Main St', date: '2023-12-15', time: '10:00 - 12:00', category: 'Food' },
    { id: '2', title: '🏃‍♂️ Running in the park', location: 'Central Park', date: '2023-12-16', time: '14:00 - 15:30', category: 'Exercise' },
    { id: '3', title: '🎬 Movie night', location: 'Cinema City', date: '2023-12-20', time: '19:00 - 22:00', category: 'Leisure' },
    { id: '4', title: '🧘‍♀️ Yoga Class', location: 'Fitness Center', date: '2023-12-20', time: '07:00 - 08:00', category: 'Wellness' },
    { id: '5', title: '🍽️ Dinner with friends', location: 'Restaurant XYZ', date: '2023-12-21', time: '18:00 - 20:00', category: 'Social' },
  ]);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const renderEventCard: ListRenderItem<Event> = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDetails}>📍 {item.location}</Text>
      <Text style={styles.eventDetails}>⏰ {item.time}</Text>
      <Text style={styles.eventCategory}>{item.category}</Text>
    </View>
  );

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📅 Sync Your Calendar With Your Team</Text>
        <TouchableOpacity style={styles.syncButton}>
          <Text style={styles.syncButtonText}>Sync with Google Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.syncButtonBlack}>
          <Text style={styles.syncButtonText}>Sync with Apple Calendar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#87CEEB' },
          }}
          theme={{
            selectedDayBackgroundColor: '#87CEEB',
            todayTextColor: '#FFA500',
            arrowColor: '#FF69B4',
          }}
        />
      </View>
      <Text style={styles.subHeader}>Upcoming Events</Text>
    </View>
  );

  return (
    <FlatList
      data={selectedDate ? filteredEvents : events}
      keyExtractor={(item) => item.id}
      renderItem={renderEventCard}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  syncButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  syncButtonBlack: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
  eventCategory: {
    fontSize: 12,
    color: '#FFA500',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default DashboardScreen;
