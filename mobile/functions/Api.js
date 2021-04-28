import metrics from '../metrics';
const accessToken = "<Mapbox access token>"
export default{
    async getTaxiAmountBetweenTwoDate(startDate,endDate,locationID) {
        try {
            const fetchResult = fetch(`${metrics.URL}/getTaxiAmountBetweenTwoDate/?$startDate=${startDate}&$endDate=${endDate}&$locationID=${locationID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
        } catch (e) {
            console.warn(e);

        }
    },
    async getTaxiZones() {
        try {
            const fetchResult = fetch(`${metrics.URL}/getTaxiZones`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
        } catch (e) {
            console.warn(e);

        }
    },
    async getLongestDistanceLocations(day) {
        try {
            const fetchResult = fetch(`${metrics.URL}/getLongestDistanceLocations/?$day=${day}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
        } catch (e) {
            console.warn(e);

        }
    },
    async getCoordinatsFromLocationName(locationName) {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?&access_token=${accessToken}`
            const fetchResult = fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
        } catch (e) {
            console.warn(e);

        }
    },
    async getDirectionsFromCoordinats(startPoint,endPoint) {
        try {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startPoint[0]},${startPoint[1]};${endPoint[0]},${endPoint[1]}?geometries=geojson&access_token=${accessToken}`
            const fetchResult = fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
        } catch (e) {
            console.warn(e);

        }
    },
    async getFiveDayPassengerCounts(){
        try{
            
            const fetchResult = fetch(`${metrics.URL}/queryOne`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const response = await fetchResult;

            return response.json();
            
        }catch(e){
            console.warn(e)
        }
    }
}