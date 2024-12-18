import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Interface pour les notifications
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: string; // Catégorie pour styliser les notifications
}

interface Props {
  navigation: NavigationProp<any>;
}

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nouvelle équipe ajoutée', message: 'Une équipe a été ajoutée avec succès.', time: 'Il y a 5 min', category: 'Ajout' },
    { id: '2', title: 'Événement à venir', message: 'N\'oubliez pas votre événement demain.', time: 'Il y a 2 heures', category: 'Rappel' },
    { id: '3', title: 'Mise à jour', message: 'Votre profil a été mis à jour.', time: 'Hier', category: 'Mise à jour' },
  ]);

  // Supprimer une notification
  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      'Supprimer la notification',
      'Voulez-vous vraiment supprimer cette notification ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => setNotifications((prev) => prev.filter((n) => n.id !== id)) },
      ]
    );
  };

  // Stylisation des catégories
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Ajout':
        return { borderLeftColor: '#FFA07A' }; // Saumon
      case 'Rappel':
        return { borderLeftColor: '#40E0D0' }; // Turquoise
      case 'Mise à jour':
        return { borderLeftColor: '#FFD700' }; // Doré
      default:
        return { borderLeftColor: '#E0E0E0' };
    }
  };

  // Rendu d'une notification
  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={[styles.notificationCard, getCategoryStyle(item.category)]}
        onLongPress={() => handleDeleteNotification(item.id)}
      >
        <Ionicons name="notifications-outline" size={24} color="#7F57FF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
          <Ionicons name="close-circle" size={24} color="#FF6C6C" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderNotification}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔔 Notifications</Text>
          <Text style={styles.headerSubtitle}>Vos dernières mises à jour et alertes</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>Aucune notification disponible</Text>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#F5F5F5',
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#7F57FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  cardContainer: {
    marginHorizontal: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderLeftWidth: 5,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default NotificationsScreen;
