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
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  date: string;
  team: string;
  bucketlist: string;
  category: string;
}

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: '🍳 Petit-déjeuner au restaurant',
      date: '2023-12-15',
      team: 'Team 1',
      bucketlist: 'Bucketlist 1',
      category: 'Nourriture',
    },
    {
      id: '2',
      title: '🏃‍♂️ Course au parc',
      date: '2023-12-16',
      team: 'Team 2',
      bucketlist: 'Bucketlist 2',
      category: 'Exercice',
    },
    {
      id: '3',
      title: '🎬 Soirée cinéma',
      date: '2023-12-20',
      team: 'Team 3',
      bucketlist: 'Bucketlist 3',
      category: 'Loisir',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeamModalVisible, setIsTeamModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    team: '',
    bucketlist: '',
    category: '',
  });

  const teams = ['Team 1', 'Team 2', 'Team 3'];

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.category || !newEvent.team || !newEvent.bucketlist) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEvent,
        date: selectedDate || 'Sans date',
        id: Math.random().toString(),
      },
    ]);

    setIsModalVisible(false);
    setNewEvent({ title: '', team: '', bucketlist: '', category: '' });
  };

  const handleSelectTeam = (selectedTeam: string) => {
    setNewEvent((prevEvent) => ({ ...prevEvent, team: selectedTeam }));
    setIsTeamModalVisible(false);
  };

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
        <View key={event.id} style={[styles.eventCard, getCategoryStyle(event.category)]}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDetails}>📅 {event.date}</Text>
          <Text style={styles.eventDetails}>👥 {event.team}</Text>
          <Text style={styles.eventDetails}>📋 {event.bucketlist}</Text>
          <Text style={styles.eventCategory}>{event.category}</Text>
        </View>
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
                placeholder="Nom de l'événement*"
                value={newEvent.title}
                onChangeText={(text) => setNewEvent((prev) => ({ ...prev, title: text }))}
              />
            </View>

            {/* Groupe */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="group" size={24} color="#FF69B4" />
              <TextInput
                style={styles.input}
                placeholder="Ajouter un groupe"
                value={newEvent.team}
                editable={false}
              />
              <TouchableOpacity onPress={() => setIsTeamModalVisible(true)}>
                <AntDesign name="pluscircle" size={24} color="#7F57FF" />
              </TouchableOpacity>
            </View>

            {/* Bucketlist */}
            <View style={styles.inputContainer}>
              <FontAwesome5 name="list-alt" size={20} color="#FFA500" />
              <TextInput
                style={styles.input}
                placeholder="Ajouter une Bucketlist"
                value={newEvent.bucketlist}
                onChangeText={(text) => setNewEvent((prev) => ({ ...prev, bucketlist: text }))}
              />
            </View>

            {/* Catégorie */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="category" size={24} color="#87CEEB" />
              <TextInput
                style={styles.input}
                placeholder="Catégorie*"
                value={newEvent.category}
                onChangeText={(text) => setNewEvent((prev) => ({ ...prev, category: text }))}
              />
            </View>

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
  eventCategory: { fontSize: 12, fontWeight: 'bold', color: '#6A5ACD', marginTop: 8 },
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
});