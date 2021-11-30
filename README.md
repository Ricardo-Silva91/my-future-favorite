<img src="public/header_img.png">

## About

Web app for discovering new underground artists/bands on Spotify.\
Uses the Spotify web API to sort [this list](https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/src/assets/artists.js) of artists/bands by popularity or monthly followers.\
If you want to submit a new profile, you can check how to do it [here](https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/docs/how-to-submit.md).

[Check out the website](https://my-future-favorite.netlify.app/)

## How it works

When you enter the app, the artits/band data is fetched from the Spotify API ([here's](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist) some more information about the artist data).\
You can then click the big play button get a new artist.\
This artist will be chosen according to either their `popularity` score (set by Spotify) or the number of followers they have.\
You will only get artists/bands the have the lowest score, to promote the discovery of underground artists 😉.\
If multiple artists have the same lowest score, you will get a random one out of the bunch.\
After getting the chosen artist, you can either click the artists profile picture or any of the 'Releases' images and it will open it directly on your Spotify app 😁.

## Troubleshooting

Sometimes the network request to Spotify may be slower or not work.
In this case, please refresh the page and try again.

## Contributing

Pull requests with fixes and improvements are always welcome.\
Also, if you have some ideas for improvement that you want to discuss, please use the [issues](https://github.com/Ricardo-Silva91/my-future-favorite/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) section 😊.

## Note


This is just an idea, and wether it works or not depends on how many people support it (both artists and fans),\
So if you're an artist, don't just submit your profile to get more streams, actually engage with the app and support other underground artists.\
And if you're a fan, don't give up on this project just because you didn't find your actual 'Future Favorite' on the first try 😅, try it again and you'll get something you really like, that you wouldn't find otherwise 😁.
