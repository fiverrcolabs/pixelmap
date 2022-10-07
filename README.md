#PixelMap
Technologies- NodeJS,React,MongoDB,SocketIO,XMPP,expressJS

Features of this Web-App

Users with an existing XMPP account on wiuwiu.de can sign in to the application
- After signin in the user can select a pixel on a pixel map, choose a color an confirms the draw
- A user can draw as many pixel as he pixel in his balance.
- Each day every user gets 1 pixel added to the balance.
- When the user draws one pixel, 1 pixel gets removed from his balance
- The update of pixel changes (the pixel map) is live. So if another user draws somewhere a pixel, all user get this change live
- Pixels cannot be overwritten if the current pixel color is the same color the user has chosen to draw
- Pixelmap is having a 100x100 pixels. The pixelmap is defined in a way so that the map can be increased later on. e.g. to to 500x500 pixel map w/o losing the current drawings/pixel colors
- The backend checks and verifys the received request so that no manipulation is possible
