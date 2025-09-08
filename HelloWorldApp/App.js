import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const CurrencyExchange = () => {
  const [bath, setBath] = useState('');
  const [usdExchanged, setUsdExchanged] = useState(0);

  const exchangeRate = 35;

  const calculateExchange = (bath) => {
    const bathValue = parseFloat(bath);
    if (!isNaN(bathValue)) {
      const exchangedValue = bathValue / exchangeRate;
      setUsdExchanged(exchangedValue.toFixed(2));
    } else {
      setUsdExchanged(0);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>แปลงเงินบาท (THB → USD) </Text>
      <TextInput
        style={styles.input}
        placeholder="ป้อนจำนวนเงินบาท"
        keyboardType="numeric"
        value={bath}
        onChangeText={value => setBath(value)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          calculateExchange(bath);
        }}
      >
        <Text style={styles.buttonText}>แปลง</Text>
      </TouchableOpacity>

      {bath !== '' && (
        <Text style={styles.resultText}>
          {bath} บาท = {usdExchanged} USD
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D9E7E9',
  },
  title: {
    color: '#3F3F3F',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#4BAE49',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  }
});
