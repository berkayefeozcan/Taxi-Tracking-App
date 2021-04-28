import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Api from '../../functions/Api';

const TypeThreeQueryScreen = ({navigation}) => {

    const [startDate, setStartDate] = useState(new Date('2020-12-01'));
    const [startDateShow, setStartDateShow] = useState(false);

    const [spinnerVisibilty, setSpinnerVisibilty] = useState(false);

    const fetchTaxiAmount = () => {
        var day = startDate.getDate();
    


        setSpinnerVisibilty(true)
        Api.getLongestDistanceLocations(day).then((res) => {
            //console.log(res)
            if (res.message == 'success') {
                navigation.navigate('MapScreen',{
                    locationInfo:res.data.locationInfo
                });
               //console.log('basarili')

            }
            setSpinnerVisibilty(false)
        })

    }
    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        if (event.type === 'set') {
            setStartDate(currentDate);
            setStartDateShow(false);
        }

    };
    return (
        <View style={styles.container}>


            <View style={{ ...styles.card}}>
                <Text style={{ fontSize: 20 }}>Select Date:</Text>
                <Text>{startDate.toLocaleDateString('tr-Tr')}</Text>
                <Icon.Button name="calendar-today"
                    onPress={() => { setStartDateShow(true) }}
                >
                    Calendar
        </Icon.Button>
            </View>
            <View style={{ ...styles.card}}>
                {
                    spinnerVisibilty &&
                        <ActivityIndicator size="large" color="#00ff00" /> 
        
                }
            </View>

            <TouchableOpacity
                style={styles.SubmitButtonStyle}
                onPress={fetchTaxiAmount}
            >
                <Text style={{ color: '#ffff', textAlign: 'center' }}>Get longest trip</Text>
            </TouchableOpacity>

            {startDateShow && (
                <DateTimePicker
                    testID="startDateTimePicker"
                    value={startDate}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                    minimumDate={new Date(2020, 11, 1)}
                    maximumDate={new Date(2020, 11, 31)}
                />
            )}



        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    

    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        minHeight: 50,
        marginHorizontal: 5,
        width:'95%',
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    row: {
       
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
        width:'70%'
    },
})

export default TypeThreeQueryScreen;