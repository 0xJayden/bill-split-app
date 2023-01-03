import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import billSplit from '../static/bill-split.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-gray-800 items-center h-full justify-center">
      <Image className="h-50 w-50 mb-20" source={billSplit} />
      <Text
        className="text-3xl text-gray-200 font-bold"
        style={{fontFamily: 'Nunito-Regular'}}>
        Bill Split
      </Text>
      <Text
        style={{fontFamily: 'Nunito-Regular'}}
        className="text-cyan-500 text-xl">
        Split the bill with your peeps.
      </Text>
      <TouchableOpacity
        className="flex-row items-center justify-center mt-16 bg-gray-900 rounded py-2"
        onPress={() => navigation.navigate('HowManyPeople')}>
        <Text
          style={{fontFamily: 'Nunito-Regular'}}
          className="text-gray-200 text-lg ml-2">
          Start
        </Text>
        <Icon name="chevron-right" color="#00b0d6" size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
