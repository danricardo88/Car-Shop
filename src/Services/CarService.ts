import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import { SaveCar, GetAllCars, GetByCarId, UpdateCar } from '../Domains/car';
import HttpException from '../Util/HttpExceptions';

export default class CarService {
  private _repository;

  constructor(repository: SaveCar & GetAllCars & GetByCarId & UpdateCar) {
    this._repository = repository;
  }

  private createCar(data: ICar | null): Car {
    if (!data) {
      throw new HttpException(404, 'Car not found');
    }
    return new Car(data);
  }

  async register(car: ICar) {    
    const response = await this._repository.save(car);
    return this.createCar(response);
  }

  async getAll() {
    const response = await this._repository.getAll();
    const carsArray = response.map((car: ICar) => this.createCar(car));
    return carsArray;
  }

  async getId(id: string) {
    const response = await this._repository.getId(id);
    return this.createCar(response);
  }

  async update(id: string, data: ICar) {
    const response = await this._repository.update(id, data);
    return this.createCar(response);
  }
}