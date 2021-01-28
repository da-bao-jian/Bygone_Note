import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';

export const TagSearchBar = (props) => { 
    const dropdownResult = [];

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
        tagList.push(tag)
        setTagList(tagList)
        setSearchInput('')
        debugger
    };

    if(props.tags){ 
        Object.values(props.tags).forEach(t=>{
            if(t.title.slice(0, searchInput.length).toLowerCase() === searchInput.toLowerCase()){ 
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
                    debugger
                    return (

                        <ul>
                            {t.title}
                        </ul>
                    )
                }) : null}
            </div>
        </div>
    );
};