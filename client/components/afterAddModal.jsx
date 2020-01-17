import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AfterAddModal extends React.Component {
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
          <ModalHeader toggle={this.toggle}>Added To Cart</ModalHeader>
          <ModalBody>
            The product has been added to your cart! Would You like to keep Shopping?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => {
              this.props.setView('catalog');
            }}>Keep Shopping</Button>
            <Button color="danger" onClick={() => {
              this.props.setView('summary');
            }}>Checkout</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
