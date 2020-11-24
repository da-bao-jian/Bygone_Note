import NotebookIndexItems from './notebook_index_item'
import React from 'react';

export default class NotebooksIndex extends React.Component{
    constructor(props) {
        super(props);
    };
    
    componentDidMount(){
        this.props.fetchNotebooks();
    }
    componentDidUpdate(prevProps){
        if(this.props.notebooks === prevProps.notebooks){
            this.props.fetchNotebooks();
        }

    };

    render(){
        const {notebooks, deleteNotebook} = this.props;
        const notebooksList = notebooks.map(notebook=>(
            <NotebookIndexItems
                key={notebook.id}
                notebook={notebook}
            />
        ));
        return (
            <div className='notebook-main-page'>
                <h1 className='notebook-page-header'>Notebooks</h1>
                <div className='notebook-subheader'>
                    My notebook list
                </div>
                <div className='create-new-note-modal'>
                    <button onClick={()=>this.props.openModal('createNotebook')}>
                        New Notebook
                    </button>
                </div>
                <table>
                    <thead className='head-row'>
                        <th>TITLE</th>
                        <th>CREATED BY</th>
                        <th>UPDATED</th>
                        <th>ACTIONS</th>
                    </thead>   
                    <div className='notebook-index-items'>
                        <ul className='notebooks-list'>
                            {notebooksList}
                        </ul>
                    </div>
                </table>
            </div>
        )
    }
}