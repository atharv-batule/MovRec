import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';

export default function CardActions() {
  const [vote, setvote] = useState<'like' | 'dislike' | null>(null);
  const [save, setSave] = useState<'true' | null>(null);
  return (
    <View style={styles.actions}>
      <IconButton
        icon="thumb-up"
        iconColor={vote === 'like' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => setvote(vote === 'like' ? null : 'like')}
      />
      <IconButton
        icon="thumb-down"
        iconColor={vote === 'dislike' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => setvote(vote === 'dislike' ? null : 'dislike')}
      />
      <IconButton
        icon="bookmark"
        iconColor={save === 'true' ? '#E50914' : MD3Colors.neutralVariant50}
        size={22}
        onPress={() => setSave(save === 'true' ? null : 'true')}
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