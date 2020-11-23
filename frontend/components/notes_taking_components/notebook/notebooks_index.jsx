
import React from 'react';

export default class NotebooksIndex extends React.Component{
    constructor(props) {
        super(props);
    };
    
    componentDidMount(){
        this.props.fetchNotebooks();
    }


    render(){
        const {notebooks, deleteNotebook} = this.props;
        const notebooksList = notebooks.map(notebook=>(
            <NotebookIndexItems
                key={notebook.id}
                notebook={notebook}
                removeNote={this.removeNote}
            />
        ));
        return (
          <div className='notebook-index-items'>
            <ul className='notebooks-list'>
                {notebooksList}
            </ul>
          </div>
        )
    }
}