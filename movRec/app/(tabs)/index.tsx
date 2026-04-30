import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

import Header from '@/components/ui/nav';
import CardDisp from '@/components/ui/cardDisp';
import HorizontalCard from '@/components/HorizontalCard';
import SectionHeader from '@/components/SectionHeader';

import { Show } from '@/types/show';
import { fetchRecommendations } from '@/services/api';

export default function HomeScreen() {
  const [shows, setShows] = useState<Show[]>([]);
  const [featured, setFeatured] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const data = await fetchRecommendations('1');
      const rankedMovies: Show[] = data.recommendations || [];

      setShows(rankedMovies);
      setFeatured(rankedMovies.slice(0, 4));
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <Header />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionHeader title="🔥 Trending Now" />

        <FlatList
          data={featured}
          renderItem={({ item }: { item: Show }) => (
            <HorizontalCard item={item} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />

        <SectionHeader title="📺 Recommended For You" />

        {shows.map((show) => (
          <CardDisp key={show.id} item={show} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});