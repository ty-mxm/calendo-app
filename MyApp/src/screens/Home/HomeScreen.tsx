import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Event } from '../../../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  // Suppression de l'en-tête par défaut
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: '🍳 Petit-déjeuner au restaurant',
      location: '123 Rue Principale',
      date: '2023-12-15',
      time: '10:00 - 12:00',
      category: 'Nourriture',
    },
    {
      id: '2',
      title: '🏃‍♂️ Course au parc',
      location: 'Parc Central',
      date: '2023-12-16',
      time: '14:00 - 15:30',
      category: 'Exercice',
    },
    {
      id: '3',
      title: '🎬 Soirée cinéma',
      location: 'Cinéma City',
      date: '2023-12-20',
      time: '19:00 - 22:00',
      category: 'Loisir',
    },
  ]);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const renderEventCard = ({ item }: { item: Event }) => (
    <View style={[styles.eventCard, getCategoryStyle(item.category)]}>
      <View style={styles.eventHeader}>
        <MaterialIcons
          name="event"
          size={24}
          color="#6A5ACD"
          style={styles.eventIcon}
        />
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
      <Text style={styles.eventDetails}>📍 {item.location}</Text>
      <Text style={styles.eventDetails}>⏰ {item.time}</Text>
      <Text style={styles.eventCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedDate ? filteredEvents : events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        ListHeaderComponent={() => (
          <>
            {/* Header personnalisé */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Bienvenue sur Calendo</Text>
              <Text style={styles.headerSubtitle}>
                Gardez un œil sur vos prochains événements
              </Text>
            </View>

            {/* Calendrier */}
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: '#6A5ACD' },
              }}
              theme={{
                todayTextColor: '#FF69B4',
                arrowColor: '#6A5ACD',
                textSectionTitleColor: '#6A5ACD',
              }}
              style={styles.calendar}
            />

            {/* Bouton Ajouter */}
            <TouchableOpacity
              style={styles.addEventButton}
              onPress={() => navigation.navigate('AddEvent', { selectedTeam: undefined })}
            >
              <Ionicons name="add-circle-outline" size={24} color="#FFF" />
              <Text style={styles.addEventText}>Ajouter un événement</Text>
            </TouchableOpacity>

            {/* Titre des événements */}
            <Text style={styles.subHeader}>Prochains événements</Text>
          </>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
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
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#6A5ACD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#DCDCDC', marginTop: 8 },
  calendar: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#6A5ACD',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 3,
  },
  addEventText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#6A5ACD',
    marginVertical: 10,
  },
  eventCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  eventDetails: { fontSize: 14, color: '#666', marginBottom: 2 },
  eventCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginTop: 8,
  },
});
