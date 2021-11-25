import React from "react";
import {View, Text, Image} from "react-native";
import {neutralColors} from "../utils/Theme";

const CustomMemberItem = (props) => {
    return (
        <View style={{
            flexDirection: "row",
            flex: 1,
        }}>
            <Image
                source={{uri: props.imageURL}}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16
                }}
            />
            <View style={{flexDirection: "column", flex: 1, marginLeft: 8, justifyContent: "center"}}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "600",
                    lineHeight: 24,
                    color: neutralColors.active
                }}>{props.name}</Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: "600",
                    lineHeight: 20,
                    color: neutralColors.disabled
                }}>{props.status} </Text>
            </View>
        </View>
    )
}
export default CustomMemberItem
