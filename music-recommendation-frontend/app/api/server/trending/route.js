import { promises as fs } from 'fs';

export const GET = async(request, { params }) => {
        // const file = await fs.readFile(process.cwd() + '/public/music2.json', 'utf-8');
        // const data = JSON.parse(file)

        // const sortedList = data.sort((a,b) => a.pop > b.pop ? -1 : 1)
        

        // return new Response(JSON.stringify(sortedList.slice(0,10)), {status: 200})
        try {
            const response = await fetch('/top10', {
                method: 'GET',
            })

            if(response.ok) {
                const data = await response.json();
                return new Response(JSON.stringify(data), {status: 200})
            }else { 
                return new Response('No Okay', {status: response.status})
            }
    }catch(error) {
        return new Response('NOT OK', {status: 500})
    }
}