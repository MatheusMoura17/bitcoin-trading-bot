module.exports.title = "Simulator Broker";
module.exports.money = 1000;
module.exports.btc = 0.0;

function buy(qty, price) {
  return new Promise(function(resolve, reject) {
    if(qty*price <= money) resolve();
    else reject('Você não tem dinheiro suficiente');
  });  
}

function sell(qty, price) {
  return new Promise(function(resolve, reject) {
    if(qty*price <= money) resolve();
    else reject('Você não tem dinheiro suficiente');
  });  
}

module.exports.btc = buy;