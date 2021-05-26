

    const AirPumpON = (write_apikey, fieldNumber) => {
        const url = "https://api.thingspeak.com/update?api_key=" + apikey + "&field" + fieldNumber + "=1";
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            while (true) {
                if (parseInt(responseJson) == 0) { 
                    AirPumpON(write_apikey,fieldNumber)
                    console.log(responseJson);
                } 
                break; 
            }; 
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    }

    const AirPumpOFF = (write_apikey, fieldNumber) => {
        const url = "https://api.thingspeak.com/update?api_key=" + apikey + "&field" + fieldNumber + "=0";
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            while (true) {
                if (parseInt(responseJson) == 0) { 
                    AirPumpOFF(write_apikey,fieldNumber)
                    console.log(responseJson);
                } 
                break; 
            }; 
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    }

    
export default {
    AirPumpON,
    AirPumpOFF

}