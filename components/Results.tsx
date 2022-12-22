import {Dispatch, SetStateAction, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import styles from '../Styles';
import CloseButton from './CloseButton';
import {PartyType} from './Party';

interface ResultsProps {
  party: PartyType;
  setOpenCalculate: Dispatch<SetStateAction<boolean>>;
  tax: number | undefined;
}

const Results: React.FC<ResultsProps> = ({party, setOpenCalculate, tax}) => {
  const calculate = () => {
    if (tax)
      party.forEach(m => {
        m.results.tax = +(m.results.subTotal * tax).toFixed(2);
      });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.results}>
        <CloseButton close={setOpenCalculate} />
        <Text style={styles.sectionTitle}>Results</Text>
        <FlatList
          data={party}
          renderItem={({item}) => (
            <View style={styles.resultsMemberContainer}>
              <Text>{item.name}</Text>
              <Text>Subtotal: {item.results.subTotal}</Text>
              <Text>Tax: {item.results.tax.toFixed(2)}</Text>
              <Text>Tip: {item.results.tip}</Text>
              <Text>Total: {item.results.total}</Text>
            </View>
          )}
        />
        <Text style={styles.sectionDescription}></Text>
      </View>
    </View>
  );
};

export default Results;
