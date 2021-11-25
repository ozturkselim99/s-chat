import React, {useLayoutEffect, useState} from "react";
import {SafeAreaView} from "react-native";
import {db} from "../../firebase";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";

const CreateGroup = ({navigation}) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Create a new group",
        })

    }, [])

    const createGroup = () => {
        db.collection("groups").add({
            groupName: input,
            members: [],
        })
            .then(() => {
                navigation.goBack()
            })
            .catch(error => alert(error))
    }

    return (
        <SafeAreaView
            style={{flex: 1, flexDirection: "column", backgroundColor: "white", paddingTop: 24, paddingHorizontal: 24}}>
            <CustomInput placeholder={"Enter a group name"} onChangeText={(text) => setInput(text)}
                         onSubmitEditing={createGroup}/>
            <CustomButton
                disabled={!input}
                onClicked={createGroup}
                marginTop={24}
                backgroundColor={brandColors.default}
                title={"Create"}
                titleColor={neutralColors.offWhite}
            />
        </SafeAreaView>
    )
}

export default CreateGroup;
