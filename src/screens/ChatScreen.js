import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
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
        getAuthUserDetail()
        getMembers()
        const subscriber = db.collection("groups")
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
        return subscriber;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <TouchableOpacity onPress={() => navigation.navigate("GroupDetail", {
                    members: members,
                    groupName: route.params.groupName,
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

    const sendMessage = () => {
        db.collection("groups").doc(route.params.id).update({
            members: firebase.firestore.FieldValue.arrayUnion({member: userDetail})
        }).then(() => {
            db.collection("groups").doc(route.params.id).collection("messages").add({
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                userId: auth.currentUser.uid,
                message: input,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL
            }).then(() => {
            })
        })
        setInput('')
    }

    const getMembers = () => {
        db.collection("groups").doc(route.params.id).get().then(doc => {
            setMembers(doc.data().members)
        })
    }

    const getAuthUserDetail = () => {
        db.collection("users").doc(auth.currentUser.uid).get().then(doc => {
            setUserDetail(doc.data())
        })
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: neutralColors.offWhite}}>
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
                showsVerticalScrollIndicator={false}
            >
                {messages.map(({key, data}) => (auth.currentUser.uid === data.userId ? (
                    <SenderChatItem messages={data.message} displayName={data.displayName} time={data.timeStamp}/>
                ) : (
                    <ReceiverChatItem messages={data.message} displayName={data.displayName} time={data.timeStamp}/>
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
