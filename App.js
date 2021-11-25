import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useLayoutEffect} from 'react';

import {StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Intro from "./src/screens/Intro";
import VerificationCode from "./src/screens/VerificationCode";
import {neutralColors} from "./src/utils/Theme";
import CreateProfile from "./src/screens/CreateProfile";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Groups from "./src/screens/Groups";
import Chats from "./src/screens/Chats";
import More from "./src/screens/More";
import ChatScreen from "./src/screens/ChatScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CreateGroup from "./src/screens/CreateGroup";
import GroupDetail from "./src/screens/GroupDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const GroupsStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();


function GroupsStackScreen() {
    return (
        <GroupsStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: neutralColors.white,
                    shadowColor: 'transparent', // this covers iOS
                    elevation: 0, // this covers Android
                },
                title: "Groups",
                headerShadowVisible: false, // applied here
            }}
        >
            <GroupsStack.Screen name="Groups" component={Groups}/>
            <GroupsStack.Screen name="CreateGroup" component={CreateGroup}/>
            <GroupsStack.Screen name="ChatScreen" component={ChatScreen}/>
            <ChatsStack.Screen name="GroupDetail" component={GroupDetail}/>
        </GroupsStack.Navigator>
    );
}

function ChatsStackScreen() {
    return (
        <ChatsStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: neutralColors.white,
                    shadowColor: 'transparent', // this covers iOS
                    elevation: 0, // this covers Android
                },
                title: "Groups",
                headerShadowVisible: false, // applied here
            }}
        >
            <ChatsStack.Screen name="Chats" component={Chats}/>
            <ChatsStack.Screen name="ChatScreen" component={ChatScreen}/>
            <ChatsStack.Screen name="GroupDetail" component={GroupDetail}/>
        </ChatsStack.Navigator>
    );
}

function Home() {
    return (
        <Tab.Navigator
        >
            <Tab.Screen name="Groups"
                        options={({route}) => {
                            const routeName = getFocusedRouteNameFromRoute(route);
                            return {
                                tabBarStyle: {
                                    display: routeName === "ChatScreen" ? "none" : "flex",
                                },
                                tabBarLabelStyle: {
                                    fontSize: 14,
                                    fontWeight: "600"
                                },
                                headerShown: false,
                                tabBarIcon: () => {
                                    return (
                                        <Image
                                            source={require('./src/assets/icons/contacts.png')}
                                        />
                                    )
                                }
                            }
                        }}


                        component={GroupsStackScreen}/>
            <Tab.Screen name="Chats" options={({route}) => {
                const routeName = getFocusedRouteNameFromRoute(route);
                return {
                    tabBarStyle: {
                        display: routeName === "ChatScreen" ? "none" : "flex",
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: "600"
                    },
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <Image
                                source={require('./src/assets/icons/message_circle.png')}
                            />
                        )
                    }
                }
            }}
                        component={ChatsStackScreen}/>
            <Tab.Screen name="More" options={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: "600"
                },
                tabBarIcon: () => {
                    return (
                        <Image
                            source={require('./src/assets/icons/more_horizontal.png')}
                        />
                    )
                }
            }} component={More}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: neutralColors.white,
                        shadowColor: 'transparent', // this covers iOS
                        elevation: 0, // this covers Android
                    },
                    title: "",
                    headerShadowVisible: false, // applied here

                }}
            >
                <Stack.Screen name="Intro" component={Intro}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="VerificationCode" component={VerificationCode}/>
                <Stack.Screen name="CreateProfile" component={CreateProfile}/>
                <Stack.Screen name="Home" options={{headerShown: false}} component={Home}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
