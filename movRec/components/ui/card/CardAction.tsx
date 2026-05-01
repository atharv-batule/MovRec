import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

import { Show } from '@/types/show';
import { useWatchlist } from '@/context/watchlistcontext';
import { toggleWatchlist } from '@/services/api';

type CardActionsProps = {
  movie: Show;
  liked?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
};

export default function CardActions({
  movie,
  liked = false,
  onLike,
  onDislike,
}: CardActionsProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isSaved = useMemo(() => {
    return watchlist.some((item) => item.id === movie.id);
  }, [watchlist, movie.id]);

  const handleSaveToggle = async () => {
  try {
    if (isSaved) {
      removeFromWatchlist(movie.id); // instant UI update
    } else {
      addToWatchlist(movie); // instant UI update
    }

    await toggleWatchlist('1', movie.id); // backend toggles automatically
  } catch (error) {
    console.error('Failed to update watchlist:', error);
  }
};

  return (
    <View style={styles.actions}>
      <IconButton
        icon="thumb-up"
        iconColor={liked ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={onLike}
      />

      <IconButton
        icon="thumb-down"
        iconColor={MD3Colors.neutralVariant50}
        size={22}
        onPress={onDislike}
      />

      <IconButton
        icon="bookmark"
        iconColor={isSaved ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={handleSaveToggle}
      />

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.watchBtn}>
        <Text style={styles.watchText}>▶ Watch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  watchBtn: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  watchText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});