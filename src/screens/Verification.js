import * as React from 'react';
import {Image,Text,View,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";
import {useEffect, useLayoutEffect, useState} from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {auth} from "../../firebase";

const Verification=({navigation})=>{

    const [email, setEmail] = useState("");
    const signInWithEmail=async ()=>{
        const userCredential= auth.createUserWithEmailAndPassword(email,"123456").then(()=>{
        }).catch(error => alert(error.message))
    }
    useEffect(()=>{

    },[email])

    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",padding:24}}>
                <Text style={{textAlign:"center",fontWeight:"700",fontSize:24,lineHeight:30,marginTop:80}}>Enter Your Email</Text>
            {/*                 <Text style={{textAlign:"center",fontSize:14,lineHeight:24,fontWeight:"400",marginTop:8}}>Please confirm your country code and enter your phone number</Text>
*/}

            <View style={{flexDirection:"row",marginTop:48}}>
                <CustomInput  width={"100%"} onChangeText={(text) => setEmail(text)} />
            </View>



            <CustomButton
                    marginTop={"auto"}
                    backgroundColor={brandColors.default}
                    title={"Continue"}
                    titleColor={neutralColors.offWhite}
                    onClicked={signInWithEmail}
                />
            {/*()=>navigation.navigate("VerificationCode")*/}

        </SafeAreaView>
    )
}

export default Verification
