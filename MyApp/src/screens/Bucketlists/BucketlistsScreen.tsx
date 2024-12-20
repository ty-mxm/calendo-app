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
    { title: 'Trips', emoji: '✈️', color: '#FFB6C1', itemsCount: 12 },
    { title: 'Restaurants', emoji: '🍴', color: '#FFD700', itemsCount: 15 },
    { title: 'Sports', emoji: '⚽', color: '#40E0D0', itemsCount: 8 },
    { title: 'Hobbies', emoji: '🎨', color: '#FFA07A', itemsCount: 10 },
    { title: 'Books', emoji: '📚', color: '#87CEEB', itemsCount: 7 },
  ];

  const renderItem = ({ item }: { item: BucketlistCategory }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('BucketlistDetails', { category: item })}
    >
      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
      <View>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categorySubtitle}>{item.itemsCount} items</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#FFF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bucketlists</Text>
        <Text style={styles.headerSubtitle}>
          Explore and manage your group bucketlists
        </Text>
      </View>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#7F57FF',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
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
  container: {
    padding: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
