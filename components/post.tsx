import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const Post = () => {
    return (
        <ScrollView>
            <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                Post
            </Text>
        </ScrollView>
    )
}

export default Post