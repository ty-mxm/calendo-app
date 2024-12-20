import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, BucketlistCategory } from '../../../types';

type BucketlistDetailsRouteProp = RouteProp<RootStackParamList, 'BucketlistDetails'>;

interface BucketlistItem {
  id: string;
  title: string;
  addedBy: string;
}

export default function BucketlistDetailsScreen() {
  const route = useRoute<BucketlistDetailsRouteProp>();
  const { category } = route.params;

  // Mock data for each category
  const categoryItems: Record<string, BucketlistItem[]> = {
    Trips: [
      { id: '1', title: 'Visit Paris', addedBy: 'John' },
      { id: '2', title: 'Go to Bali', addedBy: 'Emily' },
      { id: '3', title: 'Explore New York', addedBy: 'Michael' },
      { id: '4', title: 'Road trip in Canada', addedBy: 'Sarah' },
      { id: '5', title: 'Hike in Patagonia', addedBy: 'Chris' },
    ],
    Restaurants: [
      { id: '1', title: 'Try Sushi Place', addedBy: 'John' },
      { id: '2', title: 'Visit Italian Bistro', addedBy: 'Emily' },
      { id: '3', title: 'Dine at Steakhouse', addedBy: 'Michael' },
      { id: '4', title: 'Taste Local Street Food', addedBy: 'Sarah' },
      { id: '5', title: 'Eat at Vegan Cafe', addedBy: 'Chris' },
    ],
    'Sports': [
      { id: '1', title: 'Attend Yoga Class', addedBy: 'John' },
      { id: '2', title: 'Play Soccer', addedBy: 'Emily' },
      { id: '3', title: 'Go Rock Climbing', addedBy: 'Michael' },
      { id: '4', title: 'Try Ice Skating', addedBy: 'Sarah' },
      { id: '5', title: 'Swim in the Ocean', addedBy: 'Chris' },
    ],
    Hobbies: [
      { id: '1', title: 'Paint a Landscape', addedBy: 'John' },
      { id: '2', title: 'Take a Photography Class', addedBy: 'Emily' },
      { id: '3', title: 'Write Poetry', addedBy: 'Michael' },
      { id: '4', title: 'Learn to Play Guitar', addedBy: 'Sarah' },
      { id: '5', title: 'Build a Birdhouse', addedBy: 'Chris' },
    ],
    Books: [
      { id: '1', title: 'Read “1984”', addedBy: 'John' },
      { id: '2', title: 'Finish “War and Peace”', addedBy: 'Emily' },
      { id: '3', title: 'Start “The Great Gatsby”', addedBy: 'Michael' },
      { id: '4', title: 'Complete “To Kill a Mockingbird”', addedBy: 'Sarah' },
      { id: '5', title: 'Explore “Moby Dick”', addedBy: 'Chris' },
    ],
  };

  const items = categoryItems[category.title] || [];

  const renderItem = ({ item }: { item: BucketlistItem }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>Added by: {item.addedBy}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: category.color }]}>
        <Text style={styles.headerEmoji}>{category.emoji}</Text>
        <Text style={styles.headerTitle}>{category.title}</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerEmoji: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  list: {
    padding: 20,
  },
  itemCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
