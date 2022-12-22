import {Dispatch, SetStateAction, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../Styles';
import {ItemType, MemberType, PartyType} from './Party';

interface ItemProps {
  item: ItemType;
  selectedMember: MemberType;
  setParty: Dispatch<SetStateAction<PartyType>>;
}

const Item: React.FC<ItemProps> = ({item, selectedMember, setParty}) => {
  return (
    <View style={styles.memberItemContainer}>
      <Pressable
        onPress={() => {
          setParty(prevParty => {
            const member = selectedMember;

            const updatedMemberItems = member?.items.filter(
              i => i.id !== item.id,
            );

            member.items = updatedMemberItems;

            const updatedParty = prevParty.filter(
              member => member.name !== selectedMember.name,
            );
            updatedParty.push(member);
            return updatedParty;
          });
        }}
        style={{}}>
        <Text>X</Text>
      </Pressable>
      <Text style={{width: 80}}>{item.name}</Text>
      <Text>x{item.quantity}</Text>
      <Text style={{width: 50, textAlign: 'center'}}>${item.price}</Text>
      <Text style={{width: 50}}>${+item.price * +item.quantity}</Text>
    </View>
  );
};

export default Item;
