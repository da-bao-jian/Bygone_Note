import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {fetchNotes} from '../../../actions/note_actions';
import {selectNoteIndexItem} from '../state_sharing';

export const SearchPad = ({searchPad, toggleSearchPad}) => { 
    let dropDownList = null;

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params  = useParams();
    const match = useRouteMatch();
    const searchNode = useRef();

    const [noteList, setNoteList] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        dispatch(fetchNotes())
        .then((data) => {
            setNoteList(Object.values(data.notes));
            setLoaded(true);    
        }); 
    }, []);
    
    useEffect(() => {
        if(searchPad){
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        };
    },[searchPad]);

    function handleClick(e) {
        if(searchNode.current){
            if(!searchNode.current.contains(e.target)){
                toggleSearchPad();
            };
        };  
    };

    function removingHTMLTags(str){
        let res='';
        for(let i=0; i<str.length-1; i++){ 
            if(str[i] === '>' && str[i+1] !== '<'){
                for(let j = i+1; j<str.length; j++){
                    if(str[j] !== '<'){
                        res += str[j];
                    } else {
                        break;
                    }
                };
            };
        };
        return res; 
    };

    function boyer_moore(arr, sub) {
        
        let processedNotes = [];
        arr.forEach(note => {

            let str_ind = Object.keys(note)[0];
            let body = Object.values(note)[0];
               
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
                    matchingNoteWithIndex[str_ind] = [body, i];
                    if(!processedNotes.includes(matchingNoteWithIndex)){
                        processedNotes.push(matchingNoteWithIndex);
                    };
                    skip++;
                };
            };
        });
        
        return processedNotes;
    };

    function handleSearchInput(e){
        setSearchInput(e.currentTarget.value);
        setDropDown(true);
    };

    function handleDropDown(){
        setDropDown(false);
    };

    function findSearchResult(id){
        const ele = document.getElementById(`note-${id}`);
        ele.scrollIntoView();
        selectNoteIndexItem.sendNoteOpen(id);
    };

    if(loaded && searchInput.length !== 0){
        let filteredNoteList = noteList.map(nl=>{ 
            let noteIndexBody = {};
            noteIndexBody[nl.id] =  removingHTMLTags(nl.body);
            return noteIndexBody;
        });
        
        dropDownList = boyer_moore(filteredNoteList, searchInput).map(note=>{
            const id = Object.keys(note)[0];
            const matchingSubString = Object.values(note)[0][0];
            const highlightedIndex = Object.values(note)[0][1];
            debugger
            return (
                <div className="search-results" onClick={()=>{findSearchResult(id)}}>
                    {matchingSubString.slice(0, highlightedIndex)}<mark>{matchingSubString.slice(highlightedIndex, highlightedIndex+searchInput.length)}</mark>
                    {matchingSubString.slice(highlightedIndex+searchInput.length, matchingSubString.length)}
                </div>
            );
        });
    };
    
    return ( 
        <div className="pad" ref={searchNode}>
            <div className='search-bar-container'>
                <input 
                    className='search-bar' 
                    type='text'
                    onChange={handleSearchInput}
                    onKeyDown={handleDropDown}
                    value={searchInput}
                    placeholder='Search'
                />
                {dropDown && searchInput.length !== 0 && loaded ? 
                    <ul className="search-dropdown">
                        {dropDownList}
                    </ul>
                    : null
                }
            </div>
        </div>
    );
};