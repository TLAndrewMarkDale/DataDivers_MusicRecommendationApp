"use client";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL, loginURL } from "./loginUtils";
let instance;
let spotify;
let userData;
const baseUrl = "http://localhost:3000";

class SpotifyUtility {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    } else {
      this.init();
    }
  }

  init() {
    instance = this;
    spotify = new SpotifyWebApi();

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("spotify-token");
      if (token) {
        spotify.setAccessToken(token);
        this.fetchUserData();
      } else {
        const tempToken = getTokenFromURL().access_token;
        if (tempToken) {
          localStorage.setItem("spotify-token", tempToken);
          spotify.setAccessToken(tempToken);

          this.fetchUserData();
        }
      }
    }
  }

  fetchUserData() {
    const token = localStorage.getItem("spotify-token");
    const header = new Headers();
    header.set("Authorization", `Bearer ${token}`);
    header.set("Content-Type", `application/json`);

    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: header,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(" Response user data : ", data);
        localStorage.setItem("user", JSON.stringify(data));
      });
  }

  getUserData() {
    return localStorage.getItem("user");
  }

  getToken() {
    return localStorage.getItem("spotify-token");
  }

  getTrackImage(track) {
    spotify.searchTracks(track, { limit: 1 }).then((data) => {
      // return data.tracks.items[0].album.images[0].url;
      console.log("Data : ", data);
    });
  }

  getSpotifyInstance() {
    return spotify;
  }

  checkIfLogin() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("spotify-token") ? true : false;    
    }else {
      return spotify.getToken() ? true : false;
    }
  }

  loginToSpotify(redirectUrl) {
    console.log("Redirect URl ", baseUrl + redirectUrl);
    return loginURL(baseUrl + redirectUrl);
  }

//   makePlaylist(name, description, tracks) {
//     return spotify
//       .createPlaylist(localStorage.getItem("user").user_id)
//       .then((playlist) => {
//         console.log("Playlist : ", playlist);
//         spotify.changePlaylistDetails(playlist.id, {
//           name: name,
//           description: description,
//         });
//         return spotify.addTracksToPlaylist(playlist.id, tracks).then((data) => {
//           console.log("Data : ", data);
//           return playlist;
//         });
//       });
//   }

  clearSpotify() {
    localStorage.removeItem("spotify-token");
    localStorage.removeItem("user");
    spotify = new SpotifyWebApi();
  }

  async createPlaylist(body) {
    const { playlist_name, track_list } = body;

    const token = localStorage.getItem("spotify-token");
    const header = new Headers();
    header.set("Authorization", `Bearer ${token}`);
    header.set("Content-Type", `application/json`);

    return fetch(
      `https://api.spotify.com/v1/users/${
        JSON.parse(this.getUserData()).id
      }/playlists`,
      {
        method: "POST",
        body: JSON.stringify({
          name: playlist_name,
          description: "Test Playlist Description",
          public: false,
        }),
        headers: header,
      }
    );
  }

  async addTracksToPlaylist(body) {
    const { playlist_id, track_list } = body;

    const token = localStorage.getItem("spotify-token");
    const header = new Headers();
    header.set("Authorization", `Bearer ${token}`);
    header.set("Content-Type", `application/json`);

    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: "POST",
      body: JSON.stringify({
        uris: track_list.map((item) => `spotify:track:${item.track_id}`),
        position: 0,
      }),
      headers: header,
    });
  }
}

let spotifyUtilityInstance = Object.freeze(new SpotifyUtility());

export default spotifyUtilityInstance;
