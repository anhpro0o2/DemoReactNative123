import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SectionList,
  SafeAreaView,
} from 'react-native';

// 👉 Custom Button (Project 3)
const MyButton = ({ text, onPress, buttonStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.myButton, buttonStyle]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

// 👉 Custom Square Box (Project 5 + 6)
const Square = ({ text, bgColor = '#7ce0f9' }) => (
  <View style={[styles.box, { backgroundColor: bgColor }]}>
    <Text>{text}</Text>
  </View>
);

// 👉 Project Screens
const HelloWorldScreen = () => (
  <View style={styles.center}>
    <Text style={styles.textBig}>Hello World</Text>
  </View>
);

const AlertButtonScreen = () => (
  <View style={styles.center}>
    <Button title="Nhấn vào tôi" onPress={() => Alert.alert('Hello')} />
  </View>
);

const CustomButtonScreen = () => (
  <View style={styles.center}>
    <MyButton
      text="Nhấn vào nút tự tạo"
      onPress={() => Alert.alert('Bạn đã nhấn nút tự tạo!')}
      buttonStyle={{ backgroundColor: '#4CAF50' }}
    />
  </View>
);

const StateAndPropsScreen = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.center}>
      <Text style={styles.textBig}>Số lần nhấn: {count}</Text>
      <Button title="Tăng lên" onPress={() => setCount(count + 1)} />
    </View>
  );
};

const StylingScreen = () => (
  <View style={styles.styleContainer}>
    <Square text="Box 1" />
    <Square text="Box 2" bgColor="#4dc2c2" />
    <Square text="Box 3" bgColor="#ff637c" />
  </View>
);

const ScrollViewScreen = () => {
  const data = Array.from({ length: 15 }, (_, i) => i + 1);
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {data.map((item) => (
        <Square key={item} text={`Box ${item}`} />
      ))}
    </ScrollView>
  );
};

const FormScreen = () => {
  const [name, setName] = useState('');
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Tên bạn là gì?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên..."
        placeholderTextColor="#666"
        onChangeText={setName}
        value={name}
      />
      <Button
        title="Chào bạn"
        onPress={() => {
          Alert.alert(`Hello, ${name}!`);
          setName('');
        }}
      />
    </View>
  );
};

const SectionListScreen = () => {
  const PEOPLE = [
    { name: { first: 'Minh', last: 'Nguyễn' } },
    { name: { first: 'An', last: 'Trần' } },
    { name: { first: 'Huy', last: 'Lê' } },
    { name: { first: 'Linh', last: 'Ngô' } },
  ];

  const groupPeopleByLastName = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const group = item.name.last[0].toUpperCase();
      if (!grouped[group]) grouped[group] = { title: group, data: [] };
      grouped[group].data.push(item);
    });
    return Object.values(grouped).sort((a, b) => a.title.localeCompare(b.title));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.sectionRow}>
            <Text>{item.name.first} {item.name.last}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

// 👉 App tổng – chọn màn hình
const App = () => {
  const [screen, setScreen] = useState('menu');

  const renderScreen = () => {
    switch (screen) {
      case 'hello':
        return <HelloWorldScreen />;
      case 'alert':
        return <AlertButtonScreen />;
      case 'custom':
        return <CustomButtonScreen />;
      case 'state':
        return <StateAndPropsScreen />;
      case 'style':
        return <StylingScreen />;
      case 'scroll':
        return <ScrollViewScreen />;
      case 'form':
        return <FormScreen />;
      case 'sectionlist':
        return <SectionListScreen />;
      default:
        return (
          <View style={styles.menu}>
            <Text style={styles.textTitle}>📱 Chọn Project để xem:</Text>
            {[
              ['Project 1: Hello World', 'hello'],
              ['Project 2: Alert Button', 'alert'],
              ['Project 3: Custom Button', 'custom'],
              ['Project 4: State & Props', 'state'],
              ['Project 5: Styling (Flexbox)', 'style'],
              ['Project 6: ScrollView', 'scroll'],
              ['Project 7: Form', 'form'],
              ['Project 8: SectionList', 'sectionlist'],
            ].map(([label, value]) => (
              <View style={styles.menuButton} key={value}>
                <Button title={label} onPress={() => setScreen(value)} />
              </View>
            ))}
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      {screen !== 'menu' && (
        <TouchableOpacity style={styles.backButton} onPress={() => setScreen('menu')}>
          <Text style={styles.backButtonText}>← Quay lại menu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// 💅 Style
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textBig: { fontSize: 26, fontWeight: 'bold' },
  menu: { flex: 1, justifyContent: 'center', padding: 20 },
  menuButton: { marginVertical: 6 },
  textTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  myButton: { padding: 15, backgroundColor: '#2196F3', borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16 },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: { fontSize: 16, color: '#333' },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  styleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formContainer: { padding: 20 },
  label: { fontWeight: 'bold', fontSize: 18 },
  input: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  sectionHeader: {
    backgroundColor: '#eee',
    padding: 10,
  },
  sectionRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default App;
