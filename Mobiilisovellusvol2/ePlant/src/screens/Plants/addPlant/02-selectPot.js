import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import Carousel from 'react-native-snap-carousel';

export default function SelectPot(props) {

    // tyylit käyty läpi -> järjestelty, uudelleen nimetty & poistettu ne, joita ei käytetä  //

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
                navigate('Home', {showSnackbar: true, plantName: "You can not add two plants in the same pot!"})
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
                navigate('Home', {showSnackbar: true, plantName: "You can not add two plants in the same pot!"})
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
         
            console.log(Object.entries(my_ePlants))
            return(
                <View style={styles.middle}>
                    <Carousel
                    sliderWidth={400}
                    itemWidth={210}
                    enableSnap={false}
                    horizontal={true}
                    layout={'default'}
                    layoutCardOffset={18}
                    data={Object.entries(my_ePlants)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                   
                    <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    title={"choosePot"}
                    style={styles.border}
                    >
                    <Image style={styles.plantimage} source={require("../../../assets/pot_test.png")} />
                    <View style={styles.text_container}>
                    <Text style={styles.plantheader}>{item[1].ePlantModel.type}: <Text style={styles.potname}>{item[1].ePlantName}</Text></Text>  
                    </View>
                </TouchableOpacity>
                
                }

                />
            </View>
            )
        } else {
            return(
                <View style={styles.middle}>
                    <Text style={styles.noeplants}>No ePlants yet! Add them first</Text>
                </View>
            )
        }
    }
    return (
        <ScrollView style={styles.container}>
         <TouchableOpacity onPress={() => navigate("SelectPlant")}>
                <Ionicons name="arrow-back-outline" size={30} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.top}>Select a pot for your plant</Text>
                <Text style={styles.note}>You can not add two plants in the same pot</Text>
            
        {renderePlants()}

            <View style={styles.bottom}>
                <Button
                    title="Add a new pot"
                    buttonStyle={styles.btn}
                    onPress={() =>  navigate("SelectePlantModel")}
                /> 
            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4,
        marginTop: 60
    },
    text_container:{
        position: "absolute",
        width: 200,
        height: 26,
        marginLeft: 10,
        bottom: 0,
        borderBottomLeftRadius : 4,
        borderBottomRightRadius: 4,
    },
    plantheader: { 
        textAlign: 'center',
        fontSize: 16,
        marginTop: 3,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.3)",
        bottom: 0,
        fontWeight: 'normal'
    },
    potname: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 3,
        color: "white",
        bottom: 0,
        fontWeight: 'normal'
    },
    plantimage: { 
        width: 200, 
        height: 200,
        borderRadius: 6,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 20,
    },
    noeplants: {
        fontSize: 14,
        fontWeight: 'normal',
        marginLeft: 10,
        marginBottom: 15
    },
    container: {
        flex: 2,
        padding: 3,
        marginBottom: 10
    },
    arrow: {
        marginLeft: 20,
        marginTop: 10,
        color: 'grey'
      },
    bordertop: {
        flexDirection:"row",
        justifyContent:"space-between"
    },
    text_top: {
        width:"14%"
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 48,
        paddingBottom: 20,
    },
    icon: {
        marginTop: "70%",
        marginRight:15,
        color: 'grey',
    },
    top: {
        fontSize: 22,
        marginTop: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#63816D',
        alignSelf: 'center'
    },
    note: {
        fontSize: 14,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign:"center",
        fontWeight: "italic",
        color: "#63816D",
        marginBottom: 20
    },
    note2: {
        fontSize: 14,
        textAlign:"center",
        fontWeight: "italic",
        color: "#63816D",
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
        marginTop: 30
    },
    bottom: {
        justifyContent: "center",
        flexDirection: "row",
    },
    btn: {
        backgroundColor: "#63816D",
        borderRadius: 3,
        marginRight: 3,
        marginTop: 15,
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    }
});