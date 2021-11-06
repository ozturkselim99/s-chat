import React, {useLayoutEffect} from "react";
import {SafeAreaView, Text,View,TouchableOpacity,FlatList,Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {brandColors, neutralColors} from "../utils/Theme";
import CustomSearchInput from "../components/CustomSearchInput";
import CustomContactItem from "../components/CustomContactItem";

const mockData=[
    {
        status:"available",
        title:"Ahmet Selim Öztürk",
        description:"Last seen yesterday",
        imageURL:"https://media-exp1.licdn.com/dms/image/C4D03AQG6F_mnwOLgsA/profile-displayphoto-shrink_100_100/0/1613045496372?e=1640822400&v=beta&t=uKv2UtLpos4lD6diekNVUf0xkCFv6HizEv3WrB7nBWE"
    },
    {
        status:"busy",
        title:"Berkay Özdağ",
        description:"Online",
        imageURL:"https://instagram.fesb7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/127662543_434483450886208_4391561150855335233_n.jpg?_nc_ht=instagram.fesb7-1.fna.fbcdn.net&_nc_ohc=ut-LSpE6094AX9A5glg&edm=ABfd0MgBAAAA&ccb=7-4&oh=d42597ef9bd48e9155c6b54f654a73ca&oe=618BD9F5&_nc_sid=7bff83"
    },
    {
        status:"offline",
        title:"Furkan Ergün",
        description:"Last seen 3 hours ago",
        imageURL:"https://instagram.fesb7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/248408154_170834935236110_7199574292483547252_n.jpg?_nc_ht=instagram.fesb7-1.fna.fbcdn.net&_nc_ohc=iZC8Pl-8yAQAX-tbUpM&edm=ABfd0MgBAAAA&ccb=7-4&oh=5bfb8572307e955b4595d2ee6a513bb5&oe=618BB007&_nc_sid=7bff83"
    },
]

const Contacts=({navigation})=>{
    const enterChat=(chatName,imageURL)=>{
        navigation.navigate("ChatScreen",{
            chatName,
            imageURL
        })
    }
    const renderItem = ({ item }) => (
        <CustomContactItem enterChat={enterChat} title={item.title} description={item.description} imageURL={item.imageURL} status={item.status} />
    );
    const itemSeparator = () => (
        <View style={{height:1,width:"100%",backgroundColor:neutralColors.line,marginVertical:12}} />
    );


    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Contacts",
            headerRight:()=>(
                    <TouchableOpacity style={{marginRight:16}}>
                        <Image
                            source={require('../assets/icons/add.png')}
                        />
                    </TouchableOpacity>
            )
        })
    },[navigation])
    return(
        <SafeAreaView style={{flex:1, flexDirection:"column",backgroundColor:"white",paddingTop:24,paddingHorizontal:24}}>
            <CustomSearchInput width={"100%"}/>
            <FlatList
                style={{marginTop:16}}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={itemSeparator}
                data={mockData}
                renderItem={renderItem}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Contacts;
