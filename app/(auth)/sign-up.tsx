import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind';

import { images } from "../../constants"
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const StyledLinearGradient = styled(LinearGradient);

const SignUp = () => {
    const [name, setName] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | null>('');
    const router = useRouter();


    return (
        <SafeAreaView className='bg-primary h-full '>
            <ScrollView contentContainerStyle={{ width: "100%", height: "100%" }}>
                <View className='w-full h-full justify-center items-center ease-linear delay-100'>
                    <Image source={images.logo} className='w-1/2' resizeMode='contain'></Image>
                    <Text className='text-white text-xl font-bold'>Sign up to Aora</Text>
                    <View className='w-full justify-center items-center gap-2 m-4'>
                        <TextInput onChangeText={setName}
                            className='border w-5/6 p-2 bg-slate-700 rounded-md text-slate-200 font-psemibold'
                            placeholder='Enter User Name'
                            placeholderTextColor={"white"}
                            autoCapitalize='none'
                        >
                        </TextInput>
                        <TextInput onChangeText={(text) => setEmail(text.toLowerCase())}
                            className='border w-5/6 p-2 bg-slate-700 rounded-md text-slate-200 font-psemibold'
                            placeholder='Enter Email Address'
                            keyboardType='email-address'
                            placeholderTextColor={"white"}
                            autoCapitalize='none'
                            value={email}
                        >
                        </TextInput>
                        <TextInput
                            onChangeText={setPassword}
                            className='border w-5/6 p-2 bg-slate-700 rounded-md font-psemibold text-slate-200'
                            placeholder='Enter Password'
                            placeholderTextColor={"white"}
                            secureTextEntry
                        >
                        </TextInput>
                        <StyledLinearGradient
                            colors={['#8A2BE2', '#FF4500']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="w-5/6 rounded-md p-2" // p-[2px] creates a border-like effect by providing a gradient outline
                        >
                            <TouchableOpacity
                                onPress={() => {

                                }}
                                className="bg-transparent rounded-md p-3"
                            >
                                <Text className="text-white font-semibold text-center">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>

                        </StyledLinearGradient>
                        <Text className="text-white font-semibold text-center">
                            Already have an account? <Text className='text-orange-500' onPress={() => {
                                router.push("/sign-in");
                            }}>Sign In</Text>
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp