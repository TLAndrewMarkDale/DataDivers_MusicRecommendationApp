export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/';
const clientID = "1df3f4cfc56a4762be8a26b621e584cc";
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