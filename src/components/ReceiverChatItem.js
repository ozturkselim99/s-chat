import React from "react";
import {Text, View} from "react-native";
import {neutralColors} from "../utils/Theme";

const ReceiverChatItem = (props) => {
    return (
        <View style={{
            padding: 10,
            backgroundColor: neutralColors.white,
            alignSelf: "flex-start",
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            borderBottomRightRadius: 16,
            marginLeft: 16,
            marginVertical: 12,
            maxWidth: "80%",
        }}>
            <Text style={{
                fontSize: 14,
                color: neutralColors.active,
                lineHeight: 24,
            }}>
                {props.messages}
            </Text>
            <Text style={{
                textAlign: "right",
                fontSize: 10,
                lineHeight: 16,
                color: neutralColors.disabled
            }}>
                {props.displayName}
            </Text>
            <Text style={{
                textAlign: "right",
                fontSize: 8,
                lineHeight: 16,
                color: neutralColors.disabled
            }}>
                {props.time.toDate().toTimeString()}
            </Text>
        </View>
    )
}

export default ReceiverChatItem;
