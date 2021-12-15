import * as React from 'react';
import {LogBox, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";
import {auth} from "../../firebase";
import {useEffect} from "react";

const VerificationCode = ({navigation}) => {
    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
    }, [])
    const isEmailVerified = () => {
        auth.currentUser.reload().then(() => {
            auth.currentUser.emailVerified ? navigation.navigate("Home") : alert("Email not verified")
        })
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white", padding: 24}}>
            <Text style={{textAlign: "center", fontWeight: "700", fontSize: 24, lineHeight: 30, marginTop: 80}}>Verify
                Link</Text>
            <Text style={{textAlign: "center", fontSize: 14, lineHeight: 24, fontWeight: "400", marginTop: 8}}>We have
                sent you an Email with the link to {auth.currentUser.email}</Text>
            <View style={{marginTop: "auto"}}>
                <CustomButton
                    backgroundColor={neutralColors.white}
                    title={"Resend"}
                    titleColor={brandColors.default}
                />
                <CustomButton
                    marginTop={12}
                    backgroundColor={brandColors.default}
                    title={"Continue"}
                    titleColor={neutralColors.offWhite}
                    onPress={isEmailVerified}
                />
            </View>
        </SafeAreaView>
    )
}

export default VerificationCode
