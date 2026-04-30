import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Show } from '@/types/show';

type Props = {
  item: Show;
};

export default function HorizontalCard({ item }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.genre}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1c1c1e',
  },
  image: {
    width: 130,
    height: 170,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E50914',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    padding: 8,
    letterSpacing: 0.3,
  },
});