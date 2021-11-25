import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";

const Intro = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white", padding: 24}}>
            <StatusBar style="dark"/>
            <View style={{alignItems: "center", justifyContent: "center", marginTop: 45}}>
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
                <Text style={{textAlign: "center"}}>Terms & Privacy Policy</Text>
                <CustomButton
                    marginTop={18}
                    backgroundColor={brandColors.default}
                    title={"Start Messaging"}
                    titleColor={neutralColors.offWhite}
                    onClicked={() => navigation.navigate("Login")}
                />
            </View>
        </SafeAreaView>
    )
}

export default Intro
