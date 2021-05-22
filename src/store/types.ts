// eslint-disable-next-line import/no-cycle
import { IAppState } from '@/store/modules/app';

export interface IRootState {
  app: IAppState;
}
