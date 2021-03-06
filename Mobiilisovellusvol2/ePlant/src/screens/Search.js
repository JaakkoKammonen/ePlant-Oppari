import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PlantCards from '../components/PlantCards';
import PlantList from '../components/PlantList';

// search has 2 different search views, card view and list view
// these views are separate components and only one of these can be visible at the time
export default function Search({navigation}) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPhase, setSearchPhase] = useState('cards');

    // handles change of the search word
    const handleChange = (text) => {
        setSearchPhase('list')
        setSearchTerm(text);
    };

    // handles when user clicks "cancel" button
    const handleCancel = () => {
        setSearchPhase('cards')
    }

    // handles forwading event data to handleChange after user clicks "search" on keyboard
    const handleSubmit = (event) => {
        handleChange(event.nativeEvent.text)
    };

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                <View style={styles.headertop}>
                    <Text style={styles.text}>Search</Text>
                </View>
                <View style={styles.searchbar}>
                    <SearchBar
                        onChangeText={handleChange}
                        placeholder='Search plants'
                        onSubmitEditing={handleSubmit}
                        value={searchTerm}
                        platform='ios'
                        showCancel={true}
                        cancelButtonTitle='Peruuta'
                        inputContainerStyle={{backgroundColor: '#F0F0F0'}}
                        returnKeyType='search'
                        onCancel={handleCancel}
                    />
                </View>
            </View>
            <ScrollView>
                {searchPhase === 'list' && <PlantList navigation={navigation} searchTerm={searchTerm}/>}
                {searchPhase === 'cards' && <PlantCards navigation={navigation}/>}
            </ScrollView>
        </View>
    );
};

Search.navigationOptions = () => ({ title: 'Search' });

const styles = StyleSheet.create({
    container: {
        flex: 1  
    },
    header: {
        height: 140,
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset:{
            height: 2,
            width: 2
        },
        elevation:4,
    },
    headertop: {
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop:48,
        marginBottom: 5,
    },
    searchbar: {
        alignSelf: 'flex-end',
        marginLeft:5,
        marginRight:5
    }
});
