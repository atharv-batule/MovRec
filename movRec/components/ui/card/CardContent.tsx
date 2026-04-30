import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Show } from '@/types/show';

type Props = {
  item: Show;
};

export default function CardContent({ item }: Props) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  description: {
    color: '#aaa',
    fontSize: 13.5,
    lineHeight: 20,
  },
});