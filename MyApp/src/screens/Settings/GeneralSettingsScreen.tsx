import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function GeneralSettingsScreen() {
  const navigation = useNavigation();

  const toggleTheme = () => {
    // Logic for toggling between light and dark mode
    alert('Mode sombre activé !'); // Replace this with real theme toggling logic
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres Généraux</Text>
        <Text style={styles.headerSubtitle}>Personnalisez vos préférences</Text>
      </View>

      <ScrollView contentContainerStyle={styles.settingsList}>
        {/* Password Manager */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ChangePassword' as never)}
        >
          <Ionicons name="lock-closed-outline" size={24} color="#7F57FF" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Gestionnaire de mots de passe</Text>
            <Text style={styles.optionSubtitle}>
              Gérez le mot de passe de votre compte
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7F57FF" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Notifications' as never)}
        >
          <MaterialIcons name="notifications-none" size={24} color="#FFD700" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Notifications</Text>
            <Text style={styles.optionSubtitle}>
              Contrôlez vos préférences de notification
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7F57FF" />
        </TouchableOpacity>

        {/* Light/Dark Mode */}
        <TouchableOpacity style={styles.option} onPress={toggleTheme}>
          <Ionicons name="moon-outline" size={24} color="#40E0D0" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Mode Sombre</Text>
            <Text style={styles.optionSubtitle}>
              Changez entre les modes clair et sombre
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sync Calendar */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('SyncCalendar' as never)}
        >
          <MaterialIcons name="calendar-today" size={24} color="#FF69B4" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Synchroniser le calendrier</Text>
            <Text style={styles.optionSubtitle}>
              Synchronisez votre calendrier avec l'application
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7F57FF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0', marginTop: 5 },
  settingsList: { padding: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  optionTextContainer: { flex: 1, marginLeft: 15 },
  optionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  optionSubtitle: { fontSize: 14, color: '#666' },
});
