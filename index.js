require("dotenv-safe").load()
const {setTimeout} = require('timers');
const stringify = require("stringfy");
const MercadoBitcoin = require("./api").MercadoBitcoin
const MercadoBitcoinTrade = require("./api").MercadoBitcoinTrade
var infoApi = new MercadoBitcoin({ currency: 'BTC' })
var tradeApi = new MercadoBitcoinTrade({ 
    currency: 'BTC', 
    key: process.env.KEY, 
    secret: process.env.SECRET, 
    pin: process.env.PIN 
})

function getQuantity(coin, price, isBuy, callback){
    price = parseFloat(price)
    coin = isBuy ? 'brl' : coin.toLowerCase()

    tradeApi.getAccountInfo((response_data) => {
        var balance = parseFloat(response_data.balance[coin].available).toFixed(5)
		balance = parseFloat(balance)
        if(isBuy && balance < 0) return console.log('Sem saldo disponível para comprar! '+balance)
        console.log(`Saldo disponível de ${coin}: ${balance}`)
        
        if(isBuy) balance = parseFloat((balance / price).toFixed(5))
        callback(parseFloat(balance) - 0.00001)//tira a diferença que se ganha no arredondamento
    }, 
    (data) => console.log(JSON.stringify(data)));
}

function getBtcBalance(callback){
    tradeApi.getAccountInfo((response_data) => {
        callback(parseFloat(response_data.balance.btc.available));
    }); 
}

function placeSellOrder(sellPrice){
    getBtcBalance((btc)=>{
        console.log("Criando ordem de venda: BTC "+btc+" à R$ "+sellPrice.toFixed(5));
        tradeApi.placeSellOrder(btc, sellPrice.toFixed(5), 
            (data) => console.log('Ordem de venda inserida no livro. ' + JSON.stringify(data)),
            (data) => {
                console.log('Erro ao inserir ordem de venda no livro. ' + JSON.stringify(data));
                console.log('Tentando novamente em 10 segundos');
                setTimeout(() => { placeSellOrder(btc, sellPrice); }, 10000);
            }
        );
    })
}


setInterval(() => 
   infoApi.ticker((response) => {
       console.log(response.ticker)
       if(response.ticker.buy <= 28301){
           getQuantity('BRL', response.ticker.sell, true, (qty) => {
                tradeApi.placeBuyOrder(qty, response.ticker.buy, 
                    (data) => {
                        console.log('Ordem de compra inserida no livro. ' + JSON.stringify(data));
                        //operando em STOP
                        placeSellOrder(response.ticker.buy * parseFloat(process.env.PROFITABILITY));
                    },
                    (data) => console.log('Erro ao inserir ordem de compra no livro. ' + data))
           })
       }
       else
            console.log('Ainda muito alto, vamos esperar pra comprar depois.')
   }),
   process.env.CRAWLER_INTERVAL
)