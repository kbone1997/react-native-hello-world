import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useColorScheme } from 'nativewind';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


type PressAndHoldButtonProps = {
    onComplete: () => void;
    duration?: number;
    buttonColor?: string;
    fillColor?: string;
    size?: number; // size of the circular progress bar
};

const Swipe = ({
    onComplete,
    duration = 2000,
    buttonColor = '#754043',
    fillColor = '#754043',
    size = 100,
}: PressAndHoldButtonProps) => {
    const [isHolding, setIsHolding] = useState(false);
    const fillAnim = useRef(new Animated.Value(0)).current;
    const { colorScheme } = useColorScheme(); // Get the current color scheme
    const textColor = colorScheme === 'dark' ? '#EDF6F9' : '#171614';

    const styles = StyleSheet.create({
        text: {
            color: textColor,
            fontWeight: 'bold',
        },
    });

    const handlePressIn = () => {
        setIsHolding(true);
        Animated.timing(fillAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: false,
            easing: Easing.linear,
        }).start(({ finished }) => {
            if (finished) {
                onComplete();
            }
        });
    };

    const handlePressOut = () => {
        setIsHolding(false);
        Animated.timing(fillAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const strokeWidth = size * 0.1; // Adjusted stroke width
    const radius = (size - strokeWidth) / 2; // Adjusted radius
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = fillAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    return (
        <View className='justify-center items-center'>
            {/* Progress Bar */}
            <Svg
                width={size}
                height={size}
                style={{ position: 'absolute', top: -10, left: -10 }}
            >
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={fillColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" // For smoother progress
                />
            </Svg>

            {/* Button */}
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{
                    width: size * 0.8, // Slightly smaller than the progress circle
                    height: size * 0.8,
                    borderRadius: (size * 0.8) / 2,
                    backgroundColor: buttonColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.text}>{isHolding ? 'Posting..' : 'Post'}</Text>
            </Pressable>
        </View>
    );
};

export default Swipe;
