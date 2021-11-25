import React, {useLayoutEffect, useState} from "react";
import {SafeAreaView, View, Image, Text, FlatList, Switch} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";
import {StatusBar} from "expo-status-bar";
import CustomMemberItem from "../components/CustomMemberItem";

const GroupDetail = ({navigation, route}) => {

    const {members, groupName} = route.params;
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

    const renderItem = ({item}) => (
        <CustomMemberItem name={item.member.name} status={item.member.status} imageURL={item.member.imageURL}/>
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
                    <Text style={{
                        color: neutralColors.white,
                        fontSize: 18,
                    }}>{groupName}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: neutralColors.disabled
                    }}>{members.length} members</Text>
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
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

export default GroupDetail
