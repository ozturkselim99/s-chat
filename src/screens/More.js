import React, {useLayoutEffect} from "react";
import {SafeAreaView, Text, View, TouchableOpacity, Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {brandColors, neutralColors} from "../utils/Theme";
import CustomSearchInput from "../components/CustomSearchInput";

const More=({navigation})=>{
    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",padding:24}}>
            <TouchableOpacity style={{
                flexDirection:"row"
            }}>
                <View style={{
                    borderRadius:50,
                    width:50,
                    height:50,
                    alignItems:"center",
                    justifyContent:"center",
                    backgroundColor:neutralColors.line
                }}>
                    <Image

                        source={require("../assets/icons/profile.png")}
                    />
                </View>
                <View style={{flexDirection:"column",justifyContent:"center",marginLeft:20}}>
                    <Text style={{
                        fontSize:14,
                        color:neutralColors.active,
                        fontWeight:"600",
                        lineHeight:24
                    }}>
                        Almayra Zamzamy
                    </Text>
                    <Text
                        style={{
                            fontSize:12,
                            color:neutralColors.disabled,
                            fontWeight:"normal",
                            lineHeight:20
                        }}
                    >
                        +62 1309 - 1710 - 1920
                    </Text>
                </View>
                <View  style={{
                    alignItems:"center",
                    marginLeft:"auto",
                    justifyContent:"center"
                }}>
                    <Image
                        source={require("../assets/icons/right_arrow.png")}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                paddingVertical:8,
                flexDirection:"row",
                marginTop:16,
                alignItems:"center"
            }}>
                <Image

                    source={require("../assets/icons/appereance.png")}
                />
                <Text style={{
                    fontSize:14,
                    color:neutralColors.active,
                    fontWeight:"600",
                    lineHeight:24,
                    marginLeft:6
                }}>
                   Appereance
                </Text>
                <View  style={{
                    alignItems:"center",
                    marginLeft:"auto",
                    justifyContent:"center"
                }}>
                    <Image
                        source={require("../assets/icons/right_arrow.png")}
                    />
                </View>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default More

