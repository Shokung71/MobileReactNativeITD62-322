// StudentID: 66106030
// Name: นายบัญชา วาสนสิทธิ

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Alert // สำหรับ React Native <0.71
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // สำหรับ React Native >=0.71
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // ส่วนที่ให้นักศึกษาประกาศตัวแปร state ที่จำเป็น
  const [notes, setNotes] = useState([]); // รายการบันทึก
  const [title, setTitle] = useState(''); // ชื่อบันทึก
  const [category, setCategory] = useState('Personal'); // หมวดหมู่บันทึก

  // โหลดข้อมูลเมื่อแอปเริ่มทำงาน
  useEffect(() => {
    loadNotes(); // เรียกใช้ฟังก์ชันโหลดข้อมูล
  }, []);

  // ---------- Prototype ของฟังก์ชันที่นักศึกษาต้องเขียน ----------

  // ฟังก์ชันโหลดบันทึกจาก AsyncStorage
  const loadNotes = async () => {
    // TODO: ให้นักศึกษาเขียนโค้ดสำหรับโหลดข้อมูล
    try {
      const data = await AsyncStorage.getItem('@notes');
      if (data !== null) {
        setNotes(JSON.parse(data));
      }
    } catch (e) {
      console.error('Load Error', e);
    }
  };

  // ฟังก์ชันเพิ่มโน้ตใหม่
  const handleAddNote = () => {
    // TODO: ให้นักศึกษาเขียนโค้ดสำหรับเพิ่มบันทึก
    if (title.trim() === '') {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อบันทึก');
      return;
    }
    const newNote = { id: Date.now().toString(), title, category };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setTitle(''); // ล้างช่องกรอกชื่อบันทึก
    setCategory('Personal'); // รีเซ็ตหมวดหมู่เป็นค่าเริ่มต้น
  };

  // ฟังก์ชันบันทึกลง AsyncStorage
  const saveNotes = async (newNotes) => {
    // TODO: ให้นักศึกษาเขียนโค้ดสำหรับเซฟข้อมูล
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
    } catch (e) {
      console.error('Save Error', e);
    }
  };


  // ฟังก์ชันลบบันทึก
  const handleDelete = (id) => {
    // TODO: ให้นักศึกษาเขียนโค้ดสำหรับลบบันทึก
    const updated = notes.filter(item => item.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };

  // ---------- ส่วนแสดงผลหน้าจอ UI ----------

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📒 Notes Keeper</Text>

    {/* Input New Note */}
      <TextInput
        style={styles.input}
        placeholder="Enter note title..."
        // TODO: เพิ่ม value และ onChangeText
        value={title}
        onChangeText={setTitle}
      />

      {/* Category */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category:</Text>
        <Picker
          // TODO: เพิ่ม selectedValue และ onValueChange
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Study" value="Study" />
        </Picker>
      </View>

      <TouchableOpacity
        // TODO: เพิ่ม onPress สำหรับปุ่มเพิ่มบันทึก
        style={styles.button}
        onPress={handleAddNote}
      >
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <View>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteCategory}>📂 {item.category}</Text>
            </View>
            {/* TODO: เพิ่ม onPress สำหรับการลบ */}
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// ---------- ส่วนกำหนดสไตล์ ----------
const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, marginTop: 40, backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 5, marginBottom: 10, backgroundColor: 'white',
  },
  pickerContainer: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
  },
  label: {
    marginRight: 10, fontSize: 16,
  },
  picker: {
    flex: 1, height: 50,
  },
  button: {
    backgroundColor: '#007bff', padding: 10,
    borderRadius: 5, alignItems: 'center', marginBottom: 20,
  },
  buttonText: {
    color: 'white', fontSize: 16,
  },
  noteItem: {
    backgroundColor: '#fff', padding: 15,
    marginBottom: 10, borderRadius: 5,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderWidth: 1, borderColor: '#ddd',
  },
  noteTitle: {
    fontSize: 16, fontWeight: 'bold',
  },
  noteCategory: {
    fontSize: 14, color: '#555',
  },
  delete: {
    color: 'red', fontWeight: 'bold',
  },
});