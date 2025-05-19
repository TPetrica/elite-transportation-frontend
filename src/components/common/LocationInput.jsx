import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

const LocationInput = ({ value, onChange, placeholder }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (value && value.address) {
      setAddress(value.address);
    } else {
      setAddress('');
    }
  }, [value]);

  const handleChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    // Update the form value with the proper structure
    if (newAddress) {
      onChange({
        address: newAddress,
        coordinates: null,
        isCustom: true,
        isCottonwood: false
      });
    } else {
      onChange(null);
    }
  };

  return (
    <Input
      value={address}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default LocationInput;