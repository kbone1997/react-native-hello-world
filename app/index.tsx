import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-3xl font-pblack" >Hello, world!</Text>
            <Link className="text-blue-500 font-plight" href={"../home"}>Navigate</Link>
        </View>
    )
}

