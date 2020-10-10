import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Dot from './Dot.jsx';
import axios from 'axios';
import {GlobalStyle, CenterTextBox, ItemsBox} from './Styles.jsx';

const RecommendedProducts = ({totalItems, itemsShown, heading}) => {

  let offset = 0;
  // don't reuse products between 'more to consider' and 'similar items':
  if (heading === 'Similar items') {
    offset = 24;
  }

  // parse information from window pathname
  let productId = window.location.pathname.slice(1) || 1;

  /*
  Responsive triggers (FOR RECOMMENDED--SIMILAR SLIGHTLY DIFFERENT):
  Also note: on any window change, selected dot goes back to 0. That makes things a little easier.
  And: arrows float on window edge if last item is partially obscured
      (looks like similar items follows similar pattern--however, max dots is 3, with 5 items across)
  use innerWidth
  <1209: 5 dots, 6 items each, 24 total still
  <1010: 6 dots, 5 items each:: sliding moves furthest right element to furthest left (duplicates between pages)
  <925: scale down components
  === 668: images the smallest they will ever be. 135px width & height
  <668: change dots to slider. images go back to 185px width & height
  */

  const [selectedDot, setSelectedDot] = useState(0);
  const [numItems, setNumItems] = useState(totalItems || 24);
  const [allItems, setAllItems] = useState([]);
  const [numVisible, setNumVisible] = useState(itemsShown || 7);
  const [numDots, setNumDots] = useState(Math.ceil(numItems / numVisible));

  let dotsArray = [];
  while (dotsArray.length < numDots) {
    if (selectedDot === dotsArray.length) {
      dotsArray.push(1);
    } else {
      dotsArray.push(0);
    }
  }

  useEffect(() => {
    if (Number.isInteger(parseInt(productId))) {
      axios.get(`http://54.241.31.198:3003/products/id/${productId}`)
        .then(results => {
          setAllItems(results.data.slice(offset, offset + numItems));
        });
    }
    handleResize();
  }, []);

  const handleResize = () => {
    let width = window.innerWidth; //issue with inner width: adds 1/4 (e.g. 1600-2000, 800-1000, 150-187)
    let widthTriggers = [null, 1209, 1010, 925, 669];
    let correspondingVisible = [7, 6, 5, 4, numItems];
    let targetVisible;
    if (width < widthTriggers[4]) {
      targetVisible = correspondingVisible[4];
      // scroll bar also appears here--see Styles.jsx for that detail
    } else if (width < widthTriggers[3]) {
      targetVisible = correspondingVisible[3];
    } else if (width < widthTriggers[2]) {
      targetVisible = correspondingVisible[2];
    } else if (width < widthTriggers[1]) {
      targetVisible = correspondingVisible[1];
    }
    manageVisibleAndDots(targetVisible || correspondingVisible[0]);
  };

  const manageVisibleAndDots = (newVis) => {
    // use numItems
    // setNumVisible
    setNumVisible(newVis);
    // setNumDots: Math.ceil(numItems / numVisible);
    newVis === numItems ? setNumDots(0) : setNumDots(Math.ceil(numItems / newVis));
    // set selected dot to 0
    setSelectedDot(0);
  };

  window.addEventListener('resize', handleResize);

  return (
    <div>
      <GlobalStyle />
      <ItemsBox>
        <CenterTextBox><h4>{heading}</h4></CenterTextBox>
        <div id="recommended-items">
          <List
            listItems={allItems}
            numVisible={numVisible}
            selectedDot={selectedDot}
            numDots={numDots}
            handleClick={(d) => setSelectedDot(selectedDot + d)}/>
        </div>
        <CenterTextBox>
          {dotsArray.map((selected, i) =>
            <Dot selected={selected} key={i} handleClick={() => setSelectedDot(i)}/>
          )}
        </CenterTextBox>
      </ItemsBox>
    </div>
  );
}

export default RecommendedProducts;
