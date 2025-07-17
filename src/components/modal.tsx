import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import type { FC, ReactNode } from "react";

export interface CustomModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    header: ReactNode;
    children: ReactNode;
    footer: ReactNode
}

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