import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      setModal: false
    };
    if (this.props.open === true) {
      this.state.modal = true;
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: false });
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="className">
          <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.props.delete}>Yes</Button>
            <Button color="danger" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
