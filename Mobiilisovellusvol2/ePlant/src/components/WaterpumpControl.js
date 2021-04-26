// importing all necessary components
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

export default function waterpumpControl(props) {
  const [res, setRes] = useState(0);
  const [isLoading, setLoading] = useState(false);

  // define ThingSpeak API-key
  const apikey = props.apikey;
 
  const waterOn = () => {
    let url = 'https://api.thingspeak.com/update?api_key=' + apikey + '&field4=1';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          while (true) { 
              if (parseInt(responseJson) == 0) { 
                  waterOn();
              }
              break; 
          }; 
          setRes(responseJson);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
  }


  // handles waterpump OFF-functionality asynchronously
  // goes through the conditional statement until the desired value is obtained from ThingSpeak
  // after this WaterOff -function launched
    const waterOff = () => {
      let url = 'https://api.thingspeak.com/update?api_key=' + apikey + '&field4=0';
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          while (true) { 
              if (parseInt(responseJson) == 0) { 
                  waterOff();
              }
              break; 
          }; 
          setRes(responseJson);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
  }

  const wait = (ms) => {
    let start = new Date().getTime();
    let end = start;
    console.log("Waiting: " + ms /1000 );
  
    while(end < start + ms) {
      end = new Date().getTime();
   }
  }

// controls water pump functionalities
    const waterControl = () => {
      waterOn();
      setRes(100);
      console.log("Waterpump is on.") 
      
      wait(20000);
  
      waterOff();
      setRes(100);
      console.log("Waterpump is off.")
      
};

// returns Water ON -button and loading indicator on the screen
return(

  <View style= {styles.box}>
      <Button
        onPress ={waterControl}
        title="Kastele ruukku"
        color='#63816D'
        />  
    <DotIndicator
         animating={isLoading}
         color='#63816D'
         hidesWhenStopped={true}
       />
  </View>
);
}

const styles = StyleSheet.create({

    box: {
      width:150,
      marginLeft:"10%",
      marginTop:10,
    },
    loadingIndicator: {
      justifyContent: 'center',

    }
});