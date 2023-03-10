import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarRepository from '../repo/CarRep';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carRepository: CarRepository;
  private carService: CarService;
  private car: ICar;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carRepository = new CarRepository();
    this.carService = new CarService(this.carRepository);
    this.car = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty, 
    };
  }

  public async create() {
    try {
      const newCar = await this.carService.register(this.car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const cars = await this.carService.getAll();
      return this.res.status(200).json(cars);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    
    try {
      const car = await this.carService.getId((id).toString());
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;

    try {
      const response = await this.carService.update(id, this.car);
      return this.res.status(200).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;
