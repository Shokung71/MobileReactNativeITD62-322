import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.product_name}</Text>
      <Text style={styles.segment}>{item.segment.toUpperCase()}</Text>
      <View style={styles.row}><Text style={styles.k}>CPU: </Text><Text style={styles.v}>{item.spec_list?.cpu}</Text></View>
      <View style={styles.row}><Text style={styles.k}>GPU: </Text><Text style={styles.v}>{item.spec_list?.gpu}</Text></View>
      <View style={styles.row}><Text style={styles.k}>RAM: </Text><Text style={styles.v}>{item.spec_list?.ram_gb} GB</Text></View>
      <View style={styles.row}><Text style={styles.k}>ROM: </Text><Text style={styles.v}>{(item.spec_list?.rom_options_gb||[]).join(', ')} GB</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 12, marginVertical: 8, elevation: 2 },
  name: { fontSize: 18, fontWeight: '700' },
  segment: { alignSelf: 'flex-start', marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, backgroundColor: '#e8eefc', color: '#1f6feb', fontWeight: '600' },
  row: { flexDirection: 'row', marginTop: 4 },
  k: { fontWeight: '600' },
  v: { flex: 1, flexWrap: 'wrap' }
});
