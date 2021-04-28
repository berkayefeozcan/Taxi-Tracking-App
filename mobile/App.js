import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TypeOneQueryScreen from './src/screens/TypeOneQueryScreen';
import TypeTwoQueryScreen from './src/screens/TypeTwoQueryScreen';
import TypeThreeQueryScreen from './src/screens/TypeThreeQueryScreen';
import MapViewScreen from './src/screens/MapViewScreen';


const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen
        name="Home" 
        component={HomeScreen}
        options={{title: 'Home'}}
        />
        <Stack.Screen
        name="TypeOne"
        component={TypeOneQueryScreen}
        options={{title: 'Type One Query'}}
        />
        <Stack.Screen
        name="TypeTwo"
        component={TypeTwoQueryScreen}
        options={{title: 'Type Two Query'}}
        />
        <Stack.Screen
        name="TypeThree"
        component={TypeThreeQueryScreen}
        options={{title: 'Type Three Query'}}
        />
          <Stack.Screen
        name="MapScreen"
        component={MapViewScreen}
        options={{title: 'Map'}}
        />
        </Stack.Navigator>  
    </NavigationContainer>
  );
};



export default App;