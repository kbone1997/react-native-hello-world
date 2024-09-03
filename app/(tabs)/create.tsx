import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Divider } from 'react-native-paper';
import { useColorScheme } from 'nativewind';

const Create = () => {
    const { colorScheme } = useColorScheme(); // Get the current color scheme
    const [create, setCreate] = useState<string>('Journal');
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    // Define text colors based on color scheme
    const textColor = colorScheme === 'dark' ? '#EDF6F9' : '#171614';
    const menuBackgroundColor = colorScheme === 'dark' ? '#37423D' : '#9A8873'; // Adjust based on your theme

    return (
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
                    <Divider />
                    <Menu.Item
                        titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor }}
                        onPress={() => { setCreate('Post'); closeMenu() }}
                        title="Post"
                    />
                    <Divider />
                    <Menu.Item
                        titleStyle={{ textAlign: "center", fontWeight: "800", color: textColor }}
                        onPress={() => { setCreate('Blog'); closeMenu() }}
                        title="Blog"
                    />
                </Menu>
            </View>
            {
                create === 'Journal' ? (
                    <ScrollView>
                        <Text className={`text-3xl text-center font-psemibold text-colorBlack dark:text-colorWhite `}>
                            Journal
                        </Text>
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


        </SafeAreaView>
    );
}

export default Create;
