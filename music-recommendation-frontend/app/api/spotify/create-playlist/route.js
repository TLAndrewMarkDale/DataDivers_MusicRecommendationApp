export const POST = async(request) => {
    const {playlist_name, track_list, userData, token } = await request.json()

    const headers = {
        'Authorization' : 'Bearer ' + token,
        'Content-Type' : 'application/json'
    }

    try {
        const response = await fetch(`users/${userData.user_id}/playlists`, {
            method: 'POST',
            body: {
                'name' : playlist_name,
                'description' : 'Test Playlist Description',
                'public' : false
            },
            headers: headers
        })

        if(response.ok) {
            const data = await response.json();
            const playlistId = data.id

            const response2 = await fetch(`playlists/${playlistId}/tracks`, {
                method: 'POST',
                body: {
                    'uris' : track_list.map(item => `spotify:track:${item.track_id}`),
                    'position' : 0,
                },
                headers: headers
            })

            if(response.ok) {
                const data = await response.json();
                return new Response(JSON.stringify(data), {status: 200})
            } else {
                return new Response('No Okay', {status: response.status})
            }
        }
    }catch(error) {
        return new Response('NOT OK', {status: 500})
    }
}