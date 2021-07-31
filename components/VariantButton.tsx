import React, { useState } from 'react';


const VariantButon = (props: Props) => {
  return (
    <button className="bg-green-500 rounded-md shadow-md text-white font-semibold">{props.name}</button>
  );
};
export default VariantButon;
