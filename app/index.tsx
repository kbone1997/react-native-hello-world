import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

import { images } from "../constants"
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';
import { useGlobalContext } from "@/context/GlobalProvider";

const StyledLinearGradient = styled(LinearGradient);

export default function App() {

    const { isLoading, isLogged } = useGlobalContext();

    if (!isLoading && isLogged) {
        return (
            <Redirect href={"/home"}></Redirect>
        )
    }

    const router = useRouter()

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className=" w-full  justify-center items-center h-full">
                    <Image source={images.logo} className="max-w-[130px] w-1/3 max-h-[100px] h-full" resizeMode="contain"></Image>
                    <Image source={images.cards} className="max-w-[380px] w-full max-h-[300px] h-full" resizeMode="contain"></Image>
                    <StyledLinearGradient
                        colors={['#8A2BE2', '#FF4500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-1/2 rounded-md m-4 p-[2px]" // p-[2px] creates a border-like effect by providing a gradient outline
                    >
                        <TouchableOpacity
                            onPress={() => {
                                router.push("/sign-in")
                            }}
                            className="bg-transparent rounded-md p-3"
                        >
                            <Text className="text-white font-semibold text-center">
                                Continue with Email
                            </Text>
                        </TouchableOpacity>
                    </StyledLinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

