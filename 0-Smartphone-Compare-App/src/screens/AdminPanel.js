import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiGet, apiPost, apiPatch, apiDel } from '../api';

const SEGMENTS = [
  { key: 'budget', label: 'ประหยัด' },
  { key: 'midrange', label: 'ระดับกลาง' },
  { key: 'flagship', label: 'เรือธง' },
];

const SPEC_FIELDS = [
  { key: 'cpu', label: 'CPU' },
  { key: 'gpu', label: 'GPU' },
  { key: 'display_size', label: 'ขนาดหน้าจอ' },
  { key: 'display_type', label: 'ประเภทจอ' },
  { key: 'ram', label: 'RAM' },
  { key: 'rom', label: 'ROM (วางขายจริง)' },
  { key: 'battery', label: 'แบตเตอรี่' },
];

export default function AdminPanelScreen() {
  const [tab, setTab] = useState('products'); // 'products' | 'users'
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', margin: 16 }}>
          <TouchableOpacity
            onPress={() => setTab('products')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: tab === 'products' ? '#111' : '#e5e7eb',
              borderRadius: 8,
              marginRight: 8,
            }}
          >
            <Text style={{ color: tab === 'products' ? '#fff' : '#111' }}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('users')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: tab === 'users' ? '#111' : '#e5e7eb',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: tab === 'users' ? '#fff' : '#111' }}>Users</Text>
          </TouchableOpacity>
        </View>
        {tab === 'products' ? <AdminProducts /> : <AdminUsers />}
      </View>
    </SafeAreaView>
  );
}

