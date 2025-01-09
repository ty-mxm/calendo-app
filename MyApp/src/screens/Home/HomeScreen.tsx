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
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
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
  const [eventName, setEventName] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const teams = ['Team 1', 'Team 2', 'Team 3'];

  const handleSelectTeam = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setIsTeamModalVisible(false);
  };

  const handleCreateEvent = () => {
    if (!eventName || !team || !location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: Math.random().toString(),
        title: eventName,
        date: selectedDate || 'Sans date',
        team,
        location,
        startTime: startTime.toLocaleString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        endTime: endTime.toLocaleString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setEventName('');
    setTeam('');
    setLocation('');
    setStartTime(new Date());
    setEndTime(new Date());
  };

  const showDateTimePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setIsStartTimePickerVisible(true);
    } else {
      setIsEndTimePickerVisible(true);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date, type?: 'start' | 'end') => {
    if (type === 'start') {
      setIsStartTimePickerVisible(false);
      if (selectedDate) setStartTime(selectedDate);
    } else {
      setIsEndTimePickerVisible(false);
      if (selectedDate) setEndTime(selectedDate);
    }
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
        <AntDesign name="pluscircleo" size={24} color="#FFF" />
        <Text style={styles.addEventText}>Ajouter un événement</Text>
      </TouchableOpacity>

      {/* Events List */}
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={[styles.eventCard, { borderLeftColor: '#6495ED' }]}
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


      {/* Modal for Adding Event */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Créer un nouvel événement</Text>

            {/* Event Name */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="event" size={24} color="#40E0D0" />
              <TextInput
                style={styles.input}
                placeholder="Nom de l'événement"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            {/* Team Selection */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="group" size={24} color="#FF69B4" />
              <TextInput
                style={styles.input}
                placeholder="Sélectionner une équipe"
                value={team}
                editable={false}
              />
              <TouchableOpacity onPress={() => setIsTeamModalVisible(true)}>
                <AntDesign name="pluscircle" size={24} color="#7F57FF" />
              </TouchableOpacity>
            </View>

            {/* Location */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={24} color="#FFA500" />
              <TextInput
                style={styles.input}
                placeholder="Lieu"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Start Time */}
            <TouchableOpacity
              style={styles.dateTimeContainer}
              onPress={() => showDateTimePicker('start')}
            >
              <MaterialIcons name="access-time" size={24} color="#6495ED" />
              <Text style={styles.dateTimeText}>
                Début :{' '}
                {`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Text>
            </TouchableOpacity>
            {isStartTimePickerVisible && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'start')}
              />
            )}

            {/* End Time */}
            <TouchableOpacity
              style={styles.dateTimeContainer}
              onPress={() => showDateTimePicker('end')}
            >
              <MaterialIcons name="access-time" size={24} color="#6495ED" />
              <Text style={styles.dateTimeText}>
                Fin :{' '}
                {`${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </Text>
            </TouchableOpacity>
            {isEndTimePickerVisible && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, 'end')}
              />
            )}

            {/* Create Button */}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
              <Text style={styles.createButtonText}>Créer l'événement</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
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
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  createButton: {
    backgroundColor: '#6A5ACD',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  createButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#FF6C6C',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
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
    fontSize: 16,
    color: '#333',
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
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dateTimeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
