import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Show } from '@/types/show';

import CardMedia from './card/cardmedia';
import CardContent from './card/CardContent';
import CardActions from './card/CardAction';
import { sendFeedback, toggleWatchlist } from '@/services/api';

type Props = {
  item: Show;
  liked?: boolean;
  onRemove?: (movieId: string) => void;
};

export default function CardDisp({ item, liked, onRemove }: Props) {
  const handleLike = async () => {
    try {
      await sendFeedback('1', item.id, true);
      onRemove?.(item.id);
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await sendFeedback('1', item.id, false);
      onRemove?.(item.id);
    } catch (error) {
      console.error('Dislike failed:', error);
    }
  };

  const handleSave = async () => {
    try {
      await toggleWatchlist('1', item.id);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <Surface style={styles.surface} elevation={3}>
      <View style={styles.card}>
        <CardMedia item={item} />
        <CardContent item={item} />
        <View style={styles.divider} />
       <CardActions
        liked={liked}
        onLike={handleLike}
        onDislike={handleDislike}
        onSave={handleSave}
      />
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