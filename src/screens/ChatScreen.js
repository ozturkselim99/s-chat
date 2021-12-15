import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Image, LogBox, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {brandColors, neutralColors} from "../utils/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../components/CustomInput";
import {auth, db} from "../../firebase";
import firebase from 'firebase/compat/app';
import ReceiverChatItem from "../components/ReceiverChatItem";
import SenderChatItem from "../components/SenderChatItem";

const ChatScreen = ({navigation, route}) => {

    const scrollRef = useRef()
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState([])
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
        getAuthUserDetail().then(() => {
        })
        getMembers().then(() => {
        })
        fetchMessages().then(() => {
        })

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={() => navigation.navigate("GroupDetail", {
                    members: members,
                    groupName: route.params.groupName,
                    creator: route.params.creator,
                    createdAt: route.params.createdAt,
                    creatorUserId: route.params.creatorUserId,
                    groupId: route.params.id
                })} style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>

                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50
                        }}
                        source={{uri: route.params.imageURL}}/>

                    <Text style={{
                        color: neutralColors.active,
                        marginLeft: 16,
                        fontSize: 18,
                        fontWeight: "600"
                    }}>{route.params.groupName}</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        marginRight: 16,
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
    }, [members])

    const sendMessage = async () => {
        try {
            await db.collection("groups").doc(route.params.id).update({
                members: firebase.firestore.FieldValue.arrayUnion({member: userDetail})
            }).then(async () => {
                await db.collection("groups").doc(route.params.id).collection("messages").add({
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                    userId: auth.currentUser.uid,
                    message: input,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL
                }).then(async () => {
                    await members.forEach(member => {
                        sendPushNotification(member.member.expoPushToken, input, auth.currentUser.displayName)

                    })
                })
            })
        } catch (err) {
            console.log(err)
            return
        }
        setInput('')
    }

    const getMembers = async () => {
        try {
            await db.collection("groups").doc(route.params.id).get().then(doc => {
                setMembers(doc.data().members)

            })
        } catch (err) {
            console.log(err)

        }
    }

    const getAuthUserDetail = async () => {
        try {
            await db.collection("users").doc(auth.currentUser.uid).get().then(doc => {
                setUserDetail(doc.data())

            })
        } catch (err) {
            console.log(err)

        }
    }

    const fetchMessages = async () => {
        try {
            await db.collection("groups")
                .doc(route.params.id)
                .collection("messages")
                .orderBy("timeStamp")
                .onSnapshot(querySnapshot => {
                    const msg = [];
                    querySnapshot.forEach(documentSnapshot => {
                        msg.push({
                            data: documentSnapshot.data(),
                            key: documentSnapshot.id
                        });
                    });
                    setMessages(msg)

                });
        } catch (err) {
            console.log(err)
        }
    }

    const sendPushNotification = async (expoPushToken, message, displayName) => {
        const _message = {
            to: expoPushToken,
            sound: 'default',
            title: displayName,
            body: message,
            data: {someData: 'goes here'},
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_message),
        });
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: neutralColors.offWhite}}>
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
                showsVerticalScrollIndicator={false}
            >
                {messages.map(({key, data}) => (auth.currentUser.uid === data.userId ? (
                    <SenderChatItem key={key} messages={data.message} displayName={data.displayName} time={data.timeStamp}/>
                ) : (
                    <ReceiverChatItem key={key} messages={data.message} displayName={data.displayName} time={data.timeStamp}/>
                )))}
            </ScrollView>
            <View style={{
                flexDirection: "row",
                marginTop: "auto",
                width: "100%",
                paddingRight: 30,
                paddingLeft: 16,
                paddingVertical: 10,
                alignItems: "center",
                backgroundColor: "white",
                shadowRadius: 2,
                shadowOffset: {
                    width: 0,
                    height: -3,
                },
                shadowColor: '#000000',
                elevation: 4,
            }}>
                <CustomInput height={36} flex={1} value={input} marginRight={12} padding={8}
                             onChangeText={(text) => setInput(text)}
                             onSubmitEditing={sendMessage}/>
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                    <Ionicons name="send" size={24} color={brandColors.default}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen;
