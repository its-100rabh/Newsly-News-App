// "title", "link", "keywords", "creator", "video_url", "description", "content", "pubDate", "image_url", "source_id", "category", "country", "language"

import { NavigationProp, Route, RouteProp } from "@react-navigation/native";



export type NewsData = {
    title: string;
    link?: string;
    keywords?: string[];
    creator?: string;
    video_url?: string;
    description?: string;
    content: string;
    pubDate?: string;
    image_url: string;
    source_id?: string;
    category?: string[];
    country?: string;
    language?: string;
};
export type ComponentNavigationProps<RouteName extends keyof Routes> = {
    navigation: NavigationProp<Routes[RouteName]>;
    route: RouteProp<Routes, RouteName>;
};

// Define your Routes type
export type Routes = {
    NewsOverview: {
        title: string;
        description: string;
        image_url: string;
        content: string;
    };
    // ... other routes
};
