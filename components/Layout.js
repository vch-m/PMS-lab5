import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';


const Layout = ({ layout, width, height}) => {

    const styles = StyleSheet.create({
        row: {
            flexDirection: "row",
        },

        column: {
            flexDirection: "column",
        },

        imageStyle: {
            height: "100%",
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

        }
    })

    const imageBoxStyle = (size = 1) => {
        if (size === 1) {
            return(
                {
                    width: width,
                    height: height,
                    borderWidth: 1,
                    borderColor: 'white',
                }
            )
        } else if (size === 2) {
            return(
                {
                    width: width * 2,
                    height: height * 2,
                    borderWidth: 1,
                    borderColor: 'white',
                }
            )
        } else if (size === 3) {
            return (
                {
                    width: width * 3,
                    height: height * 3,
                    borderWidth: 1,
                    borderColor: 'white',
                }
            )
        }
    }

    const ImageBox = (uri, style = imageBoxStyle()) => (
        <View style={style}>
            <Image
                style={styles.imageStyle}
                source={uri}
            />  
        </View>
    );


    return (
        <View>
            <View style={styles.row}>
                <View style={styles.column}>
                    {layout[0] && ImageBox(layout[0], imageBoxStyle(3))}
                    <View style={styles.row}>
                        {layout[3] && ImageBox(layout[3], imageBoxStyle(1))}
                        {layout[4] && ImageBox(layout[4], imageBoxStyle(1))}
                        {layout[5] && ImageBox(layout[5], imageBoxStyle(1))}
                    </View>
                    
                </View>
                <View style={styles.column}>
                    {layout[1] && ImageBox(layout[1], imageBoxStyle(2))}
                    {layout[2] && ImageBox(layout[2], imageBoxStyle(2))}
                </View>
            </View>
        </View>
    );
};



export default Layout
