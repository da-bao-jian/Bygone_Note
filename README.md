
# Bygone Note

Take notes for old times' sake

See the [Live](https://pillrz.herokuapp.com/#/) demo or [download](https://github.com/dabaojian1992/Bygone_Note/archive/master.zip) to your local machine. 

[Local Deployment](#quick-start-for-local-deployment)

![sessions](https://github.com/dabaojian1992/Bygone_Note/blob/master/gifs/session.gif)


## How it Started

[Evernote](https://evernote.com/) used to be my favourite notes taking app back in high school. As an influx of newly created notes taking apps rushes to the marketplace, however, Evernote's certain features have become somewhat obsoleted in the face of, for example, Roam Research's [bi-directional links](https://www.roamtips.com/home/what-are-bi-directional-links-and-tags-in-roam-research#:~:text=Bi%2Ddirectional%20links%20are%20created,K%20(Ctrl%2DK))(my personal favourite) and Notion's [Wiki](https://www.notion.so/guides/tag/wiki).

Therefore, I decided to take on the challenge to optimize some of Evernote's original features while having fun to create a notes taking app that brings back the nostalgia. 

## Tech Stack
Frontend:
* [React classes and hooks](https://reactjs.org/);
* [Redux](https://redux.js.org/);

Backend:
* [Rails](https://rubyonrails.org/);

Database:
* [PostgreSQL](https://www.postgresql.org/);

Styling:
* [Node-sass](https://www.npmjs.com/package/node-sass);

Others:
* [RxJS](https://rxjs-dev.firebaseapp.com/) for cross component state sharing;
* [ActionCable](https://guides.rubyonrails.org/action_cable_overview.html) for websocket connections;
* [Quill](https://quilljs.com/) for editor

## Features

### There are 5 features Bygone Note shares with the original Evernote: ##
* Notes CRUD operations;
* Notebook CRUD Operations;
* Tag CRUD operations;
* Autosave;
* Note search

### Here are some of the improvements Bygone Note made based off of Evernote: ###
* Instant autosave using websocket (evernote vs bygone);
* Narrowing search results using tags;
* High speed search result look up. 


## Development process

### Instant Autosave
 ![autosave](https://github.com/dabaojian1992/Bygone_Note/blob/master/gifs/autosave.gif)
  * Traditionally, autosave is executed using deboucing method - the rate of the saving function would be invoked between time intervals paced by a ```setTimeout()``` method;
  * However, when the database traffic gets clusterd, initiating multiple database queries per time interval set by the ```setTimeout()``` method would cause a delay when a user is typing, or even worse, cause permnant data lost; 
  * Lagging has forced some of the Evernote users to turn off the autosave feature, and many more struggled to 'find tune' a perfect time interval without interupting typing; 
  * I learned about websocket when I was making a real time chat app（check it out [here](https://github.com/dabaojian1992/Pillar)), and I thought it could be exploited to help with autosave with some adjustments. Below is how I used websocket to achieve instant autosave without interuption: 
  
    * Below is the code where we fetch data and connect websocket upon mounting:
  ```js
  componentDidMount(){
      
      getRooms(this.props.user.id)
         .then(rooms => {
            this.setState({
               roomsJoined: rooms,
            })
         })
         .then(()=>{
            getAvailableRooms(this.props.user.id)                                
            .then(rooms => {
               this.setState({
                  roomsAvailable: rooms,
               })
            })
            .then(()=>{
               this.setState({all: this.state.roomsAvailable.data.concat(this.state.roomsJoined.data)})
            })
         })
      
      this.socket.on("user left", this.userLeft);
      this.socket.on("user joined", this.userJoined);
      this.socket.on("room deleted", this.roomDeleted);
      this.socket.on("room created", this.roomCreated);
   }
   ```
## Quick start for local deployment

After download and extraction, run the following command in the terminal to install the required dependencies: 
```
gem install && npm install
```
then, run the following command to start the PostgreSQL server: 
  * Mac
  ```
  brew services start postgresql
  ```
  * Linux
  ```
  sudo service postgresql start
  ```
For depoyment on localhost: 
  * run the following commands in two seperate terminals:
  ```
  npm run webpack 
  ```
  ```
  bundle exec rails server
  ```
  **Voila!**

![Splash Page Demo](https://github.com/dabaojian1992/Bygone_Note/blob/master/gifs/splash.gif)
