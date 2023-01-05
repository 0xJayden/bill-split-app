import {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  partyReducer,
  initialState,
  PartyContext,
} from './context/party-context';

import {StackParamList} from './types';

import HomeScreen from './screens/HomeScreen';
import HowManyPeople from './screens/HowManyPeople';
import Tax from './screens/Tax';
import Party from './screens/Party';
import Member from './screens/Member';
import Results from './screens/Results';

const App = () => {
  const [party, partyDispatch] = useReducer(partyReducer, initialState);

  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <PartyContext.Provider value={[party, partyDispatch]}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HowManyPeople"
            component={HowManyPeople}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tax"
            component={Tax}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Party"
            component={Party}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Member"
            component={Member}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={{presentation: 'modal', headerShown: false}}
          />
        </Stack.Navigator>
      </PartyContext.Provider>
    </NavigationContainer>
  );
};

export default App;
