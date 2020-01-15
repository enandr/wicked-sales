import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      setModal: false
    };
    if (this.props.default === 'true') {
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
          <ModalHeader toggle={toggle}>Lightining Sales</ModalHeader>
          <ModalBody>
            NOTICE: Lighting Sales is a demo E-Commerce app. It does hold any inventory nor does it exchange any money. DO NOT enter in real information as you checkout.
            <br></br><br></br>
            HOW IT WORKS: Every 10 Seconds 6 New Products will appear on the page. You have 10 seconds from the time it appears to click buy now. After you add it to your cart, you have 5 minutes to finialize purchase!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Ok Got It!</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
