import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DashboardScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([
    { id: '1', title: 'Breakfast at restaurant', location: '123 Main St', date: '2023-12-15', time: '10:00 - 12:00', category: 'Food' },
    { id: '2', title: 'Running in the park', location: 'Central Park', date: '2023-12-16', time: '14:00 - 15:30', category: 'Exercise' },
    { id: '3', title: 'Movie night', location: 'Cinema City', date: '2023-12-20', time: '19:00 - 22:00', category: 'Leisure' },
    { id: '4', title: 'Team Meeting', location: 'Office HQ', date: '2023-12-18', time: '09:00 - 10:30', category: 'Work' },
    { id: '5', title: 'Yoga Class', location: 'Fitness Center', date: '2023-12-20', time: '07:00 - 08:00', category: 'Wellness' },
    { id: '6', title: 'Dinner with friends', location: 'Restaurant XYZ', date: '2023-12-21', time: '18:00 - 20:00', category: 'Social' },
    { id: '7', title: 'Doctor Appointment', location: 'Clinic ABC', date: '2023-12-22', time: '11:00 - 12:00', category: 'Health' },
 
  ]);

  // Filtrer les événements par date sélectionnée
  const filteredEvents = events.filter((event) => event.date === selectedDate);

  return (
<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sync Your Calendar With Your Team</Text>
        <TouchableOpacity style={styles.syncButton}>
          <Text style={styles.syncButtonText}>Sync with Google Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.syncButtonBlack}>
          <Text style={styles.syncButtonText}>Sync with Apple Calendar</Text>
        </TouchableOpacity>
      </View>

      {/* Calendrier */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#7F57FF' },
            '2023-12-15': { marked: true, dotColor: '#7F57FF' },
            '2023-12-16': { marked: true, dotColor: '#7F57FF' },
            '2023-12-18': { marked: true, dotColor: '#7F57FF' },
            '2023-12-20': { marked: true, dotColor: '#7F57FF' },
            '2023-12-21': { marked: true, dotColor: '#7F57FF' },
            '2023-12-22': { marked: true, dotColor: '#7F57FF' },
            '2023-12-23': { marked: true, dotColor: '#7F57FF' },
            '2023-12-24': { marked: true, dotColor: '#7F57FF' },
            '2023-12-25': { marked: true, dotColor: '#7F57FF' },
          }}
          theme={{
            selectedDayBackgroundColor: '#7F57FF',
            todayTextColor: '#7F57FF',
            arrowColor: '#7F57FF',
            dotColor: '#7F57FF',
          }}
        />
      </View>

      {/* Prochains événements */}
      <Text style={styles.subHeader}>Upcoming Events</Text>
      {selectedDate && filteredEvents.length === 0 ? (
        <Text style={styles.noEvents}>No events scheduled for this date.</Text>
      ) : (
        (selectedDate ? filteredEvents : events).map((item) => (
          <View key={item.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDetails}>{item.location}</Text>
            <Text style={styles.eventDetails}>{item.time}</Text>
            <Text style={styles.eventCategory}>{item.category}</Text>
          </View>
        ))
      )}

      {/* Bouton pour ajouter un événement */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
  },
  scrollContainer: {
    paddingBottom: 20, // Ajoute un espace en bas
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  syncButton: {
    backgroundColor: '#5AC8FA',
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
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
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
    color: '#7F57FF',
    fontWeight: 'bold',
    marginTop: 4,
  },
  noEvents: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#7F57FF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 20,
    width: '60%',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
