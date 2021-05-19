import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, SearchBar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

export default function LisaaKasvi({navigation}) {

    const plantList = useSelector(state => state.firebase.plants)
    const [filteredPlantList, setFilteredPlantlist] = useState(plantList);
    //console.log(filteredPlantList)
    const [searchTerm, setSearchTerm] = useState('');
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
        navigate('SelectPot', { plant: item.laji })
    };

    // handles change of the search word
    const handleChange = (text) => {
        setSearchTerm(text);
    };

    // handles forwading event data to handleChange after user clicks "search" on keyboard
    const handleSubmit = (event) => {
        handleChange(event.nativeEvent.text)
    };

    // resets plantList back to original one after user clicks "cancel" or "empty" button
    const resetPlantList = () => {
        setFilteredPlantlist(plantList)
    }

    return (
        <View style={styles.container}>
               <ScrollView>
            <View style={styles.header}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.headertitle}>Select plant</Text>
                <Icon 
                    name="close" 
                    size={40} 
                    iconStyle={styles.icon}
                    onPress={() => navigate('Home')} 
                />
            </View>

      
            <View style={styles.content}>
                <Text style={styles.title}>Select plant</Text>
                <SearchBar
                    onChangeText={handleChange}
                    placeholder='Search plants'
                    onSubmitEditing={handleSubmit}
                    value={searchTerm}
                    platform='ios'
                    showCancel={true}
                    cancelButtonTitle='Return'
                    containerStyle={styles.searchcontainer}
                    inputContainerStyle={{backgroundColor: '#F0F0F0'}}
                    returnKeyType='search'
                    onClear={resetPlantList}
                    onCancel={resetPlantList}
                />
            </View>
          
            <View>
               {filteredPlantList.map((item) => (
                    <ListItem
                        onPress={() => handleSelect(item)}
                        key={item.id}
                        title={item.laji}
                        containerStyle={{
                            backgroundColor: '#FCFCFC'
                        }}
                    >
                     <ListItem.Title>{item.laji}</ListItem.Title>   
                    </ListItem>
                ))} 
            </View>
            </ScrollView>
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
        marginBottom: 5
    }

});