function AdminProducts() {
  const createEmptyForm = () => ({
    product_name: '',
    segment: 'midrange',
    image_base64: null,
    spec_list: { cpu: '', gpu: '', display_size: '', display_type: '', ram: '', rom: '', battery: '' },
  });

  const [list, setList] = useState([]);
  const [form, setForm] = useState(createEmptyForm());
  const [productQuery, setProductQuery] = useState('');

  // สำหรับแก้ไขใน Modal
  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(createEmptyForm());

  const load = async () => {
    const data = await apiGet('/products');
    setList(data || []);
  };
  useEffect(() => { load(); }, []);

  const pickImageAdd = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.base64) {
      setForm(prev => ({ ...prev, image_base64: res.assets[0].base64 }));
    }
  };

  const pickImageEdit = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.base64) {
      setEditForm(prev => ({ ...prev, image_base64: res.assets[0].base64 }));
    }
  };

  const saveAdd = async () => {
    if (!form.product_name) return Alert.alert('กรอกชื่อสินค้า');
    await apiPost('/products', form);
    setForm(createEmptyForm());
    load();
  };

  const clearAddForm = () => setForm(createEmptyForm());

  const del = async (item) => {
    Alert.alert('ยืนยันลบมือถือ', `ลบ ${item.product_name}?`, [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบ',
        style: 'destructive',
        onPress: async () => { await apiDel(`/products/${item.id}`); load(); }
      }
    ]);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setEditForm({
      product_name: item.product_name,
      segment: item.segment,
      image_base64: item.image_base64 || null,
      spec_list: { ...item.spec_list },
    });
    setEditVisible(true);
  };

  const saveEdit = async () => {
    if (!editForm.product_name) return Alert.alert('กรอกชื่อสินค้า');
    await apiPatch(`/products/${editId}`, editForm);
    setEditVisible(false);
    setEditId(null);
    setEditForm(createEmptyForm());
    load();
  };

  const filtered = useMemo(() => {
    const q = productQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(i =>
      i.product_name?.toLowerCase().includes(q) ||
      i.segment?.toLowerCase().includes(q)
    );
  }, [list, productQuery]);

  const Chip = ({ active, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: active ? '#111' : '#f3f4f6',
        borderRadius: 999,
        marginRight: 8,
        borderWidth: active ? 0 : 1,
        borderColor: '#e5e7eb',
      }}
    >
      <Text style={{ color: active ? '#fff' : '#111' }}>{label}</Text>
    </TouchableOpacity>
  );

  const SmallBtn = ({ title, onPress, type = 'primary' }) => {
    const bg =
      type === 'primary' ? '#111' :
      type === 'danger' ? '#ef4444' :
      type === 'secondary' ? '#f3f4f6' : '#e5e7eb';
    const color = type === 'primary' ? '#fff' : '#111';
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: bg, borderRadius: 8, marginLeft: 8 }}
      >
        <Text style={{ color, fontWeight: '600' }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>เพิ่มสินค้า</Text>

        <TextInput
          placeholder="ชื่อสินค้า"
          value={form.product_name}
          onChangeText={(t) => setForm(p => ({ ...p, product_name: t }))}
          style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' }}
        />

        <Text style={{ marginTop: 4, marginBottom: 6 }}>ช่วงราคา/ระดับ</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {SEGMENTS.map(s => (
            <Chip
              key={s.key}
              label={s.label}
              active={form.segment === s.key}
              onPress={() => setForm(p => ({ ...p, segment: s.key }))}
            />
          ))}
        </View>

        {SPEC_FIELDS.map(({ key, label }) => (
          <TextInput
            key={key}
            placeholder={label}
            value={form.spec_list[key]}
            onChangeText={(t) => setForm(p => ({ ...p, spec_list: { ...p.spec_list, [key]: t } }))}
            style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: '#fff' }}
          />
        ))}

        {form.image_base64 ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${form.image_base64}` }}
            style={{ width: 96, height: 96, borderRadius: 12, marginBottom: 10 }}
          />
        ) : null}

        {/* ปุ่ม 3 ปุ่มในระนาบเดียวกัน */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <SmallBtn title="เลือกรูปภาพ" onPress={pickImageAdd} type="secondary" />
          <SmallBtn title="เพิ่มสินค้า" onPress={saveAdd} type="primary" />
          <SmallBtn title="ล้างฟอร์ม" onPress={clearAddForm} type="secondary" />
        </View>

        {/* ช่องค้นหา Products */}
        <Text style={{ fontSize: 16, fontWeight: '700', marginTop: 8, marginBottom: 8 }}>ค้นหา Products ในระบบ</Text>
        <TextInput
          placeholder="พิมพ์ชื่อสินค้า หรือช่วงราคา (budget/midrange/flagship)"
          value={productQuery}
          onChangeText={setProductQuery}
          style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: '#fff' }}
        />

        <FlatList
          data={filtered}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
              {item.image_base64 ? (
                <Image source={{ uri: `data:image/jpeg;base64,${item.image_base64}` }} style={{ width: 48, height: 48, borderRadius: 8, marginRight: 8 }} />
              ) : (
                <View style={{ width: 48, height: 48, borderRadius: 8, marginRight: 8, backgroundColor: '#e5e7eb' }} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{item.product_name}</Text>
                <Text style={{ color: '#6b7280' }}>{item.segment}</Text>
              </View>
              <SmallBtn title="แก้ไข" onPress={() => openEdit(item)} />
              <SmallBtn title="ลบมือถือ" onPress={() => del(item)} type="danger" />
            </View>
          )}
        />
      </ScrollView>

      {/* Modal สำหรับแก้ไข */}
      <Modal
        visible={editVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 16 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16, maxHeight: '90%' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>แก้ไขสินค้า</Text>

            <ScrollView>
              <TextInput
                placeholder="ชื่อสินค้า"
                value={editForm.product_name}
                onChangeText={(t) => setEditForm(p => ({ ...p, product_name: t }))}
                style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' }}
              />

              <Text style={{ marginTop: 4, marginBottom: 6 }}>ช่วงราคา/ระดับ</Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {SEGMENTS.map(s => (
                  <TouchableOpacity
                    key={s.key}
                    onPress={() => setEditForm(p => ({ ...p, segment: s.key }))}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      backgroundColor: editForm.segment === s.key ? '#111' : '#f3f4f6',
                      borderRadius: 999,
                      marginRight: 8,
                      borderWidth: editForm.segment === s.key ? 0 : 1,
                      borderColor: '#e5e7eb',
                    }}
                  >
                    <Text style={{ color: editForm.segment === s.key ? '#fff' : '#111' }}>{s.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {SPEC_FIELDS.map(({ key, label }) => (
                <TextInput
                  key={key}
                  placeholder={label}
                  value={editForm.spec_list[key]}
                  onChangeText={(t) => setEditForm(p => ({ ...p, spec_list: { ...p.spec_list, [key]: t } }))}
                  style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: '#fff' }}
                />
              ))}

              {editForm.image_base64 ? (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${editForm.image_base64}` }}
                  style={{ width: 96, height: 96, borderRadius: 12, marginBottom: 10 }}
                />
              ) : null}

              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 4, marginBottom: 4 }}>
                <TouchableOpacity
                  onPress={pickImageEdit}
                  style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#f3f4f6', borderRadius: 8, marginRight: 8, marginBottom: 8 }}
                >
                  <Text style={{ color: '#111', fontWeight: '600' }}>เลือกรูปภาพ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={saveEdit}
                  style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#111', borderRadius: 8, marginRight: 8, marginBottom: 8 }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>บันทึกการแก้ไข</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { setEditVisible(false); setEditId(null); }}
                  style={{ paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#e5e7eb', borderRadius: 8, marginBottom: 8 }}
                >
                  <Text style={{ color: '#111', fontWeight: '600' }}>ยกเลิก</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function AdminUsers() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('');
  const load = async () => { setList(await apiGet('/users') || []); };
  useEffect(() => { load(); }, []);

  const changeRole = async (user, role) => {
    await apiPatch(`/users/${user.id}`, { role_type: role });
    load();
  };

  const pickProfile = async (user) => {
    const res = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 0.8 });
    if (!res.canceled && res.assets?.[0]?.base64) {
      await apiPatch(`/users/${user.id}`, { img_profile_base64: res.assets[0].base64 });
      load();
    }
  };

  const delUser = async (user) => {
    Alert.alert('ยืนยันลบผู้ใช้', `ลบ ${user.username}?`, [
      { text: 'ยกเลิก', style: 'cancel' },
      { text: 'ลบ', style: 'destructive', onPress: async () => { await apiDel(`/users/${user.id}`); load(); } }
    ]);
  };

  const filtered = list.filter(u => u.username.toLowerCase().includes(query.toLowerCase()));

  const SmallBtn = ({ title, onPress, type = 'primary' }) => {
    const bg =
      type === 'primary' ? '#111' :
      type === 'danger' ? '#ef4444' :
      type === 'secondary' ? '#f3f4f6' : '#e5e7eb';
    const color = type === 'primary' ? '#fff' : '#111';
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: bg, borderRadius: 8, marginLeft: 6 }}
      >
        <Text style={{ color, fontWeight: '600' }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <TextInput
        placeholder="ค้นหา username"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8, backgroundColor: '#fff' }}
      />
      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
            {item.img_profile_base64 ? (
              <Image source={{ uri: `data:image/jpeg;base64,${item.img_profile_base64}` }} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 8 }} />
            ) : (
              <View style={{ width: 44, height: 44, borderRadius: 22, marginRight: 8, backgroundColor: '#e5e7eb' }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.username}</Text>
              <Text style={{ color: '#6b7280' }}>{item.role_type}</Text>
            </View>
            <SmallBtn title="โปรไฟล์" onPress={() => pickProfile(item)} type="secondary" />
            <SmallBtn title="เป็น user" onPress={() => changeRole(item, 'user')} />
            <SmallBtn title="เป็น admin" onPress={() => changeRole(item, 'admin')} />
            <SmallBtn title="ลบผู้ใช้" onPress={() => delUser(item)} type="danger" />
          </View>
        )}
      />
    </View>
  );
}
