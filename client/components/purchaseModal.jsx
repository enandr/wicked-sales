import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PurchaseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      setModal: false
    };
    if (this.props.open === true) {
      this.state.modal = true;
    }
  }

  render() {
    const toggle = () => {
      this.setState({ modal: false });
    };
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={toggle} className="className">
          <ModalHeader toggle={toggle}>Thank You For Your Purchase</ModalHeader>
          <ModalBody>
            Thank you for your purchase!
            <br></br><br></br>
            Thank you for using Lightning sales! This is a demo app. No products will be delivered and no money was exchanged!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.confirm}>Ok Got It!</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
