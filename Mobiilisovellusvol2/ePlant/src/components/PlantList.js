import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function SelectPlant({searchTerm, navigation}) {
    
    const plantList = useSelector(state => state.firebase.plants)
    const [filteredPlantList, setFilteredPlantlist] = useState(plantList);
    const { navigate } = navigation;

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
                        backgroundColor: '#FFFFFF'
                    }}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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