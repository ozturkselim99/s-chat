import React from "react";
import {Text, View, Image} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";

const SenderChatItem = (props) => {
    return (
        <View style={{
            padding: 10,
            backgroundColor: brandColors.default,
            alignSelf: "flex-end",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            marginRight: 16,
            marginVertical: 12,
            maxWidth: "80%",
        }}>
            <Text style={{
                fontSize: 14,
                color: neutralColors.white,
                lineHeight: 24,
            }}>
                {props.messages}
            </Text>
            <Text style={{
                textAlign: "right",
                fontSize: 10,
                lineHeight: 16,
                color: neutralColors.white
            }}>
                {props.displayName}
            </Text>
            <Text style={{
                textAlign: "right",
                fontSize: 8,
                lineHeight: 16,
                color: neutralColors.white
            }}>
                {props.time?.toDate().toTimeString()}
            </Text>
        </View>
    )
}
export default SenderChatItem;
