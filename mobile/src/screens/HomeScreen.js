import 'react-native-gesture-handler';
import React ,{useState,useEffect}from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Api from '../../functions/Api';

const HomeScreen = ({ navigation }) => {
  const [spinnerVisibilty,setSpinnerVisibilty] = useState(true);
  const [locations,setLocations] = useState([]);

  const fetchLocations=()=>{
    setSpinnerVisibilty(true);
    Api.getTaxiZones().then((data)=>{
     // console.log(data)
      if(data.message==='success'){
       //console.log(data.locations)
        setLocations(data.locations);
      }
      setSpinnerVisibilty(false);
    })
  }
  useEffect(() => {
    fetchLocations();
    
  }, [])
  const Buttons = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TypeOne')}
        >
          <Text style={styles.text}>Go to type one query</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TypeTwo',{
            locations: locations
          })}
        >
          <Text style={styles.text}>Go to type two query</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TypeThree')}
        >
          <Text style={styles.text}>Go to type three query</Text>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <View style={styles.container}>

    {
      spinnerVisibilty == true ? 
      <ActivityIndicator size="large" color="#00ff00" />:
      <Buttons/>
    }


    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#b0d6df',
    padding: 10,
    marginVertical: 20,
    height: 100,
    justifyContent: 'center',
    borderRadius: 50,
  },
  view: {
  },
  text: {
    alignSelf: 'center',
    color: '#090f0d'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
