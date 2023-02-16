import ICar from '../../Interfaces/ICar';

export default interface GetByCarId {
  getId(id: string): Promise<ICar | null>;
}