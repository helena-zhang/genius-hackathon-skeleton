// @flow
import React from 'react';
import type { Node } from 'react';
import { CardWrapper } from '../CardComponents';

import type { ProductImageCard } from '../../../entities';
import { AppImage } from '../../AppComponents';

type ProductImageCardProps = {
  card: ProductImageCard,
};

function FeedProductImageCard({ card }: ProductImageCardProps): Node {
  return (
    <CardWrapper
      card={card}
      size="medium"
      grid={card.layout_state || '1x2'}
    >
      <AppImage
        imageURL={card.image_url}
        position={card.image_position}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '15px',
          border: '1px solid #000',
        }}
      />
    </CardWrapper>
  );
}

export default FeedProductImageCard;
