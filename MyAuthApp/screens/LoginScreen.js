import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import UserProfile from './UserProfile';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation(); // ใช้สำหรับการนำทางไปยังหน้าอื่น

    const handleUserList = () => {
        navigation.navigate('UserList');
    }

    const handleLogin = () => {
        let url = `http://localhost:3001/users?username=${username}&password=${password}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    navigation.navigate('User Profile');
                }
            });
    };

    // const handleLogin = () => {
    //     // if (username && password) {
    //     // alert('Login pressed: ' + username);
    //     // navigation.navigate('User Profile');
    //     let url = `http://localhost:3001/users?username=${username}&password=${password}`;
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.length > 0) {
    //                 navigation.navigate('User Profile');
    //             } else {
    //                 alert('Please enter username and password');
    //             }
    //         });
    //     // } else {
    //     //     alert('Please enter username and password');
    //     // }
    // }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.card}>
                <Text style={styles.title}>ลงทะเบียนผู้ใช้</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autocorrect={false}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry     // จะเป็นการซ่อน password เช่น ******
                    style={styles.input}
                />

                <Button style={[styles.button]} title="Login" onPress={handleLogin} />

                <Button style={[styles.button]} title="UserList" onPress={handleUserList} />


                {/* <TouchableOpacity
                    onPress={handleLogin}
                    // disabled={loading}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>บันทึก</Text>
                </TouchableOpacity> */}
                <Text style={styles.note}>กรุณากรอก username และ password</Text>

            </View>
        </SafeAreaView>
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
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
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
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
    // TitleInputText: { color: "black", fontWeight: "700", fontSize: 18, marginBottom: 12},
    note: { marginTop: 10, fontSize: 12, color: "#6b7280", textAlign: "center" },
});
