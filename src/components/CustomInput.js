import React from "react";
import {TextInput,View} from "react-native";
import {neutralColors} from "../utils/Theme";

const CustomInput = (props) => {
    return(
        <View style={{
            flexDirection:"row",
            position:"relative"
        }}>
            <TextInput clearButtonMode="always"  placeholderTextColor={neutralColors.disabled} {...props} style={{
                backgroundColor:neutralColors.offWhite,
                paddingVertical:6,
                paddingRight:8,
                fontSize:14,
                paddingLeft:8,
                width:280,
                height:36,
                color:neutralColors.active,
                borderRadius:4,
                ...props
            }}></TextInput>
        </View>
    )

}
export default CustomInput

