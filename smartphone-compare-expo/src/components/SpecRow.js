import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpecRow({ label, a, b }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.label]}>{label}</Text>
      <Text style={styles.cell}>{a ?? '-'}</Text>
      <Text style={styles.cell}>{b ?? '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  cell: { flex: 1, padding: 10 },
  label: { backgroundColor: '#f6f6f6', fontWeight: '700' }
});
