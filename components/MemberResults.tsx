import {View, Text, TouchableOpacity} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {MemberType} from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MemberResultsInterface {
  member: MemberType;
  setOpenTip: Dispatch<SetStateAction<boolean>>;
}

export default function MemberResults({
  member,
  setOpenTip,
}: MemberResultsInterface) {
  const getAmountOfItems = () => {
    let quantity = 0;
    member.items.forEach(i => {
      quantity = +i.quantity + quantity;
    });

    return quantity;
  };

  return (
    <View className="flex-row justify-between p-4 bg-gray-900 rounded-lg shadow-sm w-5/6">
      <View className="justify-between">
        <Text
          className="text-lg text-gray-400"
          style={{fontFamily: 'Nunito-Regular'}}>
          Items: {getAmountOfItems()}
        </Text>

        <TouchableOpacity
          className="flex-row items-center space-x-2"
          onPress={() => setOpenTip(true)}>
          {member.results.tip === 0 ? (
            <Icon size={30} color="#00b0d6" name="add" />
          ) : (
            <Icon name="edit" size={20} color="#00b0d6" />
          )}
          <Text
            className="text-lg text-gray-200"
            style={{fontFamily: 'Nunito-Regular'}}>
            Tip
            {member.results.tip !== 0
              ? ': $' + member.results.tip.toFixed(2)
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="space-y-4 items-end">
        <Text
          className="text-lg text-gray-400"
          style={{fontFamily: 'Nunito-Regular'}}>
          Tax: ${member.results.taxOwed.toFixed(2)}
        </Text>
        <Text
          className="text-lg text-gray-400"
          style={{fontFamily: 'Nunito-Regular'}}>
          Subtotal: ${member.results.subTotal.toFixed(2)}
        </Text>

        <Text
          className="text-xl text-gray-200"
          style={{fontFamily: 'Nunito-Regular'}}>
          Total:{' '}
          <Text
            className="text-xl text-green-500"
            style={{fontFamily: 'Nunito-Regular'}}>
            ${member.results.total.toFixed(2)}
          </Text>
        </Text>
      </View>
    </View>
  );
}
