import {Dispatch, SetStateAction, useState} from 'react';
import {FlatList, Pressable, Text, TextInput, View} from 'react-native';
import styles from '../Styles';
import AddItem from './AddItem';
import Item from './Item';
import {PartyType, MemberType} from './Party';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Popup from './Popup';

interface MemberProps {
  selectedMember: MemberType;
  setParty: Dispatch<SetStateAction<PartyType>>;
  party: PartyType;
  setSelectedMember: Dispatch<SetStateAction<MemberType | undefined>>;
  tax: number;
}

const Member: React.FC<MemberProps> = ({
  selectedMember,
  setParty,
  party,
  setSelectedMember,
  tax,
}) => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [newName, setNewName] = useState('');
  const [notEdit, setNotEdit] = useState(false);

  const createNewName = () => {
    let member = party.find(m => m.name === selectedMember.name);
    if (member) member.name = newName;
    setNewName('');
    setNotEdit(false);
  };

  const getAmountOfItems = () => {
    let amountOfItems = 0;

    selectedMember.items.forEach(i => {
      const itemAmount = i.quantity;

      amountOfItems = amountOfItems + +itemAmount;
    });

    return amountOfItems;
  };

  const getSubtotal = () => {
    let subtotal = 0;

    selectedMember.items.forEach(i => {
      const itemAmount = i.quantity;
      const itemPrice = i.price;

      subtotal = subtotal + +itemAmount * +itemPrice;
    });

    selectedMember.results.subTotal = subtotal;

    return subtotal;
  };

  const getTax = () => {
    const subtotal = selectedMember.results.subTotal;

    const newTax = subtotal * tax;

    selectedMember.results.tax = newTax;

    return newTax;
  };

  const getTip = () => {
    const tip = selectedMember.results.tip;

    return tip;
  };

  const getTotal = () => {
    const subtotal = selectedMember.results.subTotal;
    const tax = selectedMember.results.tax;
    const tip = selectedMember.results.tip;

    const total = subtotal + tax + tip;

    selectedMember.results.total = total;

    return total;
  };

  return (
    <>
      <View style={styles.subContainer}>
        <Text style={styles.sectionTitle}>Member</Text>
        <Pressable onPress={() => setNotEdit(!notEdit)}>
          <View style={[styles.row, {width: 90}]}>
            <Icon
              style={[{marginRight: 10}, {borderWidth: 1}, {borderRadius: 5}]}
              name="edit"
              size={20}
            />
            <Text style={[styles.sectionDescription, {marginTop: 0}]}>
              {selectedMember.name}
            </Text>
          </View>
        </Pressable>

        {notEdit && (
          <View style={styles.row}>
            <TextInput
              style={styles.smallTextInput}
              value={newName}
              onSubmitEditing={() => createNewName()}
              onChangeText={text => setNewName(text)}
              placeholder="new name"
            />
          </View>
        )}
      </View>
      {/* <View style={styles.row}>
        <Text style={styles.label}>Add a tip</Text>
        <TextInput
          style={styles.smallTextInput}
          onChangeText={text => setTip(+text)}
          onSubmitEditing={() => {
            setParty(prevParty => {
              const member = selectedMember;

              member.results.tip = tip;

              const updatedParty = prevParty.filter(
                member => member.name !== selectedMember.name,
              );
              updatedParty.push(member);
              return updatedParty;
            });
          }}
          placeholder="tip amount"
        />
      </View> */}
      {/* <Text>Current tip: ${selectedMember.results.tip}</Text> */}
      <View style={{width: '100%', height: '90%'}}>
        <Text style={styles.sectionTitle}>Items</Text>
        <AddItem
          items={selectedMember.items}
          setParty={setParty}
          selectedMember={selectedMember}
          setOpenAddItem={setOpenAddItem}
        />
        {selectedMember.items.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
            }}>
            <Text style={{width: 120, textAlign: 'center', marginLeft: 10}}>
              Item
            </Text>
            <Text style={{width: 90, paddingLeft: 35}}>Quantity</Text>
            <Text style={{width: 70, paddingLeft: 15, marginRight: 15}}>
              Price
            </Text>
            <Text>Total</Text>
          </View>
        )}
        <FlatList
          style={[styles.listContainer, {padding: 10}]}
          data={selectedMember.items}
          renderItem={({item}) => (
            <Item
              item={item}
              selectedMember={selectedMember}
              setParty={setParty}
            />
          )}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <View>
              <Text style={{padding: 1}}>Items: {getAmountOfItems()}</Text>
              <Text style={{padding: 1}}>
                Subtotal: ${getSubtotal().toFixed(2)}
              </Text>
              <Text style={{padding: 1}}>Tax: ${getTax().toFixed(2)}</Text>
            </View>
            <View>
              <Text style={{padding: 1}}>Tip: ${getTip().toFixed(2)}</Text>
              <Text style={{padding: 1}}>Total: ${getTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Member;
