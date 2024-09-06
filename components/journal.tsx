import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Modal, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Menu, Divider } from 'react-native-paper';
import { useColorScheme } from 'nativewind';
import Swipe from '@/components/swipe';
import * as DocumentPicker from 'expo-document-picker'; // Import ImagePicker
import * as ImageManipulator from 'expo-image-manipulator';
import { uploadDocument } from '@/lib/appwrite';

const Journal = () => {
    const { colorScheme } = useColorScheme();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [text, onChangeText] = useState<string>("");
    const [journalName, setJournalName] = useState<string>("");
    const [journalState, setJournalState] = useState<string>("new");
    const [addNewState, setAddNewState] = useState<string>("Add Text");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [fields, setFields] = useState<Array<{ type: 'text' | 'image'; id?: string; value?: string; file?: any }>>([]); // State for fields

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const handleJournalPost = async () => {
        const response = await uploadDocument(journalName, fields)
        console.log("response :", response)
    }

    const compressImageToSize = async (uri: string, targetSizeKB: number) => {
        let quality = 1; // Start with maximum quality
        let manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }], // Resize if necessary
            { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Iterate to adjust quality until the file size is less than or equal to the target size
        while (true) {
            const fileInfo = await fetch(manipulatedImage.uri);
            const fileSizeKB = (await fileInfo.blob()).size / 1024; // Convert bytes to KB

            if (fileSizeKB <= targetSizeKB || quality <= 0.1) {
                // If file size is acceptable or quality is too low, stop iterating
                break;
            }

            quality -= 0.1; // Decrease quality
            manipulatedImage = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 800 } }], // Resize if necessary
                { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
            );
        }

        return manipulatedImage.uri;
    };

    // Image picker logic
    const pickImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/png", "image/jpg", "image/jpeg"]
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                console.log("Picked image: ", result);

                // Compress image to target size (700 KB)
                const compressedUri = await compressImageToSize(uri, 700);
                // console.log("Compressed image URI: ", compressedUri);
                result.assets[0].uri = compressedUri;

                // Update state with the compressed image
                setFields([...fields, { type: 'image', value: compressedUri, file: result.assets[0] }]);
            }
        } catch (error) {
            console.error("Error picking or compressing image:", error);
        }
    };

    // Add text input or image based on selection
    const addField = (type: 'text' | 'image') => {
        if (type === 'text') {
            setFields([...fields, { type: 'text', value: '' }]);
        } else if (type === 'image') {
            pickImage();
        }
        closeMenu1(); // Close menu after selection
    };

    // Define text colors based on color scheme
    const textColor = colorScheme === 'dark' ? '#EDF6F9' : '#171614';
    const menuBackgroundColor = colorScheme === 'dark' ? '#37423D' : '#9A8873';
    const postButtonProgress = colorScheme === 'dark' ? '#9A8873' : '#37423D';

    const styles = StyleSheet.create({
        input: {
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginTop: 15,
            borderWidth: 1,
            padding: 8,
            borderColor: menuBackgroundColor,
            color: textColor,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 10,
            marginTop: 10,
        }
    });

    return (
        <ScrollView>
            <View className='pl-3 flex flex-row pr-3'>
                <View className='flex w-1/4 pr-2'>
                    <Menu
                        mode='elevated'
                        visible={visible}
                        onDismiss={closeMenu}
                        anchorPosition='bottom'
                        style={{ marginTop: "8%", padding: 0 }}
                        contentStyle={{ backgroundColor: menuBackgroundColor, padding: 0 }}
                        anchor={
                            <TouchableOpacity
                                onPress={openMenu}
                                className="flex flex-col bg-transparent p-2 w-full rounded-md bg-colorOffWhite dark:bg-colorGreenish"
                            >
                                <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                    {journalState}
                                </Text>
                            </TouchableOpacity>
                        }>
                        <Menu.Item
                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                            onPress={() => { setJournalState('new'); closeMenu() }}
                            title="New"
                        />
                        <Menu.Item
                            titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                            onPress={() => { setJournalState('Existing'); closeMenu() }}
                            title="Existing"
                        />
                    </Menu>
                </View>
                {
                    journalState === 'Existing' ? (
                        <View className='flex w-9/12'>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                className="flex bg-transparent p-2 w-full rounded-md bg-colorOffWhite dark:bg-colorGreenish"
                            >
                                <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                    Select Your Journal
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TextInput
                            className='rounded-md'
                            placeholderTextColor={text === "" ? "#d0d5d6" : textColor}
                            textAlign='left'
                            placeholder='Journal name'
                            style={{ borderColor: menuBackgroundColor, borderWidth: 1, paddingLeft: 10, width: "75%", color: textColor }}
                            textBreakStrategy='highQuality'
                            onChangeText={setJournalName}
                            value={journalName}
                            multiline={true}
                            selectionColor={textColor}
                        />
                    )
                }
            </View>
            {/* Render dynamically added fields */}
            {fields.map((field, index) => (
                <View
                    className='pl-3 pr-3'
                    key={index}
                >
                    {field.type === 'text' ? (
                        <TextInput
                            textAlign='left'
                            className='rounded-md'
                            placeholder='Start writing here'
                            style={styles.input}
                            multiline={true}
                            onChangeText={(value) => {
                                const newFields = [...fields];
                                newFields[index].value = value;
                                setFields(newFields);
                            }}
                            value={field.value}
                            selectionColor={menuBackgroundColor}
                            textBreakStrategy='highQuality'
                            placeholderTextColor={text === "" ? "#d0d5d6" : textColor}
                        />
                    ) : (
                        field.value && <Image id={index.toString()} source={{ uri: field.value }} className='w-full h-80 rounded-lg m-0 mt-2' resizeMode='contain' />
                    )}
                </View>
            ))}
            <View className='flex w-full pr-3 pl-3 mt-2'>
                <Menu
                    mode='elevated'
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchorPosition='bottom'
                    style={{ marginTop: "8%", padding: 0, justifyContent: "center", alignItems: "center" }}
                    contentStyle={{ backgroundColor: menuBackgroundColor, marginLeft: "35%" }}
                    anchor={
                        <TouchableOpacity
                            onPress={openMenu1}
                            className="flex flex-col bg-transparent p-2 w-full rounded-md bg-colorOffWhite dark:bg-colorGreenish"
                        >
                            <Text className={`text-md text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                                Add Component
                            </Text>
                        </TouchableOpacity>
                    }>
                    <Menu.Item
                        titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                        onPress={() => {
                            addField('text')
                            setAddNewState("Add Text")
                        }
                        }
                        title="Add Text"
                    />
                    <Menu.Item
                        titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor, fontSize: 12 }}
                        onPress={() => {
                            addField('image')
                            setAddNewState("Add Image")
                        }
                        }
                        title="Add Image"
                    />
                </Menu>
            </View>

            <View className='flex h-80 justify-center items-center'>
                <Swipe
                    onComplete={() => {
                        handleJournalPost()
                    }
                    }
                    duration={3000}
                    buttonColor={menuBackgroundColor}
                    fillColor={postButtonProgress}
                    size={100}
                />
            </View>
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
                            <Text className={"text-md text-center font-psemibold text-colorBlack dark:text-colorWhite"}>Hello World!</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>

            </Modal>

        </ScrollView>
    );
};

export default Journal;
