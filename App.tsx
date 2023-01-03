import React, {createContext, useReducer, useState} from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';
// import CreateTable from './components/CreateTable';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import HowManyPeople from './screens/HowManyPeople';
// import Party from './components/Party';
// import State from './components/State';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Tax from './screens/Tax';
import {
  partyReducer,
  initialState,
  PartyContext,
} from './context/party-context';
import {StackParamList} from './types';
import Party from './screens/Party';
import Member from './screens/Member';
import {
  MemberContext,
  memberInitialState,
  memberReducer,
} from './context/member-context';
import Results from './screens/Results';

const App = () => {
  const [party, partyDispatch] = useReducer(partyReducer, initialState);
  const [member, memberDispatch] = useReducer(
    memberReducer,
    memberInitialState,
  );

  // const [createTable, setCreateTable] = useState(false);
  // const [amountOfPeople, setAmountOfPeople] = useState<number>(0);
  // const [openState, setOpenState] = useState(false);
  // const [home, setHome] = useState(true);
  // const [zip, setZip] = useState<number>(0);
  // const [openParty, setOpenParty] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <PartyContext.Provider value={[party, partyDispatch]}>
        <MemberContext.Provider value={[member, memberDispatch]}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="HowManyPeople" component={HowManyPeople} />
            <Stack.Screen name="Tax" component={Tax} />
            <Stack.Screen name="Party" component={Party} />
            <Stack.Screen name="Member" component={Member} />
            <Stack.Screen name="Results" component={Results} />
          </Stack.Navigator>
        </MemberContext.Provider>
      </PartyContext.Provider>
      {/* <SafeAreaView>
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
            {openState && (
              <State
              setCreateTable={setCreateTable}
              setOpenState={setOpenState}
              setZip={setZip}
              zip={zip}
              setOpenParty={setOpenParty}
              />
              )}
              {openParty && (
                <Party
                amountOfPeople={amountOfPeople}
                setCreateTable={setCreateTable}
                setOpenParty={setOpenParty}
                />
                )}
              </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;
