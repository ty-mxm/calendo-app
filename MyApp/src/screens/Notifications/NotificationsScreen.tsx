import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Typing for navigation and notification
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
}

type Props = {
  navigation: NavigationProp<any, any>;
};

const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  // Sample notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nouvelle équipe ajoutée', message: 'Une équipe a été ajoutée avec succès.', time: 'Il y a 5 min' },
    { id: '2', title: 'Événement à venir', message: 'N’oubliez pas votre événement demain.', time: 'Il y a 2 heures' },
    { id: '3', title: 'Mise à jour', message: 'Votre profil a été mis à jour.', time: 'Hier' },
  ]);

  // Function to delete a notification
  const handleDeleteNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    Alert.alert('Notification supprimée');
  };

  // Function to render each notification
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationCard} onLongPress={() => handleDeleteNotification(item.id)}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </TouchableOpacity>
  );

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
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
  },
});

export default NotificationsScreen;
