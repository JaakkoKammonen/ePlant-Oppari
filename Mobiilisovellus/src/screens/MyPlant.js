import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import ProgressCircle from 'react-native-progress-circle';
import WaterPump from '../components/WaterpumpControl';
import AutomaticControl from '../components/AutomaticControl';
import { Ionicons } from '@expo/vector-icons';
import Moment from 'moment';

export default function MyPlant(props) {
    const plant = props.navigation.state.params.plant;
    const channelId = plant.ruukkuid;
    const [humidity, setHumidity] = useState(0);
    const [waterLevel, setWaterLevel] = useState(0);
    const { navigate } = props.navigation;

    console.disableYellowBox = true;

    useEffect(() => {
        getData();
    }, []);

    // retrieving sensor statistics from the IoT device
    const getData = () => {
        const url = 'https://thingspeak.com/channels/' + channelId + '/feed.json';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.feeds[99].field1 != null) {
                    setHumidity(responseJson.feeds[99].field1);
                } else {
                    setHumidity('0')
                }
                if (responseJson.feeds[99].field2 != null) {
                    setWaterLevel(responseJson.feeds[99].field2);
                } else {
                    setWaterLevel('0')
                }
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    const barData = {
        labels: ["Test1"],
        data: [[waterLevel * 0.1, (100 - waterLevel * 0.1)]],
        barColors: ["#6896BE", "#E8E7E2"]
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <View>
                    <TouchableOpacity onPress={() => navigate('Home')}>
                        <Ionicons name="md-arrow-round-back" size={30} style={styles.icon}/>
                    </TouchableOpacity>
                    <Text style={styles.plantname}>{plant.nimi}</Text>
                    <Text style={styles.plantheader}>{plant.laji}</Text>
                    <Image style={styles.topimage} source={require('../assets/smile.png')} />
                </View>
                <View>
                    <Image style={styles.topimage2} source={require('../assets/flowerpot.png')} />
                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.date}>
                    <Text style={styles.datetext1}>{Moment(plant.paivays).format('D.M.Y')}</Text>
                    <AutomaticControl apikey={plant.ruukkukey}/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", alignContent: "center" }}>
                    <View style={styles.humidity}>
                        <Text style={styles.humiditytext}>Mullan kosteus</Text>
                        <ProgressCircle
                            percent={(humidity / 2500 * 100).toFixed(0)}
                            radius={50}
                            borderWidth={4}
                            color="#63816D"
                            shadowColor="#E8E7E2"
                            bgColor="#fff"
                            outerCircleStyle={{ marginTop: 15, marginBottom: 15 }}

                        >
                            <Text style={styles.humiditytext2}>{(humidity / 2500 * 100).toFixed(0)}%</Text>
                        </ProgressCircle>
                        <Text style={styles.humiditytext3}>Seuraava kastelu</Text>
                        <Text style={styles.humiditytext4}>0.5 päivän kuluttua</Text>
                    </View>
                    <View>
                        <Text style={styles.waterlevel}>Vesitaso</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.waterlevel2}>{(waterLevel * 0.1).toFixed(0)}%</Text>
                            <StackedBarChart

                                data={barData}
                                width={100}
                                height={200}
                                withHorizontalLabels={true}
                                withVerticalLabels={true}
                                hideLegend={true}
                                chartConfig={{
                                    backgroundGradientFrom: '#FFFFFF',
                                    backgroundGradientTo: '#FFFFFF',
                                    color: (opacity = 0) => `rgb(255, 255, 255, ${opacity})`

                                }}

                            />
                        </View>

                    </View>
                </View>
                <View>
                    <WaterPump apikey={plant.ruukkukey}/>
                </View>
                <View style={styles.bottomheader}>
                    <Text style={styles.header}>Viimeisimmät tapahtumat</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Notifications')}
                    >
                        <Text style={styles.showmore}>Näytä lisää</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    {/*<FlatList data={plant}
                        marginLeft={15}
                        renderItem={({ item }) =>
                            <View style={styles.bottomitem}>
                                <View>
                                    <View style={styles.circle} />
                                </View>
                                <View style={styles.bottomtext}>
                                    <Text style={styles.bottomtext1}>Tänään klo 8.20</Text>
                                    <Text style={styles.bottomtext2}>{item} kasteltu.</Text>
                                </View>
                            </View>

                        }
                    />*/}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E8E7E2',
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        marginTop:15
    },
    plantname: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 30
    },
    plantheader: {
        fontSize: 16,
        color: '#63816D',
        marginLeft: 30,
        marginTop: 5,
        fontWeight: '600',
        fontStyle: 'italic'
    },
    topimage: {
        width: 50,
        height: 50,
        marginLeft: 30,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 100
    },
    topimage2: {
        width: 250,
        height: 250,
        marginLeft: 20
    },
    container2: {
        flex: 2,
        backgroundColor: 'white',
        height: 600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    date: {
        flexDirection: 'row',
        justifyContent:"space-between",
        marginTop: 15,
        marginBottom: 15
    },
    datetext1: {
        fontSize: 12,
        color: '#63816D',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    humidity: {
        borderRightColor: 'lightgrey',
        borderRightWidth: 1
    },
    humiditytext: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
        marginRight: 50
    },
    humiditytext2: {
        fontSize: 22,
        color: '#63816D'
    },
    humiditytext3: {
        fontSize: 14,
        color: '#63816D',
        fontWeight: '600'
    },
    humiditytext4: {
        fontSize: 12,
        color: '#555555',
        marginLeft: 5
    },
    waterlevel: {
        fontSize: 16,
        marginLeft: 40,
        marginTop: 20,
        fontWeight: 'bold'
    },
    waterlevel2: {
        color: '#51799B',
        fontSize: 14,
        marginLeft: 30,
        marginTop: 145,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 5
    },
    bottomheader: {
        flexDirection: 'row',
        justifyContent:"space-between",
        marginLeft: 10,
        marginTop: 50
    },
    showmore: {
        color: '#63816D',
        fontSize: 12,
        marginRight:15,
        fontWeight: 'bold'
    },
    bottom: {
        marginLeft: 10,
        flex: 2,
        fontWeight: 'bold',
        fontSize: 14,
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10

    },
    bottomimage: {
        width: 30,
        height: 30,
        borderRadius: 40
    },
    bottomtext: {
        marginLeft: 10,
        marginBottom: 10,
        flex: 2
    },
    bottomtext1: {
        marginLeft: 5,
        fontSize: 12,
        color: "#ACACAC",
        fontWeight: "bold"
    },
    bottomtext2: {
        marginLeft: 5,
        fontSize: 16
    },  
    icon: {
        marginLeft: 30,
        marginTop: "40%",
        color: 'grey'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100/2,
        backgroundColor: '#eaaf7e'
    },

});
