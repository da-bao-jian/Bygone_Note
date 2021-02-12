import React, {useRef, useState, useEffect} from 'react';

const Middle = () => {
    
    const [node1, hover1] = useHover();
    const [node2, hover2] = useHover();
    const [node3, hover3] = useHover();
    const [node4, hover4] = useHover();
    const [node5, hover5] = useHover();

    return (
        <div className='gretting-page'>
            <div className='middle'>
                {!hover1 && !hover2 && !hover3 && !hover4 && !hover5 ? 
                    <div>
                        <textarea  className='greeting-textarea' rows='26' cols='50' >
                            Accomplish more with better notes:                                    Bygone Note helps you capture ideas and find them fast 📓📓📓
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
                        Imrproved upon the original Evernote, Bygone Note uses Websocket for instant autosave that reduces delays. 💾💾💾
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='cyberpunk'></div>

                    </div>
                </div> : null
                }
                {hover2 ? 
                <div>
                    <textarea  className='greeting-textarea2' rows='26' cols='50' >
                        For ease of use, Bygone Note uses algorithmic solution to speed up lookup time 🔎🔎🔎
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='overlook'></div>

                    </div>
                </div> : null}
                {hover3 ? 
                <div>
                    <textarea  className='greeting-textarea3' rows='26' cols='50' >
                        Bygone Note's tag system can help users to better navigate through notes 🏷️🏷️🏷️
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='sky'></div>

                    </div>
                </div> : null}
                {hover4 ? 
                <div>
                    <textarea  className='greeting-textarea4' rows='26' cols='50' >
                        Bygone Note allows users to create, save, edit, and delete notes with complete ease 📝📝📝
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='white'></div>

                    </div>
                </div> : null}
                {hover5 ? 
                <div>
                    <textarea  className='greeting-textarea5' rows='26' cols='50' >
                        Bygone Note allows users to categorize notes into notebooks 📚📚📚
                    </textarea>
                    <div className='photo-container' rows='26' cols='50'>
                         <div className='gray'></div>

                    </div>
                </div> : null}
            </div>
            <div>
                <hr className='bottom-line'/>
                <div className='side-list'>
                    <button className='selection1' ref={node1}>
                        Autosave <img src='https://win98icons.alexmeub.com/icons/png/diskettes_copy-0.png'></img>
                    </button>
                    <button className='selection2' ref={node2}>
                        Search <img src='https://win98icons.alexmeub.com/icons/png/magnifying_glass-0.png'></img>
                    </button>
                    <button className='selection3' ref={node3}>
                        Tag <img src='https://win98icons.alexmeub.com/icons/png/game_freecell-1.png'></img>
                    </button>
                    <button className='selection4' ref={node4}>
                        Notes <img src='https://win98icons.alexmeub.com/icons/png/message_file-0.png'></img>
                    </button>
                    <button className='selection5' ref={node5}>
                        Notebooks <img src='https://win98icons.alexmeub.com/icons/png/help_book_cool-0.png'></img>
                    </button>
                </div>
            </div>
        </div>
    )
};

function useHover(){

    const node = useRef();

    const [hover, setHover] = useState(false);

    const on = () => (
        setHover(true)
    );
    const off = () => (
        setHover(false)
    );

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