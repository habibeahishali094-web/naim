import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STORAGE_KEY = '@flashcards_storage_key';

export default function DashboardScreen({ navigation }) {
  const [decks, setDecks] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Load existing flashcards and shape them as a mock deck for the UI
    const loadDecks = async () => {
      try {
        const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedCards = storedCards ? JSON.parse(storedCards) : [];
        const totalCards = parsedCards.length > 0 ? parsedCards.length : 1;
        
        // Use realistic dummy data to represent the Decks Dashboard UI
        setDecks([
          { id: '1', name: 'My Initial Deck', total: totalCards, completed: 0 },
          { id: '2', name: 'Spanish Verbs', total: 45, completed: 21 },
          { id: '3', name: 'Science & Nature', total: 18, completed: 18 },
        ]);
      } catch (error) {
        console.error('Failed to load decks:', error);
      }
    };
    loadDecks();
  }, []);

  const renderDeck = ({ item }) => {
    const progress = item.total === 0 ? 0 : item.completed / item.total;
    return (
      <TouchableOpacity style={styles.deckCard}>
        <Text style={styles.deckTitle}>{item.name}</Text>
        <Text style={styles.deckSubtitle}>{item.completed} / {item.total} Cards Mastered</Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.headerTitle}>Decks Dashboard</Text>
      
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={renderDeck}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={[styles.fab, { bottom: 24, right: 24 }]} 
        onPress={() => navigation.navigate('Camera')}
      >
        <MaterialCommunityIcons name="camera" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313', // "Ether Dark" Main Background
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 24,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 110, // Space to not cover last item with the FAB
  },
  deckCard: {
    backgroundColor: '#1E1E1E', // Slightly lighter for contrast against #131313
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  deckTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  deckSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#536DFE', // "Ether Dark" Primary color
    borderRadius: 4,
  },
  fab: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF4081', // Pink/Magenta Accent for the FAB
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4081',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
