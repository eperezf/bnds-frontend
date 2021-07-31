import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faExclamation, faQuestion, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Accordion = (props: Props) => {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState('max-h-0')
  var iconName = faQuestion
  if (props.status == "green") {
    iconName = faCheck;
  } else if (props.status == "yellow"){
    iconName = faExclamation;
  } else if (props.status == "red"){
    iconName = faTimes;
  } else {
    iconName = faQuestion;
  }

  function toggleAccordion(){
    var newOpen = open == true ? false : true;
    var newHeight = newOpen == true ? "max-h-96" : "max-h-0"
    setOpen(newOpen)
    setHeight(newHeight)
  };

  return (
    <div className="sm:m-4 mx-2 my-4">
      <div className={'border-2 rounded-lg border-'+props.status+'-400 bg-'+props.status+'-400 shadow hover:shadow-md transition-all'} onClick={toggleAccordion}>
        <div className="flex flex-row justify-between rounded-t-lg">
          <div className="font-semibold text-white p-3"><FontAwesomeIcon icon={iconName} className="w-4"/> {props.name}</div>
          <div className="font-semibold text-white p-3"> {open ? <FontAwesomeIcon className="transform transition-all rotate-180" icon={faChevronDown} /> : <FontAwesomeIcon className="transform transition-all rotate-0" icon={faChevronDown} /> }</div>
        </div>
        <div className={'flex overflow-y-hidden transition-max-height duration-200 bg-white rounded-b-md '+ height}>
          <div className="p-2 w-full justify-center flex">
            <table className="table-auto">
              <thead  className="text-center">
                <tr>
                  <th className="border-2 p-2">Frecuencia</th>
                  <th className="border-2 p-2">Samsung Galaxy S21 pro max ultra alpha </th>
                  <th className="border-2 p-2">Virgin Mobile</th>
                </tr>
              </thead>
              <tbody  className="text-center">
              <tr>
                <td className="border-2 p-2">1900 MHz.</td>
                <td className="border-2 p-2"><FontAwesomeIcon icon={faCheck} className="w-4"/></td>
                <td className="border-2 p-2"><FontAwesomeIcon icon={faTimes} className="w-4"/></td>
              </tr>
              <tr>
                <td className="border-2 p-2">
                  <p>1700/2100 MHz. (AWS)</p>
                  <p><b>Roaming: WOM</b></p>
                </td>
                <td className="border-2 p-2"><FontAwesomeIcon icon={faCheck} className="w-4"/></td>
                <td className="border-2 p-2"><FontAwesomeIcon icon={faTimes} className="w-4"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accordion;
