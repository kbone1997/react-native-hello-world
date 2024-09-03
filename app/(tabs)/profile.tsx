import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from "nativewind";

const { width } = Dimensions.get('window');

// Sample Journals Data
const journals = [
    {
        id: 1,
        title: 'My First Journal',
        date: '2024-04-01',
        content: 'Today I started my journey with React Native. It was exciting!',
    },
    {
        id: 2,
        title: 'A Day in the Park',
        date: '2024-04-05',
        content: 'Spent the day at the park enjoying the sunshine and fresh air.',
    },
    {
        id: 3,
        title: 'Learning JavaScript',
        date: '2024-04-10',
        content: 'JavaScript is versatile and powerful. Today I learned about closures.',
    },
    {
        id: 4,
        title: 'Learning JavaScript',
        date: '2024-04-10',
        content: 'JavaScript is versatile and powerful. Today I learned about closures.',
    },
];

// Sample Photos Data
const photos = [
    {
        id: 1,
        uri: images.profile,
    },
    {
        id: 2,
        uri: images.profile,
    },
    {
        id: 3,
        uri: images.profile,
    },
];

const Profile = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const navigation = useNavigation();
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <SafeAreaView className='bg-colorwhite dark:bg-colorBlack w-full h-full pt-12'>
            {/* Header */}

            <View className='flex flex-row items-center justify-between ml-2 mr-2'>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    className=" p-4 z-50"
                >
                    <Image source={icons.leftArrow} resizeMode='contain' className='w-6 h-6' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleColorScheme}
                    className=" p-4 z-50"
                >
                    <Image source={colorScheme === "light" ? icons.light : icons.dark} resizeMode='contain' className='w-6 h-6' />
                </TouchableOpacity>
            </View>


            {/* Profile Image and Info */}
            <View className="absolute mt-[20%] z-10 w-full items-center justify-center">
                <Image
                    source={images.profile}
                    resizeMode='cover'
                    className='w-32 h-32 rounded-full border-4 border-white'
                />
                <Text className='text-colorBlack dark:text-colorWhite text-base mt-2'>John Doe</Text>
                <View className='flex flex-row w-1/2 mt-2 justify-between'>
                    <TouchableOpacity
                        onPress={() => { console.log('Edit Profile clicked') }}
                        className="bg-colorWhite rounded-full p-2"
                    >
                        <Text className='text-colorBlack text-xs font-pmedium'>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { console.log('Share Profile clicked') }}
                        className="bg-colorWhite rounded-full p-2"
                    >
                        <Text className='text-colorBlack text-xs font-pmedium'>Share Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View className='flex flex-row w-5/6 justify-between mt-4'>
                    <View className='flex flex-col items-center'>
                        <Text className='text-colorBlack dark:text-colorWhite text-base text-center'>92</Text>
                        <TouchableOpacity
                            onPress={() => { console.log('Journals pressed') }}
                            className="rounded-full"
                        >
                            <Text className='text-colorBlack dark:text-colorWhite text-base font-pmedium'>Journals</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-col items-center'>
                        <Text className='text-colorBlack dark:text-colorWhite text-base text-center'>20k</Text>
                        <TouchableOpacity
                            onPress={() => { console.log('Followers pressed') }}
                            className="rounded-full"
                        >
                            <Text className='text-colorBlack dark:text-colorWhite text-base font-pmedium'>Followers</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex flex-col items-center'>
                        <Text className='text-colorBlack dark:text-colorWhite text-base text-center'>109</Text>
                        <TouchableOpacity
                            onPress={() => { console.log('Following pressed') }}
                            className="rounded-full"
                        >
                            <Text className='text-colorBlack dark:text-colorWhite text-base font-pmedium'>Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Current Tab Header */}
                <View className='flex flex-col w-full justify-center items-center mt-5'>
                    <View className='flex flex-row gap-6'>
                        <TouchableOpacity
                            onPress={() => { setCurrentTab(0) }}
                            className="rounded-full"
                        >
                            <Text className={`text-colorBlack dark:text-colorWhite text-base ${currentTab === 0 ? "font-psemibold" : "opacity-40"}`}>Journals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setCurrentTab(1) }}
                            className="rounded-full"
                        >
                            <Text className={`text-colorBlack dark:text-colorWhite text-base ${currentTab === 1 ? "font-psemibold" : "opacity-40"}`}>Uploads</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        className='border-b-2 border-b-colorBrown w-4/5'
                    />
                </View>
            </View>

            {/* ScrollView for Journals and Photos */}
            <View className='bg-colorOffWhite dark:bg-colorGreenish w-full h-full rounded-3xl mt-[5%]'>
                <ScrollView
                    className='mt-[65%] rounded-sm mb-[25%] p-2'
                    style={{
                        marginHorizontal: 6,
                        backgroundColor: colorScheme === "light" ? "#EDF6F9" : "#6A7F5D"
                    }}
                >
                    {
                        currentTab === 0 ? (
                            <View className='rounded-3xl'>
                                {
                                    journals.map(journal => (
                                        <View key={journal.id} style={{ padding: 3 }} className='rounded-lg'>

                                            <TouchableOpacity className='p-2'
                                                onPress={() => { }}>
                                                <Text className='text-colorBlack dark:text-colorWhite text-base font-bold'>{journal.title}</Text>
                                                <Text className='text-colorBlack dark:text-colorWhite text-sm mt-1'>{journal.date}</Text>
                                                <Text className='text-colorBlack dark:text-colorWhite text-sm mt-2'>{journal.content}</Text>
                                            </TouchableOpacity>
                                            <View
                                                className='border-b-2 border-b-colorBrown m-2'
                                            />
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View className='rounded-3xl'>
                                {
                                    photos.map(photo => (
                                        <View key={photo.id} className='mb-4 p-4 bg-gray-700 rounded-lg'>
                                            <Image
                                                source={photo.uri}
                                                resizeMode='cover'
                                                className='w-32 h-32 rounded-lg'
                                            />
                                        </View>
                                    ))
                                }
                            </View>
                        )
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default Profile;
