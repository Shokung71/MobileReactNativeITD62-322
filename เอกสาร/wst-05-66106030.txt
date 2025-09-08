import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, Text, Card, Avatar, List } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { student } from './src/data/mock';
// NOTE: ดึงข้อมูลนักศึกษาจาก mock.js โค้ดมีดังนี้
// export const student = {
//     studentId: "66106030",
//     firstName: "บัญชา",
//     lastName: "วาสนสิทธิ",
//     majorTH: "เทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล",
//     majorEN: "Information Technology and Digital Innovation",
//     schoolTH: "สารสนเทศศาสตร์",
//     schoolEN: "School of Information Technology",
//     universityTH: "มหาวิทยาลัยวลัยลักษณ์",
//     year: 3,
//     gpax: "3.xx",
//     imageUrl:
//         "https://scontent.fbkk25-1.fna.fbcdn.net/v/t39.30808-6/430201681_1534098587165734_8697147810958069708_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEVyNdPB4WWysV5Edrn1jKxp0TMxsmfQrSnRMzGyZ9CtLHDoxmPxb1GI2TBH5-BTP8xI1Emv54jjID8P5wMr3yR&_nc_ohc=kcNaUh-mERoQ7kNvwF2ROuq&_nc_oc=AdkBH7oTsIXC9cn6FlbzX_HAJpZlpvLhnOLziA-RLZNI688NUX7ApkCHn-R4QPUGpKRFrKdX09LTE4iqk6pfRjDU&_nc_zt=23&_nc_ht=scontent.fbkk25-1.fna&_nc_gid=n2Z4VVgFtbcn0qb9cef2GQ&oh=00_AfUtnrMd4fKv6LfOYrqyd73f04-G4pMY2yrr_nV0a1aX_Q&oe=68A93604",
//     registrations: [
//         {
//             term: "1/2567",
//             courses: [
//                 { code: "GEN64-124", name: "English Conversation Skills" },
//                 { code: "ITD62-151", name: "Business Information System" },
//                 { code: "ITD62-251", name: "Organization Study" },
//                 { code: "ITD62-261", name: "Database Design" },
//                 { code: "ITD62-271", name: "Application Development Studio" },
//                 { code: "ITD62-321", name: "NoSQL Database Programming" },
//                 { code: "MAG62-101", name: "Graphics design for Presentation" }
//             ]
//         },
//         {
//             term: "2/2567",
//             courses: [
//                 { code: "GEN64-125", name: "English for Presentation" },
//                 { code: "ITD62-231", name: "Internet Technology" },
//                 { code: "ITD62-262", name: "Database Development" },
//                 { code: "ITD62-272", name: "Systems Analysis and Design" },
//                 { code: "ITD62-273", name: "Web UI/UX Design" },
//                 { code: "ITD62-274", name: "Software Testing Design" },
//                 { code: "ITD62-275", name: "Frontend Framework Development" }
//             ]
//         },
//         {
//             term: "3/2567",
//             courses: [
//                 { code: "GEN64-126", name: "English for Academic Communication" },
//                 { code: "ITD62-111", name: "Documentation Management and Data Processing" },
//                 { code: "ITD62-221", name: "Statistics for Information Technology" },
//                 { code: "ITD62-276", name: "Backend Framework Development" },
//                 { code: "ITD62-277", name: "Automated Software Testing" },
//                 { code: "ITD62-278", name: "Software Deployment and Maintenance" },
//                 { code: "ITD62-352", name: "Digital Marketing" },
//                 { code: "ITD62-372", name: "Mobile UI/UX Design" }
//             ]
//         }
//     ]
// };

const Stack = createNativeStackNavigator();

// สีหลักที่ใช้ในหน้า Registration
const SURFACE_WARM = '#fffef8ff';
const COURSE_BG = '#9AA6B2';

