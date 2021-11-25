import * as React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {brandColors, neutralColors} from "../utils/Theme";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CreateProfile from "./CreateProfile";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
            console.log(authUser)
        });
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate("Home")
        }).catch(error => alert(error))
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white", padding: 24}}>
            <View style={{
                alignItems: "center"
            }}>
                <View style={{
                    backgroundColor: brandColors.default,
                    width: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 32,
                    height: 150,
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 32,
                        color: neutralColors.white
                    }}>
                        S-CHAT
                    </Text>
                </View>
            </View>
            <CustomInput width={"100%"} marginTop={32} placeholder={"Email"} onChangeText={(text) => setEmail(text)}/>
            <CustomInput width={"100%"} marginTop={16} placeholder={"Password"}
                         onChangeText={(text) => setPassword(text)}/>
            <CustomButton
                marginTop={32}
                backgroundColor={brandColors.default}
                title={"Login"}
                titleColor={neutralColors.offWhite}
                onClicked={signIn}
            />
            <CustomButton
                backgroundColor={neutralColors.white}
                title={"I forgot my password"}
                titleColor={brandColors.default}
            />
            <View style={{
                marginTop: 64,
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(CreateProfile)
                }}>
                    <Text style={{
                        color: brandColors.default,
                        marginLeft: 4
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
