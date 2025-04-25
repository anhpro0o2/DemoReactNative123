import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

/////////////////////////// COLORS ///////////////////////////
const colors = {
  blue: '#4f6d7a',
  white: '#fff',
  gray: '#aaa',
};

/////////////////////////// REDUX ///////////////////////////
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
const { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } = contactsSlice.actions;
const store = configureStore({ reducer: contactsSlice.reducer });

/////////////////////////// API ///////////////////////////
const fetchContacts = async () => {
  const res = await fetch('https://randomuser.me/api/?results=20&seed=fullstackio');
  const json = await res.json();
  return json.results.map(user => ({
    name: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    email: user.email,
    cell: user.cell,
    avatar: user.picture.large,
  }));
};

/////////////////////////// CONTACT ITEM ///////////////////////////
const ContactItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.contactItem} onPress={onPress}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  </TouchableOpacity>
);

/////////////////////////// SCREENS ///////////////////////////
const ContactsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then(data => dispatch(fetchContactsSuccess(data)))
      .catch(() => dispatch(fetchContactsError()));
  }, []);

  const renderItem = ({ item }) => (
    <ContactItem item={item} onPress={() => navigation.navigate('Profile', { contact: item })} />
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>Failed to load contacts.</Text>}
      {!loading && !error && (
        <FlatList data={contacts} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} />
      )}
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const { contact } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.profileHeader, { backgroundColor: colors.blue }]}>
        <Image source={{ uri: contact.avatar }} style={styles.profileAvatar} />
        <Text style={styles.profileName}>{contact.name}</Text>
        <Text style={styles.profilePhone}>{contact.phone}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text>Email: {contact.email}</Text>
        <Text>Work: {contact.phone}</Text>
        <Text>Personal: {contact.cell}</Text>
      </View>
    </View>
  );
};

/////////////////////////// NAVIGATION ///////////////////////////
const Stack = createNativeStackNavigator();
const ContactsStack = () => (
  <Stack.Navigator initialRouteName="Contacts" screenOptions={{
    headerStyle: { backgroundColor: colors.blue },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
  }}>
    <Stack.Screen name="Contacts" component={ContactsScreen} />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ route }) => ({ title: route.params.contact.name.split(' ')[0] })}
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator screenOptions={{
      drawerActiveTintColor: colors.blue,
    }}>
      <Drawer.Screen name="Contact List" component={ContactsStack} options={{
        drawerIcon: ({ color }) => <MaterialIcons name="list" size={20} color={color} />
      }} />
    </Drawer.Navigator>
  </NavigationContainer>
);

/////////////////////////// APP ///////////////////////////
const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

/////////////////////////// STYLES ///////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: colors.gray,
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 16,
    color: 'white',
  },
  detailSection: {
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
