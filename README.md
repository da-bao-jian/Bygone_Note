
# Bygone Note

Take notes for old times' sake

See the [Live](https://pillrz.herokuapp.com/#/) demo or [download](https://github.com/dabaojian1992/Bygone_Note/archive/master.zip) to your local machine. 



![sessions](https://github.com/dabaojian1992/Bygone_Note/blob/master/gifs/session.gif)


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

## Development Process

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


## Code executions

* Instant Autosave
 ![dashboard](https://github.com/dabaojian1992/Pillar/blob/main/gifs/Screenshot%202021-02-07%20235445.png)
  * Traditionally, autosave is executed using deboucing method - the rate of the saving function would be invoked between time intervals paced by a ```setTimeout()``` method;
  * However, when the database traffic gets clusterd, initiating multiple database queries per time interval set by the ```setTimeout()``` method would cause a delay when a user is typing, or even worse, cause permnant data lost; 
  * Lagging has forced some of the Evernote users to turn off the autosave feature, and many more struggled to 'find tune' a perfect time interval without interupting typing; 
  * I learned about websocket when I was making a real time chat app（check it out [here](https://github.com/dabaojian1992/Pillar), and I thought it could be exploited to help with autosave with some adjustments. Below is how I used websocket to achieve instant autosave without interuption: 
  
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
* chartooms operations
  * For chatrooms, we came up two approaches to assign messages upon mounting:（1）Fetching the messages to the frontend all at once and filtering the messages according to each message's foreign key that denotes the chatroom it belongs to; （2）alternatively, saving the messages to the parent chatroom directly upon users sending the message so that when everytime a components mounts, no extra time will be wasted. 
  * From an user experience standpoint,["a delay between 100 and 300 milliseconds is perceptible; a delay between 300 and 1,000 milliseconds makes the user feel like a machine is working, and if the delay is above 1,000 milliseconds, your user will likely start to mentally context-switch"](https://designingforperformance.com/performance-is-ux/#:~:text=A%20delay%20of%20less%20than,start%20to%20mentally%20context%2Dswitch)
  * Therefore, we went with the latter approach for the obvious reason: as number of message grows,relying message assignment purely in the frontend would delay chatroom load time. 
  * Below is how we setup the backend code to save the message diretcly into its parent chatroom: 
  
  ```js
  socket.on("Create Message", msg => {
    connect.then(db => {
      try {

        const message = new Message({
          message: msg.message,
          sender: msg.userId,
          room: msg.room,
          username: msg.username,
        });

        message.save((err, document) => {
          //record error, if any
          if (err) return res.json({ success: false, err });
          io.emit(`MTC_${document.room._id.toString()}`, document);
           
          //add to a rooms array of messages
          Room.findOneAndUpdate(
            { _id: document.room._id },
            { $push: { messages: document } },
            (error, success) => {
               
              if (error) {
                console.log("Add message to room array failed: " + error);
              } else {
                io.emit(`MTC_${document.room._id.toString()}`, document);
                console.log("Username: "+message.username);
                 
              }
            }
          )
            
        })
      } catch (error) {
        console.log(error);
      }
    })

  })
  ```
* cross device state preservation
  * One of Pillar's key features is to preserve the chatroom's state across sessions. In other words, a closed chatroom should remain closed if an user logs back in after logging out. 
  * To achieve this, we came up with the design to save the chatroom's state to the database upon an user open/close a room. 
  * Below is the code where we save the chatroom state in the backend: 
  ```js
  router.patch('/closedfor', (req, res) => {
    REQ = req; 
    Room.findByIdAndUpdate(req.body.roomId)
    .exec().then(room => {
      if (room.closedFor.includes(req.body.email) ){
        room.closedFor = room.closedFor.filter(match => (match != req.body.email))
    }
    else{
        room.closedFor.push(req.body.email)
    }
    room.save().then(saved => {
      Room.find({})
        .populate({
          path: 'messages',
          model: 'Message',
          populate: {
            path: 'sender',
            model: 'User'
          }
        }).populate({
          path: 'users',
          model: 'User'
        }) 
        .exec((err, rooms) => {
          if (err) {
            res.status(404).json({ noroomsfound: 'No rooms found' });
          } else {
            let roomList = filterRooms(rooms, req.body.id);
            res.json(roomList);
          }

        })
    }) 
    })
  });
  ```
* algortithmic solution for searchbar
  * One of the most complained features of Slack is its search being slow. To create a more efficient searchbar, we customized our own [Boyer-Moore algotithm](https://www.youtube.com/watch?v=4Xyhb72LCX4) implementing its bad character rule. 
  * Below is the code where we implement the algorithm:
  ```js
  boyer_moore(arr, sub) {
        let filteredMessages = [];
        arr.forEach(room => {
            for (let r = 1; r < room.length; r++) {//iterating thru messages in each room
                if (room[r].slice(0, 8) !== 'https://' && room[r].slice(room[r].length - 4, room[r].length) !== '.gif' &&
                    room[r].slice(0, 4) !== '<img' && room[r].slice(room[r].length - 1, room[r].length) !== '>') {//skipiing gifs
                    room[r] = this.removeEmojis(room[r]);
                    let skip;
                    let bad_char = new Array(265).fill(-1);

                    for (let t = 0; t < sub.length; t++) {//constructing a bad character table for each chatacter in the substring at its corresponding place in 256 ASCII characters
                        const index = sub[t].charCodeAt();
                        bad_char[index] = t;
                    };

                    for (let i = 0; i <= room[r].length - sub.length; i += skip) {//compare each character from substring to string, if mismatch, then shift to the next    matching character; if no matching character found, shift the entire length of the substring
                        skip = 0;
                        for (let j = sub.length - 1; j >= 0; j--) {
                            if (sub[j].toLowerCase() != room[r][i + j].toLowerCase()) {
                                const asciiIndex = bad_char[room[r][i + j].charCodeAt()];
                                skip = 1 > j - asciiIndex ? 1 : j - asciiIndex;
                                break;
                            }
                        };
                        if (skip === 0) {
                            filteredMessages.push([room[0], r - 1, i]);
                            skip++;
                        };
                    }
                }
            }
        });

        return filteredMessages; 
    };
  ```
