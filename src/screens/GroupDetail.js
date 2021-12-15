import React, {useEffect, useLayoutEffect, useState} from "react";
import {Alert, FlatList, Image, LogBox, SafeAreaView, Switch, Text, TouchableOpacity, View} from "react-native";
import {accentColors, brandColors, neutralColors} from "../utils/Theme";
import {StatusBar} from "expo-status-bar";
import CustomMemberItem from "../components/CustomMemberItem";
import Icon from "react-native-vector-icons/Ionicons";
import {auth, db} from "../../firebase";

const GroupDetail = ({navigation, route}) => {

    const {members, groupName, creator, createdAt, creatorUserId, groupId} = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerStyle: {
                backgroundColor: brandColors.dark
            },
            headerTintColor: "white"
        });
    }, [])
    useEffect(()=>{
        LogBox.ignoreLogs(['Setting a timer']);
    })

    const deleteGroup = () => {
        Alert.alert(
            "Grubu sil",
            "Grubu silmek istediğinizden emin misiniz ?",
            [
                {
                    text: "Hayır",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Evet", onPress: async () => {
                        try {
                            await db.collection("groups")
                                .doc(groupId)
                                .delete()
                                .then(() => {
                                    navigation.navigate("Groups")
                                });
                        } catch (err) {
                            console.log(err)
                        }

                    }
                }
            ]
        )

    }

    const renderItem = ({item}) => (
        <CustomMemberItem id={item.member.userId} name={item.member.name} status={item.member.status}
                          imageURL={item.member.imageURL}/>
    );

    const itemSeparator = () => (
        <View style={{height: 1, width: "100%", backgroundColor: neutralColors.line, marginVertical: 12}}/>
    );

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white"}}>
            <StatusBar style="light"/>
            <View style={{flexDirection: "row", alignItems: "center", backgroundColor: brandColors.dark, padding: 16}}>
                <Image
                    source={{uri: "https://www.clipartmax.com/png/middle/157-1570300_placeholder-image-symbol-for-friendship-group.png"}}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 50
                    }}
                />
                <View style={{flexDirection: "column", flex: 1, marginLeft: 16}}>
                    <View style={{
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            color: neutralColors.white,
                            fontSize: 18,
                        }}>{groupName}</Text>
                        {creatorUserId == auth.currentUser.uid && (
                            <TouchableOpacity onPress={deleteGroup} style={{
                                borderRadius: 50,
                                backgroundColor: accentColors.danger,
                                width: 25,
                                height: 25,
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "auto"
                            }}>
                                <Icon
                                    name="trash"
                                    color={neutralColors.white}
                                    size={16}
                                />
                            </TouchableOpacity>)}
                    </View>

                    <Text style={{
                        fontSize: 12,
                        color: neutralColors.disabled
                    }}>{members.length} members</Text>
                    <Text style={{
                        fontSize: 12,
                        color: neutralColors.disabled
                    }}>Created by {creator} on {createdAt.toDate().toDateString()}</Text>
                </View>
            </View>
            <View style={{paddingHorizontal: 24, paddingTop: 8, flex: 1}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View>
                        <Text
                            style={{
                                color: neutralColors.active,
                                fontSize: 16,
                            }}
                        >Notifications</Text>
                        <Text
                            style={{
                                color: neutralColors.disabled,
                                fontSize: 12,
                            }}
                        >{isEnabled ? "On" : "Off"}</Text>
                    </View>
                    <Switch
                        style={{marginLeft: "auto"}}
                        trackColor={{false: "#767577", true: brandColors.darkMode}}
                        thumbColor={isEnabled ? brandColors.dark : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{height: 2, width: "100%", backgroundColor: neutralColors.line, marginVertical: 12}}/>
                <Text style={{
                    color: neutralColors.active,
                    fontSize: 16,
                }}>Members</Text>
                <FlatList
                    style={{marginTop: 16}}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={itemSeparator}
                    data={members}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

export default GroupDetail
