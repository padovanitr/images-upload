import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxWidth="900px"
          maxHeight="600px"
        >
          <ModalBody
            padding="0"
          >
            <Image
              src={imgUrl}
            />
            <Link href={imgUrl} isExternal/>
          </ModalBody>
          <ModalFooter
            background="#353431"
            height="40px"
            borderRadius="0 0 6px 6px"
            display="flex"
            justifyContent="flex-start"
            p="8px 10px"
          >
            <Button
              as="a"
              href={imgUrl}
              mr={3}
              variant='outline'
              target='_blank'
              background="none"
              height="fit-content"
              padding="0"
              color="#ccc"
              fontWeight="400"
              fontSize="14px"
              _hover={{
                background: "none"
              }}

            >
              Abrir original
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
