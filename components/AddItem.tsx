import {Dispatch, SetStateAction, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from '../Styles';
import CloseButton from './CloseButton';
import {Items, MemberType, PartyType} from './Party';

interface AddItemProps {
  items: Items;
  setParty: Dispatch<SetStateAction<PartyType>>;
  selectedMember: MemberType;
  setOpenAddItem: Dispatch<SetStateAction<boolean>>;
}

const AddItem: React.FC<AddItemProps> = ({
  items,
  setParty,
  selectedMember,
  setOpenAddItem,
}) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const getId = () => {
    const id = Math.floor(Math.random() * 1000);
    return id;
  };

  const submitItem = (): void => {
    const member = selectedMember;
    const id = getId();

    if (member.items.find(i => i.id === id)) return submitItem();

    member?.items.push({
      id,
      name: itemName !== '' ? itemName : `item ${id}`,
      price,
      quantity,
    });

    setParty(prevParty => {
      const updatedParty = prevParty.filter(
        member => member.name !== selectedMember.name,
      );

      updatedParty.push(member);

      setItemName('');
      setPrice('');
      setQuantity('');

      return updatedParty;
    });
  };

  return (
    <View style={[styles.sectionContainer, {marginTop: 0}]}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[
            styles.textInput,
            {padding: 10, width: 100, fontSize: 15, marginRight: 10},
          ]}
          onChangeText={text => setItemName(text)}
          placeholder="item name"
          value={itemName}
        />
        <TextInput
          keyboardType="numeric"
          style={[
            styles.textInput,
            {padding: 10, width: 100, fontSize: 15, marginRight: 10},
          ]}
          onChangeText={text => setQuantity(text)}
          value={quantity}
          placeholder="how many?"
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, {padding: 10, width: 100, fontSize: 15}]}
          onChangeText={text => setPrice(text)}
          value={price}
          onSubmitEditing={() => submitItem()}
          placeholder="price"
        />
      </View>
    </View>
  );
};

export default AddItem;
