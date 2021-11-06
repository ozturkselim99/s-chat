import React, {useLayoutEffect} from "react";
import {SafeAreaView, Text,View,TouchableOpacity} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const CreateProfile=({navigation})=>{

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Your More",
        });
    },[])
    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",padding:24}}>

            <View style={{alignItems:"center"}}>
                    <TouchableOpacity style={{ marginTop:24,position:"relative",width:100,height:100, backgroundColor:neutralColors.offWhite,borderRadius:50,alignItems:"center",justifyContent:"center"}}>
                        <Ionicons name="person" size={48} color={neutralColors.active}/>
                        <TouchableOpacity style={{position:"absolute", right:3,bottom:0,width:24,height:24, backgroundColor:neutralColors.active,borderRadius:50,alignItems:"center",justifyContent:"center"}}>
                            <Ionicons name="add" size={16} color={neutralColors.white}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
            </View>

            <CustomInput width={"100%"} marginTop={24}/>
            <CustomInput width={"100%"} marginTop={16}/>
            <CustomInput width={"100%"} marginTop={16}/>
            <CustomInput width={"100%"} marginTop={16}/>
            <CustomButton
                marginTop={"auto"}
                backgroundColor={brandColors.default}
                title={"Save"}
                titleColor={neutralColors.offWhite}
                onClicked={()=>navigation.navigate("Home")}
            />
        </SafeAreaView>
    )
}

export default CreateProfile
