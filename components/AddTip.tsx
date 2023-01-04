import {View, Text, Pressable, TouchableOpacity, TextInput} from 'react-native';
import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {Kind, PartyContext} from '../context/party-context';
import {MemberType, Tips} from '../types';

interface AddTipInterface {
  setOpenTip: Dispatch<SetStateAction<boolean>>;
  member: MemberType;
}

export default function AddTip({setOpenTip, member}: AddTipInterface) {
  const [tips, setTips] = useState<Tips>({});
  const [party, dispatch] = useContext(PartyContext);

  const calculateTip = (percent: number) => {
    let total = member.results.total - member.results.tip;
    let tip = total * percent;

    let newTotal = total + tip;

    tips[percent] = {tip, newTotal};

    return tip.toFixed(2);
  };

  return (
    <Pressable
      onPress={() => setOpenTip(false)}
      className="h-full w-full absolute items-center justify-center z-10">
      <View className="rounded bg-gray-900 py-4 px-8">
        <Text
          className="text-3xl text-gray-200 font-bold text-center mb-4"
          style={{fontFamily: 'Nunito-Regular'}}>
          Add tip
        </Text>
        <View className="flex-row space-x-4 mb-4">
          <TouchableOpacity
            className="items-center bg-gray-800 rounded p-2"
            onPress={() => {
              dispatch({
                type: Kind.SetTip,
                tip: tips[0.1].tip,
                member,
              });
              dispatch({
                type: Kind.SetTotal,
                total: tips[0.1].newTotal,
                member,
              });
              setOpenTip(false);
            }}>
            <Text
              className="text-xl text-gray-300"
              style={{fontFamily: 'Nunito-Regular'}}>
              10%
            </Text>
            <Text
              className="text-lg text-green-500 text-center"
              style={{fontFamily: 'Nunito-Regular'}}>
              {'$' + calculateTip(0.1)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center bg-gray-800 rounded p-2"
            onPress={() => {
              dispatch({
                type: Kind.SetTip,
                tip: tips[0.15].tip,
                member,
              });
              dispatch({
                type: Kind.SetTotal,
                total: tips[0.15].newTotal,
                member,
              });
              setOpenTip(false);
            }}>
            <Text
              className="text-xl text-gray-300"
              style={{fontFamily: 'Nunito-Regular'}}>
              15%
            </Text>
            <Text
              className="text-lg text-green-500 text-center"
              style={{fontFamily: 'Nunito-Regular'}}>
              {'$' + calculateTip(0.15)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center bg-gray-800 rounded p-2"
            onPress={() => {
              dispatch({
                type: Kind.SetTip,
                tip: tips[0.2].tip,
                member,
              });
              dispatch({
                type: Kind.SetTotal,
                total: tips[0.2].newTotal,
                member,
              });
              setOpenTip(false);
            }}>
            <Text
              className="text-xl text-gray-300"
              style={{fontFamily: 'Nunito-Regular'}}>
              20%
            </Text>
            <Text
              className="text-lg text-green-500 text-center"
              style={{fontFamily: 'Nunito-Regular'}}>
              {'$' + calculateTip(0.2)}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          className="text-xl text-gray-300 text-center"
          style={{fontFamily: 'Nunito-Regular'}}>
          Custom:
        </Text>
        <TextInput
          className="border-b-cyan-500 text-lg text-center border-b bg-gray-900 rounded p-2 min-w-[85px] text-gray-200"
          style={{fontFamily: 'Nunito-Regular'}}
          placeholder="$0.00"
          placeholderTextColor="gray"
          autoFocus
          onSubmitEditing={e => {
            let tip = +e.nativeEvent.text;
            let total = member.results.total + tip - member.results.tip;
            dispatch({type: Kind.SetTip, member, tip});
            dispatch({type: Kind.SetTotal, member, total});
            setOpenTip(false);
          }}
        />
      </View>
    </Pressable>
  );
}
