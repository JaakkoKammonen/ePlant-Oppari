import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../components/firebase';

export default function SelectPlant({searchTerm, navigation}) {
    const [plantList, setPlantlist] = useState([]);
    const [filteredPlantList, setFilteredPlantlist] = useState([]);
    const { navigate } = navigation;
    
    console.disableYellowBox = true;

    // getting object values from firebase and setting values into two list,
    // one for all plants and one as the filtered list based on search word user uses
    useEffect(() => {
        firebase.database().ref('kasvit/').on('value', snapshot => {
            const plantList = Object.values(snapshot.val());

            setPlantlist(plantList);
            setFilteredPlantlist(plantList);
        });
    }, []);

    // updates filtered plant list when search word changes, and returns filtered list
    useEffect(() => {
        const results = plantList.filter(plant => 
            plant.laji.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setFilteredPlantlist(results);
    }, [searchTerm, plantList]);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        navigate('Plant', { plant: item })
    };

    return (
        <View style={styles.container}>
            {filteredPlantList.map((item, i) => (
                <ListItem
                    onPress={() => handleSelect(item)}
                    key={i}
                    title={item.laji}
                    containerStyle={{
                        backgroundColor: '#FCFCFC'
                    }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    header: {
        flexDirection:"row",
        justifyContent:"space-between",
    },
    headertitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: "11%",
        paddingBottom: 20,
    },
    icon: {
        marginTop: "70%",
        marginRight:15,
        color: 'grey',
    },
    title: {
        fontSize: 22, 
        marginBottom: 10, 
        marginLeft: 10
    },
    content: {
        flexDirection: "column",
        marginTop: 20
    },
    searchcontainer: {
        backgroundColor: '#FCFCFC',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginBottom: 20
    }

});