import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Teams: { newTeam?: string };
};

export default function AddTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Prevent screen stacking with this function
  const handleCreateTeam = () => {
    if (teamName.trim()) {
      navigation.navigate('Teams', { newTeam: teamName });
      setTeamName(''); // Reset the text input
    }
  };

  const handleClosePopup = () => {
    navigation.goBack();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={handleClosePopup}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.popupContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClosePopup}>
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Créer une équipe</Text>
            <Text style={styles.headerSubtitle}>Ajoute un nom pour ton équipe</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Ionicons name="people-outline" size={24} color="#7F57FF" />
              <TextInput
                style={styles.input}
                placeholder="Nom de l'équipe"
                value={teamName}
                onChangeText={setTeamName}
              />
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
              <Text style={styles.createButtonText}>Créer l'équipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  popupContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    paddingVertical: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#DCDCDC', marginTop: 8 },
  content: { padding: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, color: '#333' },
  createButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
});
