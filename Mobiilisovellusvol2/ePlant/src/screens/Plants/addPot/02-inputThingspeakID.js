import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Button } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import FireBasemiddleware from '../../../components/Redux/03-middleware/FireBasemiddleware';

export default function SelectName(props) {

    const navigate = props.navigation.state.params.navigation;

    const [ePlant, setePlant] = useState({
        channel_id: 0,
        write_apikey: "",
        ePlantModel: props.navigation.state.params.ePlantModel
    });
    const userUid = useSelector(item => item.user.uid)
    //console.log(user)
    const handleSubmit = (event) => {

        event.preventDefault();

        FireBasemiddleware.AddePlantToUser(userUid,ePlant, navigate)
    }
    //console.log(props.navigation.state.params)

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.headertitle}>Input ThingSpeak info</Text>
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
                    <Text>
                        Input ThingSpeak Channel ID
                    </Text>
                   <Input
                    placeholder="ThingsPeak Channel ID" 
                    clearButtonMode='always'
                    onChangeText={text => setePlant({
                        ...ePlant, channel_id: text})}
                    returnKeyType='done'
                   />
                   <Text>
                        Input ThingSpeak Write apikey
                    </Text>
                   <Input
                    placeholder="ThingsPeak Write apikey" 
                    clearButtonMode='always'
                    onChangeText={text => setePlant({
                    ...ePlant, write_apikey: text})}
                   />
                
                <Button
                title={"Submit"}
                onPress={ () => handleSubmit(event)} />
                   
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