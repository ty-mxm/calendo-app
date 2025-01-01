import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    team: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
  });

  const teams = ['Team 1', 'Team 2', 'Team 3'];

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.team || !newEvent.location) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEvent,
        date: selectedDate || 'Sans date',
        id: Math.random().toString(),
        startTime: newEvent.startTime.toLocaleString('fr-FR'),
        endTime: newEvent.endTime.toLocaleString('fr-FR'),
      },
    ]);

    setIsModalVisible(false);
    setNewEvent({ title: '', team: '', location: '', startTime: new Date(), endTime: new Date() });
  };

  const handleSelectTeam = (selectedTeam: string) => {
    setNewEvent((prevEvent) => ({ ...prevEvent, team: selectedTeam }));
    setIsTeamModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenue sur Calendo</Text>
        <Text style={styles.headerSubtitle}>Gardez un œil sur vos prochains événements</Text>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#6A5ACD' },
        }}
        style={styles.calendar}
      />

      {/* Liste des événements */}
      <Text style={styles.eventListTitle}>Événements</Text>

      {/* Ajouter un événement */}
      <TouchableOpacity style={styles.addEventButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.addEventText}>Ajouter un événement</Text>
      </TouchableOpacity>
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.eventCard}
          onPress={() =>
            navigation.navigate('EventDetails', { event }) // Assurez-vous que 'EventDetails' attend un 'event' du type Event
          }
        >
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetails}>📅 {event.date}</Text>
          <Text style={styles.eventDetails}>👥 {event.team}</Text>
          <Text style={styles.eventDetails}>📍 {event.location}</Text>
          <Text style={styles.eventDetails}>
            🕒 {event.startTime} - {event.endTime}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Popup d'ajout d'événement */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Créer un nouvel événement</Text>

            {/* Nom de l'événement */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="event" size={24} color="#40E0D0" />
              <TextInput
                style={styles.input}
                placeholder="Nom de l'événement"
                value={newEvent.title}
                onChangeText={(text) => setNewEvent((prev) => ({ ...prev, title: text }))}
              />
            </View>

            {/* Groupe */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="group" size={24} color="#FF69B4" />
              <TextInput
                style={styles.input}
                placeholder="Sélectionner une équipe"
                value={newEvent.team}
                editable={false}
              />
              <TouchableOpacity onPress={() => setIsTeamModalVisible(true)}>
                <AntDesign name="pluscircle" size={24} color="#7F57FF" />
              </TouchableOpacity>
            </View>

            {/* Lieu */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={24} color="#FFA500" />
              <TextInput
                style={styles.input}
                placeholder="Lieu"
                value={newEvent.location}
                onChangeText={(text) => setNewEvent((prev) => ({ ...prev, location: text }))}
              />
            </View>

            {/* Start Time */}
            <TouchableOpacity
              style={styles.dateTimeContainer}
              onPress={() => setIsStartTimePickerVisible(true)}
            >
              <MaterialIcons name="access-time" size={24} color="#40E0D0" />
              <Text style={styles.dateTimeText}>
                Début : {newEvent.startTime.toLocaleString('fr-FR')}
              </Text>
            </TouchableOpacity>
            {isStartTimePickerVisible && (
              <DateTimePicker
                value={newEvent.startTime}
                mode="datetime"
                display="default"
                onChange={(event, date) => {
                  setIsStartTimePickerVisible(false);
                  if (date) setNewEvent((prev) => ({ ...prev, startTime: date }));
                }}
              />
            )}

            {/* End Time */}
            <TouchableOpacity
              style={styles.dateTimeContainer}
              onPress={() => setIsEndTimePickerVisible(true)}
            >
              <MaterialIcons name="access-time" size={24} color="#40E0D0" />
              <Text style={styles.dateTimeText}>
                Fin : {newEvent.endTime.toLocaleString('fr-FR')}
              </Text>
            </TouchableOpacity>
            {isEndTimePickerVisible && (
              <DateTimePicker
                value={newEvent.endTime}
                mode="datetime"
                display="default"
                onChange={(event, date) => {
                  setIsEndTimePickerVisible(false);
                  if (date) setNewEvent((prev) => ({ ...prev, endTime: date }));
                }}
              />
            )}

            {/* Bouton Créer */}
            <TouchableOpacity style={styles.createButton} onPress={handleAddEvent}>
              <Text style={styles.createButtonText}>Créer l'événement</Text>
            </TouchableOpacity>

            {/* Bouton Fermer */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Popup de sélection d'équipe */}
      <Modal
        visible={isTeamModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsTeamModalVisible(false)}
      >
        <View style={styles.teamModalOverlay}>
          <View style={styles.teamModalContent}>
            <Text style={styles.teamModalTitle}>Choisir une équipe</Text>

            <FlatList
              data={teams}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.teamOptionCompact}
                  onPress={() => handleSelectTeam(item)}
                >
                  <Text style={styles.teamNameCompact}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.teamCloseButton}
              onPress={() => setIsTeamModalVisible(false)}
            >
              <Text style={styles.teamCloseButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    header: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#6A5ACD' },
    headerTitle: { fontSize: 24, color: '#FFF', fontWeight: 'bold' },
    headerSubtitle: { fontSize: 16, color: '#DCDCDC', marginTop: 8 },
    calendar: { margin: 16, borderRadius: 10 },
    addEventButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6A5ACD',
      padding: 12,
      borderRadius: 8,
      margin: 16,
    },
    addEventText: { fontSize: 16, color: '#FFF', marginLeft: 8 },
    eventListTitle: { fontSize: 20, fontWeight: 'bold', margin: 16, color: '#333' },
    eventCard: {
      backgroundColor: '#FFF',
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      borderLeftWidth: 5,
      marginHorizontal: 16,
      elevation: 3,
    },
    eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    eventDetails: { fontSize: 14, color: '#666', marginBottom: 2 },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFF',
      width: '90%',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: { fontSize: 20, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    input: { flex: 1, fontSize: 16, marginLeft: 10 },
    createButton: { backgroundColor: '#6A5ACD', padding: 12, borderRadius: 8, marginTop: 10 },
    createButtonText: { textAlign: 'center', color: '#FFF', fontSize: 16 },
    closeButton: { backgroundColor: '#FF6C6C', padding: 12, borderRadius: 8, marginTop: 10 },
    closeButtonText: { textAlign: 'center', color: '#FFF', fontSize: 16 },
    teamModalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    teamModalContent: {
      width: '80%',
      backgroundColor: '#FFF',
      borderRadius: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    teamModalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 15,
      color: '#333',
    },
    teamOptionCompact: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      alignItems: 'center',
    },
    teamNameCompact: {
      fontSize: 16, color: '#333',
    },
    teamCloseButton: {
      marginTop: 15,
      alignSelf: 'center',
      backgroundColor: '#6A5ACD',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    teamCloseButtonText: {
      color: '#FFF', fontWeight: 'bold', fontSize: 14,
    },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  dateTimeText: { marginLeft: 10, fontSize: 16, color: '#333' },
});
