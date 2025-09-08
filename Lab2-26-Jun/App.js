import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DisplayMessage from './DisplayMessage'; // form dump component file



export default function App() {
  const [message, setMessage] = useState('');
  return (
    <View>
      <DisplayMessage message={message} />
      <View style={{ padding: 20 }} />
      <Button title="SHOW A" onPress={() => setMessage('A')} />
      <View style={{ padding: 5 }} />
      <Button title="SHOW B" onPress={() => setMessage('B')} />
    </View>
  );
}