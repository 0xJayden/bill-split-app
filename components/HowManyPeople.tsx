import {Dispatch, SetStateAction} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import styles from '../Styles';
import BackButton from './BackButton';

interface HowManyPeopleProps {
  setCreateTable: Dispatch<SetStateAction<boolean>>;
  setAmountOfPeople: Dispatch<SetStateAction<number>>;
  amountOfPeople: number | undefined;
  setOpenParty: Dispatch<SetStateAction<boolean>>;
  setHome: Dispatch<SetStateAction<boolean>>;
}

const HowManyPeople: React.FC<HowManyPeopleProps> = ({
  setCreateTable,
  setAmountOfPeople,
  amountOfPeople,
  setOpenParty,
  setHome,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <BackButton open={setHome} close={setCreateTable} />
      <Text style={styles.howManyPeopleText}>How many people?</Text>
      <TextInput
        onChangeText={text => {
          setAmountOfPeople(+text);
        }}
        style={styles.howManyPeopleTextInput}
        keyboardType="numeric"
        onSubmitEditing={() => {
          if (amountOfPeople && amountOfPeople > 0) {
            setOpenParty(true);
            setCreateTable(false);
          }
        }}
      />
      <Text style={styles.sectionDescription}>
        Current: {amountOfPeople === 0 ? null : amountOfPeople}
      </Text>
    </View>
  );
};

export default HowManyPeople;
