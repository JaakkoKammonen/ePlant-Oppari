import swal from 'sweetalert';

    const AirPumpON = (write_apikey, fieldNumber) => {
        const url = "https://api.thingspeak.com/update?api_key=" + write_apikey + "&field" + fieldNumber + "=1";
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            while (true) {
                if (parseInt(responseJson) == 0) { 
                    AirPumpON(write_apikey,fieldNumber)
                   // console.log(responseJson);
                } 

                swal(
                    {
                       title: "AirPump is turning on!",
                       button: false,
                       timer: 8000
                     });

                break; 
            };   
        })
        .catch((error) => {
            swal(
                {
                   title: "Something went wrong!",
                   button: true,
                 });
        });
    }

    const AirPumpOFF = (write_apikey, fieldNumber) => {
        const url = "https://api.thingspeak.com/update?api_key=" + write_apikey + "&field" + fieldNumber + "=0";
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            while (true) {
                if (parseInt(responseJson) == 0) { 
                    AirPumpOFF(write_apikey,fieldNumber)
                    //console.log(responseJson);
                } 

                swal(
                {
                   title: "AirPump is turning OFF!",
                   button: false,
                   timer: 8000
                 });

                break; 
            }; 
            
        })
        .catch((error) => {
            swal(
                {
                   title: "Something went wrong!",
                   button: true,
                 });
        });
    }
    
export default {
    AirPumpON,
    AirPumpOFF,

}