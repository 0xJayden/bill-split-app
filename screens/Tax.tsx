import {Text, SafeAreaView, TextInput} from 'react-native';
import {useContext, useState} from 'react';
import {Kind, PartyContext} from '../context/party-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../types';
import BackButton from '../components/BackButton';

type Props = NativeStackScreenProps<StackParamList, 'Tax'>;

export default function Tax({navigation}: Props) {
  const [party, dispatch] = useContext(PartyContext);
  const [tax, setTax] = useState(0);

  return (
    <SafeAreaView className="bg-gray-800 items-center flex-1 justify-center space-y-4">
      <BackButton />
      <Text
        className="text-3xl text-gray-200 font-bold"
        style={{fontFamily: 'Nunito-Regular'}}>
        Set Tax %
      </Text>
      <TextInput
        autoFocus
        placeholder={tax.toFixed(2).toString() + '%'}
        placeholderTextColor="gray"
        style={{fontFamily: 'Nunito-Regular'}}
        className="bg-gray-900 rounded text-gray-200 w-20 h-10 border-b-cyan-500 border-b px-2 text-center text-xl"
        onChangeText={text => {
          setTax(+text);
        }}
        onSubmitEditing={() => {
          dispatch({type: Kind.SetTax, tax});
          navigation.navigate('Party');
        }}
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
}
