import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firebase from './firebase';

export default function PlantCards({navigation}) {
    const [foodPlants, setFoodPlants] = useState([]);
    const [feature, setFeature] = useState([]);
    const [feature2, setFeature2] = useState([]);
    const [feature3, setFeature3] = useState([]);
    const { navigate } = navigation;

    // retrieving and filtering data from firebase db
    // setting filtered data to differend lists
    useEffect(() => {
        firebase.database().ref('kasvit/').on('value', snapshot => {
          const plants = Object.values(snapshot.val());
          const foodPlants = plants.filter(plant => plant.tyyppi === 'Ruokakasvi')
          const feature = plants.filter(plant => plant.ominaisuus === 'Yksivuotinen')
          const feature2 = plants.filter(plant => plant.ominaisuus === 'Kaksivuotinen')
          const feature3 = plants.filter(plant => plant.ominaisuus === 'Monivuotinen')
        
          setFoodPlants(foodPlants);
          setFeature(feature);
          setFeature2(feature2);
          setFeature3(feature3);
        });
    }, []);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        navigate('Plant', { plant: item })
    };

    return (
        <View style={styles.container}>
                <View style={styles.category}>
                    <Text style={styles.text}>Yksivuotinen</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        marginLeft={10}
                        data={feature}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/herbs.png')} />

                            </TouchableOpacity>

                        }
                    />
                    <Text style={styles.text2}>Kaksivuotinen</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        marginLeft={10}
                        data={feature2}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/herbs.png')} />

                            </TouchableOpacity>

                        }
                    />
                    <Text style={styles.text3}>Monivuotinen</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        marginLeft={10}
                        data={feature3}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/herbs.png')} />

                            </TouchableOpacity>

                        }
                    />
                     <Text style={styles.text3}>Kaikki</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        marginLeft={10}
                        data={foodPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/herbs.png')} />

                            </TouchableOpacity>

                        }
                    />
                </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1 
    },
    category: {
        marginTop: 25,
    },
    plantheader: { 
        textAlign: 'center', 
        fontSize: 16, 
        marginTop: 10, 
        fontWeight: "bold" 
    },
    plantimage: { 
        width: 150, 
        height: 150
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 17,
    },
    text2: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 17,
        marginBottom: 17,
    },
    text3: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 17,
        marginBottom: 17,
    },
    border: {
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        margin:5,
        backgroundColor: 'white',
        height: 185,
        width: 170
    },
    header: {
        height: 100,
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset:{
            height: 2,
            width: 2
        },
        elevation:4,
        backgroundColor: '#FAFAFA'
    },
    searchcontainer: {
        backgroundColor: '#FCFCFC',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginBottom: 20
    },
    textinput: {
        width: '80%',
        marginLeft: 10

    },
    icon: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 10
    }
});
