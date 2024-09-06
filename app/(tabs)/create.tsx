import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Divider } from 'react-native-paper';
import { useColorScheme } from 'nativewind';
import Swipe from '@/components/swipe';
import Journal from '@/components/journal';
import Post from '@/components/post';

const Create = () => {
    const { colorScheme } = useColorScheme(); // Get the current color scheme
    const [create, setCreate] = useState<string>('Journal');
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);


    // for modal controlling

    // other functions

    const handleComplete = () => {
        console.log('swipe');
    }

    // Define text colors based on color scheme
    const textColor = colorScheme === 'dark' ? '#EDF6F9' : '#171614';
    const menuBackgroundColor = colorScheme === 'dark' ? '#37423D' : '#9A8873'; // Adjust based on your theme
    const postButtonProgress = colorScheme === 'dark' ? '#9A8873' : '#37423D';

    const styles = StyleSheet.create({
        input: {
            alignItems: "flex-start",
            justifyContent: "flex-start",

            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: menuBackgroundColor,
            color: textColor,
        },
    });

    

    const styles2 = StyleSheet.create({
        container: {
            flex: 1,
        },
        inner: {
            padding: 24,
            flex: 1,
            justifyContent: 'space-around',
        },
        header: {
            fontSize: 36,
            marginBottom: 48,
        },
        textInput: {
            height: 40,
            borderColor: '#000000',
            borderBottomWidth: 1,
            marginBottom: 36,
        },
        btnContainer: {
            backgroundColor: 'white',
            marginTop: 12,
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView className={`flex w-full h-full pt-12 bg-colorWhite dark:bg-colorBlack`}>
                <View className='flex flex-row w-full items-center justify-center'>
                    <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                        Create
                    </Text>
                    <Menu
                        mode='elevated'
                        visible={visible}
                        onDismiss={closeMenu}
                        anchorPosition='bottom'
                        style={{ paddingTop: "5%" }}
                        contentStyle={{ backgroundColor: menuBackgroundColor }}
                        anchor={
                            <TouchableOpacity
                                onPress={openMenu}
                                className="bg-transparent p-2"
                            >
                                <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                    {create}
                                </Text>
                            </TouchableOpacity>
                        }>
                        <Menu.Item
                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor }}
                            onPress={() => { setCreate('Journal'); closeMenu() }}
                            title="Journal"
                        />
                        <Menu.Item
                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor }}
                            onPress={() => { setCreate('Post'); closeMenu() }}
                            title="Post"
                        />
                        <Menu.Item
                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor }}
                            onPress={() => { setCreate('Blog'); closeMenu() }}
                            title="Blog"
                        />
                    </Menu>
                </View>
                {
                    create === 'Journal' ? (
                        <Journal></Journal>
                    ) : ""
                }
                {
                    create === 'Post' ? (
                        <Post></Post>
                    ) : ""
                }
                {
                    create === 'Blog' ? (
                        <ScrollView>
                            <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                Blog
                            </Text>
                        </ScrollView>
                    ) : ""
                }


            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default Create;
