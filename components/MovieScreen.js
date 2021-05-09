import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import * as data from '../MoviesList.json';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';


import { posterInformation } from "../global/posterInformation";

export const DATA = data.Search

const getItemCount = (data) => data.length;

const getItem = (data, index) => {
    return ({
        id: `${data[index].imdbID}`,
        title: `${data[index].Title}`,
        year: `${data[index].Year}`,
        type: `${data[index].Type}`,
        poster: `${data[index].Poster}`
    })
};

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function MovieScreen() {

    const [dimensions, setDimensions] = useState({ window, screen });
    const [rerender, setRerender] = useState(false);

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const orientation = () => {
        if (dimensions.window.height >= dimensions.window.width) {
            return portrait
        } else {
            return landscape
        }
    }

    const LeftActions = () => {
        return (
            <View style={portrait.rightAction}>
                <Text style={portrait.actionText}>Delete</Text>
            </View>
        )
    }


    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    function Item({ id, title, year, type, poster }) {
        const navigation = useNavigation();

        return (

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={
                    () => navigation.navigate('Details', {
                        fileName: id,
                        title: title,
                        year: year
                    })

                }>
                <Swipeable
                    renderRightActions={LeftActions}
                    onSwipeableRightOpen={() => {
                        const obj = DATA.findIndex(elem => elem.imdbID === id)
                        DATA.splice(obj, 1)
     
                        searchFilterFunction(search)
                        setRerender(!rerender)
                    }

                    }
                >
                    <View style={portrait.item}>
                        <View style={portrait.posterViev}>
                            <Image
                                style={orientation().poster}
                                source={posterInformation(poster)}
                            />
                        </View>
                        <View style={orientation().textViev}>
                            <Text style={portrait.title}>{title}</Text>
                            <Text style={orientation().details}>{year}</Text>
                            <Text style={orientation().details}>{type}</Text>
                        </View>
                    </View>
                </Swipeable>
            </TouchableOpacity>

        )
    }


    const ItemSeparator = () => {
        return (
            <View
                style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: '#C8C8C8',
                    width: '92%',
                    height: 0.5,

                }}
            />
        );
    };

    

    useEffect(() => {
        setFilteredDataSource(DATA);
        setMasterDataSource(DATA);
    }, []);

    const searchFilterFunction = (text) => {

        setFilteredDataSource(DATA);
        setMasterDataSource(DATA);

        if (text) {
            const newData = masterDataSource.filter(function (item) {

                const itemData = item.Title
                    ? item.Title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={portrait.container}>
            <View style={portrait.sectionStyle}>
                <MaterialCommunityIcons style={portrait.imageStyle} name="magnify" color={'#A4A4A4'} size={26} />
                <TextInput
                    style={portrait.textInputStyle}
                    onChangeText={(text) =>{
                        searchFilterFunction(text)
                    }}
                    value={search}
                    underlineColorAndroid="transparent"
                    clearButtonMode={'while-editing'}
                />
            </View>

            <VirtualizedList
                data={filteredDataSource}
                initialNumToRender={4}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <Item id={item.id} title={item.title} year={item.year} type={item.type} poster={item.poster} />
                )}

                keyExtractor={(item, index) => {
                    return item.id;
                }}
                getItemCount={getItemCount}
                getItem={getItem}
            />

        </SafeAreaView>
    );
}

const portrait = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },

    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 'auto',
        justifyContent: 'center',
        marginHorizontal: 0,
        padding: 20,
    },

    title: {
        fontSize: 18,
    },

    poster: {
        width: 100,
        height: 170,
        borderRadius: 2,
        borderColor: 'white',
        borderWidth: 1,
    },

    posterViev: {
        flex: 2
    },

    textViev: {
        flex: 10,
        marginLeft: "20%",
    },

    

    details: {
        fontSize: 16,
        marginTop: 10,
        color: '#737373'
    },

    // Search style section

    textInputStyle: {
        flex: 1,
        height: 40,
        margin: 2,
        borderRadius: 10,
        
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D4D4D4',
        opacity: 0.6,

        height: 38,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 3,
    },

    imageStyle: {
        margin: 5,
        
    },

    // Text Styles (actually at Poster Info component)

    baseText: {
        color: '#949494',
        fontWeight: '600',
        fontSize: 15,

    },

    innerText: {
        color: 'black',
        fontWeight: '400',
    },

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: 'white'
    },

    infoImageSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',

        // shadow
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },

    infoImage: {
        width: 380,
        height: 600,

    },

    rightAction: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E72016',

    },

    actionText: {
        color: '#fff',
        padding: 20,
        textAlign: 'right'
    }
});

const landscape = StyleSheet.create({
    textViev: {
        marginRight: 20,
        flex: 10,
        marginLeft: -20
    },

    poster: {
        width: 70,
        height: 120,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },

    details: {
        fontSize: 16,
        marginTop: 10,
        color: '#737373'
    },
})
