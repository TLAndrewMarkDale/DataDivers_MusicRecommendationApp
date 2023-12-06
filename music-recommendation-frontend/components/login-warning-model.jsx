import { Modal, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, ModalContent } from "@chakra-ui/react";
import React from "react";

function LoginWarningModel(props) {
    const {onClose, isOpen } = props;
    return (
        <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Need Login </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          Hi there! To utilize the ‘create playlist feature, you need to sign in through Spotify.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default LoginWarningModel;