import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AddBucketListScreen() {
  const navigation = useNavigation();

  const [category, setCategory] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (!newItem.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un élément.');
      return;
    }
    setItems((prevItems) => [...prevItems, newItem.trim()]);
    setNewItem('');
  };

  const handleAddBucketList = () => {
    if (!category.trim() || items.length === 0) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs et ajouter au moins un élément.');
      return;
    }

    // Simule une réussite sans API
    Alert.alert('Succès', `Bucketlist de la catégorie "${category}" ajoutée avec les éléments : ${items.join(', ')} !`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter une Bucketlist</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Category Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="pricetags" size={20} color="#6A5ACD" />
          <TextInput
            style={styles.input}
            placeholder="Catégorie de la bucketlist"
            placeholderTextColor="#AAA"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        {/* Add Item Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="add" size={20} color="#6A5ACD" />
          <TextInput
            style={styles.input}
            placeholder="Ajouter un élément"
            placeholderTextColor="#AAA"
            value={newItem}
            onChangeText={setNewItem}
          />
          <TouchableOpacity onPress={handleAddItem} style={styles.addButtonSmall}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucun élément ajouté.</Text>}
        />

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddBucketList}>
          <Text style={styles.addButtonText}>Ajouter la Bucketlist</Text>
        </TouchableOpacity>
      </View>
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
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonSmall: {
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 14,
    marginTop: 20,
  },
});
