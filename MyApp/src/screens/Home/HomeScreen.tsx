import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Event {
  id: string;
  title: string;
  date: string;
  team: string;
  location: string;
  startTime: string;
  endTime: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();

  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: '🍳 Petit-déjeuner au restaurant',
      date: '2023-12-15',
      team: 'Team 1',
      location: 'Restaurant ABC',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
    },
    {
      id: '2',
      title: '🏃‍♂️ Course au parc',
      date: '2023-12-16',
      team: 'Team 2',
      location: 'Parc XYZ',
      startTime: '7:00 AM',
      endTime: '8:00 AM',
    },
    {
      id: '3',
      title: '🎬 Soirée cinéma',
      date: '2023-12-20',
      team: 'Team 3',
      location: 'Cinéma 123',
      startTime: '8:00 PM',
      endTime: '10:00 PM',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('');

  const colors = ['#FFA07A', '#40E0D0', '#FFD700'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenue sur Calendo
          
        </Text>
        
        <Text style={styles.headerSubtitle}>Gardez un œil sur vos prochains événements</Text>
      </View>

      
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#6A5ACD' },
        }}
        style={styles.calendar}
      />

     
      <Text style={styles.eventListTitle}>Événements</Text>

     
      <TouchableOpacity
        style={styles.addEventButton}
        onPress={() => navigation.navigate('AddEvent' as never)}
      >
        <MaterialIcons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.addEventText}>Ajouter un événement</Text>
      </TouchableOpacity>

     
      {events.map((event, index) => (
  <TouchableOpacity
    key={event.id}
    style={[
      styles.eventCard,
      { borderLeftColor: colors[index % colors.length] }, 
    ]}
    onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
  >
    <Text style={styles.eventTitle}>{event.title}</Text>
    <View style={styles.eventDetailsRow}>
      <MaterialIcons name="event" size={18} color="#6495ED" />
      <Text style={styles.eventDetails}>{event.date}</Text>
    </View>
    <View style={styles.eventDetailsRow}>
      <MaterialIcons name="group" size={18} color="#6495ED" />
      <Text style={styles.eventDetails}>{event.team}</Text>
    </View>
    <View style={styles.eventDetailsRow}>
      <MaterialIcons name="location-on" size={18} color="#6495ED" />
      <Text style={styles.eventDetails}>{event.location}</Text>
    </View>
    <View style={styles.eventDetailsRow}>
      <MaterialIcons name="access-time" size={18} color="#6495ED" />
      <Text style={styles.eventDetails}>
        {event.startTime} - {event.endTime}
      </Text>
    </View>
  </TouchableOpacity>
))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#7F57FF',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#DCDCDC',
    marginTop: 8,
  },
  calendar: {
    margin: 16,
    borderRadius: 10,
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7F57FF',
    padding: 12,
    borderRadius: 8,
    margin: 16,
  },
  addEventText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 8,
  },
  eventListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: '#333',
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    marginHorizontal: 16,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
