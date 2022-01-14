import { GuitarType } from '../../../../types/guitar';

export type TabsProps = {
  vendorCode: string,
  type: keyof GuitarType,
  stringCount: number,
  description: string,
};
