import { type } from 'os';

// import axios, { default:Axios } from "axios";
const {default:Axios} = require('axios');

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const getVideos = async(query) => {
    const params = {
        part: 'snippet',
        maxResults: 2,
        type: 'video',
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        q: query
    }
    
    console.log('YouTube API Key exists:', !!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
    console.log('Searching for:', query);
    
    const resp = await Axios.get(YOUTUBE_BASE_URL + '/search', {params});
    console.log('YouTube response:', resp.data.items);
    return resp.data.items;
}

export default {
    getVideos
}