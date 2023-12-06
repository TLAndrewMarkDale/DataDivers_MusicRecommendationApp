'use client';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL, loginURL } from "./loginUtils";
let instance;
let spotify;
let userData;
const baseUrl = 'http://localhost:3000';

class SpotifyUtility {
    
    constructor() {
        if(instance) {
            throw new Error("New instance cannot be created!!");
        }else {
            this.init()
        }
    }

    init() {
        instance = this;
        spotify = new SpotifyWebApi()

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('spotify-token')
            if(token) {
                spotify.setAccessToken(token)
                this.fetchUserData()
            }else {
                const tempToken = getTokenFromURL().access_token;
                if(tempToken) {
                    localStorage.setItem('spotify-token', tempToken)
                    spotify.setAccessToken(tempToken)
                    
                    this.fetchUserData()
                }
            }
        }
    }


    fetchUserData() {
        const token = localStorage.getItem('spotify-token')
        const header = new Headers()
        header.set('Authorization', `Bearer ${token}`)
        header.set('Content-Type', `application/json`)

        fetch('https://api.spotify.com/v1/me' , {
            method: 'GET',
            headers: header
        }).then(res => res.json()).then((data) => {
            console.log(" Response user data : ", data);
            localStorage.setItem('user', JSON.stringify(data))
        })
    }

    getUserData() {
        return localStorage.getItem('user')
    }

    getToken() {
        return localStorage.getItem('spotify-token')
    }

    getTrackImage(track) {
        spotify.searchTracks(track, {limit: 1}).then((data) => {
            // return data.tracks.items[0].album.images[0].url;
            console.log('Data : ', data)
          })
    }

    getSpotifyInstance() {
        return spotify;
    }


    checkIfLogin() {
        return spotify.getAccessToken() ? true : false
    }

    loginToSpotify(redirectUrl) {
        console.log("Redirect URl ", baseUrl + redirectUrl)
        return loginURL(baseUrl + redirectUrl)
    } 
}

let spotifyUtilityInstance = Object.freeze(new SpotifyUtility())

export default spotifyUtilityInstance;