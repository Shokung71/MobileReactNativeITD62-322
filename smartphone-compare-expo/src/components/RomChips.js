import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RomChips({ arr }) {
  const list = Array.isArray(arr) ? arr : [];
  return (
    <View style={styles.row}>
      {list.map((n, i) => (
        <Text key={i} style={styles.chip}>{n} GB</Text>
      ))}
      {list.length === 0 && <Text style={{ color: '#666' }}>-</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingVertical: 6 },
  chip: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }
});
