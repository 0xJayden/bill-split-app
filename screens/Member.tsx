import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../components/BackButton';
import {Kind, PartyContext} from '../context/party-context';
import AddItem from '../components/AddItem';
import Item from '../components/Item';
import AddTip from '../components/AddTip';
import MemberResults from '../components/MemberResults';

type Props = NativeStackScreenProps<StackParamList, 'Member'>;

export default function Member({navigation, route}: Props) {
  const [newName, setNewName] = useState('');
  const [notEdit, setNotEdit] = useState(false);
  const [openTip, setOpenTip] = useState(false);

  const [party, dispatch] = useContext(PartyContext);

  const createNewName = () => {
    let member = route.params;
    dispatch({type: Kind.SetName, newName, member});
    setNewName('');
    setNotEdit(false);
  };

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    }),
  );

  useEffect(() => {
    let member = route.params;
    if (member.items.length === 0) {
      dispatch({type: Kind.SetTotal, total: 0, member});
      console.log(member.items);
    }
  }, [route.params.items]);

  return (
    <SafeAreaView className="bg-gray-800 items-center flex-1 justify-center">
      <BackButton />
      {openTip && <AddTip setOpenTip={setOpenTip} member={route.params} />}
      <Text
        className="text-3xl text-gray-200 mt-7 font-bold mb-4"
        style={{fontFamily: 'Nunito-Regular'}}>
        Member
      </Text>
      <TouchableOpacity
        className="flex-row items-center space-x-2 mr-7"
        onPress={() => setNotEdit(!notEdit)}>
        <Icon
          className="mr-10 border rounded"
          color="#00b0d6"
          name="edit"
          size={20}
        />
        <Text className="text-3xl text-gray-200 font-bold">
          {route.params.name}
        </Text>
      </TouchableOpacity>

      {notEdit && (
        <TextInput
          className="border-b-cyan-500 border-b bg-gray-900 rounded p-2 min-w-[85px] mt-2 text-gray-200"
          style={{fontFamily: 'Nunito-Regular'}}
          value={newName}
          onSubmitEditing={() => createNewName()}
          onChangeText={text => setNewName(text)}
          placeholder="new name"
          placeholderTextColor="gray"
          autoFocus
        />
      )}
      <Text
        className="text-gray-200 text-center text-2xl py-2 mt-4"
        style={{fontFamily: 'Nunito-Regular'}}>
        Items
      </Text>
      <AddItem member={route.params} />
      <FlatList
        className="w-full p-4"
        data={route.params.items}
        renderItem={({item}) => <Item item={item} member={route.params} />}
      />
      <MemberResults member={route.params} setOpenTip={setOpenTip} />
    </SafeAreaView>
  );
}
