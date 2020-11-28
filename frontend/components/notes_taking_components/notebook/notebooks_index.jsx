import NotebookIndexItems from './notebook_index_item'
import React from 'react';

export default class NotebooksIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            toggle:false
        }

        this.removeNotebook=this.removeNotebook.bind(this);
    };
    
    componentDidMount(){
        this.props.fetchNotebooks();
    }
    componentDidUpdate(prevProps){
        console.log(this.props)
        console.log(prevProps)
        if(this.props.notebooks === prevProps.notebooks){
            this.props.fetchNotebooks();
        }

    };
    removeNotebook(notebook){
        this.props.deleteNotebook(notebook.id)
        // if(this.state.toggle === false){
        //     this.setState({toggle:true})
        // }else{
        //     this.setState({toggle:false})
        // }
    }

    render(){
        const {notebooks, users} = this.props;
        // console.log(notebooks) //notebook didn't update
        const notebooksList = notebooks.map(notebook=>(
            <NotebookIndexItems
                key={notebook.id}
                notebook={notebook}
                users={users}
                removeNotebook={this.removeNotebook}
            />
        ));
        return (
            <div className='notebook-main-page'>
                <div className='header-area'>
                    <h1 className='notebook-page-header'>Notebooks</h1>
                    <p className='subtitle'>My notebook list</p>
                    <div className='create-new-note-modal'>
                        <button onClick={()=>this.props.openModal('createNotebook')} className='create-new-note-modal-button'>
                            + New Notebook
                        </button>
                    </div>
                </div>
                <table id='table'>
                    <tr className='head-row'>
                        <th>TITLE</th>
                        <th>CREATED BY</th>
                        <th>UPDATED AT</th>
                        <th>ACTIONS</th>
                    </tr>   
                    {notebooksList}
                </table>
            </div>
        )
    }
}