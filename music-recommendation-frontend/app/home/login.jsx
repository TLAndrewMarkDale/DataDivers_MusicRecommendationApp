export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/';
const clientID = "9d059b7d390246718b9a471eed49dc39";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-modify-playback-state",
    "user-read-playback-state"
];
export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
export const getTokenFromURL = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial
    }, {})
};