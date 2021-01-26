import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {fetchTags, fetchTag, createTag, updateTag, deleteTag} from '../../../actions/tag_actions';
import {openModal} from '../../../actions/modal_actions';
import {tagPadRegresh} from '../state_sharing';
import {TagItem} from './tag_item';

export const TagPad = () => { 

    const tags = useSelector(state => state.entities.tags);
    const taggings = useSelector(state => state.entities.taggings);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();


    const [tagList, setTagList] = useState(null);

    let orderedTags = {};
    let objectifiedList, tagPadList;

    useEffect(() => {
        dispatch(fetchTags())
        .then(() => {
            setTagList(Object.values(Object.values(data)[1]).map(tag=>(tag.title)))
            
            debugger});
            
    }, []);
        
    Object.values(tags).forEach(t=>{
        if(!orderedTags.hasOwnProperty(t.title[0])){ 
            orderedTags[t.title[0]] = [
            <TagItem
                id={t.id}
                title={t.title}
                user_id={t.user_id}
            />]
        } else { 
            orderedTags[t.title[0]].push(
            <TagItem
                id={t.id}
                title={t.title}
                user_id={t.user_id}
            />)
        }      
            
    });



    
    return ( 
        <div className="pad">
            <div className='create-new-tag-modal'>
                <button onClick={()=>dispatch(openModal('createTag'))} className='create-new-tag-modal-button'>
                    + New Tag
                </button>
            </div>
            <div>
                <ul>
                    {orderedTags ? Object.entries(orderedTags).map(alpha=> {debugger
                        return(
                            <div classname='tag-groups'>
                                <div className='tag-initial'>
                                    {alpha[0]}
                                </div>
                                <div>
                                    {alpha[1].map(t=>(
                                        t
                                    ))}
                                </div>
                            </div>
                        )
                    }): null}
                </ul>
            </div>
        </div>
    );

};