'use client';

import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Portal from '../portal/portal';

const LocationPickerByPincode = dynamic(() => import('../LocationPicker'), {
  ssr: false,
});

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pincode: string;
}

const LocationModal = ({ isOpen, onClose, pincode }: LocationModalProps) => {
  return (
    <Portal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-gray-600 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <LocationPickerByPincode pincode={pincode} />
      </div>
    </Portal>
  );
};

export default LocationModal;
