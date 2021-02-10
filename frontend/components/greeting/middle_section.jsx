import React, {useRef, useState, useEffect} from 'react';

const Middle = () => {
    
    const [node1, hover1] = useHover();
    const [node2, hover2] = useHover();
    const [node3, hover3] = useHover();

    return (
        <div className='gretting-page'>
            <div className='middle'>
                {!hover1 && !hover2 && !hover3 ? 
                    <div>
                        <textarea  className='greeting-textarea' rows='26' cols='50' >
                            Accomplish more with better notes:                                    Bygone Note helps you capture ideas and find them fast
                        </textarea> 
                        
                        <div className='photo-container' rows='26' cols='50'>
                            <div className='matrix'></div>
                        </div>
                    </div>
                    : null
                }
                {hover1 ? 
                <div>
                    <textarea  className='greeting-textarea1' rows='26' cols='50' >
                        Imrproved upon the original Evernote, Bygone Note uses Websocket for instant autosave that reduces delays.
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='cyberpunk'></div>

                    </div>
                </div> : null
                }
                {hover2 ? 
                <div>
                    <textarea  className='greeting-textarea' rows='26' cols='50' >
                        Imrproved upon the original Evernote, Bygone Note takes advantage of algorithmic solution for its search feature 
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className=''></div>

                    </div>
                </div> : null}
                {hover3 ? 
                <div>
                    <textarea  className='greeting-textarea' rows='26' cols='50' >
                    “You mean old books?"   "Stories written before space travel but about space travel."                   "How could there have been stories about space travel before..."                    "The writers," Pris said, "made it up.”                                                        ― Philip K. Dick,               'Do Androids Dream of Electric Sheep?' 🐑
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className=''></div>

                    </div>
                </div> : null}
            </div>
            <div className='side-list'>
                <button className='selection1' ref={node1}>Autosave</button>
                <button className='selection' ref={node2}>Search</button>
                <button className='selection' ref={node3}>Styled</button>
            </div>
            <div>
                <hr className='bottom-line'/>
            </div>
        </div>
    )
};

function useHover(){

    const node = useRef();

    const [hover, setHover] = useState(false);

    const on = () => setHover(true);
    const off = () => setHover(false);

    useEffect(() => {
        node.current.addEventListener('mouseenter', on);
        node.current.addEventListener('mouseleave', off);
        return () => {
            node.current.removeEventListener('mouseenter', on);
            node.current.removeEventListener('mouseleave', off);
        }
    }, [node]);

    return [node, hover];
};


export default Middle;