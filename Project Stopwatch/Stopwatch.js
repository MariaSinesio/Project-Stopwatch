class Stopwatch {
  #elapseTimeInSeconds = 0; //O constructor não foi posto porque o js poe ele automaticamente e ele não vai ter serventia, teria se o usuario colocasse algo
  #interValid = null; //Nulo porque não vamos saber o momento que isso vai ser parado, então não tem como definir um valor, o null indifca uma ausencia intencional, por isso não podemos usar o undefined
  start(callback = () => {}) {
    this.#interValid = setInterval(() => {
      this.#elapseTimeInSeconds++; //Incrementa 1 segundo
      callback();
    }, 1000); //Diferente do setTimeOut que executa algo depois de x segundos, apenas uma vez, o Interval executa periodicamente, ou seja, algo vai ocorrer a cada 1 segundo
  }

  stop(callback = () => {}) {
    clearInterval(this.#interValid); //Limpa esse intervalo
    callback();
  }
  reset(callback = () => {}) {
    this.#elapseTimeInSeconds = 0;
    callback();
  }
  get elapseTime() {
    return Stopwatch.formatTime(this.#elapseTimeInSeconds); //Ou seja, definimos um getter que nos entrega tudo formatado, certinho
  }

  static formatTime(timeInSeconds) {
    //Static é um metodo da classe em si, não do objeto da classe
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmountDigits = 2) {
    let stringNumber = String(originalNumber);
    const zeroRequired = desiredAmountDigits - stringNumber.length;
    if (zeroRequired <= 0) {
      return stringNumber;
    }
    for (let counter = 0; counter < zeroRequired; counter++) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }
}

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("pause");
const stopwatchDisplay = document.getElementById("stopwatch-display");

function update() {
  stopwatchDisplay.innerHTML = cont.elapseTime;
}

const cont = new Stopwatch();

startBtn.addEventListener("click", () => {
  cont.start(update);
});

stopBtn.addEventListener("click", () => {
  cont.stop();
});

resetBtn.addEventListener("click", () => {
  cont.reset(update);
});

//Principio da abstração: É tipo 'menos é mais'
//Finalizamos a parte de l´gica, agora iremos para a parte de estilização
