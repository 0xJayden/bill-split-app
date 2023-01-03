import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../components/BackButton';
import {Kind, PartyContext} from '../context/party-context';
import AddItem from '../components/AddItem';
import Item from '../components/Item';

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

  const getAmountOfItems = () => {
    let quantity = 0;
    route.params.items.forEach(i => {
      quantity = +i.quantity + quantity;
    });

    return quantity;
  };

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    }),
  );

  return (
    <SafeAreaView className="bg-gray-800 items-center h-full justify-center">
      <BackButton />
      {openTip && (
        <Pressable
          onPress={() => setOpenTip(false)}
          className="h-full w-full absolute items-center justify-center z-10">
          <View className="rounded bg-gray-900 py-4 px-8 space-y-4">
            <Text
              className="text-3xl text-gray-200 font-bold"
              style={{fontFamily: 'Nunito-Regular'}}>
              Add tip
            </Text>
            <TextInput
              className="border-b-cyan-500 text-lg text-center border-b bg-gray-900 rounded p-2 min-w-[85px] mt-2 text-gray-200"
              style={{fontFamily: 'Nunito-Regular'}}
              placeholder="$0.00"
              placeholderTextColor="gray"
              autoFocus
              onSubmitEditing={e => {
                let member = route.params;
                let tip = +e.nativeEvent.text;
                let total = member.results.total + tip - member.results.tip;
                dispatch({type: Kind.SetTip, member, tip});
                dispatch({type: Kind.SetTotal, member, total});
                setOpenTip(false);
              }}
            />
          </View>
        </Pressable>
      )}
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
          color="cyan"
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
      <View className="flex-row justify-between p-4 bg-gray-900 rounded-lg shadow-sm w-5/6">
        <View className="justify-between">
          <Text
            className="text-xl text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            Items: {getAmountOfItems()}
          </Text>

          <TouchableOpacity
            className="flex-row items-center space-x-2"
            onPress={() => setOpenTip(!openTip)}>
            {route.params.results.tip === 0 ? (
              <Icon size={30} color="cyan" name="add" />
            ) : (
              <Icon name="edit" size={20} color="cyan" />
            )}
            <Text
              className="text-lg text-gray-200"
              style={{fontFamily: 'Nunito-Regular'}}>
              Tip
              {route.params.results.tip !== 0
                ? ': $' + route.params.results.tip.toFixed(2)
                : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="space-y-4 items-end">
          <Text
            className="text-xl text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            Tax: ${route.params.results.taxOwed.toFixed(2)}
          </Text>
          <Text
            className="text-xl text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            Subtotal: ${route.params.results.subTotal.toFixed(2)}
          </Text>

          <Text
            className="text-xl text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            Total:{' '}
            <Text
              className="text-xl text-green-500"
              style={{fontFamily: 'Nunito-Regular'}}>
              ${route.params.results.total.toFixed(2)}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
