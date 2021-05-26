import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function SelectPlant({searchTerm, navigation}) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //
    
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
});