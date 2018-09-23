module.exports.title = "Simulator Broker";

var money = 0;
module.exports.money = money;
module.exports.btc = 0.0;

function buy(qty, price) {
  return new Promise(function(resolve, reject) {
    if(qty*price <= this.money){
      this.money-= qty*price;
      resolve();
    }
    else reject(money);
  });  
}
module.exports.buy = buy;

function sell(qty, price) {
  return new Promise(function(resolve, reject) {
    if(qty*price <= money) resolve();
    else reject('Você não tem dinheiro suficiente');
  });  
}
module.exports.sell = sell;
