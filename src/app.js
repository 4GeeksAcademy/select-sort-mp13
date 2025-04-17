
const getVal = (num) => {
  return (num == 1) ? 'A' : (num == 11) ? 'J' : (num == 12) ? 'Q' : (num == 13) ? 'K' : num;
};

const getColorClass = (pinta) => {
  return (pinta === '♥' || pinta === '♦') ? 'red' : 'black';
};

const getMazo = (len) => {
  const pintas = ['♣', '♦', '♥', '♠'];
  const getRandomCarta = () => ({
    num: Math.floor(Math.random() * 13) + 1,
    pinta: pintas[Math.floor(Math.random() * 4)]
  });

  let mazo = [];
  for (let i = 0; i < len; i++) mazo.push(getRandomCarta());
  return mazo;
};

let log = [];
let mazo = [];

document.querySelector('#draw').addEventListener('click', () => {
  mazo = getMazo(document.querySelector('#amount').value);
  document.querySelector('.mazo.unsorted').innerHTML = mazo.map(c =>
    `<div class="carta ${getColorClass(c.pinta)}">
          <div class="esquina arriba-izquierda">${c.pinta}</div> 
          ${getVal(c.num)}
          <div class="esquina abajo-derecha">${c.pinta}</div>
      </div>`
  ).join('');
  document.querySelector('.solution-log').innerHTML = '';
});

document.querySelector('#sort').addEventListener('click', () => {
  log = [];
  let n = mazo.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (mazo[j].num < mazo[minIndex].num) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [mazo[i], mazo[minIndex]] = [mazo[minIndex], mazo[i]];
      log.push(mazo.slice());
    }
  }

  document.querySelector('.solution-log').innerHTML = log.map(iter =>
    `<li><div class="mazo">${iter.map(c =>
      `<div class="carta ${getColorClass(c.pinta)}">
              <div class="esquina arriba-izquierda">${c.pinta}</div>
              ${getVal(c.num)} 
              <div class="esquina abajo-derecha">${c.pinta}</div>
          </div>`
    ).join('')}</div></li>`
  ).join('');
});
