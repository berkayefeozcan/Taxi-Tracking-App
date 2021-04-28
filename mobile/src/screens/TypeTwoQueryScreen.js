import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Api from '../../functions/Api';
const TypeTwoQueryScreen = ({ route, navigation }) => {
    
    const { locations } = route.params;
    const [selectedLocationID, setSelectedLocationID] = useState(1);
    const [startDate, setStartDate] = useState(new Date('2020-12-01'));
    const [endDate, setEndDate] = useState(new Date('2020-12-02'));
    const [startDateShow, setStartDateShow] = useState(false);
    const [endDateShow, setEndDateShow] = useState(false);
    const [taxiAmount,setTaxiAmount] = useState(0)
    const [spinnerVisibilty,setSpinnerVisibilty]=useState(false);
    
    const fetchTaxiAmount = () => {
        var startDateString = startDate.toISOString();
        var endDateString = endDate.toISOString();
        if(startDateString<endDateString){

            setSpinnerVisibilty(true)
            Api.getTaxiAmountBetweenTwoDate(startDateString, endDateString, selectedLocationID).then((res) => {
                console.log(res)
                if (res.message == 'success') {
                    setTaxiAmount(res.taxiAmount);
                    
                }
                setSpinnerVisibilty(false)
            })
        }else{
            alert('End date has to be greater than start date')
        }
    }
    const locationValueOnChange = (itemValue, itemIndex) => {
        console.log(itemValue)
        setSelectedLocationID(itemValue)
    }
    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        if (event.type === 'set') {
            setStartDate(currentDate);
            setStartDateShow(false);
        }

    };
    const onChangeEndDate = (event, selectedDate) => {
      
        const currentDate = selectedDate || endDate;
        if (event.type === 'set') {
            setEndDate(currentDate);
            setEndDateShow(false)
        }
    };
    return (
        <ScrollView style={styles.container}>
            
            <View style={styles.card}>

                <Text>Select Location:</Text>

                <Picker
                    selectedValue={selectedLocationID}
                    onValueChange={locationValueOnChange}
                >
                    {
                        locations.map((location, i) => {
                            return (
                                <Picker.Item key={i} label={location.Zone} value={location.LocationID} />
                            )
                        })
                    }


                </Picker>
            </View>
            <View style={{ ...styles.card, ...styles.row }}>
                <Text style={{ fontSize: 20 }}>Start Date:</Text>
                <Text>{startDate.toLocaleDateString('tr-Tr')}</Text>
                <Icon.Button name="calendar-today"
                    onPress={() => { setStartDateShow(true) }}
                >
                    Calendar
                </Icon.Button>
            </View>
            <View style={{ ...styles.card, ...styles.row }}>
                <Text style={{ fontSize: 20 }}>End Date:</Text>
                <Text>{endDate.toLocaleDateString('tr-Tr')}</Text>
                <Icon.Button name="calendar-today"
                    onPress={() => { setEndDateShow(true) }}
                >
                    Calendar
                </Icon.Button>
            </View>
            
            <View style={{ ...styles.card, ...styles.row }}>
                {
                    spinnerVisibilty ? 
                    <ActivityIndicator size="large" color="#00ff00"/>:
                    <Text style={{fontSize:20}}><Text>Taxi Amount:  </Text>{taxiAmount}</Text>
                }
            </View>

            <TouchableOpacity
                style={styles.SubmitButtonStyle}
                onPress={fetchTaxiAmount}
            >
                <Text style={{ color: '#ffff', textAlign: 'center' }}>Fetch Data</Text>
            </TouchableOpacity>

            {startDateShow&& (
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
            {endDateShow&& (
                <DateTimePicker
                    testID="endDateTimePicker"
                    value={endDate}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEndDate}
                    minimumDate={new Date(2020, 11, 1)}
                    maximumDate={new Date(2020, 11, 31)}
                />
            )}



        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginVertical:10
        
    },
    card: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        minHeight: 50,
        marginHorizontal: 5,
        paddingHorizontal: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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
        borderColor: '#fff'
    },
})

export default TypeTwoQueryScreen;