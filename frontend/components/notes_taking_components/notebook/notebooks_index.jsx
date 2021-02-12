import NotebookIndexItems from './notebook_index_item'
import React from 'react';

export default class NotebooksIndex extends React.Component{
    constructor(props) {
        super(props);
        this.state={
<<<<<<< HEAD
            // toggle:false
        }

=======
            toggle:false,
            notebooks: []
        };
>>>>>>> bea0917f6e1f12f2e334b99bf102f4ef7326258b
        this.removeNotebook=this.removeNotebook.bind(this);
    };
    
    componentDidMount(){
<<<<<<< HEAD
        this.props.fetchNotebooks();
    }
    componentDidUpdate(prevProps){ //set the state in constructor 
        console.log(this.props)
        console.log(prevProps)
        if(this.props.notebooks === prevProps.notebooks){
            this.props.fetchNotebooks();
        }
=======
        this.props.fetchNotebooks()
        .then(()=>{
            const newNotebooks = this.props.notebooks.filter(nb => (!this.state.notebooks.includes(nb.title)))
            return this.setState({notebooks: newNotebooks})
        });
        
    };
>>>>>>> bea0917f6e1f12f2e334b99bf102f4ef7326258b

    componentDidUpdate(prevProps){
        if(this.props.notebooks.length !== prevProps.notebooks.length){
            const newNotebooks = this.props.notebooks
            this.setState({notebooks: newNotebooks})
        };
    };


    removeNotebook(notebook){
        this.props.deleteNotebook(notebook.id)
        const newState = this.state.notebooks.filter(nb => (
                nb.title !== notebook.title
        ));        
        this.setState({notebooks: newState})

    };



    render(){
        const {users} = this.props;
        const {notebooks} = this.state;
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