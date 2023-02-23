import { expect } from 'chai';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleRepo from '../../../src/repo/MotorcycleRepo';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcycleInput, motorcycleOutput } from '../../utils/mockMotor';
import HttpExceptions from '../../../src/Util/HttpExceptions';

describe('O serviço deve transmitir os dados das motos.', function () {
  it('O registro de uma moto deve ser bem-sucedido.', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const repository = new MotorcycleRepo();
    const service = new MotorcycleService(repository);
    const result = await service.register(motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('A busca por todas as motos deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'find').resolves([motorcycleOutput]);

    const repository = new MotorcycleRepo();
    const service = new MotorcycleService(repository);
    const result = await service.getAll();
    expect(result).to.be.deep.equal([motorcycleOutput]);
  });

  it('Uma moto específica por meio de seu ID deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const repository = new MotorcycleRepo();
    const service = new MotorcycleService(repository);
    const result = await service.getId('6348513f34c397abcad040b2');
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('A atualização de uma moto específica deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const repository = new MotorcycleRepo();
    const service = new MotorcycleService(repository);
    const result = await service.update('6348513f34c397abcad040b2', motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
 
  it('Deve ser retornado um erro caso a moto não seja encontrada.', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const carRepository = new MotorcycleRepo();
    const service = new MotorcycleService(carRepository);
    
    try {
      await service.getId('6348513f34c397abcad040b2');
    } catch (error) {
      const err = error as HttpExceptions;
      expect(err.message).to.be.equal('Motorcycle not found');
      expect(err.status).to.be.equal(404);
    }
  });

  afterEach(function () {
    sinon.restore();
  });  
});