import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SyncCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilities, setAvailabilities] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddAvailability = () => {
    if (!startTime || !endTime) {
      alert('Veuillez remplir les champs heure de début et de fin.');
      return;
    }

    setAvailabilities((prev) => [
      ...prev,
      { date: selectedDate, startTime, endTime },
    ]);
    setStartTime('');
    setEndTime('');
    setIsModalVisible(false);
  };

  const renderAvailability = ({ item }: { item: { date: string; startTime: string; endTime: string } }) => (
    <View style={styles.availabilityItem}>
      <Text style={styles.availabilityText}>
        {item.date}: {item.startTime} - {item.endTime}
      </Text>
    </View>
  );

  const filteredAvailabilities = availabilities.filter((item) => item.date === selectedDate);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Synchroniser le Calendrier</Text>
      </View>

      {/* Sync Buttons */}
      <TouchableOpacity style={styles.syncButton}>
        <Text style={styles.syncButtonText}>Synchroniser avec Google Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.syncButtonBlack}>
        <Text style={styles.syncButtonText}>Synchroniser avec Apple Calendar</Text>
      </TouchableOpacity>

      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#7F57FF' },
        }}
        style={styles.calendar}
      />

      {/* Add Availabilities Button */}
      {selectedDate && (
        <TouchableOpacity
          style={styles.addManuallyButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          <Text style={styles.addManuallyText}>Ajouter une disponibilité</Text>
        </TouchableOpacity>
      )}

      {/* List of Availabilities */}
      <FlatList
        data={selectedDate ? filteredAvailabilities : availabilities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAvailability}
        contentContainerStyle={styles.availabilityList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune disponibilité ajoutée.</Text>
        }
      />

      {/* Modal for Adding Availabilities */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une disponibilité</Text>
            <Text style={styles.modalDate}>Date sélectionnée : {selectedDate}</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="schedule" size={24} color="#40E0D0" />
              <TextInput
                style={styles.input}
                placeholder="Heure de début (ex: 14h)"
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="schedule" size={24} color="#FF6C6C" />
              <TextInput
                style={styles.input}
                placeholder="Heure de fin (ex: 16h)"
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddAvailability}>
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
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
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  syncButton: {
    backgroundColor: '#87CEEB', // Light blue
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  syncButtonBlack: {
    backgroundColor: '#000', // Black
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  syncButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendar: {
    margin: 16,
    borderRadius: 10,
  },
  addManuallyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  addManuallyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  availabilityList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  availabilityItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  availabilityText: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#7F57FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF6C6C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
