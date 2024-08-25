import { View, Text, Image, ImageSourcePropType } from 'react-native'
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
                <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6'></Image>
                <Text style={{ color: color }} className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}>{name}</Text>
            </View>
        )
    }

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#33bcff",
                    tabBarInactiveTintColor: "#7f98a4",
                    tabBarStyle: {
                        backgroundColor: '#d3dfe5',
                        borderTopWidth: 1,
                        borderTopColor: '#589bbc',
                        height: "10%",
                    }
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
                    name='bookmark'
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.bookmark} color={color} name={"Bookmark"} focused={focused}></TabIcon>
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
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout