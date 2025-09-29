import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Modal } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import UserAvatar from '../components/UserAvatar';
import { isAdmin } from '../utils/guards';

export default function LoginScreen({ navigation }) {
  const { user, signIn, signOut } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      await signIn(username.trim(), password.trim());
      Alert.alert('สำเร็จ', 'เข้าสู่ระบบเรียบร้อย');
      setUsername(''); setPassword('');
    } catch (e) {
      Alert.alert('ไม่สำเร็จ', e.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <UserAvatar user={user} />
        <View style={{ height: 12 }} />
        {isAdmin(user) && (
          <View style={{ gap: 8 }}>
            <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate('AdminProducts')}>
              <Text style={styles.primaryText}>จัดการสินค้า (Products)</Text>
            </Pressable>
            <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate('AdminUsers')}>
              <Text style={styles.secondaryText}>จัดการผู้ใช้ (Users)</Text>
            </Pressable>
          </View>
        )}
        <View style={{ height: 12 }} />
        <Pressable style={[styles.dangerBtn]} onPress={signOut}>
          <Text style={styles.dangerText}>ออกจากระบบ</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>
      <TextInput placeholder="Username" autoCapitalize="none" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Pressable style={styles.primaryBtn} onPress={onLogin} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</Text>
      </Pressable>
      <Pressable style={styles.link} onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#1f6feb', fontWeight: '700' }}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
      </Pressable>
      <Pressable style={[styles.link, { marginTop: 6 }]} onPress={() => setShowForgot(true)}>
        <Text style={{ color: '#999', fontWeight: '700' }}>ลืมรหัสผ่าน</Text>
      </Pressable>

      <Modal visible={showForgot} animationType="slide" transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={{ fontSize: 16, fontWeight: '800' }}>ลืมรหัสผ่าน</Text>
            <Text style={{ marginTop: 6, color:'#444' }}>
              โปรเจกต์ตัวอย่างนี้ไม่มีระบบอีเมลจริง หากคุณลืมรหัสผ่านให้ติดต่อผู้ดูแลระบบ (Admin) เพื่อรีเซ็ตให้
            </Text>
            <Pressable style={[styles.primaryBtn, { marginTop: 10 }]} onPress={() => setShowForgot(false)}>
              <Text style={styles.primaryText}>ปิด</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 },
  primaryBtn: { backgroundColor: '#1f6feb', padding: 12, borderRadius: 10, alignItems: 'center' },
  primaryText: { color: 'white', fontWeight: '800' },
  secondaryBtn: { backgroundColor: '#e8eefc', padding: 12, borderRadius: 10, alignItems: 'center' },
  secondaryText: { color: '#1f6feb', fontWeight: '800' },
  dangerBtn: { backgroundColor: '#fee2e2', padding: 12, borderRadius: 10, alignItems: 'center' },
  dangerText: { color: '#b91c1c', fontWeight: '800' },
  link: { alignItems: 'center', marginTop: 8 },
  modalWrap: { flex:1, backgroundColor: '#0005', justifyContent:'center', alignItems:'center' },
  modalCard: { width:'86%', backgroundColor:'#fff', borderRadius: 12, padding: 16 }
});
