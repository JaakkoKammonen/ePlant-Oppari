import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, ListItem, Icon, Button } from 'react-native-elements';

export default function Settings() {

    console.disableYellowBox = true;

    // list of listitems headers and icons to make list rendering cleaner
    const listItems = [
        {
            title: 'Ruukut',
            icon: 'local-drink'
        },
        {
            title: 'Turvallisuus',
            icon: 'security'
        },
        {
            title: 'Ilmoitukset',
            icon: 'notifications'
        },
        {
            title: 'Tietoja',
            icon: 'info'
        },
      ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Asetukset</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.profilecontainer}>
                    <View>
                        <Avatar
                            size="large"
                            rounded title="PP"
                            overlayContainerStyle={{
                                backgroundColor: '#63816D'
                            }}
                        />
                    </View>
                    <View style={styles.profileinfo}>
                        <Text style={{fontSize: 25, marginBottom: 5}}>Petra</Text>
                        <Text style={{fontStyle: 'italic', color: '#63816D'}}>@pedrrro123</Text>
                    </View>
                </View>

                {listItems.map((item, i) => (
                    <ListItem
                        onPress={() => alert('En tee vielä mitään')}
                        key={i}
                        title={item.title}
                        leftIcon={<Icon
                                name={item.icon}
                                color='#555555'
                                />}
                        chevron
                        containerStyle={{
                            backgroundColor: '#FCFCFC'
                        }}
                    />
                ))}
            </View>

            <Button 
                title='Kirjaudu ulos' 
                type='clear' 
                titleStyle={{ color: '#63816D' }} 
                buttonStyle={styles.logout}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,
        flexDirection: 'column'
    },
    profilecontainer: {
        padding: 20,
        borderBottomColor: '#DEDDDD', 
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 120,
        alignItems: 'center'
    },
    content: {
        flex: 1,
    },
    logout: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    profileinfo: {
        marginLeft: 20,
        flex: 2
    },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 48,
        marginBottom: 20,
    },
    header: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset:{
            height: 2,
            width: 2
        },
        elevation:4,
        backgroundColor: '#FAFAFA'
    },
});