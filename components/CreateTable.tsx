import {Dispatch, SetStateAction, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../Styles';

interface CreateTableProps {
  setCreateTable: Dispatch<SetStateAction<boolean>>;
  setHome: Dispatch<SetStateAction<boolean>>;
}

const CreateTable: React.FC<CreateTableProps> = ({setCreateTable, setHome}) => {
  return (
    <View style={styles.createTableContainer}>
      <Text style={styles.createTableText}>Create a Table</Text>
      <Pressable
        onPress={() => {
          setCreateTable(true);
          setHome(false);
        }}
        style={({pressed}) => [
          styles.createTableButton,
          {backgroundColor: pressed ? '#4ff8ff' : ''},
          ,
        ]}>
        {({pressed}) => (
          <Text
            style={[
              styles.coloredText,
              {color: pressed ? 'white' : '#4ff8ff'},
            ]}>
            +
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default CreateTable;
