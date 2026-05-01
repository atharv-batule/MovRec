import { Image } from 'expo-image';
import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { shows } from '@/data/show';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShows = useMemo(() => {
    if (!searchQuery.trim()) return shows;

    return shows.filter((show) =>
      show.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const leftColumn = filteredShows.filter((_, index) => index % 2 === 0);
  const rightColumn = filteredShows.filter((_, index) => index % 2 !== 0);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      enableOnAndroid
      extraScrollHeight={20}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies, shows..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <View style={styles.columns}>
        <View style={styles.column}>
          {leftColumn.map((show) => (
            <Pressable
              key={show.id}
              style={[
                styles.card,
                show.size === 'large' ? styles.largeCard : styles.smallCard,
              ]}
            >
              <Image source={{ uri: show.image }} style={styles.image} contentFit="cover" />
            </Pressable>
          ))}
        </View>

        <View style={styles.column}>
          {rightColumn.map((show) => (
            <Pressable
              key={show.id}
              style={[
                styles.card,
                show.size === 'large' ? styles.largeCard : styles.smallCard,
              ]}
            >
              <Image source={{ uri: show.image }} style={styles.image} contentFit="cover" />
            </Pressable>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 120,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 0,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  column: {
    width: '48%',
    gap: 10,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  smallCard: {
    height: 170,
  },
  largeCard: {
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});