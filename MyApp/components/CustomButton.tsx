
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomButton = ({ onPress, title, disabled }: { onPress: () => void; title: string; disabled?: boolean }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { backgroundColor: '#7F57FF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#CCC' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export const Header = ({ title, onBackPress }: { title: string; onBackPress: () => void }) => (
  <View style={headerStyles.header}>
    <TouchableOpacity onPress={onBackPress} style={headerStyles.iconContainer}>
      <Ionicons name="arrow-back" size={24} color="#FFF" />
    </TouchableOpacity>
    <Text style={headerStyles.headerTitle}>{title}</Text>
    <View style={headerStyles.iconContainer} /> {/* Spacer */}
  </View>
);

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  iconContainer: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
});

export const InputField = ({
    placeholder,
    value,
    onChangeText,
    iconName,
  }: {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName: keyof typeof Ionicons.glyphMap; // Typage spécifique
  }) => (
    <View style={inputStyles.inputContainer}>
      <Ionicons name={iconName} size={24} color="#7F57FF" />
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, color: '#333' },
});
