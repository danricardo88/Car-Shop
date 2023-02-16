import IMotorcycle from '../../Interfaces/IMotorcycle';

export default interface GetByMotorcycleId {
  getId(id: string): Promise<IMotorcycle | null>;
}
