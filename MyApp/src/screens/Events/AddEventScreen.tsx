import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AddEventScreen() {
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="event" size={24} color="#40E0D0" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Event name*"
          value={eventName}
          onChangeText={setEventName}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="location-on" size={24} color="#FF69B4" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="calendar-alt" size={20} color="#FFA500" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.timeContainer}>
        <View style={[styles.inputContainer, styles.timeInputContainer]}>
          <FontAwesome5 name="clock" size={20} color="#7F57FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Start time"
            value={startTime}
            onChangeText={setStartTime}
          />
        </View>
        <View style={[styles.inputContainer, styles.timeInputContainer]}>
          <FontAwesome5 name="clock" size={20} color="#7F57FF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="End time"
            value={endTime}
            onChangeText={setEndTime}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="category" size={24} color="#87CEEB" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Custom poll"
          value={category}
          onChangeText={setCategory}
        />
      </View>

      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});