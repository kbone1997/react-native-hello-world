import { View, Text, Image, ImageSourcePropType, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

import { icons } from "../../constants"

type TabIconProps = {
    icon: ImageSourcePropType
    color: string;
    name: string;
    focused: boolean;
};

const TabsLayout = () => {
    const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
        return (
            <View className='justify-center items-center'>
                <Image source={icon} resizeMode='contain' tintColor={color} className={`w-6 h-6`}></Image>
                <Text style={{ color: color }} className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}>{name}</Text>
            </View>
        )
    }

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#EDF6F9",
                    tabBarInactiveTintColor: "#9A8873",
                    tabBarStyle: {
                        backgroundColor: '#37423D',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin: 20,
                        height: 70,
                        borderRadius: 50,
                        width: "90%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopWidth: 0
                    },
                    tabBarHideOnKeyboard: true
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={"home"} focused={focused}></TabIcon>
                        )
                    }}
                />
                <Tabs.Screen
                    name='search'
                    options={{
                        title: 'search',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.search} color={color} name={"search"} focused={focused}></TabIcon>
                        )
                    }}
                />
                <Tabs.Screen
                    name='saved'
                    options={{
                        title: 'saved',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.bookmark} color={color} name={"saved"} focused={focused}></TabIcon>
                        )
                    }}
                />
                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.plus} color={color} name={"create"} focused={focused}></TabIcon>
                        )
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.profile} color={color} name={"profile"} focused={focused}></TabIcon>
                        ),
                        tabBarStyle: { display: 'none' },
                    }}

                />
            </Tabs>
        </>
    )
}

export default TabsLayout