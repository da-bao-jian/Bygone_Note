import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {openModal} from '../../../actions/modal_actions';
import {tagPadRegresh} from '../state_sharing';
import {TagItem} from './tag_item';

export const TagPad = ({tagPad, closeTagPad}) => { 

    const tags = useSelector(state => state.entities.tags);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params  = useParams();
    const match = useRouteMatch();
    const node = useRef();

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
        if(node.current){//to prevent error message in the console
            if(!node.current.contains(e.target) && modal.length===0){
                closeTagPad();
            };
        };  
    };

    function tagSelection(tagId, tag){ 
        if(!tagSelected.includes(tag)){ 
            let current_path = match.url;
            history.push(`${current_path}/tag/${tagId}`);
            setTagSelected([...tagSelected, tag]);
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
        }           
    });



    
    return ( 
        <div className="pad" ref={node}>
            <div className="tag-pad-header">     
                <div className='create-new-tag-modal'>
                    <button onClick={()=>dispatch(openModal('createTag'))} className='create-new-tag-modal-button'>
                        + New Tag
                    </button>
                </div>
            </div>
            <div className='tag-pad-index'>
                <div className='tag-search'>
                    {tagSelected.map(t=>{
                        return (
                            <div className='tag--search-selected'>
                                {t}
                            </div>
                        )
                    })}
                </div>
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
    );

};