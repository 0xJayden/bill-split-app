import {Dispatch, SetStateAction, useEffect} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import useStates from '../Hooks/useStates';
import styles from '../Styles';

interface StateProps {
  setCreateTable: Dispatch<SetStateAction<boolean>>;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  setZip: Dispatch<SetStateAction<number>>;
  zip: number;
  setOpenParty: Dispatch<SetStateAction<boolean>>;
}

const State: React.FC<StateProps> = ({
  setCreateTable,
  setOpenState,
  setZip,
  zip,
  setOpenParty,
}) => {
  const {data, error, isLoading} = useStates(zip);
  console.log(data, error, isLoading);

  return (
    <View style={styles.stateContainer}>
      <Pressable
        onPress={() => {
          setCreateTable(true);
          setOpenState(false);
        }}
        style={styles.back}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <Text style={styles.howManyPeopleText}>Enter Zipcode</Text>
      <TextInput
        textContentType="postalCode"
        keyboardType="numeric"
        style={styles.howManyPeopleTextInput}
        onChangeText={zip => {
          if (zip.length != 5) return;
          setZip(+zip);
        }}
        onSubmitEditing={() => {
          setOpenParty(true);
          setOpenState(false);
        }}
      />
      {data && (
        <>
          <Text
            style={
              styles.sectionDescription
            }>{`Tax% ${data.combined_rate}`}</Text>
          <Text style={styles.sectionDescription}>{`State ${data.state}`}</Text>
          <Text
            style={styles.sectionDescription}>{`Region ${data.region}`}</Text>
        </>
      )}
      <Pressable style={styles.createButton}>
        <Text>Create</Text>
      </Pressable>
    </View>
  );
};

export default State;
