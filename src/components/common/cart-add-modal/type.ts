import { Guitar } from '../../../types/guitar';

export type CartAddModalProps = {
  guitar: Guitar,
  closeModal: () => void,
  openSuccessModal: () => void,
};
