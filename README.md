<img src="public/header_img.png">

## About

This is a web app for discovering new underground artists/bands on Spotify and Bandcamp.\
Uses the Spotify web API to sort artists/bands by popularity and recent sales number to sort bandcamp artists/bands.\
If you want to submit a new profile, use the 'submit' page.

[Check out the website](https://my-future-favorite.netlify.app/)

## How it works

[Everyday](https://github.com/Ricardo-Silva91/my-future-favorite/actions/workflows/maintain.yml), the artits/band data is fetched from the Spotify API and Bandcamp ([here](https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/src/interfaces/data.interface.ts#L18)'s some more information about the artist data).\
In the app, you can then click the big play button get suggested a new artist.\
This artist will be chosen according to either their popularity score (set by Spotify) or the number of recent sales (according to Bandcamp).\
You will only get artists/bands the have the lowest score, to promote the discovery of underground artists 😉.\
If multiple artists have the same lowest score, you will get a random one out of the bunch.\
After getting the chosen artist, you can either click the artists profile picture or any of the 'Releases' cards and it will take you to their page 😁.\
You can also block artists you don't like so they won't get recommended to you again.

## Contributing

This project is open-source, so you can check all the code involved here.\
Pull requests with fixes and improvements are always welcome.\
Also, if you have some ideas for improvement that you want to discuss, please use the issues section 😊.

## Final Note

This is just an idea, and wether it works or not depends on how many people support it (both artists and fans), So if you're an artist, don't just submit your profile to get more streams, actually engage with the app and support other underground artists.\
And if you're a fan, don't give up on this project just because you didn't find your actual 'Future Favorite' on the first try 😅, try it again and you'll get something you really like, that you wouldn't find otherwise 😁.

