# File-Sharer
Application for sharing files. You can upload and then download those images using mongodb from the server, upon which said files are sent to the client side for downloading. Interface could use some work, but the application is functional. I plan to continue working on this when I have time.

In order to test, you need to run npm install and then do that again in client. Then npm start on the server end, and yarn start on the client end. Make sure to start the server side first, then client. Finally, you will need to create todl and toup folders on the root.

You need to create a .env file, containing a FILE_DB_URI, which will link to your mongodb database. 
