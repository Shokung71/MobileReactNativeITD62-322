import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { FlatList, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const lessons = [
  {
    title: 'Educational Psychology for Teachers', subtitle: 'Basic theories and classroom applications',
    objectives: [
      'Explain key learning theories (Behaviorism, Constructivism)',
      'Relate theories to the design of learning activities',
    ],
    strategies: ['Case-based discussion', 'Reflective journaling activities'],
    materials: [
      'Academic articles in Thai/English',
      'Theory summary infographics',
    ],
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg',
  },
  {
    title: 'Educational Measurement and Evaluation', subtitle: 'Design valid and reliable assessment tools', objectives: [
      'Identify types of assessment (formative/summative)',
      'Design rubrics aligned with learning objectives',
    ],
    strategies: [
      'Workshop on test/rubric design',
      'Observe mock classes and provide feedback',
    ],
    materials: ['Sample rubrics/forms', 'Score recording software'],
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg',
  },
  {
    title: 'Positive Classroom Management', subtitle: 'Create a safe and engaging learning environment', objectives: [
      'Analyze student behavior and environmental factors',
      'Apply techniques for handling classroom situations',
    ],
    strategies: ['Role-play activities', 'Co-create classroom agreements'],
    materials: [
      'Classroom rules posters',
      'Individual behavior tracking forms',
    ],
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg',
  },
];

export default function App() {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShadowVisible: false }} >
        <Stack.Screen name="Home"
          component={LessonListScreen}
          options={{ title: '66106030 Bancha' }}

        />
        <Stack.Screen
          name="Detail"
          component={LessonDetailScreen}
          options={({ route }) => ({ title: route.params.unit.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LessonListScreen() {
  const navigation = useNavigation();

  return (

    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text style={{ fontSize: 22, fontWeight: '700', paddingTop: '15' }}>Hello, EduLesson</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item, idx) => item.title + idx}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { unit: item })}
            style={{ backgroundColor: '#e9a0a0ff', padding: 12, borderRadius: 12, marginBottom: 10 }}
            activeOpacity={0.7}
          >
            <Image source={{ uri: item.imageUrl }}
              style={{
                width: 50, height: 50, borderRadius: 25,
                marginBottom: 10
              }} />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ fontSize: 13, color: '#4b5563', marginTop: 4 }}>

              {item.subtitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function LessonDetailScreen({ route }) {
  const { unit } = route.params;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{unit.title}</Text>
      <Text style={{
        fontSize: 14, color: '#4b5563', marginTop: 6,
        marginBottom: 12
      }}>{unit.subtitle}</Text>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>Learning Objectives</
      Text>
      <BulletList items={unit.objectives} />
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 12 }}
      >Teaching Strategies</Text>
      <BulletList items={unit.strategies} />
      <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 12 }}
      >Teaching Materials & Resources</Text>
      <BulletList items={unit.materials} />
    </ScrollView>
  );
}

function BulletList({ items }) {
  return (
    <View>
      {items.map((t, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 6 }}>
          <Text style={{ width: 16 }}>{'•'}</Text>
          <Text style={{ flex: 1 }}>{t}</Text>
        </View>
      ))}
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
