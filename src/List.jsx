import React from 'react';
import ListItem from './ListItem.jsx';
import {RecList, RecListMobile, NavButtonRight, NavButtonLeft} from './Styles.jsx';

const List = ({listItems, handleClick, selectedDot, numVisible, numDots, onMobile}) => {
  const minIVisible = selectedDot * numVisible;
  const maxIVisible = minIVisible + numVisible - 1;

  const onLeftmostPage = selectedDot === 0;
  const onRightmostPage = selectedDot === numDots - 1;

  return (
  onMobile ?
  <RecListMobile>
    {onLeftmostPage ? '' : <NavButtonLeft key={'navButtonLeft'} onClick={() => handleClick(-1)}>&#5176;</NavButtonLeft>}

      {listItems.map((item, i) =>
        <ListItem item={item} key={item.id} visible={i >= minIVisible && i <= maxIVisible}/> )}

    {onRightmostPage || numDots === 0 ? '' : <NavButtonRight key={'navButtonRight'} onClick={() => handleClick(1)}>&#5171;</NavButtonRight>}
  </RecListMobile>
:
  <RecList>
    {onLeftmostPage ? '' : <NavButtonLeft key={'navButtonLeft'} onClick={() => handleClick(-1)}>&#5176;</NavButtonLeft>}

      {listItems.map((item, i) =>
        <ListItem item={item} key={item.id} visible={i >= minIVisible && i <= maxIVisible}/> )}

    {onRightmostPage || numDots === 0 ? '' : <NavButtonRight key={'navButtonRight'} onClick={() => handleClick(1)}>&#5171;</NavButtonRight>}
  </RecList>
  );
};

export default List;
