import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nouvelle équipe ajoutée', message: 'Une équipe a été ajoutée avec succès.', time: 'Il y a 5 min' },
    { id: '2', title: 'Événement à venir', message: 'N’oubliez pas votre événement demain.', time: 'Il y a 2 heures' },
    { id: '3', title: 'Mise à jour', message: 'Votre profil a été mis à jour.', time: 'Hier' },
  ]);

  // Function pour supprimer une notification
  const handleDeleteNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    Alert.alert('Notification supprimée');
  };

  // Function pour afficher une notification
  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.notificationCard}
        onLongPress={() => handleDeleteNotification(item.id)}
      >
        <Ionicons name="notifications-outline" size={24} color="#7F57FF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
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
    borderLeftColor: '#40E0D0',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
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
