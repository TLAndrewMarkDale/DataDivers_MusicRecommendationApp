from flask import Flask, render_template, jsonify, request
import pickle
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

neigh = pickle.load(open("music-recommendation-backend\\knn_model_recNN", 'rb'))
training_df = pd.read_csv("music-recommendation-backend\\training_csv.csv")
music_df = pd.read_csv("music-recommendation-backend\\cleaned_music.csv")
search_df = music_df[['track_id', 'artists', 'track_name']].copy()

@app.route('/searchbar', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True, origin='*')
def send_searchbar():
    search_criteria = request.get_data()
    search_criteria = search_criteria.decode()
    found_df = search_df[search_df['artists'].str.contains(search_criteria) or search_df['track_name'].str.contains(search_criteria)]
    found_df = found_df.head(20)
    for index, song in found_df.iterrows():
        json_array.append({'track_id': song['track_id'],
                            'artist': song['artists'],
                            'track': song['track_name'],
                            'pop': int(song['popularity']),
                            'length': int(song['duration_ms']),
                            'genre': song['track_genre']})
    response = jsonify(json_array)
    return response


@app.route('/top10', methods=['GET'])
@cross_origin(supports_credentials=True, origin="*")
def send_topten():
    topten = music_df.nlargest(10, 'popularity')
    json_array = []
    for index, song in topten.iterrows():
        json_array.append({'track_id': song['track_id'],
                           'artist': song['artists'],
                           'track': song['track_name'],
                           'pop': int(song['popularity']),
                           'length': int(song['duration_ms']),
                           'genre': song['track_genre']})
    response = jsonify(json_array)
    return response


@app.route('/recommendations', methods=['POST'])
@cross_origin(supports_credentials=True, origin="*")
def send_recommendations():
    track_id = request.get_data()
    track_id = track_id.decode()
    nbrs = neigh.kneighbors(training_df.iloc[music_df.loc[music_df['track_id'] == track_id].index[0]].values.reshape(1,-1), n_neighbors=11, return_distance=False)
    json_array = []
    for nbr in nbrs[0][1:]:
        row = music_df.iloc[nbr]
        json_array.append({"track_id": row["track_id"],
                        "artist": row["artists"],
                        'track': row['track_name'], 
                        'pop': int(row['popularity']),
                        'length': int(row['duration_ms']),
                        'genre': row['track_genre']})
    response = jsonify(json_array)
    return response

if __name__ == '__main__':
    app.run()