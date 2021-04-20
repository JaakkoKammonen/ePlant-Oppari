import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PlantCards from '../components/PlantCards';
import PlantList from '../components/PlantList';

// search has 2 different search views, card view and list view
// these views are separate components and only one of these can be visible at the time
export default function Search({navigation}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPhase, setSearchPhase] = useState('cards');

    console.disableYellowBox = true;

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
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.text}>Haku</Text>
                </View>
                <View style={styles.searchbar}>
                    <SearchBar
                        onChangeText={handleChange}
                        placeholder='Hae kasveja'
                        onSubmitEditing={handleSubmit}
                        value={searchTerm}
                        platform='ios'
                        lightTheme={true}
                        showCancel={true}
                        cancelButtonTitle='Peruuta'
                        containerStyle={styles.searchcontainer}
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
        backgroundColor: '#FCFCFC',
        flex: 1
        
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop:48,
        marginBottom: 5,
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
        backgroundColor: '#FAFAFA'
    },
    searchbar: {
        alignSelf: 'flex-end',
        marginLeft:5,
        marginRight:5
    },
    searchcontainer: {
        backgroundColor: '#FCFCFC',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    icon: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 10
    }
});
