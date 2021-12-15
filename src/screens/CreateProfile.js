import React, {useEffect, useLayoutEffect, useState} from "react";
import {LogBox, Platform, SafeAreaView, TouchableOpacity, View} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {auth, db} from "../../firebase";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

const CreateProfile = ({navigation}) => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Create Profile",
        });
    }, [])
    useEffect(()=>{
        LogBox.ignoreLogs(['Setting a timer']);
    })

    const save = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password).then(authUser => {
                registerForPushNotificationsAsync().then(token => {
                    db.collection("users").doc(authUser.user.uid).set({
                        userId: authUser.user.uid,
                        name: firstName + " " + lastName,
                        status: "available",
                        about: "Merhaba! Ben S-chat kullanıyorum.",
                        profilePicture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                        expoPushToken: token,
                    })
                });
                authUser.user.updateProfile({
                    displayName: firstName + " " + lastName,
                }).then(() => {
                    authUser.user.sendEmailVerification().then(() => {
                        navigation.navigate("VerificationCode")
                    })
                })
            })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white", padding: 24}}>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    backgroundColor: neutralColors.offWhite,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Ionicons name="person" size={48} color={neutralColors.active}/>
                    <TouchableOpacity style={{
                        position: "absolute",
                        right: 3,
                        bottom: 0,
                        width: 24,
                        height: 24,
                        backgroundColor: neutralColors.active,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Ionicons name="add" size={16} color={neutralColors.white}/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <CustomInput width={"100%"} marginTop={24} placeholder={"First name"}
                         onChangeText={(text) => setFirstName(text)}/>
            <CustomInput width={"100%"} marginTop={16} placeholder={"Last name"}
                         onChangeText={(text) => setLastName(text)}/>
            <CustomInput width={"100%"} marginTop={16} placeholder={"Email"} onChangeText={(text) => setEmail(text)}/>
            <CustomInput width={"100%"} marginTop={16} marginBottom={32} placeholder={"Password"} secureTextEntry={true}
                         onChangeText={(text) => setPassword(text)}/>
            <CustomButton
                backgroundColor={brandColors.default}
                title={"Save"}
                titleColor={neutralColors.offWhite}
                onPress={save}
            />
        </SafeAreaView>
    )
}

export default CreateProfile
