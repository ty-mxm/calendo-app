import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventController } from '../controllers/EventController';
import { Event } from '../models/Event';

export default function AddEventScreen() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const teams = [
    { name: 'Team 1' },
    { name: 'Team 2' },
  ];

  const handleSelectTeam = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setIsTeamModalVisible(false);
  };

  const handleCreateEvent = async () => {
    if (!eventName || !team || !location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const newEvent: Event = {
      title: eventName,
      location,
      date: startTime.toISOString(),
      time: endTime.toISOString(),
      category: team,
    };

    await EventController.createEvent(newEvent);
    Alert.alert('Succès', 'Événement créé avec succès');
    navigation.goBack();
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Créer un nouvel événement</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Nom de l'événement */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="event" size={24} color="#6495ED" />
          <TextInput
            style={styles.input}
            placeholder="Nom de l'événement"
            value={eventName}
            onChangeText={setEventName}
          />
        </View>

        {/* Groupe sélectionné */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="group" size={24} color="#6495ED" />
          <TextInput
            style={styles.input}
            placeholder="Sélectionner une équipe"
            value={team}
            editable={false}
          />
          <TouchableOpacity onPress={() => setIsTeamModalVisible(true)}>
            <AntDesign name="pluscircle" size={24} color="#6495ED" />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={24} color="#6495ED" />
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
            Début : {`${startTime.getDate()} ${startTime.toLocaleDateString('fr-FR', { month: 'short' })} ${startTime.getFullYear()} à ${startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
          </Text>
        </TouchableOpacity>
        {isStartTimePickerVisible && (
          <DateTimePicker
            value={startTime}
            mode="datetime"
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
            Fin : {`${endTime.getDate()} ${endTime.toLocaleDateString('fr-FR', { month: 'short' })} ${endTime.getFullYear()} à ${endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
          </Text>
        </TouchableOpacity>
        {isEndTimePickerVisible && (
          <DateTimePicker
            value={endTime}
            mode="datetime"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'end')}
          />
        )}

        {/* Bouton Créer l'événement */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Créer l'événement</Text>
        </TouchableOpacity>
      </View>

      {/* Popup pour sélectionner une équipe */}
      <Modal
        visible={isTeamModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsTeamModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir une équipe</Text>

            <FlatList
              data={teams}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.teamOption}
                  onPress={() => handleSelectTeam(item.name)}
                >
                  <Text style={styles.teamName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsTeamModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, color: '#333' },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  dateTimeText: { marginLeft: 10, fontSize: 16, color: '#333' },
  createButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  teamOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  teamName: { fontSize: 16, color: '#333', textAlign: 'center' },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF6C6C',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
