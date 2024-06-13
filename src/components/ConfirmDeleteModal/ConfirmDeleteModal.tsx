import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
