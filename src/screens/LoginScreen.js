import * as React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {brandColors, neutralColors} from "../utils/Theme";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Verification from "./Verification";

const LoginScreen=({navigation})=>{
    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",padding:24}}>

            <View style={{
                alignItems:"center"
            }}>
                <View style={{
                    backgroundColor:brandColors.default,
                    width:150,
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:32,
                    height:150,
                }}>
                    <Text style={{
                        fontWeight:"bold",
                        fontSize:32,
                        color:neutralColors.white
                    }}>
                        S-CHAT
                    </Text>
                </View>
            </View>
            <CustomInput width={"100%"} marginTop={32}/>
            <CustomInput width={"100%"} marginTop={16}/>
            <CustomButton
                marginTop={32}
                backgroundColor={brandColors.default}
                title={"Login"}
                titleColor={neutralColors.offWhite}
            />
            <CustomButton
                backgroundColor={neutralColors.white}
                title={"I forgot my password"}
                titleColor={brandColors.default}
            />
            <View style={{
                marginTop:64,
                flexDirection:"row",
                justifyContent:"center"
            }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate(Verification)
                }}>
                    <Text style={{
                        color:brandColors.default,
                        marginLeft:4
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen
