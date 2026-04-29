import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
} from 'react-native';

import Header from '@/components/ui/nav';
import CardDisp from '@/components/ui/cardDisp';
import HorizontalCard from '@/components/HorizontalCard';
import SectionHeader from '@/components/SectionHeader';

import { FEATURED, SHOWS } from '@/data/show';
import { Show } from '@/types/show';

export default function HomeScreen() {
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
          data={FEATURED}
          renderItem={({ item }: { item: Show }) => (
            <HorizontalCard item={item} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hList}
        />

        <SectionHeader title="📺 All Shows" />

        {SHOWS.map((show) => (
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
});