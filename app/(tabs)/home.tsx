import { View, Text, FlatList, TextInput, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import { icons } from '@/constants'

const Home = () => {
    const [searchText, setSearchText] = useState('');

    // Example data structure
    const posts = [
        {
            id: 1,
            username: 'john_doe',
            following: true,
            media: images.profile,
            likes: 120,
            comments: 45,
        },
        {
            id: 2,
            username: 'jane_smith',
            following: false,
            media: images.profile,
            likes: 85,
            comments: 20,
        },
        {
            id: 3,
            username: 'alex_jones',
            following: true,
            media: images.profile,
            likes: 200,
            comments: 78,
        },
    ];

    return (
        <SafeAreaView className='bg-colorBlack flex w-full h-full pt-12'>

            <View className='flex w-full items-center justify-center gap-2'>
                <Text className='text-colorWhite text-3xl text-center font-psemibold items-center justify-center'>Today's Date</Text>
            </View>

            <FlatList
                contentContainerStyle={
                    {
                        width: '90%', // Set FlatList container width to 90%
                        alignSelf: 'center', // Center the container horizontally
                        marginTop: 10, // Optional: Adjust top margin if needed
                        paddingBottom: 100
                    }
                }
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='p-4 bg-colorTest m-2 rounded-lg border-2 border-colorWhite '>
                        <View className='flex-row justify-between mt-2 '>
                            <Text className='text-lg font-psemibold text-colorWhite '>{item.username}</Text>
                            <Text className='text-sm text-colorWhite'>{item.following ? 'Following' : 'Not Following'}</Text>
                        </View>
                        <Image
                            source={item.media}
                            className='w-full h-80 rounded-lg mt-2'
                            resizeMode='cover'
                        />
                        <View className='flex-row items-center justify-between mt-2 '>

                            <View className='flex flex-row items-center justify-center gap-2'>
                                <Text className='text-sm font-psemibold text-colorWhite'>Likes: {item.likes}</Text>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    className="bg-transparent border-2 border-colorGreen p-2 rounded-full"
                                >
                                    <Image source={icons.thumbsUp} resizeMode='contain' className={`w-6 h-6 `}></Image>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    className="bg-transparent border-2 border-colorBlood p-2 rounded-full"
                                >
                                    <Image source={icons.thumbsDown} resizeMode='contain' className={`w-6 h-6`}></Image>
                                </TouchableOpacity>
                            </View>
                            <Text className='text-sm font-psemibold text-colorWhite'>Comments: {item.comments}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Home
