import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

type CardActionsProps = {
  onLike?: () => void;
  onDislike?: () => void;
  onSave?: () => void;
};

export default function CardActions({
  onLike,
  onDislike,
  onSave,
}: CardActionsProps) {
  const [vote, setvote] = useState<'like' | 'dislike' | null>(null);
  const [save, setSave] = useState<'true' | null>(null);

  return (
    <View style={styles.actions}>
      <IconButton
        icon="thumb-up"
        iconColor={vote === 'like' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => {
          const next = vote === 'like' ? null : 'like';
          setvote(next);
          if (next === 'like') onLike?.();
        }}
      />

      <IconButton
        icon="thumb-down"
        iconColor={vote === 'dislike' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => {
          const next = vote === 'dislike' ? null : 'dislike';
          setvote(next);
          if (next === 'dislike') onDislike?.();
        }}
      />

      <IconButton
        icon="bookmark"
        iconColor={save === 'true' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => {
          const next = save === 'true' ? null : 'true';
          setSave(next);
          onSave?.();
        }}
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