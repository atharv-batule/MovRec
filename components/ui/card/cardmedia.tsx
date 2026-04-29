import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Show } from '@/types/show';

type Props = {
  item: Show;
};

export default function CardMedia({ item }: Props) {
  return (
    <View>
      <Image source={{ uri: item.image }} style={styles.cover} resizeMode="cover" />
      <View style={styles.genrePill}>
        <Text style={styles.genreText}>{item.genre}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: '100%',
    height: 200,
  },
  genrePill: {
    position: 'absolute',
    top: 160,
    left: 14,
    backgroundColor: 'rgba(229,9,20,0.9)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  genreText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});