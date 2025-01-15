import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, BucketlistCategory } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

type BucketlistDetailsRouteProp = RouteProp<RootStackParamList, 'BucketlistDetails'>;

interface BucketlistItem {
  id: string;
  title: string;
  addedBy: string;
}

export default function BucketlistDetailsScreen() {
  const route = useRoute<BucketlistDetailsRouteProp>();
  const navigation = useNavigation();
  const { category } = route.params;

  // Données fictives pour chaque catégorie
  const categoryItems: Record<string, BucketlistItem[]> = {
    Voyages: [
      { id: '1', title: 'Visiter Paris', addedBy: 'John' },
      { id: '2', title: 'Aller à Bali', addedBy: 'Emily' },
      { id: '3', title: 'Explorer New York', addedBy: 'Michael' },
      { id: '4', title: 'Road trip au Canada', addedBy: 'Sarah' },
      { id: '5', title: 'Randonner en Patagonie', addedBy: 'Chris' },
    ],
    Restaurants: [
      { id: '1', title: 'Essayer un restaurant japonais', addedBy: 'John' },
      { id: '2', title: 'Visiter un bistrot italien', addedBy: 'Emily' },
      { id: '3', title: 'Dîner dans un steakhouse', addedBy: 'Michael' },
      { id: '4', title: 'Découvrir la street food locale', addedBy: 'Sarah' },
      { id: '5', title: 'Manger dans un café végan', addedBy: 'Chris' },
    ],
    Sports: [
      { id: '1', title: 'Assister à un cours de yoga', addedBy: 'John' },
      { id: '2', title: 'Jouer au football', addedBy: 'Emily' },
      { id: '3', title: 'Faire de l’escalade', addedBy: 'Michael' },
      { id: '4', title: 'Essayer le patinage', addedBy: 'Sarah' },
      { id: '5', title: 'Nager dans l’océan', addedBy: 'Chris' },
    ],
    Loisirs: [
      { id: '1', title: 'Peindre un paysage', addedBy: 'John' },
      { id: '2', title: 'Prendre un cours de photographie', addedBy: 'Emily' },
      { id: '3', title: 'Écrire un poème', addedBy: 'Michael' },
      { id: '4', title: 'Apprendre la guitare', addedBy: 'Sarah' },
      { id: '5', title: 'Fabriquer une cabane à oiseaux', addedBy: 'Chris' },
    ],
    Livres: [
      { id: '1', title: 'Lire "1984"', addedBy: 'John' },
      { id: '2', title: 'Finir "Guerre et Paix"', addedBy: 'Emily' },
      { id: '3', title: 'Commencer "Gatsby le Magnifique"', addedBy: 'Michael' },
      { id: '4', title: 'Achever "Ne tirez pas sur l’oiseau moqueur"', addedBy: 'Sarah' },
      { id: '5', title: 'Explorer "Moby Dick"', addedBy: 'Chris' },
    ],
  };

  const items = categoryItems[category.title] || [];

  const renderItem = ({ item }: { item: BucketlistItem }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>Ajouté par : {item.addedBy}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={[styles.header, { backgroundColor: category.color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.title}</Text>
      </View>

      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun élément trouvé dans cette catégorie.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
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
    fontWeight: 'bold',
    color: '#FFF',
  },
  list: {
    padding: 20,
  },
  itemCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#6A5ACD', // Couleur pour distinguer chaque élément
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#AAA',
    marginTop: 20,
  },
});
