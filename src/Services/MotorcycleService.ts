import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import { 
  SaveMotorcycles, 
  GetAllMotorcycles,
  GetByMotorcycleId,
  UpdateMotorcycle,
} from '../Domains/motorcycle';
import HttpException from '../Util/HttpExceptions';

export default class MotorcycleService {
  private _repository;

  constructor(repository: SaveMotorcycles & GetAllMotorcycles & GetByMotorcycleId
  & UpdateMotorcycle) {
    this._repository = repository;
  }

  private createCar(data: IMotorcycle | null): Motorcycle {
    if (!data) {
      throw new HttpException(404, 'Motorcycle not found');
    }
    return new Motorcycle(data);
  }

  async register(motorcycle: IMotorcycle) {    
    const response = await this._repository.save(motorcycle);
    return this.createCar(response);
  }

  async getAll() {
    const response = await this._repository.getAll();
    const motorcyclesArray = response
      .map((motorcycle: IMotorcycle) => this.createCar(motorcycle));
    return motorcyclesArray;
  }

  async getId(id: string) {
    const response = await this._repository.getId(id);
    return this.createCar(response);
  }

  async update(id: string, data: IMotorcycle) {
    const response = await this._repository.update(id, data);
    return this.createCar(response);
  }
}
