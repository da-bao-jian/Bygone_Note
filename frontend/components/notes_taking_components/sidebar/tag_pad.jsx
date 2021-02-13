import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {openModal} from '../../../actions/modal_actions';
import {TagItem} from './tag_item';
// import WordArt from 'react-wordart';


export const TagPad = ({tagPad, toggleTagPad, node}) => { 

    const tags = useSelector(state => state.entities.tags);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params  = useParams();
    const match = useRouteMatch();

    const [tagList, setTagList] = useState(null);
    const [tagSelected, setTagSelected] = useState([]);

    let orderedTags = {};

    useEffect(() => {
        dispatch(fetchTags())
        .then((data) => {
            setTagList(Object.values(Object.values(data)[1]).map(tag=>(tag.title)));    
        }); 
    }, []);
    
    useEffect(() => {
        if(tagPad){
            document.addEventListener("mousedown", handleClick);
        } else {
            document.removeEventListener("mousedown", handleClick);
        };
    },[tagPad]);

    function handleClick(e) {
        let modal = document.getElementsByClassName('modal-child-tag');
        if(node.current){
            if(!node.current.contains(e.target) && modal.length===0){
                toggleTagPad();
            };
        };  
    };

    function tagSelection(tagId, tag){ 
        if(!tagSelected.includes(tag)){ 
            let current_path = location.pathname;
            history.push(`${current_path}/tag/${tagId}`);
            setTagSelected([...tagSelected, tag]);
        };
    };

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
        
    Object.values(tags).forEach(t=>{
        if(!orderedTags.hasOwnProperty(t.title[0])){ 
            orderedTags[t.title[0]] = [
            <TagItem key={t.id}
                id={t.id}
                title={t.title}
                user_id={t.user_id}
                tagObj={t}
                tagSelection={tagSelection}
            />]
        } else { 
            orderedTags[t.title[0]].push(
            <TagItem key={t.id}
                id={t.id}
                title={t.title}
                user_id={t.user_id}
                tagObj={t}
                tagSelection={tagSelection}
            />)
        };           
    });


    return (
        <div className="pad" ref={node}>
            <div class="title-bar">
                <div className="tag-pad-header">   
                    <div className="wordart-tag">
                        {/* <WordArt text='Tag Pad' theme={`superhero`} fontSize={15} /> */}
                    </div>  
                    <div className='create-new-tag-modal'>
                        <button onClick={()=>dispatch(openModal('createTag'))} className='create-new-tag-modal-button'>
                            + New Tag
                        </button>
                    </div>
                </div>
                <div className='tag-search'>
                    {tagSelected.map(t=>{
                        return (
                            <div className='tag-search-selected'>
                                <div className='tag-search-selected-tag' onClick={()=>{removeTag(t)}}>
                                    {t}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='tag-pad-index'>
                    <ul className='tag-initializers'>
                        {orderedTags ? Object.entries(orderedTags).sort().map(alpha => {
                            return(
                                <div classname='tag-groups'>
                                    <div className='tag-initial'>
                                        {alpha[0]}
                                    </div>
                                    <div className='tag-items-group'>
                                        <ul>
                                            {alpha[1].map(t=>(
                                                t
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }): null}
                    </ul>
                </div>
            </div>
        </div>
 
    );

};