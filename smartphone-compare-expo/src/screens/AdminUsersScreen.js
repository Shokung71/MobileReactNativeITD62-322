import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/auth';
import { isAdmin } from '../utils/guards';

function UserRow({ item, onSave, onDelete }) {
  const [username, setUsername] = useState(item.username);
  const [password, setPassword] = useState(item.password);
  const [role_type, setRole] = useState(item.role_type);
  const [img_profile, setImg] = useState(item.img_profile || '');

  return (
    <View style={styles.userCard}>
      <Text style={{ fontWeight:'800', fontSize:16, marginBottom:6 }}>{item.username}</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder="username" style={styles.input} />
      <TextInput value={password} onChangeText={setPassword} placeholder="password" style={styles.input} />
      <TextInput value={role_type} onChangeText={setRole} placeholder="role: user | admin" style={styles.input} />
      <TextInput value={img_profile} onChangeText={setImg} placeholder="img url" style={styles.input} />
      <View style={{ flexDirection:'row', gap:8 }}>
        <Pressable style={styles.primaryBtn} onPress={() => onSave(item.id, { username, password, role_type, img_profile })}><Text style={styles.primaryText}>บันทึก</Text></Pressable>
        <Pressable style={[styles.dangerBtn]} onPress={() => onDelete(item.id)}><Text style={styles.dangerText}>ลบ</Text></Pressable>
      </View>
    </View>
  );
}

export default function AdminUsersScreen() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isAdmin(user)) {
      Alert.alert('ต้องเป็นผู้ดูแลระบบเท่านั้น');
    }
  }, [user]);

  async function load() {
    const data = await authService.listUsers();
    setItems(data);
  }
  useEffect(() => { load(); }, []);

  const onSave = async (id, data) => {
    await authService.updateUser(id, data);
    await load();
  };

  const onDelete = async (id) => {
    await authService.deleteUser(id);
    await load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ผู้ใช้ทั้งหมด</Text>
      <FlatList
        data={items}
        keyExtractor={it => String(it.id)}
        renderItem={({ item }) => (
          <UserRow item={item} onSave={onSave} onDelete={onDelete} />
        )}
        ListEmptyComponent={<Text style={{ textAlign:'center', color:'#666' }}>ไม่มีข้อมูล</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  userCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 },
  primaryBtn: { backgroundColor: '#1f6feb', padding: 10, borderRadius: 10, alignItems:'center' },
  primaryText: { color: 'white', fontWeight: '800' },
  dangerBtn: { backgroundColor: '#fee2e2', padding: 10, borderRadius: 10, alignItems:'center' },
  dangerText: { color: '#b91c1c', fontWeight: '800' }
});
