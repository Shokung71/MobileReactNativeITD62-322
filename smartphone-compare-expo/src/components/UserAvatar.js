import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserAvatar({ user }) {
  return (
    <View style={styles.wrap}>
      <Image source={{ uri: user?.img_profile || 'https://i.pravatar.cc/100' }} style={styles.img} />
      <View>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.role}>{user?.role_type?.toUpperCase?.()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  img: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#eee' },
  name: { fontSize: 18, fontWeight: '700' },
  role: { color: '#1f6feb', fontWeight: '600' }
});
