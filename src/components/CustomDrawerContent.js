import React from "react";
import {SafeAreaView, Text, View, TouchableOpacity, Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {neutralColors} from "../utils/Theme";
import {auth} from "../../firebase";

const CustomDrawerContent=({navigation})=>{

    const logOut = () => {
        alert("See you again")
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }
    return (
    <SafeAreaView style={{flex: 1, flexDirection: "column",padding:16}}>
        <View style={{
                marginTop:16,
                flexDirection: "row",
            }}>
                <View style={{
                    borderRadius: 50,
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: neutralColors.line
                }}>
                    <Image

                        source={require("../assets/icons/profile.png")}
                    />
                </View>
                <View style={{flexDirection: "column", justifyContent: "center", marginLeft: 20}}>
                    <Text style={{
                        fontSize: 14,
                        color: neutralColors.active,
                        fontWeight: "600",
                        lineHeight: 24
                    }}>
                        {auth.currentUser.displayName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: neutralColors.disabled,
                            fontWeight: "normal",
                            lineHeight: 20
                        }}
                    >
                        {auth.currentUser.email}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={logOut}
                              style={{
                                  paddingVertical: 8,
                                  flexDirection: "row",
                                  marginTop: 16,
                                  alignItems: "center"
                              }}>
                <Ionicons name="log-out" size={24} color={neutralColors.active}/>
                <Text style={{
                    fontSize: 14,
                    color: neutralColors.active,
                    fontWeight: "600",
                    lineHeight: 24,
                    marginLeft: 6
                }}>
                    Logout
                </Text>
                <View style={{
                    alignItems: "center",
                    marginLeft: "auto",
                    justifyContent: "center"
                }}>
                    <Image
                        source={require("../assets/icons/right_arrow.png")}
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default CustomDrawerContent
