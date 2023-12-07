
# Data Divers: Music Recommendation App
The GitHub respository for the Data Divers: Music Recommendation App capstone project

Tech Lead: Andrew Mark Dale || 100491442<br />
Team Member: Abednego Ndegwa || 100941581<br />
Team Member: Ashutosh Pandey || 100941194<br />
Team Member: Darren Saguil || 100458141<br />
Team Member: Nikhil Lohar || 100925168

## Application name: RecNN

Reasoning: Portmanteau of Recommendation + Nearest Neighbours and a play on reckoning. Since we're calculating or estimating recommendations for a particular song, we feel this is perfect.

Most of the work has been done without constantly uploading to GitHub. We will correct this for future portions of the project.

Uploaded documents:
Kick-Off Meeting PowerPoint, MVP PowerPoint

## **MVP**
To run the project:

Get the code by either cloning this repository using git

    git clone https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp.git


... or [downloading source code](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/archive/refs/heads/dev.zip) as a zip archive

## Front-end

Demo : http://soundsuggest.online

To use this demo, please ensure that you set up the back-end as specified below. The back-end is still hosted locally.

###  Prerequisites

You will need [Node.js](https://nodejs.org) version 18.0 or greater installed on your system.

### Setup

Once downloaded, open the terminal in the project directory and navigate to music-recommendation-frontend , and install dependencies with:

    npm install

After all the dependencies is being installed. Then start the frontend app with:

    npm run dev

This hosts the front-end on http://localhost:3000/.

### Spotify Login ID and Password

Email : **aidi10032023@gmail.com**

Password : **aidi2023**

### Screenshots

### Phase 1 (MVP)

**Home page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Home.png)

**Home with search result**
![When a user enter upto 3 letter the song suggestion are been showed which contains those word](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Home%20with%20search%20bar.png)

**Recommendation page**
![After selecting first song from search result we got the following recommendation using KNN algorithm](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Recommendation.png)


### Phase 2 (MMP)

**Login page**
![Login page with spotify web login](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/1.png)

**Home page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/2%20after%20login.png)

**Song Recommendation Page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/3%20song%20selection.png)

**Song Added to Playlist Page**
![Songs selected from recommended list section and added to playlist and also entered playlist name](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/4%20songs%20added%20to%20playlist.png)

**Clicked on Create playlist Button**
![Spotify API request have been called to create playlist](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/5%20Sent%20request%20for%20playlist%20creation.png)

**Playlist Create successfully**
![A Dialog has been shown after successful playlist creation ](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Playlist%20Create%20successfully.png)

## Back-end

###  Prerequisites

You will need [Python](https://www.python.org/downloads/) version 3.10.12 or greater installed on your system

### Setup

Once downloaded, open the terminal in the project directory and navigate to music-recommendation-backend , and install dependencies with:

    pip install flask
    pip install numpy
    pip install flask-cors
    pip install scikit-learn
    pip install sklearn


After all the dependencies is being installed. Then start the backend app with:

    python flask_NN.py

This hosts the python back-end on http://localhost:5000

Now that the server is running, feel free to use the demo or the locally built project!
