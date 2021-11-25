import React from "react";
import {TextInput, View, StyleSheet} from "react-native";
import {neutralColors} from "../utils/Theme";

const CustomInput = (props) => {
    return (
        <View style={{
            flexDirection: "row",
            position: "relative"
        }}>
            <TextInput clearButtonMode="always" placeholderTextColor={neutralColors.disabled} {...props}
                       style={styles.textInput}/>
        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
        backgroundColor: neutralColors.offWhite,
        paddingVertical: 6,
        paddingRight: 8,
        fontSize: 14,
        paddingLeft: 8,
        width: "100%",
        height: 36,
        color: neutralColors.active,
        borderRadius: 4,
    }
})
export default CustomInput

