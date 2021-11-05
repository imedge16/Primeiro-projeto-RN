/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [skillList, setSkillList] = useState([]);
  const [digitado, setDigitado] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const input = useRef();

  function addSkillList() {
    if (digitado === '') {
      Alert.alert('You are idiot!');
    } else {
      setSkillList([...skillList, { valor: digitado, id: skillList.length }]);
      setDigitado('');
    }
    input.current.blur();
  }
  function removeSkillList(pressItem) {
    setSkillList(skillList.filter((item) => item.id !== pressItem.id));
    setIsSelected(false);
  }
  function clickInput() {
    setIsSelected(true);
  }
  function clickInputOut() {
    setIsSelected(false);
  }

  console.log(skillList);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Welcome Someone</Text>
      <Text style={styles.subtitle}>Good Evening</Text>
      <TextInput
        placeholder="New Skill"
        style={[styles.input, isSelected ? styles.inputSelected : {}]}
        placeholderTextColor="#3a3a3a"
        onChangeText={setDigitado}
        value={digitado}
        onPressIn={clickInput}
        onBlur={clickInputOut}
        ref={input}
        onSubmitEditing={addSkillList}
      />
      <TouchableOpacity style={styles.button} onPress={addSkillList}>
        <Text style={styles.buttonText}> Add Skill </Text>
      </TouchableOpacity>
      <Text style={styles.listTitle}>My Skills</Text>
      <FlatList
        style={styles.mySkills}
        data={skillList}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => removeSkillList(item)}>
            <Text style={styles.itemText}>{item.valor}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120f15',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 17,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#201e25',
    marginTop: 24,
    paddingLeft: 8,
    color: '#fff',
  },
  inputSelected: {
    borderColor: '#a370f7',
  },
  button: {
    backgroundColor: '#a370f7',
    height: 40,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  listTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
  },
  item: {
    backgroundColor: '#120f15',
    marginTop: 8,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: '#fff',
  },
  mySkills: {
    marginTop: 8,
    backgroundColor: '#201e25',
    padding: 8,
    borderRadius: 8,
  },
});
