import React from "react";
import {Text, TouchableOpacity} from "react-native";

const CustomButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onClicked}
            style={{
                flexDirection: "row",
                backgroundColor: props.backgroundColor,
                justifyContent: "center",
                borderWidth: props.borderWidth,
                borderColor: props.borderColor,
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 48,
                borderRadius: 30,
                ...props
            }}>
            <Text style={{
                fontSize: 16,
                fontStyle: "normal",
                color: props.titleColor
            }}>{props.title}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton

