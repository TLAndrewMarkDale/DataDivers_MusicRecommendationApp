import spotifyUtilityInstance from "@/utils/spotify-utils"

export const GET = async(request, {params}) => {
    




    try {
        console.log('Token : ', spotifyUtilityInstance.getToken())

        const header = new Headers()
        header.set('Authorization', `Bearer ${spotifyUtilityInstance.getToken()}`)
        header.set('Content-Type', `application/json`)

        const response = await fetch(`me`, {
            method: 'GET',
            headers: header
        })

        if(response.ok) {
            const data = response.json()
            
        }
    }catch(error) {
        return new Response('NOT OK', {status: 500})
    }
}