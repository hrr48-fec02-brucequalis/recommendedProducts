import React from 'react';
import {RecListItem, RecItemImage, RecItemPrice, RecItemTitle, RecItemAnchor} from './Styles.jsx';

const ListItem = ({item, visible}) => {

  let handleClick = (event) => {
    console.log(`item ${item.title} was clicked!`);
    // I'm planning to use this to redirect page on click
  };

  return (
    <RecListItem onClick={(e) => {handleClick(e)}}>
      <RecItemAnchor href={item.productUrl}>
        <RecItemImage src={item.imageUrl} ></RecItemImage>
        <RecItemPrice>${item.price}</RecItemPrice>
      </RecItemAnchor>
    </RecListItem>
  );
};

export default ListItem;
