import {SafeAreaView, Text, TextInput} from 'react-native';
import React, {Dispatch, useContext, useLayoutEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import {Kind, PartyContext} from '../context/party-context';

type Props = NativeStackScreenProps<StackParamList, 'HowManyPeople'>;

export default function HowManyPeople({navigation}: Props) {
  const [amount, setAmount] = useState(0);

  const party = useContext(PartyContext);

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    }),
  );
  return (
    <SafeAreaView className="bg-gray-800 items-center h-full justify-center space-y-4">
      <Text
        className="text-3xl text-gray-200 font-bold"
        style={{fontFamily: 'Nunito-Regular'}}>
        How many members?
      </Text>
      <TextInput
        autoFocus
        style={{fontFamily: 'Nunito-Regular'}}
        className="bg-gray-900 rounded text-gray-200 w-20 h-10 border-b-cyan-500 border-b px-2 text-center text-xl"
        onChangeText={text => {
          setAmount(+text);
        }}
        keyboardType="numeric"
        onSubmitEditing={() => {
          if (amount && amount > 0) {
            const func = party[1];
            func({type: Kind.SetParty, amount});
            navigation.navigate('Tax');
          }
        }}
      />
    </SafeAreaView>
  );
}