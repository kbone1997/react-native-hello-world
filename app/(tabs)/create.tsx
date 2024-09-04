import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Divider } from 'react-native-paper';
import { useColorScheme } from 'nativewind';
import Swipe from '@/components/swipe';

const Create = () => {
    const { colorScheme } = useColorScheme(); // Get the current color scheme
    const [create, setCreate] = useState<string>('Journal');
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [text, onChangeText] = useState<string>("");
    const [journalName, setJournalName] = useState<string>("");
    const [journalState, setJournalState] = useState<string>("new")
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    // for modal controlling
    const openModal = () => setModalVisible(true);

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
            height: 300,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: menuBackgroundColor,
            color: textColor,
        },
    });

    const styles1 = StyleSheet.create({
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: '#F194FF',
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
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
                        <ScrollView >
                            <TextInput
                                className='rounded-md'
                                placeholderTextColor={textColor}
                                textAlign='left'
                                placeholder='Start writing here'
                                style={styles.input}
                                textBreakStrategy='highQuality'
                                onChangeText={onChangeText}
                                value={text}
                                multiline={true}
                            />
                            <View className='pl-3 flex flex-row pr-3'>
                                <View className='flex w-1/4 pr-2'>
                                    <Menu
                                        mode='elevated'
                                        visible={visible1}
                                        onDismiss={closeMenu1}
                                        anchorPosition='bottom'
                                        style={{ marginTop: "8%", padding: 0 }}
                                        contentStyle={{ backgroundColor: menuBackgroundColor, padding: 0 }}
                                        anchor={
                                            <TouchableOpacity
                                                onPress={openMenu1}
                                                className="flex flex-col bg-transparent p-2 w-full rounded-md bg-colorOffWhite dark:bg-colorGreenish"
                                            >
                                                <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                                    {journalState}
                                                </Text>
                                            </TouchableOpacity>
                                        }>
                                        <Menu.Item
                                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                                            onPress={() => { setJournalState('new'); closeMenu1() }}
                                            title="New"
                                        />
                                        <Menu.Item
                                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                                            onPress={() => { setJournalState('Existing'); closeMenu1() }}
                                            title="Existing"
                                        />
                                    </Menu>
                                </View>
                                {
                                    journalState === 'Existing' ? (<View className='flex w-9/12'>
                                        <TouchableOpacity
                                            onPress={openModal}
                                            className="flex bg-transparent p-2 w-full rounded-md bg-colorOffWhite dark:bg-colorGreenish"
                                        >
                                            <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                                Select Your Journal
                                            </Text>
                                        </TouchableOpacity>
                                    </View>) : (
                                        <TextInput
                                            className='rounded-md'
                                            placeholderTextColor={textColor}
                                            textAlign='left'
                                            placeholder='Journal name'
                                            style={{ borderColor: menuBackgroundColor, borderWidth: 1, paddingLeft: 10, width: "75%", color: textColor }}
                                            textBreakStrategy='highQuality'
                                            onChangeText={setJournalName}
                                            value={journalName}
                                            multiline={true}
                                        />
                                    )
                                }
                            </View>
                            <View className='flex h-80 justify-center items-center'>
                                <Swipe
                                    onComplete={handleComplete}
                                    duration={3000} // Hold for 3 seconds
                                    buttonColor={menuBackgroundColor} // Main button color
                                    fillColor={postButtonProgress} // Progress bar fill color
                                    size={100} // Size of the button
                                />
                            </View>
                        </ScrollView>
                    ) : ""
                }
                {
                    create === 'Post' ? (
                        <ScrollView>
                            <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                Post
                            </Text>
                        </ScrollView>
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View className='absolute flex w-full h-full items-center justify-center bg-gray-100 dark:bg-colorBlack opacity-30'>
                    </View>
                    <View className='w-full h-full justify-center items-center'>
                        <View className='w-full h-2/3  justify-center items-center'>
                            <ScrollView
                                style={{ width: "83.33%", height: 100 }}
                                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                                className='rounded-md bg-colorOffWhite dark:bg-colorGreenish'>
                                <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>Hello World!</Text>
                                <Pressable
                                    style={[styles1.button, styles1.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles1.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>


            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default Create;
