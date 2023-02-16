import Motorcycle from '../../src/Domains/Motorcycle';
import IMotorcycle from '../../src/Interfaces/IMotorcycle';
import HttpException from '../../src/Util/HttpExceptions';

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOutput: Motorcycle = new Motorcycle({
  id: '6348513f34c397abcad040b2',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
});

const genericError : HttpException = new HttpException(500, 'Internal Server Error');

export {
  motorcycleInput,
  motorcycleOutput,
  genericError,
};
