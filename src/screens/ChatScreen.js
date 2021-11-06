import React, {useLayoutEffect} from "react";
import {FlatList,ScrollView,SafeAreaView, Text, TouchableOpacity,View,Image} from "react-native";
import CustomSearchInput from "../components/CustomSearchInput";
import {brandColors, neutralColors} from "../utils/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";
import ReceiverChatItem from "../components/ReceiverChatItem";
import SenderChatItem from "../components/SenderChatItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";

const ChatScreen=({navigation,route})=>{
        useLayoutEffect(()=>{
                navigation.setOptions({
                        headerTitle:()=>(
                            <View style={{
                                    flexDirection:"row",
                                    alignItems:"center"
                            }}>
                                    <Image
                                        style={{
                                                width:40,
                                                height:40,
                                                borderRadius:50
                                        }}
                                        source={{uri: route.params.imageURL}} />

                                    <Text style={{
                                            color:neutralColors.active,
                                            marginLeft:16,
                                            fontSize:18,
                                            fontWeight:"600"
                                    }}>{route.params.chatName}</Text>
                            </View>
                        ),
                    headerRight:()=>(
                        <View style={{
                            flexDirection:"row",
                            alignItems:"center"
                        }}>
                            <TouchableOpacity style={{
                                marginRight:16,
                            }}>
                                <Image
                                    source={require("../assets/icons/search.png")}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    source={require("../assets/icons/more_vertical.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })

        },[])
    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:neutralColors.offWhite}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
              <ReceiverChatItem/>
              <SenderChatItem/>
            </ScrollView>
                <View style={{
                        flexDirection:"row",
                        marginTop:"auto",
                        width:"100%",
                        paddingRight:30,
                        paddingLeft:16,
                    paddingVertical:10,
                        alignItems:"center",
                        backgroundColor:"white",
                        shadowRadius: 2,
                        shadowOffset: {
                                width: 0,
                                height: -3,
                        },
                        shadowColor: '#000000',
                        elevation: 4,

                }}>

                        <CustomInput height={36} flex={1} marginRight={12} padding={8}/>
                        <TouchableOpacity  activeOpacity={0.5} >
                                <Ionicons name="send" size={24} color={brandColors.default}/>
                        </TouchableOpacity>
                </View>
        </SafeAreaView>
    )

}

export default ChatScreen;
