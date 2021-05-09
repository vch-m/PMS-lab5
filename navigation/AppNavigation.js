import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import NameScreen from "../components/NameScreen";
import GraphScreen from "../components/GraphScreen";
import MovieScreen from "../components/MovieScreen";
import GalleryScreen from "../components/GalleryScreen";


import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddPoster from "../components/AddPoster";
import Info from "../components/Info";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('New poster')}>

                    <MaterialCommunityIcons style={styles.addIcon} name="plus" color={'#4F817F'} size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return <MovieScreen />;
}

function AddItemForm() {
    return (
        <AddPoster />
    );
}

function PosterInfoForm({ route }) {

    const { fileName, title, year } = route.params;

    return (
        <Info
            fileName={fileName}
            title={title}
            year={year}
        />
    );
}

const Stack = createStackNavigator();

function MoviesHeader() {
    return (
        <Stack.Navigator initialRouteName="Movies">
            <Stack.Screen name="Movies" component={HomeScreen} />
            <Stack.Screen name="New poster" component={AddItemForm} />
            <Stack.Screen name="Details" component={PosterInfoForm} />
        </Stack.Navigator>
    );
}

export default function AppNavigation() {
    return (
        <Tab.Navigator
            tabBarOptions={
                { labelStyle: { paddingBottom: 5 } }}
        >
            <Tab.Screen
                name="Name"
                component={NameScreen}
                options={{
                    tabBarLabel: 'Name',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-account" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Charts"
                component={GraphScreen}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-line-variant" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Movies"
                component={MoviesHeader}
                options={{
                    tabBarLabel: 'Movies',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="video" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Pictures"
                component={GalleryScreen}
                options={{
                    tabBarLabel: 'Pictures',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="camera" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    // Add form
    addIcon: {
        textAlign: 'right',
        marginHorizontal: 16,
        marginBottom: 5,
        marginTop: 2,
        color: '#4F817F'
    }
});