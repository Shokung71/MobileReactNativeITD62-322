import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function UserList() {
    const [users, setUsers] = useState([]);

    const loadUsers = () => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(setUsers);
    };

    useEffect(() => { loadUsers(); }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
            .then(() => loadUsers());
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text>{item.username} ({item.email})</Text>
                        <Button title="Delete" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}