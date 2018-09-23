var assert = require('assert');

var SimulatorBroker = require('../../../server/models/brokers/SimulatorBroker'); 

describe('SimulatorBroker', function() {
  describe('#buy(1, 26000)', function() {
    it('Deve comprar 1 BTC a R$ 26.000 pois o saldo é R$30.000', function() {
      SimulatorBroker.money = 30000;
      SimulatorBroker.buy(1, 26000)
       .then(function(res) { assert.equal(SimulatorBroker.money, 4000); })
       .catch(function(err) { assert.equal(SimulatorBroker.money, 4000); });
    });
  });
});