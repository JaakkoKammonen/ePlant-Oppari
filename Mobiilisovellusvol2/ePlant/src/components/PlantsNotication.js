import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser_Notifications } from "./Redux/01-actions"

export default function PlantsNotification() {

    const my_Plants = useSelector(state => state.firebase.my_Plants)
    const dispatch = useDispatch();

    const Notifications =  () => {

    Object.values(my_Plants).map((plant) => {

        const url = 'https://api.thingspeak.com/channels/' + plant.ePlantPot.channel_id + '/feeds.json';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.feeds)
                //console.log(responseJson.feeds[responseJson.feeds.length-1])

                let lastTen = responseJson.feeds.slice(responseJson.feeds.length-11, responseJson.feeds.length-1);

                //console.log(lastTen)
                 let mapped = lastTen.map((feedItem) => {
                    let data = {
                    imagesrc: plant.species,
                    time: feedItem.created_at,
                    plantname: plant.plantName,
                    field1Name: plant.ePlantPot.ePlantModel.Field1,
                    field1Value: feedItem.field1,
                    field2Name: plant.ePlantPot.ePlantModel.Field2,
                    field2Value: feedItem.field2
                    }
                    return data
                 })
                 dispatch(setUser_Notifications(mapped))
            })
            .catch((error) => {
                //console.log(error)
                dispatch(setUser_Notifications(["null"]))
            });
            
        return "asdf"
    })
    return "asdf"
}; 
    return (
        <View>
            {Notifications()}
        </View>
        
    );
};
