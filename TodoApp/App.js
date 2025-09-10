import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);
  
  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem('@todos');
      if (data !== null) {
        setTodos(JSON.parse(data));
      }
    } catch (e) {
      console.error('Load Error', e);
    }
  };

  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(newTodos));
    } catch (e) {
      console.error('Save Error', e);
    }
  };


  const handleAdd = () => {
    if (text.trim() === '') {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูล');
      return;
    }
    const newItem = { id: Date.now().toString(), title: text };
    const updated = [...todos, newItem];
    setTodos(updated);
    saveTodos(updated);
    setText('');
  };

  const handleEdit = (item, index) => {
    setText(item.title);
    setEditingIndex(index);
  };

  // Edit existing todo
  const handleUpdate = () => {
    if (editingIndex === null) return;

    const updated = [...todos];
    updated[editingIndex].title = text;
    setTodos(updated);
    saveTodos(updated);
    setEditingIndex(null);
    setText('');
  };

  const handleDelete = (id) => {
    const updated = todos.filter(item => item.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  // UI Rendering
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Input New To-Do List */}
      <TextInput
        style={styles.input}
        placeholder="พิมพ์รายการ"
        value={text}
        onChangeText={setText}
      />

      {/* ตรวจสถานะว่าสถานะจะ Update หรือไม่ */}
      {editingIndex === null ? (
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>เพิ่ม</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
          <Text style={styles.buttonText}>อัปเดต</Text>
        </TouchableOpacity>
      )}


      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <View style={styles.actions}>
              {/* handleEdit จะไปเปบี่ยนแปลงค่า editingIndex ให้เป็น ตัว index ของตัวที่ต้องการจะให้ Edit แล้วจะทำให้ปุ่ม "เพิ่ม" ให้กลายเป็นปุ่ม "อัปเดต"*/}
              <TouchableOpacity onPress={() => handleEdit(item, index)}>
                <Text style={styles.edit}>แก้ไข</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>ลบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  edit: {
    color: 'blue',
    marginRight: 15,
  },
  delete: {
    color: 'red',
  },
});
