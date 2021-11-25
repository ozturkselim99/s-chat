import React, {useEffect, useLayoutEffect, useState} from "react";
import {SafeAreaView, View, TouchableOpacity} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {auth, db} from "../../firebase";

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

    useEffect(() => {
        console.log(firstName)
    })

    const save = () => {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            db.collection("users").doc(authUser.user.uid).set({
                userId: authUser.user.uid,
                name: firstName + " " + lastName,
                status: "available",
                about: "Merhaba! Ben S-chat kullanıyorum.",
                profilePicture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            })
            {/*TODO*/
            }
            authUser.user.updateProfile({
                displayName: firstName + " " + lastName,
            }).then(() => {
                authUser.user.sendEmailVerification().then(() => {
                    navigation.navigate("VerificationCode")
                })
            })
        }).catch(error => alert(error.message))
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
            <CustomInput width={"100%"} marginTop={16} placeholder={"Password"}
                         onChangeText={(text) => setPassword(text)}/>
            <CustomButton
                marginTop={"auto"}
                backgroundColor={brandColors.default}
                title={"Save"}
                titleColor={neutralColors.offWhite}
                onClicked={save}
            />
        </SafeAreaView>
    )
}

export default CreateProfile
