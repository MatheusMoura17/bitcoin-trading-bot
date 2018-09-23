function loop() {
  setInterval(function() {
    console.log('haha! haha!');
  }, 1000);
}

function start() {
  loop();
}

exports.start = start;
