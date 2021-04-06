import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firebase from './firebase';

export default function PlantCards({navigation}) {
    const [easyPlants, setEasyPlants] = useState([]);
    const [foodPlants, setFoodPlants] = useState([]);
    const [lowWaterPlants, setlowWaterPlants] = useState([]);
    const { navigate } = navigation;

    console.disableYellowBox = true;

    // retrieving and filtering data from firebase db
    // setting filtered data to differend lists
    useEffect(() => {
        firebase.database().ref('kasvit/').on('value', snapshot => {
          const plants = Object.values(snapshot.val());
          const easyPlants = plants.filter(plant => plant.hoito === 'Helppo')
          const foodPlants = plants.filter(plant => plant.tyyppi === 'Ruokakasvi')
          const lowWaterPlants = plants.filter(plant => plant.vesitarve === 'Niukka')
        
          setEasyPlants(easyPlants);
          setFoodPlants(foodPlants);
          setlowWaterPlants(lowWaterPlants); 
        });
    }, []);

    // sending selected items data to next screen and navigating to there
    const handleSelect = (item) => {
        navigate('Plant', { plant: item })
    };

    return (
        <View style={styles.container}>
                <View style={styles.category}>
                    <Text style={styles.text}>Helppohoitoiset kasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={10}
                        data={easyPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title='Plant'
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/plant_img/kaktus.png')} />

                            </TouchableOpacity>

                        }
                    />
                </View>
                <View style={styles.category}>
                    <Text style={styles.text}>Ruokakasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={10}
                        data={foodPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/flowerpot.png')} />

                            </TouchableOpacity>

                        }
                    />
                </View>
                <View style={styles.category}>
                    <Text style={styles.text}>Kuivuutta kestävät kasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={10}
                        data={lowWaterPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                title="Plant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/plant_img/aloe_vera.png')} />

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
        marginBottom: 15,
    },
    border: {
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        margin:5,
        marginRight: 3,
        marginLeft: 3,
        backgroundColor: 'white',
        height: 170
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
