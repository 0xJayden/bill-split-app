import {useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Kind, PartyContext} from '../context/party-context';
import {MemberType} from '../types';
interface AddItemProps {
  member: MemberType;
}

const AddItem: React.FC<AddItemProps> = ({member}) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [party, dispatch] = useContext(PartyContext);

  const getId = () => {
    const id = Math.floor(Math.random() * 1000);
    return id;
  };

  const submitItem = (): void => {
    const id = getId();

    if (member.items.find(i => i.id === id)) return submitItem();

    let newItem = {
      id,
      name: itemName !== '' ? itemName : `item ${id}`,
      price,
      quantity,
    };

    let subtotal = +(member.results.subTotal + +price * +quantity);

    let taxOwed = subtotal * (member.results.tax / 100);

    let total = member.results.tip + subtotal + taxOwed;

    dispatch({type: Kind.SetItem, newItem, member});
    dispatch({type: Kind.SetSubtotal, subtotal, member});
    dispatch({type: Kind.SetTaxOwed, taxOwed, member});
    dispatch({type: Kind.SetTotal, total, member});
    setItemName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <View className="flex-row items-center space-x-4">
      <TextInput
        className="border-b-cyan-500 border-b bg-gray-900 rounded p-2 min-w-[85px] mt-2 text-gray-200"
        style={{fontFamily: 'Nunito-Regular'}}
        onChangeText={text => setItemName(text)}
        placeholder="Item"
        placeholderTextColor="gray"
        value={itemName}
      />
      <TextInput
        keyboardType="numeric"
        className="border-b-cyan-500 border-b bg-gray-900 rounded p-2 min-w-[85px] mt-2 text-gray-200"
        style={{fontFamily: 'Nunito-Regular'}}
        onChangeText={text => setQuantity(text)}
        value={quantity}
        placeholder="Quantity"
        placeholderTextColor="gray"
      />
      <TextInput
        keyboardType="numeric"
        className="border-b-cyan-500 border-b bg-gray-900 rounded p-2 min-w-[85px] mt-2 text-gray-200"
        style={{fontFamily: 'Nunito-Regular'}}
        onChangeText={text => setPrice(text)}
        value={price}
        placeholder="Price"
        placeholderTextColor="gray"
      />
      <TouchableOpacity onPress={() => submitItem()}>
        <Text className="text-gray-200">Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddItem;
