//@ts-nocheck
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ComponentNavigationProps, NewsData } from '../utils/types'
import DetailsCard from '../components/DetailsCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@newsData');
        if (value !== null) {
            return JSON.parse(value)
            // value previously stored
        }
    } catch (e) {
        alert("Something Wrong!! Try Again")
        return;
        // error reading value
    }
};



const storeData = async (value: NewsData) => {
    const data: NewsData[] = (await getData()) || [];
    // const passedValue = JSON.parse(value);
    !data.find((d) => d.title === value.title) ? data.push(value) : data;

    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('@newsData', jsonValue);
    } catch (e) {
        return alert("Something Wrong");
        // saving error
    }
};






const NewsOverview = (props: ComponentNavigationProps) => {
    const { title, content, image_url } = props?.route?.params as NewsData;
    const navigation = useNavigation();

    // const handleSavePress = () => {
    //     // Implement your save logic here
    // };

    React.useLayoutEffect(() => {
        // Set the header options using setOptions
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => storeData({ title, content, image_url })}>
                    <Text>Save</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]); // Make sure to include navigation in the dependency array

    return (
        <DetailsCard content={content} image_url={image_url} title={title} />
    )
}

export default NewsOverview

const styles = StyleSheet.create({}) 