import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import Home from './components/Home';
import CreateTable from './components/CreateTable';

import styles from './Styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HowManyPeople from './components/HowManyPeople';
import Party from './components/Party';
import State from './components/State';

const App = () => {
  const [createTable, setCreateTable] = useState(false);
  const [amountOfPeople, setAmountOfPeople] = useState<number>(0);
  const [openState, setOpenState] = useState(false);
  const [home, setHome] = useState(true);
  const [zip, setZip] = useState<number>(0);
  const [openParty, setOpenParty] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <Home />
      {home && (
        <CreateTable setHome={setHome} setCreateTable={setCreateTable} />
      )}
      {createTable && (
        <HowManyPeople
          setCreateTable={setCreateTable}
          setAmountOfPeople={setAmountOfPeople}
          amountOfPeople={amountOfPeople}
          setOpenParty={setOpenParty}
          setHome={setHome}
        />
      )}
      {/* {openState && (
        <State
          setCreateTable={setCreateTable}
          setOpenState={setOpenState}
          setZip={setZip}
          zip={zip}
          setOpenParty={setOpenParty}
        />
      )} */}
      {openParty && (
        <Party
          amountOfPeople={amountOfPeople}
          setCreateTable={setCreateTable}
          setOpenParty={setOpenParty}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
