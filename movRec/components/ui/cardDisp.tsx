import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Show } from '@/types/show';

import CardMedia from './card/cardmedia';
import CardContent from './card/CardContent';
import CardActions from './card/CardAction';
import { sendFeedback } from '@/services/api';

type Props = {
  item: Show;
};

export default function CardDisp({ item }: Props) {
  const handleLike = async () => {
    try {
      const data = await sendFeedback('1', item.id, true);
      console.log('Liked:', data);
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const data = await sendFeedback('1', item.id, false);
      console.log('Disliked:', data);
    } catch (error) {
      console.error('Dislike failed:', error);
    }
  };

  const handleSave = () => {
    console.log('Saved:', item.id);
  };

  return (
    <Surface style={styles.surface} elevation={3}>
      <View style={styles.card}>
        <CardMedia item={item} />
        <CardContent item={item} />
        <View style={styles.divider} />
        <CardActions
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