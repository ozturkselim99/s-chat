import React, {useRef} from "react";
import {TextInput,View,TouchableOpacity,Button} from "react-native";
import {neutralColors} from "../utils/Theme";
import Icon from "react-native-vector-icons/FontAwesome"

const CustomSearchInput = (props) => {
    const inputRef=useRef()
    return(
        <View style={{
            flexDirection:"row",
            position:"relative"
        }}>
            <TextInput ref={inputRef}  clearButtonMode="always" placeholder="Search" placeholderTextColor={neutralColors.disabled} style={{
                backgroundColor:neutralColors.offWhite,
                paddingVertical:6,
                paddingRight:8,
                fontSize:14,
                paddingLeft:48,
                width:280,
                height:36,
                color:neutralColors.active,
                borderRadius:4,
                    ...props
            }}></TextInput>
            <TouchableOpacity
                onPress={()=>{
                    inputRef.current?.focus()
                }}
                style={{
                    left:16,
                    top:6,
                    position:"absolute"
                }}>
                <Icon name={"search"}
                      type="antdesign"
                      size={24}
                      color={neutralColors.disabled}
                />
            </TouchableOpacity>
        </View>
    )

}
export default CustomSearchInput

