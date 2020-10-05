import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import Dot from './Dot.jsx';
import axios from 'axios';
import exampleData from '../data/example_data.js';
import {GlobalStyle, CenterTextBox} from './Styles.jsx';

const App = ({totalItems, itemsShown}) => {

  const [allItems, setAllItems] = useState([]);
  const [selectedDot, setSelectedDot] = useState(0);
  const [numItems, setNumItems] = useState(totalItems);
  const [numVisible, setNumVisible] = useState(itemsShown);
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
    // when component mounts, and if no items have been populated:
    if (!allItems.length) {
      // 'garden' is a temporary query for now. It will likely be changed for later implementation
      axios.get('/products/dept/garden')
        .then(results => {
          if (results.data.length < numItems) {
            axios.get('/products/dept/games')
              .then(results2 => {
                setAllItems(results.data.concat(results2.data).slice(0, numItems));
              })
          } else {
            setAllItems(results.data.slice(0, numItems));
          }
        });
    }
  });

  return (
    <div>
      <GlobalStyle />
      <CenterTextBox><h4>More to consider</h4></CenterTextBox>
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
    </div>
  );
}
// not an important comment--just checking that circleCI isn't tracking this branch

export default App;
