import React from 'react';
import ListItem from './ListItem.jsx';
import {RecList, NavButtonRight, NavButtonLeft, RecListScrollingLeft, RecListScrollingRight, NavSpan} from './Styles.jsx';
import Carousel from 'react-bootstrap/Carousel';

const List = ({listItems, handleClick, selectedDot, numVisible, numDots, isScrolling, handleSelect}) => {

  let dots = [];
  while (dots.length < numDots) {
    if (dots.length === selectedDot) {
      dots.push(1);
    } else {
      dots.push(0);
    }
  }

  return (
    <Carousel activeIndex={selectedDot} interval={null} onSelect={handleSelect} nextIcon={<NavButtonRight>&#5171;</NavButtonRight>} prevIcon={<NavButtonLeft>&#5176;</NavButtonLeft>}>
        {dots.map((dot, dotIdx) =>
          <Carousel.Item key={dotIdx}>
            {listItems.slice(dotIdx * numVisible, (dotIdx + 1) * numVisible).map(item => <ListItem item={item} key={item._id}/>)}
          </Carousel.Item>
        )}
    </Carousel>
  );
};

export default List;
