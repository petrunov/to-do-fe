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
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
