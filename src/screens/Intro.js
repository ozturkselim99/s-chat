import * as React from 'react';
import {Image, LogBox, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";
import {useEffect} from "react";

const Intro = ({navigation}) => {
    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "white",
            paddingHorizontal: 24,
            paddingVertical: 16
        }}>
            <StatusBar style="dark"/>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Image
                    source={require('../assets/Intro.png')}
                />
            </View>
            <Text style={{
                fontSize: 24,
                textAlign: "center",
                fontWeight: "700",
                lineHeight: 30,
                marginTop: 42
            }}>Connect easily with your family and friends over countries</Text>
            <View style={{marginTop: "auto"}}>
                <CustomButton
                    backgroundColor={brandColors.default}
                    title={"Start Messaging"}
                    titleColor={neutralColors.offWhite}
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
        </SafeAreaView>
    )
}

export default Intro
