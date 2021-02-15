
# Bygone Note
  Take some notes for old times' sake

See the [Live](https://pillrz.herokuapp.com/#/) demo or [download](https://github.com/dabaojian1992/Bygone_Note/archive/master.zip) to your local machine. 

### Index

* [Background Info](#how-it-started)

* [Tech Stack](#tech-stack)

* [Features](#features)

* [Development Process](#development-process)
  * [Instant Autosave](#instant-autosave)
  * [Searching based on multiple tags](#searching-based-on-multiple-tags)
  * [High Speed Search](#high-speed-search)
* [Design Trivia](#design-trivia)
* [Local Deployment](#quick-start-for-local-deployment)

![sessions](https://github.com/dabaojian1992/Bygone_Note/blob/master/gifs/session.gif)


## How it Started

[Evernote](https://evernote.com/) used to be my favourite notes taking app back in high school. As an influx of newly created notes taking apps rushes to the marketplace, however, Evernote's features have become somewhat obsoleted in the face of, for example, Roam Research's [bi-directional links](https://www.roamtips.com/home/what-are-bi-directional-links-and-tags-in-roam-research#:~:text=Bi%2Ddirectional%20links%20are%20created,K%20(Ctrl%2DK))(my personal favourite) and Notion's [Wiki](https://www.notion.so/guides/tag/wiki).

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
  Traditionally, autosave is executed using deboucing method - the saving function would be invoked between time intervals paced by a ```setTimeout()``` method.
  
  However, when the database traffic gets clusterd, initiating a database query per time interval set by the ```setTimeout()``` method would cause a delay while a user is typing, or even worse, cause permnant data lost.
  
  Lagging has forced some of the Evernote users to turn off the autosave feature, and many more struggled to 'fine tune' a perfect time interval without interupting typing.
  
  I learned about websocket when I was making a real time chat app（check it out [here](https://github.com/dabaojian1992/Pillar)) and started wondering if it could be exploited to help Bygone Note's autosave feature with a few adjustments. Below is how I used websocket to achieve instant autosave without interuption: 
  * Upon mounting, the websocket will be connected in a ```useEffect``` hook in the [editor component](https://github.com/dabaojian1992/Bygone_Note/blob/master/frontend/components/notes_taking_components/notes/editor_using_hooks.jsx): 
  ```js
      const [currentChannels, setCurrentChannels] = useState(null);

      const context = useContext(ACContext)
      //ACContext is the context variable created in the root component using createContext()
      //then, further passed down to the child components using the redux Provider
      
      
      useEffect(() => {
        const c = context.subscriptions.create({
            channel: 'NotesChannel',
            id: props.noteId
        }); 
        ...
        
        console.log(`Note ${props.id} is connected`);
        setCurrentChannels(c);

        ...
        return () => {
            console.log(`Note ${props.id} is disconnected`)
            c.unsubscribe()
        };
    }, []);
  ```
  
  * Handling [the subscription and receipt of websocket data](https://github.com/dabaojian1992/Bygone_Note/blob/master/app/channels/notes_channel.rb) in the backend: 
  ```ruby
    class NotesChannel < ApplicationCable::Channel
      def subscribed
        stop_all_streams
        stream_for = Note.find_by(id: params['id'])
      end
      
      def receive(data)
        @note = Note.find_by(id: data['id'])
        @note.update(data) 
      end
      #instead of broadcasting the received data, here the code simply saves the data to the database
      #had it been a chat app, I would've put a broadcast_to inside of the receive function
      
      def unsubscribed
        stop_all_streams
      end
    end
  ```
  * Another unique feature of Bygone Note is [the synchronous update](https://github.com/dabaojian1992/Bygone_Note/blob/master/frontend/components/notes_taking_components/notes/editor_using_hooks.jsx) in the editor and the note item to the left of editor(by comparison below is what it looks like without synchronous update). This was done by wrapping the ```setState``` method in a callback function and then passing the callback down to the child component (editor component) where it will be invoked. By doing so, a child component will be able to update the parent component's state at ease. 
  ![sync]()

### Searching based on multiple tags
  ![tag]()
  Evernote allows tag search, but it's cumbersome to use. 
  Therefore, I expedited the whole process by making it as simple as a mouse click. 
  To achieve this, I used ```useLocation``` and ```useHistory``` hooks from React Router DOM: 
  ```js
  const location = useLocation();
  const history = useHistory();
  
  function tagSelection(tagId, tag){ 
        if(!tagSelected.includes(tag)){ 
            let current_path = location.pathname;
            history.push(`${current_path}/tag/${tagId}`);
            setTagSelected([...tagSelected, tag]);
        };
    };
    //the above function gets invoked when the tag is selected
    
    function removeTag(t){ 
        let ind = null;
        let allTags = tags;
        let current_path = location.pathname.split('/');
        let index = tagSelected.indexOf(t);
        setTagSelected(tagSelected.filter((_,i) => i !== index));
        Object.values(allTags).forEach(tag=>{
            if(tag.title === t){
                ind = tag.id;
            };
        });
        if(current_path.includes('tag')){
            let toBeDeletedTagId = current_path.indexOf(ind.toString());
            current_path.splice(toBeDeletedTagId,1);
            current_path.splice(toBeDeletedTagId-1,1);
            history.replace(`${current_path.join('/')}`);
        };
    };
    //the above function gets invoked when the already selected tag gets clicked
  ```
### High Speed Search
  ![search]()
  Evernote's searchbar is notoriously slow. 
  To speed things up, I used [Boyer-Moore](https://www.youtube.com/watch?v=4Xyhb72LCX4&t=17s) algorithm behind the scene and added scrolltoView(): 
  ```js
      function boyer_moore(arr, sub) {
        //arr is the note list fetched from backend upon mounting
        //sub is the user input being searched
        
        let processedNotes = [];
        arr.forEach(note => {

            let str_ind = Object.keys(note)[0];
            let body = Object.values(note)[0][0];
            let title = Object.values(note)[0][1];
            
            let skip;
            let bad_char = new Array(265).fill(-1);

            for (let t = 0; t < sub.length; t++) {
                const index = sub[t].charCodeAt();
                bad_char[index] = t;
            };

            for (let i = 0; i <= body.length - sub.length; i += skip) {
                
                skip = 0;
                for (let j = sub.length - 1; j >= 0; j--) {
                    
                    if (sub[j].toLowerCase() !== body[i + j].toLowerCase()) {
                        const asciiIndex = bad_char[body[i + j].charCodeAt()];
                        skip = 1 > j - asciiIndex ? 1 : j - asciiIndex;
                        break;
                    };
                };
                if (skip === 0) {
                    
                    const matchingNoteWithIndex = {};
                    matchingNoteWithIndex[str_ind] = [body, i, title];
                    if(!processedNotes.includes(matchingNoteWithIndex)){
                        processedNotes.push(matchingNoteWithIndex);
                    };
                    skip++;
                };
            };
        });
        
        return processedNotes;
    };
  ```
## Design Trivia 
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
