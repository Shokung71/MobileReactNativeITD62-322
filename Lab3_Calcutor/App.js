import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert,TextInput } from 'react-native';
// import { TextInput } from 'react-native-web';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const Add = (num1, num2) => {
    if (!isNaN(num1) && !isNaN(num2)) {
      const sum = num1 + num2;
      setResult(sum);
      Alert.alert('Result', `The result is: ${sum}`);
    } else {
      setResult(null);
      Alert.alert('Error', 'Error: Please enter valid numbers');
    }
  }

  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={value => setNum1(value)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={value => setNum2(value)}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, marginBottom: 10 }}
        onPress={() => {
          Add(parseFloat(num1), parseFloat(num2));
        }}
        >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Calculator;

// import { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// const App = () => {
//   const [num_in1, setNum_in1] = useState('');
//   const [num_in2, setNum_in2] = useState('');
//   const [result, setResult] = useState(null);


//   const calculatorAdd = () => {
//     const num_cal1 = parseFloat(num_in1);
//     const num_cal2 = parseFloat(num_in2);
//     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
//       const resultCal = num_cal1 + num_cal2;
//       Alert.alert('Result', `The result is: ${resultCal}`);
//       setResult(resultCal);
//     } else {
//       setResult(null);
//       Alert.alert('Error', 'Error: Please enter valid numbers');
//     }
//   };
  
//   const calculatorSubtract = () => {
//     const num_cal1 = parseFloat(num_in1);
//     const num_cal2 = parseFloat(num_in2);
//     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
//       const resultCal = num_cal1 - num_cal2;
//       Alert.alert('Result', `The result is: ${resultCal}`);
//       setResult(resultCal);
//     } else {
//       setResult(null);
//       Alert.alert('Error', 'Error: Please enter valid numbers');
//     }
//   };

//   const calculatorMultiply = () => {
//     const num_cal1 = parseFloat(num_in1);
//     const num_cal2 = parseFloat(num_in2);
//     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
//       const resultCal = num_cal1 * num_cal2;
//       Alert.alert('Result', `The result is: ${resultCal}`);
//       setResult(resultCal);
//     } else {
//       setResult(null);
//       Alert.alert('Error', 'Error: Please enter valid numbers');
//     }
//   };

//   const calculatorDivide = () => {
//     const num_cal1 = parseFloat(num_in1);
//     const num_cal2 = parseFloat(num_in2);
//     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
//       const resultCal = num_cal1 / num_cal2;
//       if (num_cal2 === 0) {
//         Alert.alert('Error', 'Error: Division by zero is not allowed');
//         setResult(null);
//       } else if (num_cal2 !== 0) {
//         Alert.alert('Result', `The result is: ${resultCal}`);
//         setResult(resultCal);
//       }
//     } else {
//       setResult(null);
//       Alert.alert('Error', 'Error: Please enter valid numbers');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>React Native Calculator</Text>
//       <TextInput
//         style={styles.input}
//         placeholder='Enter first number'
//         value={num_in1}
//         onChangeText={setNum_in1}
//         keyboardType='numeric'
//       />
//       <TextInput
//         style={styles.input}
//         placeholder='Enter second number'
//         value={num_in2}
//         onChangeText={setNum_in2}
//         keyboardType='numeric'
//       />
//       <TouchableOpacity style={styles.button} onPress={calculatorAdd}>
//         <Text style={styles.buttonText}>ADD</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={calculatorSubtract}>
//         <Text style={styles.buttonText}>SUBTRACT</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={calculatorMultiply}>
//         <Text style={styles.buttonText}>MULTIPLY</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={calculatorDivide}>
//         <Text style={styles.buttonText}>DIVISION</Text>
//       </TouchableOpacity>

//     </View>
//   );

// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F9F3EF',
//   },
//   title: {
//     color: '#1B3C53',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#456882',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default App;

// //   const calculatorAdd = () => {
// //     const num_cal1 = parseFloat(num_in1);
// //     const num_cal2 = parseFloat(num_in2);
// //     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
// //       const resultAdd = num_cal1 + num_cal2;
// //       setResult(resultAdd);
// //     } else {
// //       setResult('Error: Please enter valid numbers');
// //     }
// //   };
// //   const calculatorSubtract = () => {
// //     const num_cal1 = parseFloat(num_in1);
// //     const num_cal2 = parseFloat(num_in2);
// //     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
// //       const resultSub = num_cal1 - num_cal2;
// //       setResult(resultSub);
// //     } else {
// //       setResult('Error: Please enter valid numbers');
// //     }
// //   };
// //   const calculatorMultiply = () => {
// //     const num_cal1 = parseFloat(num_in1);
// //     const num_cal2 = parseFloat(num_in2);
// //     if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
// //       const resultMul = num_cal1 * num_cal2;
// //       setResult(resultMul);
// //     } else {
// //       setResult('Error: Please enter valid numbers');
// //     }
// //   };
// //   const calculatorDivide = () => {
// //     const num_cal1 = parseFloat(num_in1);
// //     const num_cal2 = parseFloat(num_in2);
// //     if (num_cal2 !== 0) {
// //       if (!isNaN(num_cal1) && !isNaN(num_cal2)) {
// //         const resultDiv = num_cal1 * num_cal2;
// //         setResult(resultDiv);
// //       } else {
// //         setResult('Error: Please enter valid numbers');
// //       }
// //     } else {
// //       setResult('Error: Division by zero is not allowed');
// //     };

// //   return (
// //     <View>
// //       <Text>React Native Calculator</Text>
// //       <TextInput
// //         // style={style.input}
// //         placeholder='Enter firdt number'
// //         value={num_in1}
// //         onChangeText={setNum_in1}
// //       />

// //       <TextInput
// //         // style={style.input}
// //         placeholder='Enter second number'
// //         value={num_in2}
// //         onChangeText={setNum_in2}
// //       />

// //       {/* <TouchableOpacity style={style.button} onPress={calculatorAdd}>
// //         <Text >ADD</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={style.button} onPress={calculatorSubtract}>
// //         <Text >Subtract</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={style.button} onPress={calculatorMultiply}>
// //         <Text >MULTIPLY</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={style.button} onPress={calculatorDivide}>
// //         <Text >DIVISION</Text>
// //       </TouchableOpacity> */}
// //     </View>
// //   );
// // };