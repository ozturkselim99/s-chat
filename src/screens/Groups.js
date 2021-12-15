import React, {useEffect, useLayoutEffect, useState} from "react";
import {FlatList, Image, LogBox, SafeAreaView, TouchableOpacity, View} from "react-native";
import {neutralColors} from "../utils/Theme";
import CustomSearchInput from "../components/CustomSearchInput";
import CustomGroupItem from "../components/CustomGroupItem";
import {db} from "../../firebase";

const Groups = ({navigation}) => {

    const [groups, setGroups] = useState([]);
    const [filterGroups, setFilterGroups] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['Setting a timer']);
        fetchGroups().then(() => {
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Groups",
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 16}} onPress={() => {
                    navigation.navigate("CreateGroup")
                }}>
                    <Image
                        source={require('../assets/icons/add.png')}
                    />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const enterChat = (groupName, id, imageURL, creator, createdAt, creatorUserId) => {
        navigation.navigate("ChatScreen", {
            groupName,
            id,
            imageURL,
            creator,
            createdAt,
            creatorUserId,
        })
    }
    const fetchGroups = async () => {
        try {
            await db.collection("groups").onSnapshot(querySnapshot => {
                const groups = [];
                querySnapshot.forEach(documentSnapshot => {
                    groups.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                    });
                });
                setGroups(groups)
            });
        } catch (err) {
            console.log(err)
        }
    }

    const renderItem = ({item}) => (
        <CustomGroupItem id={item.key} groupName={item.groupName} memberCount={item.members.length}
                         creator={item.creator}
                         createdAt={item.createdAt}
                         creatorUserId={item.creatorUserId}
                         enterChat={enterChat}/>
    );

    const itemSeparator = () => (
        <View style={{height: 1, width: "100%", backgroundColor: neutralColors.line, marginVertical: 12}}/>
    );

    return (
        <SafeAreaView
            style={{flex: 1, flexDirection: "column", backgroundColor: "white", paddingTop: 24, paddingHorizontal: 24}}>
            <CustomSearchInput onChangeText={(text) => {
                if (text.trim()) {
                    setIsSearching(true);
                    const filterData = groups.filter((item) => {
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
                data={isSearching ? filterGroups : groups}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
            >
            </FlatList>
        </SafeAreaView>
    )
}

export default Groups;
