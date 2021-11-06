import React, {useEffect} from "react";
import {View, Text, Image,TouchableOpacity} from "react-native";
import {accentColors,neutralColors} from "../utils/Theme";

const CustomContactItem=(props)=>{
    return(
        <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> props.enterChat(props.title,props.imageURL)} >
            <View style={{position:"relative"}}>
                <Image
                    source={{uri:props.imageURL}}
                    style={{
                        width:48,
                        height:48,
                        borderRadius:16
                    }}
                />
                <View style={
                    {
                        width:14,
                        height:14,
                        backgroundColor:props.status==="available"?accentColors.success:accentColors.danger,
                        position:"absolute",
                        borderRadius:50,
                        borderWidth:2,
                        borderColor:props.status&&neutralColors.white,
                        right:0,
                        top:0
                    }
                }/>
            </View>
            <View style={{flexDirection:"column",flex:1,marginLeft:16,justifyContent:"center"}}>
                <Text style={{fontSize:14,fontWeight:"600",lineHeight:24,color:neutralColors.active}}>{props.title}</Text>
                <Text style={{fontSize:12,fontWeight:"600",lineHeight:20,color:neutralColors.disabled}}>{props.description} </Text>
            </View>
        </TouchableOpacity>

    )

}
export default CustomContactItem
