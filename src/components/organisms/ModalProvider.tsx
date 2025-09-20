import { useState, useCallback } from "react";
import useModalStore from "../../store/modal.store";
import { Modal, ModalOverlay, ModalContent } from "./Modal";

const ModalProvider = () => {
  const { isOpen, Component, props, close, resolve } = useModalStore();
  const [ariaProps, setAriaProps] = useState<Record<string, string>>({});

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      close();
    }
  }, [close]);

  const handleIdsReady = useCallback((titleId: string, descriptionId: string) => {
    setAriaProps({
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
    });
  }, []);

  if (!isOpen || !Component) return null;

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalOverlay />
      <ModalContent {...ariaProps}>
        <Component 
          {...props} 
          closeModal={close} 
          resolve={resolve} 
          onIdsReady={handleIdsReady}
          isOpen={isOpen}
        />
      </ModalContent>
    </Modal>
  );
};

export default ModalProvider;