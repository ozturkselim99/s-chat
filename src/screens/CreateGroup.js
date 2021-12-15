import React, {useEffect, useLayoutEffect, useState} from "react";
import {LogBox, SafeAreaView} from "react-native";
import {auth, db} from "../../firebase";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";
import firebase from "firebase/compat";

const CreateGroup = ({navigation}) => {

    const [input, setInput] = useState("");
    useEffect(()=>{
        LogBox.ignoreLogs(['Setting a timer']);

    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Create a new group",
        })

    }, [])

    const createGroup = async () => {
        try {
            await db.collection("groups").add({
                groupName: input,
                creator: auth.currentUser.displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                creatorUserId: auth.currentUser.uid,
                members: [],
            })
                .then(() => {
                    navigation.goBack()
                })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView
            style={{flex: 1, flexDirection: "column", backgroundColor: "white", paddingTop: 24, paddingHorizontal: 24}}>
            <CustomInput placeholder={"Enter a group name"} onChangeText={(text) => setInput(text)} marginBottom={24}
                         onSubmitEditing={createGroup}/>
            <CustomButton
                disabled={!input.trim() ? true : false}
                onPress={createGroup}
                backgroundColor={brandColors.default}
                title={"Create"}
                titleColor={neutralColors.offWhite}
            />
        </SafeAreaView>
    )
}

export default CreateGroup;
