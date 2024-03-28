import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { Colors } from '../Utils'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = useCallback(async () => {

        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} />
            <Image style={styles.bgImage} source={require('../../assets/images/ev-charge.png')} />
            <View style={{ padding: 20 }}>
                <Text style={styles.headingText}>Your Ultimate EV charging Station Finding App</Text>
                <Text style={styles.description}>Find EV charging station near you, plan trip and so much more in just one click</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={{
                        color: Colors.white,
                        textAlign: 'center',
                        fontFamily: 'outfit-regular',
                        fontSize: 17
                    }}>Login with Google</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    logoImage: {
        width: 200,
        height: 40,
        //objectFit: 'contain'
    },
    bgImage: {
        width: '100%',
        height: 250,
        marginTop: 15,
        objectFit: 'contain'
    },
    headingText: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 20
    },
    description: {
        fontSize: 17,
        fontFamily: 'outfit-regular',
        marginTop: 15,
        textAlign: 'center',
        color: Colors.gray
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 50,
    }
})