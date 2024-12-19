import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Teams: { newTeam?: string };
};

export default function AddTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Modifier la fonction handleCreateTeam pour éviter l'empilement d'écrans
  const handleCreateTeam = () => {
    if (teamName.trim()) {
      navigation.navigate('Teams', { newTeam: teamName }); // Utiliser navigation.navigate au lieu de reset
      setTeamName(''); // Réinitialiser le champ de texte
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer une équipe</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Créer une nouvelle équipe</Text>
        <Text style={styles.subtitle}>Ajoute un nom pour ton équipe</Text>

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
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
