import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function PlantOrPot({navigation}) {

    const { navigate } = navigation;
    

    return (
        <View style={styles.container}>
               <Button
                title="Add new plant"
                onPress={() => navigate("SelectPlant")}
                titleStyle={{marginLeft:15, color:"black"}}
                buttonStyle={styles.btn}
                
                /> 

                <Button
                title="Add new pot"
                onPress={() => navigate("AddNewPot")}
                titleStyle={{marginLeft:15, color:"black"}}
                buttonStyle={styles.btn}
                /> 

              
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
});