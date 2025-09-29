import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import * as productsService from '../services/products';
import { AuthContext } from '../context/AuthContext';
import { isAdmin } from '../utils/guards';
import { toIntArray } from '../utils/validators';

const segments = ['budget', 'mid', 'flagship'];

function ProductForm({ initial, onSubmit, onCancel }) {
  const [product_name, setName] = useState(initial?.product_name || '');
  const [segment, setSeg] = useState(initial?.segment || 'budget');
  const [cpu, setCpu] = useState(initial?.spec_list?.cpu || '');
  const [gpu, setGpu] = useState(initial?.spec_list?.gpu || '');
  const [ram_gb, setRam] = useState(String(initial?.spec_list?.ram_gb ?? ''));
  const [rom_options, setRom] = useState((initial?.spec_list?.rom_options_gb || []).join(', '));

  const submit = () => {
    if (!product_name.trim()) return Alert.alert('กรอกชื่อรุ่น');
    const payload = {
      product_name,
      segment,
      spec_list: {
        cpu: cpu.trim(), gpu: gpu.trim(),
        ram_gb: parseInt(ram_gb, 10) || 0,
        rom_options_gb: toIntArray(rom_options)
      }
    };
    onSubmit(payload);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>{initial ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</Text>
      <TextInput placeholder="ชื่อรุ่น" value={product_name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="segment: budget | mid | flagship" value={segment} onChangeText={setSeg} style={styles.input} />
      <TextInput placeholder="CPU" value={cpu} onChangeText={setCpu} style={styles.input} />
      <TextInput placeholder="GPU" value={gpu} onChangeText={setGpu} style={styles.input} />
      <TextInput placeholder="RAM (GB)" keyboardType="numeric" value={ram_gb} onChangeText={setRam} style={styles.input} />
      <TextInput placeholder="ROM (เช่น 128, 256)" value={rom_options} onChangeText={setRom} style={styles.input} />

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
        <Pressable style={styles.primaryBtn} onPress={submit}><Text style={styles.primaryText}>{initial ? 'บันทึก' : 'เพิ่ม'}</Text></Pressable>
        <Pressable style={styles.secondaryBtn} onPress={onCancel}><Text style={styles.secondaryText}>ยกเลิก</Text></Pressable>
      </View>
    </View>
  );
}

export default function AdminProductsScreen() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [mode, setMode] = useState('list'); // list | form

  useEffect(() => {
    if (!isAdmin(user)) {
      Alert.alert('ต้องเป็นผู้ดูแลระบบเท่านั้น');
    }
  }, [user]);

  async function load() {
    const data = await productsService.listProducts();
    setItems(data);
  }
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    await productsService.deleteProduct(id);
    await load();
  };

  const create = async (p) => {
    await productsService.createProduct(p);
    setMode('list');
    await load();
  };

  const update = async (p) => {
    await productsService.updateProduct(editing.id, p);
    setEditing(null);
    setMode('list');
    await load();
  };

  return (
    <View style={styles.container}>
      {mode === 'list' && (
        <>
          <Text style={styles.title}>รายการสินค้า</Text>
          <Pressable style={styles.primaryBtn} onPress={() => { setEditing(null); setMode('form'); }}>
            <Text style={styles.primaryText}>+ เพิ่มสินค้า</Text>
          </Pressable>
          <FlatList
            data={items}
            keyExtractor={it => String(it.id)}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={{ flex: 1, fontWeight: '700' }}>{item.product_name} <Text style={{ color:'#1f6feb' }}>({item.segment})</Text></Text>
                <Pressable style={styles.smallBtn} onPress={() => { setEditing(item); setMode('form'); }}><Text style={styles.smallText}>แก้ไข</Text></Pressable>
                <Pressable style={[styles.smallBtn, { backgroundColor:'#fee2e2' }]} onPress={() => remove(item.id)}><Text style={[styles.smallText, { color:'#b91c1c' }]}>ลบ</Text></Pressable>
              </View>
            )}
          />
        </>
      )}

      {mode === 'form' && (
        <ProductForm
          initial={editing}
          onSubmit={editing ? update : create}
          onCancel={() => { setEditing(null); setMode('list'); }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
  smallBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor:'#e8eefc', borderRadius: 8 },
  smallText: { color: '#1f6feb', fontWeight: '800' },
  primaryBtn: { backgroundColor: '#1f6feb', padding: 10, borderRadius: 10, alignItems:'center', marginBottom: 8 },
  primaryText: { color: 'white', fontWeight: '800' },
  secondaryBtn: { backgroundColor: '#f3f4f6', padding: 10, borderRadius: 10, alignItems:'center' },
  secondaryText: { color: '#111827', fontWeight: '800' },
  form: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  formTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }
});
