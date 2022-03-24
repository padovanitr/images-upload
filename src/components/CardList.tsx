import { Grid, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: false});
  const [selectedUrl, setSelectedUrl] = useState(null);

  // TODO MODAL USEDISCLOSURE
  function viewImage(url: any) {
    setSelectedUrl(url);
    onOpen()
  }

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      <Grid templateColumns='repeat(3, 1fr)' gap='40px'>
        {/* TODO CARD GRID */
          cards.map(card => (
            <GridItem key={card.id} w='fit-content'>
              <Card data={card} viewImage={() => viewImage(card.url)}/>
            </GridItem>
          ))
        }
      </Grid>
      {/* TODO MODALVIEWIMAGE */
        isOpen &&
          <ModalViewImage
            isOpen={isOpen}
            imgUrl={selectedUrl}
            onClose={onClose}
          />
      }
    </>
  );
}
