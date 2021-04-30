import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import FireBase from "../../../components/Redux/03-middleware/FireBasemiddleware"
import AloeVera from "../../../assets/plant_img/aloe_vera.png"

export default function SelectName(props) {
    
    const [plantName, setPlantName] = useState('');
    const { navigate } = props.navigation;
    const species = props.navigation.state.params.plant;
    const potName = props.navigation.state.params.pot;
    const potId = props.navigation.state.params.potId;

    // adds new plants data to firebase database table "own plants"
    // data are received with props from previous screens SelectPlant.js and SelectPot.js
    // user is taken back to Home.js screen, and two props are send with navigation
    // props are used to show a snackbar in Home.js to inform the user that plant has been added to db
   const AddPlantDb = (event) => {
     event.preventDefault();
     FireBase.AddPlantToDatabase(species,plantName, potName, potId, navigate)
   }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.headertitle}>Lisää kasvi</Text>
                <Icon 
                    name="close" 
                    size={40} 
                    iconStyle={styles.icon}
                    onPress={() => navigate('Home')} 
                />
            </View>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.container}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>Melkein valmista!</Text>
                        <Text style={styles.text}>Anna vielä kasvillesi nimi</Text>
                    </View>
                    <Image style={styles.middleimage} source={AloeVera} />
                    <Input
                        placeholder='Anna kasville nimi'
                        inputContainerStyle={styles.textinput}
                        clearButtonMode='always'
                        onChangeText={text => setPlantName(text)}
                        returnKeyType='done'
                        onSubmitEditing={AddPlantDb}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginTop: "70%",
        marginRight:15,
        color: 'grey',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
    text: {
        fontSize: 16,
        color: '#404040',
        alignSelf: 'center'
    },
    middleimage: {
        width: 200,
        height: 200,
        margin: 25,
        alignSelf: 'center'
    },
    textinput: {
        width: 350,
        alignSelf: 'center'
    }

});