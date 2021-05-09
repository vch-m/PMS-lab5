import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import SwitchSelector from 'react-native-switch-selector';
import { LineChart, PieChart } from "react-native-chart-kit";
import Svg, { Circle } from 'react-native-svg';

let screenWidth = Dimensions.get("window").width;

export default function GraphScreen() {

    const [toggle, setToggle] = useState(true)

    function ChartShow() {

        if (toggle) {
            return (
                <View>
                    <View 
                        style={{ 
                            paddingRight: "10%",
                        }}>
                        <LineChart
                            data={data}
                            width={screenWidth } 
                            chartConfig={chartConfig}
                            height={500}
                            
                            zIndex={1}
                            style={{
                                top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                            }}
                            
                        />
                    </View>
                    <View style={{
                        zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
                    }}>
                        
                    </View>
                </View>
            )
        }

        if (!toggle) {
            return (
                <View>
                    <PieChart
                        data={dataPie}
                        width={screenWidth}
                        height={300}
                        chartConfig={chartPieConfig}
                        accessor={"size"}
                        backgroundColor={"transparent"}
                        hasLegend={false}
                        center={[screenWidth / 4, 0]}
                    />
                    <View style={{
                        zIndex: 1, position: 'absolute', paddingLeft: 90, marginBottom: 100
                    }}>
                        <Svg height="280" width="300">
                            <Circle cx="118" cy="152" r="70" fill="white" />
                        </Svg>
                    </View>
                </View >
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.toggleContainer}>
                <SwitchSelector
                    options={options}
                    initial={0}
                    fontSize={12}
                    textColor={"#000"}
                    selectedColor={'#000'}
                    buttonColor={'#02D6C0'}
                    backgroundColor={"#BCF3F0"}
                    borderColor={"#000"}
                    borderRadius={10}
                    onPress={value => setToggle(value)}
                    style={{ paddingTop: 10 }}
                    buttonMargin={2}
                    
                />
            </View>

            <View style={styles.container}>
                <ChartShow isSwitched={toggle} />
            </View>
        </View>
    );
}

const options = [
    { label: 'Графік', value: true },
    { label: 'Діаграма', value: false },
];

const styles = StyleSheet.create({
    container: {
        flex: 10,
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFF',
        paddingTop: 20
    },
    toggleContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    screen: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFF'
    }
});

const data = {
    fromZero: true,
    datasets: [
        {
            data: [
                Math.log(0.1), Math.log(0.2), Math.log(0.3), Math.log(0.4), Math.log(0.5), Math.log(0.6), Math.log(0.7), Math.log(0.8), Math.log(0.9), Math.log(1),
                Math.log(1.1), Math.log(1.2), Math.log(1.3), Math.log(1.4), Math.log(1.5), Math.log(1.6), Math.log(1.7), Math.log(1.8), Math.log(1.9), Math.log(2),
                Math.log(2.1), Math.log(2.2), Math.log(2.3), Math.log(2.4), Math.log(2.5), Math.log(2.6), Math.log(2.7), Math.log(2.8), Math.log(2.9), Math.log(3),
                Math.log(3.1), Math.log(3.2), Math.log(3.3), Math.log(3.4), Math.log(3.5), Math.log(3.6), Math.log(3.7), Math.log(3.8), Math.log(3.9), Math.log(4),
            ],
            color: (opacity = 1) => `rgba(2, 214, 192, ${opacity})`, 
            strokeWidth: 2
        }
    ],
};

const dataPie = [
    {
        name: "Yellow",
        size: 10,
        color: "yellow",
    },
    {
        name: "Green",
        size: 20,
        color: "green",
    },
    {
        name: "Blue",
        size: 25,
        color: "blue",
    },
    {
        name: "Red",
        size: 5,
        color: "red",
    },
    {
        name: "Purple",
        size: 40,
        color: "#00BFFF",
    },
];

const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 0.9) => `rgba(1, 1, 1, ${opacity})`,

    propsForDots: {
        r: "1",
        strokeWidth: "1",
    }
};

const chartPieConfig = {
    color: (opacity = 1) => `rgba(180, 244, 240, ${opacity})`,
}
