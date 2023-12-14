
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
Kick-Off Meeting PowerPoint, MVP PowerPoint, MMP Powerpoint

### Spotify Login ID and Password

When testing our application, please use the following login credentials. Spotify requires that applications be approved by their team to allow for any user to use the system. Therefore, this is the login credentials approved for our application currently. 

## **Our project is now 100% hosted in the cloud. You can visit our application using the link below with the following login credentials:**

Link : [application link](recnn.app) 

Email : **aidi10032023@gmail.com**

Password : **aidi2023**

We have included screenshots below for the final phase of the project.

## **MVP** & **MMP** & **Final**

You can also run the project locally if you wish:

Get the code by either cloning this repository using git

    git clone https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp.git


... or [downloading source code](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/archive/refs/heads/dev.zip) as a zip archive

## Front-end

###  Prerequisites

You will need [Node.js](https://nodejs.org) version 18.0 or greater installed on your system.

### Setup

Once downloaded, open the terminal in the project directory and navigate to music-recommendation-frontend , and install dependencies with:

    npm install

After all the dependencies is being installed. Then start the frontend app with:

    npm run dev

This hosts the front-end on http://localhost:3000/.

### Screenshots

### Final Phase

**Login Page**
![Login page with spotify web login](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/1.png)

**Spotify Login Page**
![Image showing the login page from Spotify](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/main/screenshot/spotifylogin.png)

**Spotify Grant Access Page**
![Image showing the grant access page from Spotify for RecNN](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/main/screenshot/grantaccess.png)

**Home Page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/2%20after%20login.png)

**Song Recommendation Page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/3%20song%20selection.png)

**Song Added to Playlist Page**
![Songs selected from recommended list section and added to playlist and also entered playlist name](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/final%20recc%20page.png)

**Playlist Created Successfully**
![A Dialog has been shown after successful playlist creation ](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/final%20playlist%20success.png)

**Playlist in the Spotify Client**
![Image showing the created playlist in the actual Spotify client](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/spotifylinkpage.png)


### Phase 2 (MMP)

**Login Page**
![Login page with spotify web login](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/1.png)

**Spotify Login Page**
![Image showing the login page from Spotify](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/main/screenshot/spotifylogin.png)

**Spotify Grant Access Page**
![Image showing the grant access page from Spotify for RecNN](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/main/screenshot/grantaccess.png)

**Home Page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/2%20after%20login.png)

**Song Recommendation Page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/3%20song%20selection.png)

**Song Added to Playlist Page**
![Songs selected from recommended list section and added to playlist and also entered playlist name](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/4%20songs%20added%20to%20playlist.png)

**Clicked on Create Playlist Button**
![Spotify API request have been called to create playlist](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/5%20Sent%20request%20for%20playlist%20creation.png)

**Playlist Created Successfully**
![A Dialog has been shown after successful playlist creation ](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Playlist%20Create%20successfully.png)

**Playlist in the Spotify Client**
![Image showing the created playlist in the actual Spotify client](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/main/screenshot/playlistcreated.PNG)

### Phase 1 (MVP)

**Home page**
![Home page with search bar and 10 trending songs](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Home.png)

**Home with search result**
![When a user enter upto 3 letter the song suggestion are been showed which contains those word](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Home%20with%20search%20bar.png)

**Recommendation page**
![After selecting first song from search result we got the following recommendation using KNN algorithm](https://github.com/TLAndrewMarkDale/DataDivers_MusicRecommendationApp/blob/dev/screenshot/Recommendation.png)

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
