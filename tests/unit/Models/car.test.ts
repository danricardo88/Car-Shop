import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarRep from '../../../src/repo/CarRep';

import { carInput, carOutput } from '../../utils/mockCar';
import HttpExceptions from '../../../src/Util/HttpExceptions';

describe('O modelo deve registrar o carro no banco de dados', function () {
  it('O registro do carro deve ser bem-sucedido', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const carRepository = new CarRep();
    const result = await carRepository.save(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('A busca por todos os carros deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'find').resolves([carOutput]);

    const carRepository = new CarRep();
    const result = await carRepository.getAll();
    expect(result).to.be.deep.equal([carOutput]);
  });

  it('A busca por um carro através do ID deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const carRepository = new CarRep();
    const result = await carRepository.getId('6378d1c99b090153e49a4895');
    expect(result).to.be.deep.equal(carOutput);
  });

  it('A atualização de um carro através do ID deve ser bem-sucedida.', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const carRepository = new CarRep();
    const result = await carRepository.update('6378d1c99b090153e49a4895', carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deve ser emitido um alerta ao tentar atualizar com um ID inválido.', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const carRepository = new CarRep();

    try {
      await carRepository.update('ID_INVALIDO', carInput);
    } catch (error) {
      const err = error as HttpExceptions;
      expect(err.message).to.be.equal('Invalid mongo id');
      expect(err.status).to.be.equal(422);
    }
  });

  it('Deve ser emitido um alerta ao tentar buscar um carro com um ID inválido.', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const carRepository = new CarRep();

    try {
      await carRepository.getId('ID_INVALIDO');
    } catch (error) {
      const err = error as HttpExceptions;
      expect(err.message).to.be.equal('Invalid mongo id');
      expect(err.status).to.be.equal(422);
    }
  });
 
  afterEach(function () {
    sinon.restore();
  });  
});