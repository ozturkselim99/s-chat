import React, {useEffect, useLayoutEffect, useState} from "react";
import {SafeAreaView, View, TouchableOpacity, FlatList, Image} from "react-native";
import {neutralColors} from "../utils/Theme";
import CustomSearchInput from "../components/CustomSearchInput";
import {auth, db} from "../../firebase";
import CustomGroupItem from "../components/CustomGroupItem";

const Chats = ({navigation}) => {

    const [myGroups, setMyGroups] = useState([]);
    const [filterGroups, setFilterGroups] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);

    useEffect(() => {
        const subscriber = db.collection("groups").onSnapshot(querySnapshot => {
            const groups = [];
            querySnapshot.forEach(documentSnapshot => {
                documentSnapshot.data().members.forEach(data => {
                    if (data.member.userId == auth.currentUser.uid) {
                        groups.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                        });
                    }
                })
            });
            setMyGroups(groups)
        });
        return subscriber;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
        })
    }, [navigation])

    const enterChat = (groupName, id, imageURL) => {
        navigation.navigate("ChatScreen", {
            groupName,
            id,
            imageURL,
        })
    }

    const renderItem = ({item}) => (
        <CustomGroupItem id={item.key} groupName={item.groupName} memberCount={item.members.length}
                         enterChat={enterChat}/>
    );

    const itemSeparator = () => (
        <View style={{height: 1, width: "100%", backgroundColor: neutralColors.line, marginVertical: 12}}/>
    );

    return (
        <SafeAreaView style={{flex: 1, flexDirection: "column", backgroundColor: "white", padding: 24}}>
            <CustomSearchInput onChangeText={(text) => {
                if (text.length > 0 && !!text) {
                    setIsSearching(true);
                    const filterData = myGroups.filter((item) => {
                        return item.groupName
                            .toLowerCase()
                            .includes(text.toLowerCase());
                    });
                    setFilterGroups(filterData);
                } else {
                    setIsSearching(false);
                }
            }}/>
            <FlatList
                style={{marginTop: 16}}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={itemSeparator}
                data={isSearching ? filterGroups : myGroups}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Chats;

