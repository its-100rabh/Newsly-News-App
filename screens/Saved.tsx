import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Cards from '../components/Cards';
import { NewsData } from '../utils/types';


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

const storeData = async (value: string) => {
    const data: NewsData[] = (await getData()) || [];
    // const passedValue = JSON.parse(value);
    // !data.find((d) => d.title === value.title) ? data.push(value) : data;
    const filtered = data.filter((news) => news.title !== value)

    try {
        const jsonValue = JSON.stringify(filtered);
        await AsyncStorage.setItem('@newsData', jsonValue);
    } catch (e) {
        return alert("Something Wrong");
        // saving error
    }
};


const Saved = (props: ComponentNavigationProps) => {
    const focuses = useIsFocused();
    const [SavedNews, setSavedNews] = useState([])
    useEffect(() => {
        getData().then((data) => setSavedNews(data)).catch(() => alert("Something is Wrong"))
    }, [focuses])

    const deleteHandler = async (val: string) => {
        await storeData(val);
    }

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Saved"></Appbar.Content>
            </Appbar.Header>
            {/* <FlatList 
                style={styles.flat}
                data={newsData} renderItem={({ item }) => (<Cards
                    // category={item.category}
                    content={item.content}
                    navigation = {props.navigation}
                    // country={item.country}
                    // creator={item.creator}
                    description={item.description}
                    image_url={item.image_url}
                    // keywords={item.keywords}
                    // language={item.language}
                    // link={item.link}
                    // pubDate={item.pubDate}
                    // source_id={item.source_id}
                    title={item.title}
                    // video_url={item.video_url}
                />)} /> */}
            {SavedNews && SavedNews.length > 0 && SavedNews.map((data: NewsData) => <Cards handleDelete={deleteHandler} content={data.content} title={data.title} image_url={data.image_url} description={data.description || ""}
                key={data.title} navigation={undefined as any} route={undefined as any} />)}
        </ScrollView>
    )
}

export default Saved

const styles = StyleSheet.create({})