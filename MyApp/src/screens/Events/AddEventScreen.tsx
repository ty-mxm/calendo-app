import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventController } from '../controllers/EventController';
import { Event } from '../models/Event';

export default function AddEventScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
 
  const [eventName, setEventName] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  
  // États des modales et pickers
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);


  const teams = [
    { id: '1', name: 'Team 1' },
    { id: '2', name: 'Team 2' },
    { id: '3', name: 'Team 3' },
  ];

 
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (isFocused) {
        navigation.setOptions({
          tabBarStyle: { display: 'none' },
        });
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (isFocused) {
        navigation.setOptions({
          tabBarStyle: { display: 'flex' },
        });
      }
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation, isFocused]);

  // Gestion de la sélection d'équipe
  const handleSelectTeam = (selectedTeam: string) => {
    setTeam(selectedTeam);
    setIsTeamModalVisible(false);
  };

  // Gestion des dates et heures
  const handleDateChange = (
    event: any,
    selectedDate?: Date,
    type: 'start' | 'end' = 'start'
  ) => {
    const currentDate = selectedDate || (type === 'start' ? startTime : endTime);

    if (type === 'start') {
      setIsStartTimePickerVisible(Platform.OS === 'ios');
      setStartTime(currentDate);
      
      // Si la date de fin est antérieure à la date de début, on l'ajuste
      if (endTime < currentDate) {
        setEndTime(currentDate);
      }
    } else {
      setIsEndTimePickerVisible(Platform.OS === 'ios');
      setEndTime(currentDate);
    }
  };

  // Validation et création de l'événement
  const handleCreateEvent = async () => {
    // Validation des champs
    if (!eventName.trim()) {
      Alert.alert('Erreur', "Le nom de l'événement est requis");
      return;
    }
    if (!team) {
      Alert.alert('Erreur', 'Veuillez sélectionner une équipe');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Erreur', 'Le lieu est requis');
      return;
    }
    if (endTime < startTime) {
      Alert.alert('Erreur', "L'heure de fin doit être après l'heure de début");
      return;
    }

    try {
      const newEvent: Event = {
        title: eventName.trim(),
        location: location.trim(),
        date: startTime.toISOString(),
        time: endTime.toISOString(),
        category: team,
      };

      await EventController.createEvent(newEvent);
      Alert.alert(
        'Succès',
        'Événement créé avec succès',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Erreur', "Une erreur est survenue lors de la création de l'événement");
    }
  };

  // Formatage de la date et heure pour l'affichage
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
   
      <View style={styles.header}>
        <Text style={styles.headerText}>Nouvel événement</Text>
      </View>

   
      <View style={styles.content}>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="event" size={24} color="#6495ED" />
          <TextInput
            style={styles.input}
            placeholder="Nom de l'événement"
            value={eventName}
            onChangeText={setEventName}
            maxLength={50}
          />
        </View>

        
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsTeamModalVisible(true)}
        >
          <MaterialIcons name="group" size={24} color="#6495ED" />
          <Text style={[styles.input, !team && styles.placeholder]}>
            {team || 'Sélectionner une équipe'}
          </Text>
          <AntDesign name="right" size={24} color="#6495ED" />
        </TouchableOpacity>

      
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={24} color="#6495ED" />
          <TextInput
            style={styles.input}
            placeholder="Lieu"
            value={location}
            onChangeText={setLocation}
            maxLength={100}
          />
        </View>

    
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsStartTimePickerVisible(true)}
        >
          <MaterialIcons name="access-time" size={24} color="#6495ED" />
          <Text style={styles.input}>Début : {formatDateTime(startTime)}</Text>
        </TouchableOpacity>

  
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsEndTimePickerVisible(true)}
        >
          <MaterialIcons name="access-time" size={24} color="#6495ED" />
          <Text style={styles.input}>Fin : {formatDateTime(endTime)}</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Créer l'événement</Text>
        </TouchableOpacity>
      </View>

     
      <Modal
        visible={isTeamModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsTeamModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir une équipe</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setIsTeamModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={teams}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.teamOption,
                    team === item.name && styles.selectedTeamOption,
                  ]}
                  onPress={() => handleSelectTeam(item.name)}
                >
                  <Text
                    style={[
                      styles.teamName,
                      team === item.name && styles.selectedTeamName,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      
      {isStartTimePickerVisible && (
        <DateTimePicker
          value={startTime}
          mode="datetime"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'start')}
          minimumDate={new Date()}
        />
      )}

      {isEndTimePickerVisible && (
        <DateTimePicker
          value={endTime}
          mode="datetime"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, 'end')}
          minimumDate={startTime}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  createButton: {
    backgroundColor: '#7F57FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  teamOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  selectedTeamOption: {
    backgroundColor: '#F0F0FF',
  },
  teamName: {
    fontSize: 16,
    color: '#333',
  },
  selectedTeamName: {
    color: '#7F57FF',
    fontWeight: 'bold',
  },
});