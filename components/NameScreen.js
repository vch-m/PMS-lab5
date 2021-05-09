import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function NameScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>
                Малашкін Вячеслав
                {"\n"}
                Група ІО-83
                {"\n"}
                ЗК 8318
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    }
})