import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet ,ActivityIndicator} from 'react-native';
import Api from '../../functions/Api';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Icon from 'react-native-vector-icons/MaterialIcons';
MapboxGL.setAccessToken("pk.eyJ1IjoiYWxoYXJlem1pIiwiYSI6ImNrbm15eDA1cjB6bjkyc3BudzM2OHdoemYifQ.PpVMp_70NHCcxM5itTgzkA");
const MapViewScreen = ({ route, navigation }) => {
  const { locationInfo } = route.params;
  console.log(locationInfo);
  const initRoute = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.396172, 37.791437], [-122.395825, 37.79116]
          ],
        },
        style: {
          fill: 'red',
          strokeWidth: '10',
          fillOpacity: 0.6,
        },
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      },
    ],
  };

  const [routeMap, setRoute] = useState(initRoute);
  const [initialCoords, setInitialCoords] = useState([-122.396172, 37.791437])
  const [spinnerVisibilty, setSpinnerVisibilty] = useState(false);

  const fetchDirections = async () => {

    console.log(locationInfo);
    //setSpinnerVisibilty(true)
    var originPlaceName = `${locationInfo[0].Zone.replace("/"," ")} ${locationInfo[0].Borough}`;
    var destinationPlaceName = `${locationInfo[1].Zone.replace("/"," ")} ${locationInfo[1].Borough}`;
    console.log(originPlaceName)
    // get coordinats from mapbox geolocation api
    var originRes = await Api.getCoordinatsFromLocationName(originPlaceName);
    var destinationRes = await Api.getCoordinatsFromLocationName(destinationPlaceName);
    // used first query results 
    console.log(originRes)
    console.log(destinationRes)
    try {

      var originCoordinats = originRes.features[0].center;
      var destinationCoordinats = destinationRes.features[0].center;
      console.log(originCoordinats);
      console.log(destinationCoordinats);
      var directionsRes = await Api.getDirectionsFromCoordinats(originCoordinats, destinationCoordinats);
      console.log(directionsRes);
      var newRoute = { ...routeMap };
      newRoute.features[0].geometry = directionsRes.routes[0].geometry;
  
      if (directionsRes.code === "Ok") {
        //console.log(newRoute)
        setRoute(newRoute)
        setSpinnerVisibilty(false)
      }
    }
    catch(err){
      alert(err)
    }
  }
  useEffect(() => {
    fetchDirections();
  }, [])
  const renderCurrentPoint = () => {
    return (
      <>
        <MapboxGL.UserLocation
          renderMode="normal"
          visible={false}
          onUpdate={location => {
            const currentCoords = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            // console.log(location); // current location is here
            setInitialCoords(currentCoords)

          }}
        />

        {/* current Provider location */}
        <MapboxGL.PointAnnotation
          selected={true}
          key="key1"
          id="id1"
          coordinate={routeMap.features[0].geometry.coordinates[0]}>
          <Icon name="pin-drop" size={45} color="#00f" />
          <MapboxGL.Callout title={locationInfo[0].Zone} />
        </MapboxGL.PointAnnotation>
        {/* user From DB location */}
        <MapboxGL.PointAnnotation
          selected={true}
          key="key2"
          id="id2"
          coordinate={routeMap.features[0].geometry.coordinates[routeMap.features[0].geometry.coordinates.length - 1]}>
          <Icon name="pin-drop" size={45} color="#0f0" />
          <MapboxGL.Callout title={locationInfo[1].Zone} />
        </MapboxGL.PointAnnotation>
        <MapboxGL.ShapeSource id="line1" shape={routeMap}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{
              lineColor: 'red',
              lineWidth: 10,
              lineCap: 'round',
            }}
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={routeMap.features[0].geometry.coordinates[0]}
        // centerCoordinate={[-5.803457464752711, 35.769940811797404]}
        />
      </>
    );
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        {
          spinnerVisibilty ? <ActivityIndicator size="large" color="#00ff00" /> :

            <MapboxGL.MapView style={styles.map} >
              {renderCurrentPoint()}
            </MapboxGL.MapView>
        }
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: '100%',
    width: "100%",
    
  },
  map: {
    flex: 1
  },
  dot: {
    width: 25,
    height: 25,
    backgroundColor: 'red',
    borderRadius: 25,
    opacity: 0.2,
  }
});

export default MapViewScreen;