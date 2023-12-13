import { promises as fs } from 'fs';

export const POST = async(request) => {
    const { id } = await request.json()

    try {

        const response = await fetch('/regeneraterecommendations', {
            method: 'POST',
            body: {track_id : id}
        })

        console.log('Hello its working')

        if(response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {status: 200})
        }else { 
            return new Response('No Okay', {status: response.status})
        }

        // const file = await fs.readFile(process.cwd() + '/public/music2.json', 'utf-8');
        // const data = JSON.parse(file)

        // const sortedList = data.sort((a,b) => a.pop > b.pop ? -1 : 1)
        

        
    }catch(error) {
        return new Response('NOT OK', {status: 500})
    }
}