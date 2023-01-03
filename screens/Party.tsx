import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {PartyContext} from '../context/party-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import BackButton from '../components/BackButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<StackParamList, 'Party'>;

export default function Party({navigation, route}: Props) {
  const party = useContext(PartyContext);

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    }),
  );

  const renderParty: React.FC = () => {
    return (
      <View className="w-full px-4 py-2">
        <Text
          className="text-xl text-gray-400 text-center mb-4"
          style={{fontFamily: 'Nunito-Regular'}}>
          Select a guest.
        </Text>
        <FlatList
          className="max-h-[600px] mb-28"
          data={party[0]}
          renderItem={({item}) => (
            <TouchableOpacity
              className="bg-gray-900 rounded mb-4 p-4"
              onPress={() => {
                navigation.navigate('Member', item);
              }}>
              <Text
                className="text-gray-200 text-center"
                style={{fontFamily: 'Nunito-Regular'}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-gray-800 items-center h-full justify-center">
      <BackButton />
      <Text
        className="text-3xl mt-20 text-gray-200 font-bold"
        style={{fontFamily: 'Nunito-Regular'}}>
        Party
      </Text>
      {renderParty({})}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Results');
        }}
        className="absolute bottom-0 rounded bg-gray-900 justify-center p-2 shadow-md mb-10">
        <View className="flex-row space-x-2">
          <Icon
            name="check"
            color="green"
            size={20}
            style={{alignSelf: 'center'}}
          />
          <Text
            className="text-xl text-gray-200 text-center"
            style={{fontFamily: 'Nunito-Regular'}}>
            Results
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
