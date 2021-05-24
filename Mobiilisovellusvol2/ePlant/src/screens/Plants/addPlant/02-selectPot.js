import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import kuva from '../../../assets/herbs.png'

export default function SelectPot(props) {

    const my_ePlants = useSelector(state => state.firebase.my_ePlants)

    const my_Plants = useSelector(state => state.firebase.my_Plants)


    const { navigate } = props.navigation;
    
    const plant = props.navigation.state.params.plant;
    //console.log(plant)
    // sending selected items data to next screen and navigating to there
    const handleSelect = (eplant) => {
        //console.log(eplant)
        try {
           if(Object.entries(my_Plants).length > 1 ) {

            //console.log("enemmänkun yks kasvi")
            let testData = Object.entries(my_Plants).map((item) => {
                //console.log(item[1].ePlantPot.ePlantID, eplant[0])
                if(item[1].ePlantPot.ePlantID === eplant[0]) {
                    return true
                } else {
                    return false
                }
            })
            
            if (testData.includes(true)) {
                navigate('Home', {showSnackbar: true, plantName: "You cannot add two plants in the same ePlant!"})
            } else {
               // console.log("enemmänkun yks kasvi ELSE")
                navigate('SelectName', { eplant: eplant, plant: plant })
            }
            
            

        } else if(Object.entries(my_Plants).length = 1) {
          // console.log("Ykskasvi")
            let parsing = Object.entries(my_Plants)[0]
            let myPlant = parsing[1]
            //console.log(myPlant.ePlantPot.ePlantID,eplant[0] )

            if(myPlant.ePlantPot.ePlantID === eplant[0] ) {
                navigate('Home', {showSnackbar: true, plantName: "You cannot add two plants in the same ePlant!"})
            } else {
                navigate('SelectName', { eplant: eplant, plant: plant })
            }

        } else {
           // console.log("Elsen navi")
            navigate('SelectName', { eplant: eplant, plant: plant })
        } 
        } catch (error) {
           // console.log("Catch navi")
            navigate('SelectName', { eplant: eplant, plant: plant })
        }
        
    };

    const renderePlants = () => {
        if(my_ePlants !== "No ePlants yet") {
            return(
                <View style={styles.middle}>
                {Object.entries(my_ePlants).map((eplant, i) => (
                    <TouchableOpacity
                    onPress={() => handleSelect(eplant)}
                    key={i}
                    title={"choosePot"}
                    style={styles.border}
                    >
                    <Text style={styles.plantheader}>{eplant[1].ePlantModel.type}</Text>
                    <Image style={styles.plantimage} source={kuva} />

                    </TouchableOpacity>
                ))}
            </View>
            )
        } else {
            return(
                <View style={styles.middle}>
                    <Text>No ePlants yet! Add them first</Text>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.bordertop}>
                <Text style={{width:"14%"}}></Text>
                <Text style={styles.text}>Select ePlant</Text>
                <Icon 
                    name="close" 
                    size={40} 
                    iconStyle={styles.icon}
                    onPress={() => navigate('Home')} 
                />
            </View>
            <View>
                <Text style={styles.top}>Select ePlant</Text>
            </View>
            
        {renderePlants()}

            
            <View style={styles.bottom}>
                <Button
                    icon={{
                        name: "add",
                        size: 25,
                        color: "black"
                    }}
                    title="Lisää uusi ruukku"
                    titleStyle={{marginLeft:15, color:"black"}}
                    buttonStyle={styles.btn}
                    onPress={() =>  navigate("SelectePlantModel")}
                /> 
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 48,
        paddingBottom: 20,
    },
    bordertop: {
        flexDirection:"row",
        justifyContent:"space-between"
    },
    top: {
        fontSize: 36,
        marginTop: 30,
        marginLeft: 20,
    },
    icon: {
        marginTop: "70%",
        marginRight:15,
        color: 'grey',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4,
    },
    border: {
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        backgroundColor: 'white',
        alignContent:"center",
        height: 185,
        width: 170
    },
    plantheader: { 
        textAlign: 'center', 
        fontSize: 16, 
        marginTop: 10, 
        fontWeight: "bold" 
    },
    plantimage: { 
        width: 150, 
        height: 150,
    },
    bottom: {
        justifyContent:"center",
        flexDirection:"row",
        flex:1,
    },
    btn: {
        backgroundColor: "#F0F0F0",
        borderRadius: 4,
        width: 250,
        marginTop:-40
    }
});