import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

//Identisk med ScreenOne

/*ScreenTwo er den ene af de tre screens i StackNavigatoren
ScreenTwoPræsenterer en tekst, der beskriver, hvor brugern befinder sig samt returnerer to <Button/> som benyttes til henholdsvis at navigere tilbage til sidste Screen og navigere ind til den anden screen i stackComponents
Slutteligt er der inkludere stylig til komponenterne
 */
function ScreenTwo({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Start ny plan!</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                <View style={{margin: '2%'}} >
                    <Button title="Tilbage" onPress={() => navigation.goBack() } />
                </View>
                <View style={{margin: '2%'}} >
                    <Button title="Rediger" onPress={() => navigation.navigate('ScreenOne')}  />
                </View>
            </View>
        </View>
    );
}
export default ScreenTwo

//Styling til brug i ScreenTwo
const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'Top',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});