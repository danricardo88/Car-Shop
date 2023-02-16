import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarRep from '../../../src/repo/CarRep';
import CarService from '../../../src/Services/CarService';

import { carInput, carOutput } from '../../utils/mockCar';
import HttpExceptions from '../../../src/Util/HttpExceptions';

describe('O serviço deve transmitir os dados do banco de dados.', function () {
  it('O registro de um carro deve ser bem-sucedido.', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const carRepository = new CarRep();
    const service = new CarService(carRepository);
    const result = await service.register(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('A busca por todos os carros deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'find').resolves([carOutput]);

    const carRepository = new CarRep();
    const service = new CarService(carRepository);
    const result = await service.getAll();
    expect(result).to.be.deep.equal([carOutput]);
  });

  it('A busca por um carro específico deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const carRepository = new CarRep();
    const service = new CarService(carRepository);
    const result = await service.getId('6378d1c99b090153e49a4895');
    expect(result).to.be.deep.equal(carOutput);
  });

  it('A atualização de um carro específico deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const carRepository = new CarRep();
    const service = new CarService(carRepository);
    const result = await service.update('6378d1c99b090153e49a4895', carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
 
  it('Deve ser retornado um erro caso o carro não seja encontrado.', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const carRepository = new CarRep();
    const service = new CarService(carRepository);
    
    try {
      await service.getId('6378d1c99b090153e49a4895');
    } catch (error) {
      const err = error as HttpExceptions;
      expect(err.message).to.be.equal('Car not found');
      expect(err.status).to.be.equal(404);
    }
  });

  afterEach(function () {
    sinon.restore();
  });  
});