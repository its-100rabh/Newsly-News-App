//@ts-nocheck

import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { Button, Card, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ComponentNavigationProps, Routes } from '../utils/types'; // Make sure to import these correctly

type Props = {
    title: string;
    image_url: string;
    description: string;
    content: string;
    handleDelete?: (val: string) => void
} & ComponentNavigationProps<'NewsOverview'>;

const defaultImageUrls = [
    'https://i.ytimg.com/vi/lO3cDd4Yquw/sddefault.jpg',
    'https://englishworkfromhome.files.wordpress.com/2021/09/breaking-news-poster-design-template-d020bd02f944a333be71e17e3a38db24_screen.jpg',
    'https://static.vecteezy.com/system/resources/previews/001/226/460/original/breaking-news-tv-background-vector.jpg',
    'https://cdn.pixabay.com/photo/2023/06/07/00/24/news-8045904_640.png',
];

const Cards: React.FC<Props> = (props) => {
    const Theme = useTheme();
    const navigation = useNavigation();
    const { image_url, title, description, content } = props;

    const getRandomDefaultImageUrl = () => {
        const randomIndex = Math.floor(Math.random() * defaultImageUrls.length);
        return defaultImageUrls[randomIndex];
    };

    const fallbackImageUrl = image_url ? undefined : getRandomDefaultImageUrl();
    const formattedDescription = description ? description.split('\n')[0] : '';

    const handlePress = () => {
        navigation.navigate('NewsOverview', {
            title: props.title,
            description: props.description,
            image_url: props.image_url,
            content: props.content,
        });
    };


    return (
        <Pressable onPress={handlePress}>
            <Card style={{ marginVertical: 10, backgroundColor: Theme.colors.elevation.level5 }}>
                {image_url ? (
                    <Card.Cover borderRadius={10} source={{ uri: image_url }} />
                ) : (
                    <Image style={{ borderRadius: 10, height: 200 }} source={{ uri: fallbackImageUrl }} />
                )}
                <Card.Title title={title} subtitle={formattedDescription} titleNumberOfLines={1} />
                {props.handleDelete && (
                    <Card.Actions>
                        <Button onPress={() => props.handleDelete && props.handleDelete(props.title)}>DELETE</Button>
                    </Card.Actions>)}
            </Card>
        </Pressable>
    );
};

export default Cards;

const styles = StyleSheet.create({});