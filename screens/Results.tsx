import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {PartyContext} from '../context/party-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import BackButton from '../components/BackButton';

type Props = NativeStackScreenProps<StackParamList, 'Results'>;

export default function Results({navigation}: Props) {
  const [party, dispatch] = useContext(PartyContext);

  const totalTax = () => {
    let tax = 0;
    party.forEach(m => (tax += m.results.taxOwed));
    return tax.toFixed(2);
  };

  const totalTip = () => {
    let tip = 0;
    party.forEach(m => (tip += m.results.tip));
    return tip.toFixed(2);
  };

  const totalSubtotal = () => {
    let subtotal = 0;
    party.forEach(m => (subtotal += m.results.subTotal));
    return subtotal.toFixed(2);
  };

  const totalToal = () => {
    let total = 0;
    party.forEach(m => (total += m.results.total));
    return total.toFixed(2);
  };

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
      animation: 'slide_from_bottom',
    }),
  );
  return (
    <SafeAreaView className="bg-gray-800 items-center h-full justify-center">
      <BackButton />
      <Text
        className="text-3xl mt-10 text-gray-200 font-bold"
        style={{fontFamily: 'Nunito-Regular'}}>
        Results
      </Text>
      <FlatList
        className="w-11/12 mt-2"
        data={party}
        renderItem={({item}) => (
          <View className="bg-gray-900 rounded-md mb-4 p-4 shadow-sm">
            <Text
              className="text-3xl text-gray-200 font-bold text-center mb-4"
              style={{fontFamily: 'Nunito-Regular'}}>
              {item.name}
            </Text>
            <View className="flex-row justify-between">
              <View>
                <Text
                  className="text-xl text-gray-200  mb-4"
                  style={{fontFamily: 'Nunito-Regular'}}>
                  Tax:{' '}
                  <Text className="text-gray-200">
                    ${item.results.taxOwed.toFixed(2)}
                  </Text>
                </Text>
                <Text
                  className="text-xl text-gray-200 "
                  style={{fontFamily: 'Nunito-Regular'}}>
                  Tip: ${item.results.tip.toFixed(2)}
                </Text>
              </View>
              <View className="items-end">
                <Text
                  className="text-xl text-gray-200  mb-4"
                  style={{fontFamily: 'Nunito-Regular'}}>
                  Subtotal: ${item.results.subTotal.toFixed(2)}
                </Text>
                <Text
                  className="text-xl text-gray-200 "
                  style={{fontFamily: 'Nunito-Regular'}}>
                  Total:{' '}
                  <Text className="text-green-500">
                    ${item.results.total.toFixed(2)}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <View className="border-green-500 border rounded-md my-2 w-11/12 p-4 shadow-sm">
        <Text
          className="text-3xl text-gray-200 font-bold text-center mb-4"
          style={{fontFamily: 'Nunito-Regular'}}>
          Total Bill
        </Text>
        <View className="flex-row justify-between">
          <View>
            <Text
              className="text-xl text-gray-200  mb-4"
              style={{fontFamily: 'Nunito-Regular'}}>
              Tax: <Text className="text-gray-200">${totalTax()}</Text>
            </Text>
            <Text
              className="text-xl text-gray-200 "
              style={{fontFamily: 'Nunito-Regular'}}>
              Tip: ${totalTip()}
            </Text>
          </View>
          <View className="items-end">
            <Text
              className="text-xl text-gray-200  mb-4"
              style={{fontFamily: 'Nunito-Regular'}}>
              Subtotal: ${totalSubtotal()}
            </Text>
            <Text
              className="text-xl text-gray-200 "
              style={{fontFamily: 'Nunito-Regular'}}>
              Total: <Text className="text-green-500">${totalToal()}</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
