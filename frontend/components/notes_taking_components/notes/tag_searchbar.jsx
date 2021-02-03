// import React, {useState, useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {useLocation, useHistory} from "react-router-dom";
// import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
// import {createTagging, deleteTagging, fetchTaggings} from '../../../actions/tagging_action';

// export const TagSearchBar = (props) => { 
//     let dropdownResult = [];
//     let show = null;

//     const tags = useSelector(state => state.entities.tags);
//     const taggings = useSelector(state => state.entities.taggings);
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const history = useHistory();

//     const [searchInput, setSearchInput] =  useState('');
//     const [dropDown, setDropDown] = useState(false);
//     const [tagList, setTagList] = useState([]);

//     function handleSearchInput(e){ 
//         setSearchInput(e.currentTarget.value);
//         setDropDown(true);
//     };

//     function tagSelection(tag){
//         tagList.push(tag);
//         setTagList(tagList);
//         dispatch(createTagging(tag.id, props.noteId));
//         setSearchInput('');
//     };

//     function removeTag(name){
//         let newList = [];
//         tagList.forEach(tag=>{
//             if(tag.title !== name){
//                 newList.push(tag)
//             };
//         });
//         setTagList(newList);
//     };

//     if(tags){
//         Object.values(tags).forEach(t=>{
//             if(t.title.slice(0, searchInput.length).toLowerCase() === searchInput.toLowerCase() 
//             // && !tagList.includes(t)
//             ){ 
//                 dropdownResult.push(t);  
//             };
//         });
//     };
    
//     let dropDownSelection = dropdownResult.map(t=>{
//         return (
//             <ul>
//                 <button onClick={()=>tagSelection(t)}>
//                     {t.title}
//                 </button>
//             </ul>
//         );
//     });                            
    

    
//     return ( 
//         <div>
//             <div className='tag-search-bar-container'>
//                 {dropDown && searchInput.length !== 0 ? 
//                     <div className='tag-selections'>
//                         {dropDownSelection}
//                     </div>
//                     : null
//                 }            
//                 <input 
//                     className='tag-search-bar' 
//                     type='text'
//                     onChange={handleSearchInput}
//                     value={searchInput}
//                     placeholder='type here to search tags'
//                 />
//             </div>
//         </div>
//     );
// };