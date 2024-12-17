import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: string; // Catégorie pour styliser les notifications
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nouvelle équipe ajoutée', message: 'Une équipe a été ajoutée avec succès.', time: 'Il y a 5 min', category: 'Ajout' },
    { id: '2', title: 'Événement à venir', message: 'N’oubliez pas votre événement demain.', time: 'Il y a 2 heures', category: 'Rappel' },
    { id: '3', title: 'Mise à jour', message: 'Votre profil a été mis à jour.', time: 'Hier', category: 'Mise à jour' },
  ]);

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    Alert.alert('Notification supprimée');
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, getCategoryStyle(item.category)]}
      onLongPress={() => handleDeleteNotification(item.id)}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7F57FF',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationsScreen;
