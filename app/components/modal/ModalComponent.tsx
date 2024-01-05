// ModalComponent.tsx

import React from 'react';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-box">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;