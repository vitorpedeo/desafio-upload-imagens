import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxWidth="900px">
        <ModalBody padding="0" maxHeight="600px">
          <Image src={imgUrl} width="100%" height="100%" objectFit="cover" />
        </ModalBody>

        <ModalFooter
          bgColor="pGray.800"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} isExternal color="pGray.50">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
