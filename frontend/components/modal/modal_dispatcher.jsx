import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import ModalCreateNewNotebook from './modal_create_new_notebook';
import ModalMoreActions from './modal_more_actions';


//https://open.appacademy.io/learn/swe-in-person/full-stack-project/modalbnb

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'createNotebook':
      component = <ModalCreateNewNotebook />;
      break;
    case 'moreActions':
      component = <ModalMoreActions />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return ({
    modal: state.ui.modal
  });
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);