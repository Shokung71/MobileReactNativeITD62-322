import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Button, TouchableOpacity, Text } from 'react-native';


export default function UserProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');

    const handleSearch = () => {
        alert('Search pressed: ' + username);
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.card}>
                <Text style={styles.title}>ลงทะเบียนผู้ใช้ / แก้ไขโปรไฟล์</Text>

                <View style={styles.searchRow}>
                    <TextInput
                        placeholder="ค้นหาด้วยชื่อเต็ม / username / email"
                        value={username}
                        onChangeText={setUsername}
                        style={[styles.input, styles.searchInput]}
                    />
                    <TouchableOpacity
                        onPress={handleSearch}
                        style={styles.searchButton}
                    >
                        <Text style={styles.searchButtonText}>ค้นหา</Text>
                    </TouchableOpacity>
                </View>

                {/* <TextInput
                    placeholder="ค้นหาด้วยชื่อเต็ม / username / email"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.touchableButton}
                    onPress={handleSearch}
                >
                    <Text style={styles.buttonText}>ค้นหา</Text>
                </TouchableOpacity> */}

                <Text style={styles.TitleInputText}>Username</Text>
                <TextInput
                    placeholder="เช่น alice"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />

                <Text style={styles.TitleInputText}>Password</Text>
                <TextInput
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                <Text style={styles.TitleInputText}>Email</Text>
                <TextInput
                    placeholder="name@example.com"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <Text style={styles.TitleInputText}>Full Name</Text>
                <TextInput
                    placeholder="ชื่อ-นามสกุล"
                    value={fullname}
                    onChangeText={setFullname}
                    style={styles.input}
                />

                <TouchableOpacity
                    title="Register"
                    style={styles.touchableButton}
                    onPress={() => alert('Register pressed')}
                >
                    <Text style={styles.buttonText}>สร้างผู้ใช้ใหม่</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => alert('Clear form pressed')}
                >
                    <Text style={styles.linkButtonText}>ล้างแบบฟอร์ม</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 18,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    TitleInputText: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        // textAlign: 'center',
    },
    input: {
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    msg: { marginVertical: 6, fontSize: 13, color: "#374151" },
    button: {
        backgroundColor: "#111827",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    touchableButton: {
        backgroundColor: "#111827",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
    note: { marginTop: 10, fontSize: 12, color: "#6b7280", textAlign: "center" },

    linkButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    linkButtonText: {
        color: '#6b7280',
        fontWeight: '600',
        fontSize: 14,
        marginTop: -10,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        marginBottom: 0,
    },
    searchButton: {
        backgroundColor: '#111827',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});