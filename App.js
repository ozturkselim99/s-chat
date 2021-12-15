import React from 'react';
import {Image} from 'react-native';
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Intro from "./src/screens/Intro";
import VerificationCode from "./src/screens/VerificationCode";
import {neutralColors} from "./src/utils/Theme";
import CreateProfile from "./src/screens/CreateProfile";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Groups from "./src/screens/Groups";
import Chats from "./src/screens/Chats";
import ChatScreen from "./src/screens/ChatScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CreateGroup from "./src/screens/CreateGroup";
import GroupDetail from "./src/screens/GroupDetail";
import CustomDrawerContent from "./src/components/CustomDrawerContent";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const GroupsStack = createNativeStackNavigator();
const ChatsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="DrawerHome" component={Home} options={{headerShown: false}}/>
        </Drawer.Navigator>
    );
}

function Home() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => {
                const routeName = getFocusedRouteNameFromRoute(route);
                return {
                    showLabel: false,
                    tabBarActiveTintColor: neutralColors.active,
                    tabBarInactiveTintColor:neutralColors.disabled,
                    tabBarHideOnKeyboard:true,
                    tabBarStyle: {
                        elevation:4,
                        borderTopWidth:0,
                        paddingTop: 5,
                        height: 65,
                        flexDirection: "row",
                        display: routeName === "ChatScreen" ? "none" : "flex",
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        marginBottom: 6,
                        fontWeight: "700"
                    },
                    headerShown: false,
                }
            }}
        >
            <Tab.Screen options={
                {
                    tabBarIcon: (tabInfo) => (
                        <Image
                            source={require('./src/assets/icons/contacts.png')}
                        />
                    ),
                    tabBarLabel:"Groups"
                }
            } name="GroupsStack" component={GroupsStackScreen}/>
            <Tab.Screen
                options={
                    {
                        tabBarIcon: (tabInfo) => (
                            <Image
                                source={require('./src/assets/icons/message_circle.png')}
                            />
                        ),
                        tabBarLabel:"Chats"
                    }
                }
                name="ChatsStack"  component={ChatsStackScreen}/>
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
                <Stack.Screen name="Home" options={{headerShown: false}} component={DrawerNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
