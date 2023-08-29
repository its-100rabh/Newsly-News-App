//@ts-nocheck

import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Chip, Button, useTheme } from 'react-native-paper';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import Cards from '../components/Cards';

const categories = ["Technology", "Sports", "Politics", "Health", "Business"];
const API_KEY = "pub_26024945a293c29908bc869e76152aafef515";

const Home = (props:ComponentNavigationProps) => {
    // const Theme = useTheme()
    const [newsData, setnewsData] = useState<NewsData>([])
    const [selectedCategories, setselectedCategories] = useState([]);
    const [nextPage, setnextPage] = useState("")
    const handleSelect = (val: string) => {
        setselectedCategories((prev: string[]) =>
            prev.find(p => p === val)
                ? prev.filter((cat) => cat !== val)
                : [...prev, val]);
    }



    const handlePress = async () => {
        const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en,hi${selectedCategories.length > 0 ? `&category=${selectedCategories.join()}` :
            ""
            }${nextPage?.length > 0 ? `&page=${nextPage}` : ''}`;
        console.log(URL);
        try {
            await fetch(URL).then((res) => res.json()).then((data) => {
                setnewsData((prev) => [...prev, ...data.results])
                setnextPage(data.nextPage)
            });
        }
        catch (error) {
            console.log(error);
        }

    }
    // console.log(Object.keys(newsData[0]));

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Home"></Appbar.Content>
            </Appbar.Header>
            <View style={styles.filerscontainer}>
                {categories.map((cat) => (
                    <Chip key={cat}
                        mode='outlined'
                        style={styles.chipIten}
                        textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
                        showSelectedOverlay
                        selected={selectedCategories.find((c) => cat === c) ? true : false}
                        onPress={() => handleSelect(cat)}
                    >
                        {cat}
                    </Chip>
                ))}
                <Button mode="contained" style={styles.button} labelStyle={{ fontSize: 18, margin: "auto", marginTop: 14 }} icon={"sync"} onPress={handlePress}>REFRESH</Button>
            </View>
            <FlatList onEndReached={() => handlePress()}
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
                />)} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filerscontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
    },
    chipIten: {
        marginHorizontal: 5,
        marginVertical: 5,
    },
    button: {
        maxWidth: 400,
        padding: 0,
        maxHeight: 40,
    },
    flat: {
        flex: 1,
        height: "auto",
    },
})