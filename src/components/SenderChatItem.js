import React from "react";
import {Text,View,Image} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";


const SenderChatItem=()=>{
    return(
        <View style={{
            padding: 10,
            backgroundColor: neutralColors.white,
            alignSelf: "flex-start",
            borderTopRightRadius:16,
            borderTopLeftRadius:16,
            borderBottomRightRadius:16,
            marginLeft: 16,
            marginVertical: 12,
            maxWidth: "80%",
        }}>
            <Text style={{
                fontSize:14,
                color:neutralColors.active,
                lineHeight:24,
            }}>
                Good morning, did you sleep well?
            </Text>
            <Text style={{
                textAlign:"right",
                fontSize:10,
                lineHeight:16,
                color:neutralColors.disabled
            }}>
                9.45
            </Text>
        </View>
    )
}

export default SenderChatItem;
