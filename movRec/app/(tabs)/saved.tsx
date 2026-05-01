import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import Header from '@/components/ui/nav';
import CardDisp from '@/components/ui/cardDisp';
import SectionHeader from '@/components/SectionHeader';
import { Show } from '@/types/show';
import { useSaved } from '@/context/watchlistcontext';

export default function SavedScreen() {
  const { saved, loading } = useSaved();

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <Header />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <SectionHeader title="🔖 Saved For Later" />

        {saved.length === 0 ? (
          <Text style={styles.empty}>No saved movies yet</Text>
        ) : (
          saved.map((show: Show) => <CardDisp key={show.id} item={show} />)
        )}
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
  content: {
    paddingBottom: 32,
  },
  empty: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});