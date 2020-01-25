import React, { useState, useEffect } from "react";
import {fastAxiosWithAuth} from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    fastAxiosWithAuth(localStorage.getItem('token')).get('/colors')
                 .then(res => {
                   setColorList([...res.data]);
                 })
                 .catch(err => console.log('Axios Error: ', err))
  }, [setColorList])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
