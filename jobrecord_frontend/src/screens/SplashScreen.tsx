import React, { useEffect, useRef } from "react";
import {Animated, Dimensions, Image, StyleSheet, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const {width, height} = Dimensions.get("window");

export default function SplashScreen() {
    const shimmerAnim = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: width + 400,
                duration: 4000,
                useNativeDriver: true,
            })
        ).start();
    }, [shimmerAnim]);

    return (
        <View style={styles.container}>
            {/* Background Gradient */}
            <LinearGradient
                colors={["#E9F3EA", "#D8E4C9"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={StyleSheet.absoluteFill}
            />

            {/* Organic blurry shapes */}
            <View style={[styles.shape, styles.shape1]}/>
            <View style={[styles.shape, styles.shape2]}/>
            <View style={[styles.shape, styles.shape3]}/>
            <View style={[styles.shape, styles.shape4]}/>

            {/* Light reflection (top) */}
            <View style={[styles.lightCurve, styles.lightTop]}/>

            {/* Light reflection (bottom) */}
            <View style={[styles.lightCurve, styles.lightBottom]}/>

            {/* Shimmer effect */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.shimmer,
                    {
                        transform: [{ translateX: shimmerAnim }],
                    },
                ]}
            />

            {/* Icon area placeholder (empty) */}
            <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E9F3EA",
    },

    logo: {
        position: "absolute",
        width: 300,
        height: 300,
        top: height / 2 - 150,
        left: width / 2 - 150,
    },

    /* Organic shapes */
    shape: {
        position: "absolute",
        borderRadius: 9999,
        opacity: 0.15,
    },
    shape1: {
        width: 350,
        height: 350,
        top: -120,
        left: -120,
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    shape2: {
        width: 320,
        height: 320,
        bottom: -80,
        right: -80,
        backgroundColor: "rgba(79,209,197,0.4)",
    },
    shape3: {
        width: 260,
        height: 260,
        top: height * 0.4,
        left: -60,
        backgroundColor: "rgba(159,122,234,0.4)",
    },
    shape4: {
        width: 240,
        height: 240,
        top: height * 0.2,
        right: -60,
        backgroundColor: "rgba(251,182,206,0.4)",
    },

    /* Light curved overlays */
    lightCurve: {
        position: "absolute",
        width: width * 2,
        height: height * 0.4,
        borderRadius: width,
        opacity: 0.15,
    },
    lightTop: {
        top: -height * 0.25,
        left: -width * 0.5,
        backgroundColor: "rgba(255,255,255,0.25)",
        transform: [{rotate: "-8deg"}],
    },
    lightBottom: {
        bottom: -height * 0.32,
        right: -width * 0.5,
        backgroundColor: "rgba(255,255,255,0.15)",
        transform: [{rotate: "12deg"}],
    },

    /* Shimmer */
    shimmer: {
        position: "absolute",
        width: 120,
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.25)",
    },
});
