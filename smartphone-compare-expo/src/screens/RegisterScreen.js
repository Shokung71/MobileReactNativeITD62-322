import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setLoading(true);
    try {
      await register({ username, password, img_profile: img });
      Alert.alert('สำเร็จ', 'สมัครสมาชิกเรียบร้อย');
      navigation.goBack();
    } catch (e) {
      Alert.alert('ไม่สำเร็จ', e.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สมัครสมาชิก</Text>
      <TextInput placeholder="Username" autoCapitalize="none" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TextInput placeholder="ลิงก์รูปโปรไฟล์ (ไม่บังคับ)" value={img} onChangeText={setImg} style={styles.input} />
      <Pressable style={styles.primaryBtn} onPress={onRegister} disabled={loading}>
        <Text style={styles.primaryText}>{loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 },
  primaryBtn: { backgroundColor: '#1f6feb', padding: 12, borderRadius: 10, alignItems: 'center' },
  primaryText: { color: 'white', fontWeight: '800' }
});
