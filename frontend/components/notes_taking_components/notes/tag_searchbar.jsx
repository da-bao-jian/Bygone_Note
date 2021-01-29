import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {createTagging, deleteTagging} from '../../../actions/tagging_action';

export const TagSearchBar = (props) => { 
    let dropdownResult = [];

    const taggings = useSelector(state => state.entities.taggings);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const [searchInput, setSearchInput] =  useState('');
    const [dropDown, setDropDown] = useState(false);
    const [tagList, setTagList] = useState([]);


    function handleDropDown(){ 
        setDropDown(false);
    };

    function handleSearchInput(e){ 
        setSearchInput(e.currentTarget.value);
        setDropDown(true);
    };

    function tagSelection(tag){
        tagList.push(tag);
        setTagList(tagList);
        dispatch(createTagging(tag.id, props.noteId));
        setSearchInput('');
    };

    function removeTag(name){
        let newList = [];
        tagList.forEach(tag=>{
            if(tag.title !== name){
                newList.push(tag)
            };
        });
        debugger
        setTagList(newList);
    };

    if(props.tags){
        Object.values(props.tags).forEach(t=>{
            if(t.title.slice(0, searchInput.length).toLowerCase() === searchInput.toLowerCase() 
            && !tagList.includes(t)
            ){ 
                dropdownResult.push(t);  
            };
        });
    };
    
    let dropDownSelection = dropdownResult.map(t=>{
        return (
            <div>
                <button onClick={()=>tagSelection(t)}>
                    {t.title}
                </button>
            </div>
        );
    });                            
                        
    
    return ( 
        <div>
            <div className='tag-search-bar-container'>
                    <input 
                        className='tag-search-bar' 
                        type='text'
                        onChange={handleSearchInput}
                        onKeyDown={handleDropDown}
                        value={searchInput}
                        placeholder='type here to search tags'
                    />
                    {dropDown && searchInput.length !== 0 ? 
                        <ul>
                            {dropDownSelection}
                        </ul>
                        : null
                    }
            </div>
            <div>
                {tagList ? tagList.map(t=>{
                    
                    return (
                        <ul>
                            {t.title}
                            <button onClick={()=>{removeTag(t.title);dispatch(deleteTagging(t))}}>delete</button>
                        </ul>
                    )
                }) : null}
            </div>
        </div>
    );
};