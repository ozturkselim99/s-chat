import * as React from 'react';
import {Image,Text,View,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {brandColors, neutralColors} from "../utils/Theme";


const VerificationCode=({navigation})=>{
    return (
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",padding:24}}>

            <Text style={{textAlign:"center",fontWeight:"700",fontSize:24,lineHeight:30,marginTop:80}}>Enter Code</Text>
            <Text style={{textAlign:"center",fontSize:14,lineHeight:24,fontWeight:"400",marginTop:8}}>We have sent you an SMS with the code to +62 1309 - 1710 - 1920</Text>
            <View style={{flexDirection:"row",marginTop:48}}>
                <CustomInput  width={"100%"} />
            </View>
            <View style={{marginTop:"auto"}}>
                <CustomButton
                    backgroundColor={neutralColors.white}
                    title={"Resend"}
                    titleColor={brandColors.default}
                />
                <CustomButton
                    marginTop={12}
                    backgroundColor={brandColors.default}
                    title={"Continue"}
                    titleColor={neutralColors.offWhite}
                    onClicked={()=>navigation.navigate("CreateProfile")}
                />
            </View>


        </SafeAreaView>
    )
}

export default VerificationCode
