import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import type { FC } from "react";
import type { CustomModalProps } from '@types/ui.ts';

const CustomModal:FC<CustomModalProps> = ({ isOpen, onClose, header, children,  footer }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        {footer}
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;