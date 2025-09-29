import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import SpecRow from '../components/SpecRow';
import RomChips from '../components/RomChips';
import * as productsService from '../services/products';

const segments = [
  { key: 'budget', label: 'ประหยัด' },
  { key: 'mid', label: 'ระดับกลาง' },
  { key: 'flagship', label: 'เรือธง' },
];

function SegmentPicker({ value, onChange }) {
  return (
    <View style={styles.segmentRow}>
      {segments.map(s => (
        <Pressable key={s.key} onPress={() => onChange(s.key)} style={[styles.segmentBtn, value === s.key && styles.segmentBtnActive]}>
          <Text style={[styles.segmentText, value === s.key && styles.segmentTextActive]}>{s.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function ChooseModal({ visible, onClose, items, onSelect }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return items.filter(i => i.product_name.toLowerCase().includes(t));
  }, [q, items]);
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex:1, padding:16 }}>
        <Text style={{ fontSize: 18, fontWeight: '800' }}>เลือกสมาร์ทโฟน</Text>
        <TextInput placeholder="ค้นหา..." value={q} onChangeText={setQ} style={styles.search} />
        <FlatList
          data={filtered}
          keyExtractor={it => String(it.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { onSelect(item); onClose(); }} style={styles.optionItem}>
              <Text style={{ fontWeight: '700' }}>{item.product_name}</Text>
              <Text style={{ color:'#666' }}>{item.spec_list?.cpu}</Text>
            </TouchableOpacity>
          )}
        />
        <Pressable onPress={onClose} style={[styles.primaryBtn, { marginTop: 12 }]}><Text style={styles.primaryText}>ปิด</Text></Pressable>
      </View>
    </Modal>
  );
}

export default function CompareScreen() {
  const [segment, setSegment] = useState('budget');
  const [list, setList] = useState([]);
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  async function load() {
    try {
      const data = await productsService.listProducts({ segment });
      setList(data);
      setA(null);
      setB(null);
    } catch (e) {
      console.warn(e.message);
    }
  }

  useEffect(() => { load(); }, [segment]);

  useEffect(() => {
    if (a && b && a.segment !== b.segment) {
      Alert.alert('การเปรียบเทียบไม่ถูกต้อง', 'ต้องเลือกมือถือในระดับ (segment) เดียวกันเท่านั้น');
      setB(null);
    }
  }, [a, b]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เลือกช่วงราคาหรือระดับมือถือ</Text>
      <SegmentPicker value={segment} onChange={setSegment} />

      <View style={{ height: 12 }} />

      <View style={styles.selectRow}>
        <Pressable onPress={() => setShowA(true)} style={styles.selectBtn}>
          <Text style={styles.selectLabel}>{a ? a.product_name : 'เลือกรุ่น A'}</Text>
        </Pressable>
        <Text style={{ marginHorizontal: 8, fontWeight: '700' }}>VS</Text>
        <Pressable onPress={() => setShowB(true)} style={styles.selectBtn}>
          <Text style={styles.selectLabel}>{b ? b.product_name : 'เลือกรุ่น B'}</Text>
        </Pressable>
      </View>

      <ChooseModal visible={showA} onClose={() => setShowA(false)} items={list} onSelect={setA} />
      <ChooseModal visible={showB} onClose={() => setShowB(false)} items={list} onSelect={setB} />

      <View style={{ height: 16 }} />

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={[styles.cell, styles.headerCell]}>สเปค</Text>
          <Text style={[styles.cell, styles.headerCell]} numberOfLines={1}>{a?.product_name ?? 'รุ่น A'}</Text>
          <Text style={[styles.cell, styles.headerCell]} numberOfLines={1}>{b?.product_name ?? 'รุ่น B'}</Text>
        </View>
        <SpecRow label="CPU" a={a?.spec_list?.cpu} b={b?.spec_list?.cpu} />
        <SpecRow label="GPU" a={a?.spec_list?.gpu} b={b?.spec_list?.gpu} />
        <SpecRow label="RAM" a={a?.spec_list?.ram_gb ? `${a.spec_list.ram_gb} GB` : '-'} b={b?.spec_list?.ram_gb ? `${b.spec_list.ram_gb} GB` : '-'} />
        <View style={{ flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' }}>
          <Text style={[styles.cell, { backgroundColor: '#f6f6f6', fontWeight: '700' }]}>ROM (ขายจริง)</Text>
          <View style={styles.cell}><RomChips arr={a?.spec_list?.rom_options_gb} /></View>
          <View style={styles.cell}><RomChips arr={b?.spec_list?.rom_options_gb} /></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: '800' },
  segmentRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  segmentBtn: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 10 },
  segmentBtnActive: { backgroundColor: '#1f6feb22', borderColor: '#1f6feb' },
  segmentText: { fontWeight: '700', color: '#444' },
  segmentTextActive: { color: '#1f6feb' },
  selectRow: { flexDirection: 'row', alignItems: 'center' },
  selectBtn: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10 },
  selectLabel: { fontWeight: '700' },
  table: { marginTop: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', backgroundColor: '#eef3ff' },
  headerCell: { fontWeight: '800' },
  cell: { flex: 1, padding: 10 }
});
