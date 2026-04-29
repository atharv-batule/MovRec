import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
};

export default function SectionHeader({ title }: Props) {
  return <Text style={styles.label}>{title}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 4,
  },
});