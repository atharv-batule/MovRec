import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Show } from '@/types/show';

import CardMedia from './card/cardmedia';
import CardContent from './card/CardContent';
import CardActions from './card/CardAction';

type Props = {
  item: Show;
};

export default function CardDisp({ item }: Props) {
  return (
    <Surface style={styles.surface} elevation={3}>
      <View style={styles.card}>
        <CardMedia item={item} />
        <CardContent item={item} />
        <View style={styles.divider} />
        <CardActions />
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#1c1c1e',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginHorizontal: 14,
    marginTop: 10,
  },
});