// กำหนดธีมสำหรับแอป
const theme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7C95AD',
    onPrimary: '#FFFFFF',
    secondary: '#4386F1',
    background: '#D9EAFD',
    surface: SURFACE_WARM,
    secondaryContainer: SURFACE_WARM,
    onSecondaryContainer: '#1E293B',
    outline: '#E5E7EB',
    onSurface: '#1E293B',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTitleStyle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.onPrimary },
            headerTintColor: theme.colors.onPrimary,
            headerShadowVisible: false,
          }}
        >
          {/* หน้าจอหลัก สำหรับการแสดงผลข้อมูลนักศึกษา */}
          <Stack.Screen name="Home"
            component={StudentListScreen}
            options={{ title: 'Student Data' }}
          />
          {/* หน้าจอแสดงผลรายวิชาที่ลงทะเบียนตามแต่ละภาคการศึกษา */}
          <Stack.Screen name="Registration Page"
            component={RegistrationScreen}
            options={{ title: 'Registration' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function StudentListScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.screenPad}>
        <Card style={styles.card}>
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* การ์ดข้อมูลระบุตัวตนนักศึกษา: รูปโปรไฟล์, ชื่อนักศึกษา */}
            <Avatar.Image size={70} source={{ uri: student.imageUrl }} />
            <View style={{ marginLeft: 15 }}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>สวัสดี!</Text>
              <Text variant="titleMedium" style={{ color: theme.colors.secondary, fontWeight: 'bold', marginTop: 2 }}>
                {`${student.firstName} ${student.lastName}`}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* การ์ดแสดงข้อมูลนักศึกษา: รหัสนักศึกษา, หลักสูตร, สำนักวิชา, มหาวิทยาลัย */}
        <Card style={styles.card}>
          <List.Section>
            <UniformItem title="รหัสนักศึกษา" description={student.studentId} icon="identifier" />
            <UniformItem title="หลักสูตร" description={student.majorTH} icon="book-education-outline" />
            <UniformItem title="สำนักวิชา" description={student.schoolTH} icon="office-building-outline" />
            <UniformItem title="มหาวิทยาลัย" description={student.universityTH} icon="school-outline" />
          </List.Section>
        </Card>

        {/* การ์ดแสดงข้อมูลชั้นปีและ GPAX */}
        <Card style={styles.card}>
          <List.Section>
            <UniformItem title="ชั้นปีที่" description={String(student.year)} icon="calendar-range-outline" />
            <UniformItem title="GPAX" description={student.gpax} icon="chart-line" />
          </List.Section>
        </Card>

        {/* ปุ่มสำหรับไปยังหน้ารายวิชาที่ลงทะเบียน */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Registration Page')}
          accessibilityRole="button"
          style={{marginTop: 4,margin: 14, backgroundColor: '#7c95adff', padding: 14, borderRadius: 16, alignItems: 'center',}}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffffff' }}>
            ดูรายวิชาที่ลงทะเบียน
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

// หน้าจอแสดงผลรายวิชาที่ลงทะเบียน
// ใช้ Card และ List เพื่อแสดงข้อมูลภาคการศึกษาและรายวิชา
function RegistrationScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 14, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <List.Section>
            {student.registrations.map((reg) => (
              <List.Accordion
                key={reg.term}
                title={`ภาคการศึกษาที่ ${reg.term}`}
                titleStyle={{ color: theme.colors.onSurface, fontWeight: '700' }}
                style={styles.accordionHeader}
                theme={{ colors: { secondaryContainer: theme.colors.surface } }}
                left={(p) => <List.Icon {...p} icon="school-outline" color={theme.colors.onSurface} />}
                right={(p) => <List.Icon {...p} icon="chevron-down" color={theme.colors.onSurface} />}
              >
                <View style={styles.courseContainer}>
                  {reg.courses.map((c) => (
                    <List.Item
                      key={c.code}
                      title={`${c.code} – ${c.name}`}
                      titleNumberOfLines={2}
                      titleStyle={styles.courseTitle}
                      style={styles.courseItem}
                      left={(p) => <List.Icon {...p} icon="book-outline" color="#FFFFFF" />}
                    />
                  ))}
                </View>
              </List.Accordion>
            ))}
          </List.Section>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

// สำหรับแสดงข้อมูลนักศึกษาในรูปแบบรายการ
function UniformItem({ title, description, icon }) {
  return (
    <List.Item
      title={title}
      description={description}
      titleStyle={{ color: theme.colors.onSurface, fontWeight: '600' }}
      descriptionStyle={{ color: theme.colors.onSurface }}
      style={styles.itemRow}
      left={(p) => <List.Icon {...p} icon={icon} color={theme.colors.onSurface} />}
    />
  );
}

const styles = StyleSheet.create({
  screenPad: { padding: 14 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.outline,
    overflow: 'hidden',
  },
  accordionHeader: {
    backgroundColor: theme.colors.surface,
    borderRadius: 0,
  },
  itemRow: {
    backgroundColor: theme.colors.surface,
  },
  courseContainer: {
    backgroundColor: COURSE_BG,
    paddingVertical: 6,
  },
  courseItem: {
    backgroundColor: 'transparent',
  },
  courseTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
