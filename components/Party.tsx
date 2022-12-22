import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {FlatList, Pressable, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../Styles';
import BackButton from './BackButton';
import Member from './Member';
import Popup from './Popup';
import Results from './Results';

interface PartyProps {
  amountOfPeople: number;
  setCreateTable: Dispatch<SetStateAction<boolean>>;
  setOpenParty: Dispatch<SetStateAction<boolean>>;
}

export type ItemType = {
  id: number;
  name: string;
  price: string;
  quantity: string;
};

export type MemberType = {
  name: string;
  items: Items;
  results: {
    subTotal: number;
    tax: number;
    tip: number;
    total: number;
  };
};

export type Items = Array<ItemType>;

export type PartyType = Array<MemberType>;

const Party: React.FC<PartyProps> = ({
  amountOfPeople,
  setCreateTable,
  setOpenParty,
}) => {
  const [party, setParty] = useState<PartyType>([]);
  const [openMember, setOpenMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberType>();
  const [openCalculate, setOpenCalculate] = useState(false);
  const [tax, setTax] = useState<number>(0);
  const [tip, setTip] = useState('');
  const [broadcast, setBroadcast] = useState('');
  const [taxPlaceholder, setTaxPlaceholder] = useState('');

  const getParty = () => {
    let char;

    for (let i = 0; i < amountOfPeople; i++) {
      char = String.fromCharCode(65 + i);

      let member = {
        name: char,
        items: [],
        results: {subTotal: 0, tax: 0, tip: 0, total: 0},
      };

      setParty(prevParty => [...prevParty, member]);
    }
  };

  const renderParty: React.FC = () => {
    return (
      <>
        <Text style={styles.sectionTitle}>Party</Text>

        <Text style={styles.sectionDescription}>Select a guest.</Text>
        <FlatList
          style={{width: '100%'}}
          data={party}
          renderItem={({item}) => (
            <Pressable
              style={styles.itemContainer}
              onPress={() => {
                setSelectedMember(item);
                setOpenMember(true);
              }}>
              <Text style={styles.listItem}>{item.name}</Text>
            </Pressable>
          )}
        />
      </>
    );
  };

  useEffect(() => {
    setParty([]);
    getParty();
  }, [amountOfPeople]);

  return (
    <View style={styles.partyContainer}>
      {broadcast && <Popup broadcast={broadcast} />}
      {openCalculate && (
        <Results party={party} setOpenCalculate={setOpenCalculate} tax={tax} />
      )}
      {!openMember ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
            marginBottom: 20,
          }}>
          <BackButton open={setCreateTable} close={setOpenParty} />
          {/* <TextInput
            onSubmitEditing={e => {
              setTax(+e.nativeEvent.text / 100);
              setTaxPlaceholder('');
              setBroadcast('Sales Tax');
              setTimeout(() => setBroadcast(''), 2000);
            }}
            onChangeText={text => setTaxPlaceholder(text)}
            style={[styles.smallTextInput, {marginLeft: 65}]}
            placeholder="sales tax %"
            value={taxPlaceholder}
          /> */}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingRight: 10,
          }}>
          <BackButton open={setOpenParty} close={setOpenMember} />
          <TextInput
            onSubmitEditing={e => {
              if (selectedMember)
                selectedMember.results.tip = +e.nativeEvent.text;
              setTip('');
              setBroadcast('Tip');
              setTimeout(() => setBroadcast(''), 2000);
            }}
            onChangeText={text => setTip(text)}
            style={styles.smallTextInput}
            placeholder="add tip?"
            value={tip}
          />
        </View>
      )}
      {openMember && selectedMember && (
        <Member
          selectedMember={selectedMember}
          setParty={setParty}
          party={party}
          setSelectedMember={setSelectedMember}
          tax={tax}
        />
      )}
      {!openMember && renderParty({})}
      <Pressable
        onPress={() => {
          setOpenCalculate(true);
        }}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.addItemText, {marginRight: 5}]}>Calculate</Text>
          <Icon name="forward" style={{alignSelf: 'center'}} />
        </View>
      </Pressable>
    </View>
  );
};

export default Party;
