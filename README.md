# Chaturanga

A global chat messenger that allows users to create browser chat threads linked to a specific URL.
Chaturanga is named after a foundational yoga pose that establishes a state of flow. We hope it will inspire users to communicate more clearly.
The basic element is a Websocket-based chat client that connects to a central server.  The server does two things: 1) it updates the chat thread as each user adds new comments  and 2) maintains a MongoDB database of all the comments ever made, organized by thread. This allows the app's behavior to be customized for individual users: for example, at login a user is only shown the ten comments prior to their login time.
The main technologies we used is Websockets (https://www.websocket.org/), which allows providing full-duplex communication channels over a single TCP connection: Whenever a request is made through HTTP, it creates a connection at the client(browser) and closes it once the response from the server is received. In contrast, Websockets opens a connection between client and server that remains open until it's closed--which allows for frequent requests and responses to be managed more efficiently.
We used MongoDB because our data didn't really require the kind of strict interrelation that a SQL database has.
The most immediate expansion will include changing the display of the chat window from a browser tab to a pop-up window, so that the chat can be displayed on the URL it's actually linked to instead of on another tab.  The most obvious way to do this is by making it a browser extension. Some form of user authentication is also obviously necessary for an eventual real-world deployment.
Namaste!

