import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, BucketlistCategory } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Bucketlists'>;

export default function BucketlistsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const categories: BucketlistCategory[] = [
    { title: 'Voyages', itemsCount: 12, color: '#FFA07A' },
    { title: 'Restaurants', itemsCount: 15, color: '#FFD700' },
    { title: 'Sports', itemsCount: 8, color: '#40E0D0' },
    { title: 'Loisirs', itemsCount: 10, color: '#6A5ACD' },
    { title: 'Livres', itemsCount: 7, color: '#87CEEB' },
  ];

  const renderItem = ({ item }: { item: BucketlistCategory }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { borderLeftColor: item.color }]}
      onPress={() => navigation.navigate('BucketlistDetails', { category: item })}
    >
      <View>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categorySubtitle}>{item.itemsCount} éléments</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#333" />
    </TouchableOpacity>
  );

  const handleAddBucketList = () => {
    navigation.navigate('AddBucketlist' as never);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bucketlists</Text>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune bucketlist disponible.</Text>
        }
      />

      {/* Add Bucketlist Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddBucketList}>
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Ajouter une Bucketlist</Text>
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
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  categorySubtitle: {
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
