import React from "react";
import {Text,View,Image} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";


const ReceiverChatItem=()=>{
    return(
       <View style={{
           padding: 10,
           backgroundColor: brandColors.default,
           alignSelf: "flex-end",
          borderTopRightRadius:16,
          borderTopLeftRadius:16,
          borderBottomLeftRadius:16,
           marginRight: 16,
           marginVertical: 12,
           maxWidth: "80%",
       }}>
               <Text style={{
                   fontSize:14,
                   color:neutralColors.white,
                   lineHeight:24,
               }}>
                   K, I'm on my way
               </Text>
               <Text style={{
                   textAlign:"right",
                   fontSize:10,
                   lineHeight:16,
                   color:neutralColors.white
               }}>
                   16.50
               </Text>
       </View>
    )
}

export default ReceiverChatItem;
