import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {accentColors, neutralColors} from "../utils/Theme";
import {db} from "../../firebase";

const CustomGroupItem = (props) => {
    const [message, setMessage] = useState({})
    useEffect(() => {
        const subscriber = db.collection("groups")
            .doc(props.id)
            .collection("messages")
            .orderBy("timeStamp", "desc").limit(1).onSnapshot(snapshot => {
                setMessage(snapshot.docs.map(doc => doc.data()))
            })
        return subscriber
    }, [])
    return (
        <TouchableOpacity style={{flexDirection: "row"}}
                          onPress={() => props.enterChat(props.groupName, props.id, "https://www.clipartmax.com/png/middle/157-1570300_placeholder-image-symbol-for-friendship-group.png")}>
            <View style={{position: "relative"}}>
                <Image
                    source={{uri: "https://www.clipartmax.com/png/middle/157-1570300_placeholder-image-symbol-for-friendship-group.png"}}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16
                    }}
                />
                <View style={
                    {
                        width: 18,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 18,
                        backgroundColor: accentColors.success,
                        position: "absolute",
                        borderRadius: 50,
                        right: 0,
                        top: 0
                    }
                }>
                    <Text
                        style={{
                            fontSize: 8,
                            color: neutralColors.white,
                        }}
                    >{props.memberCount}</Text>
                </View>
            </View>
            <View style={{flexDirection: "column", flex: 1, marginLeft: 16, justifyContent: "center"}}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "600",
                    lineHeight: 24,
                    color: neutralColors.active
                }}>{props.groupName}</Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: "600",
                    lineHeight: 20,
                    color: neutralColors.disabled
                }}>{message?.[0]?.displayName} : {message?.[0]?.message}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default CustomGroupItem
