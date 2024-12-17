import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Importer le sélecteur de date/heure
import moment from 'moment';

export default function AddEventScreen() {
  const navigation = useNavigation();

  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  // Afficher/masquer le sélecteur de date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    setDate(moment(date).format('DD/MM/YYYY')); // Formater la date
    hideDatePicker();
  };

  // Afficher/masquer le sélecteur d'heure (pour start time)
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (time: Date) => {
    setStartTime(moment(time).format('HH:mm')); // Formater l'heure
    hideStartTimePicker();
  };

  // Afficher/masquer le sélecteur d'heure (pour end time)
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time: Date) => {
    setEndTime(moment(time).format('HH:mm')); // Formater l'heure
    hideEndTimePicker();
  };

  // Fonction pour gérer la création de l'événement
  const handleCreateEvent = () => {
    if (!eventName || !address || !date || !startTime || !endTime || !category) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // Logique de création de l'événement
    const newEvent = {
      eventName,
      address,
      date,
      startTime,
      endTime,
      category,
    };

    console.log('Événement créé : ', newEvent);
    navigation.navigate('Home' as never); // Naviguer vers la page "Home"
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="event" size={24} color="#40E0D0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Event name*"
          value={eventName}
          onChangeText={setEventName}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="location-on" size={24} color="#FF69B4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="calendar-alt" size={20} color="#FFA500" style={styles.icon} />
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text style={styles.inputText}>{date || 'Select Date'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <View style={[styles.inputContainer, styles.timeInputContainer]}>
          <FontAwesome5 name="clock" size={20} color="#7F57FF" style={styles.icon} />
          <TouchableOpacity onPress={showStartTimePicker} style={styles.input}>
            <Text style={styles.inputText}>{startTime || 'Start Time'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inputContainer, styles.timeInputContainer]}>
          <FontAwesome5 name="clock" size={20} color="#7F57FF" style={styles.icon} />
          <TouchableOpacity onPress={showEndTimePicker} style={styles.input}>
            <Text style={styles.inputText}>{endTime || 'End Time'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="category" size={24} color="#87CEEB" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      {/* Start Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmStartTime}
        onCancel={hideStartTimePicker}
      />

      {/* End Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmEndTime}
        onCancel={hideEndTimePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
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
});
