import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BucketlistsScreen() {
  const navigation = useNavigation();

  const events = [
    { title: 'Voyage à Paris', addedBy: 'Ty', color: '#FFA07A' },
    { title: 'Dîner au Damas', addedBy: 'Sofia', color: '#FFD700' },
    { title: 'Match des Canadiens', addedBy: 'Yanis', color: '#40E0D0' },
    { title: 'Voir L\'amour ouf au cinéma', addedBy: 'Bri', color: '#6A5ACD' },
    { title: 'Randonnée au Mont-Saint-Hilaire', addedBy: 'Ty', color: '#87CEEB' },
  ];

  const renderItem = ({ item }: { item: typeof events[0] }) => (
    <View style={[styles.eventCard, { borderLeftColor: item.color }]}>
      <View>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventSubtitle}>Ajouté par: {item.addedBy}</Text>
      </View>
    </View>
  );

  const handleAddWish = () => {
    navigation.navigate('AddBucketlist' as never);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bucketlist</Text>
      </View>

      {/* Wish List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune bucketlist disponible.</Text>
        }
      />

      {/* Add Wish Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddWish}>
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Ajouter un souhait</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#6A5ACD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 16,
    marginTop: 50,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A5ACD',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
