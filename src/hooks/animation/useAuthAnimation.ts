import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useAuthAnimatedSequence = () => {
    const logoScale = useRef(new Animated.Value(0)).current;
    const textFade = useRef(new Animated.Value(0)).current;
    const textRotate = useRef(new Animated.Value(0)).current;
    const formFade = useRef(new Animated.Value(0)).current;
    const formTranslateX = useRef(new Animated.Value(-50)).current;
    const buttonFade = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Logo Animation: Smooth Scale-in
        Animated.timing(logoScale, {
            toValue: 1,
            duration: 800, // Increased duration for smoother effect
            easing: Easing.inOut(Easing.ease), // Smooth ease-in-out effect
            useNativeDriver: true,
        }).start(() => {
            // Text Animation: Smooth Rotate + Fade
            Animated.parallel([
                Animated.timing(textFade, {
                    toValue: 1,
                    duration: 600, // Slightly longer duration
                    useNativeDriver: true,
                }),
                Animated.timing(textRotate, {
                    toValue: 1,
                    duration: 100, // Increased duration for smoother rotation
                    easing: Easing.inOut(Easing.ease), // Smooth ease-in-out transition
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Form Animation: Slide from Left
                Animated.parallel([
                    Animated.timing(formFade, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(formTranslateX, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    // Button Animation: Slide from Bottom + Bounce
                    Animated.parallel([
                        Animated.timing(buttonFade, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.spring(buttonTranslateY, {
                            toValue: 0,
                            speed: 5,
                            bounciness: 10,
                            useNativeDriver: true,
                        }),
                    ]).start();
                });
            });
        });
    }, []);

    return {
        logoScale,
        textFade,
        textRotate,
        formFade,
        formTranslateX,
        buttonFade,
        buttonTranslateY,
    };
};
