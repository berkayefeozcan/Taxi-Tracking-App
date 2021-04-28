import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Api from '../../functions/Api';

const TypeOneQueryScreen = () => {
  const [passengers, setPassengers] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [spinnerVisibilty, setSpinnerVisibilty] = useState(false);

  const getFetchResult = () => {
    setSpinnerVisibilty(true);
    Api.getFiveDayPassengerCounts().then(res => {
      if (res.message == 'success') {
        setPassengers(res.data);
        setButtonState(true);
        setSpinnerVisibilty(false);
        // console.log('pass:  ' + passengers.length);
      } else {
        console.log('cumali');
      }
    });
  };

  const Item = ({date, passengerCount}) => (
    <View style={styles.item}>
      <Text style={{fontSize: 25, color: '#ffff', justifyContent:'space-between'}}>
        {date}
      </Text>
      <Text style={{fontSize: 25, color: '#ffff'}}>
        Toplam Yolcu Sayisi:  {passengerCount}
      </Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item date={item._id} passengerCount={item.totalPassengerCount} />
  );

  return (
    <View>
      {buttonState ? null : spinnerVisibilty ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          onPress={getFetchResult}>
          <Text style={{color: '#ffff', textAlign: 'center'}}>Sonucu Gör</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={passengers}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#00BCD4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#00BCD4',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default TypeOneQueryScreen;
