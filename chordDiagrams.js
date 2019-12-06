function pageLoad() {

  let manyTabsHTML = '';
  for (let x = 1; x <= 1000; x++) {
    manyTabsHTML += `<div style='display:inline-block; margin: 5px'><canvas id='tabCanvas${x}'></div>`;
  }
  document.getElementById("manyTabs").innerHTML = manyTabsHTML;

  for (let x = 1; x <= 1000; x++) {
    let frets = [];
    for (let f = 0; f < 6; f++) {
      frets.push(Math.floor(Math.random()*6)-1);
    }
    drawTab('tabCanvas' + x, 'Random', frets, 5);
  }

}

function drawTab(canvasId, chordName, fretNumbers, size) {

  const canvas = document.getElementById(canvasId);

  canvas.width = 14*size;
  canvas.height = 25*size;

  const context = canvas.getContext('2d');

  context.fillStyle = 'white';
  context.fillRect(0, 0, 14*size, 25*size);

  context.strokeStyle = 'black';
  for (let y = 6*size; y <= 24*size; y += 3*size) {
    if (y === 6*size) {
      context.lineWidth = 6;
    } else {
      context.lineWidth = 2;
    }
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(2*size, y);
    context.lineTo(12*size, y);
    context.stroke();
  }

  context.strokeStyle = 'black';
  for (let x = 2*size; x <= 12*size; x += 2*size) {
    context.beginPath();
    context.moveTo(x, 6*size);
    context.lineTo(x, 24*size);
    context.stroke();
  }

  context.fillStyle = 'black';
  context.font = 'bold ' + String(size*2) + 'px Arial';
  context.textAlign = 'center';
  context.fillText(chordName, size*7, size*2);

  let lowestFret = Infinity;

  for (let fret of fretNumbers) {
    if (fret === -1) continue;
    if (fret < lowestFret) {
      lowestFret = fret;
    }
  }

  context.textAlign = 'left';
  context.font = String(size*2) + 'px Arial';
  context.fillText(String(lowestFret), size/2, size*8);

  context.font = String(size*2) + 'px Arial';
  let x = 2*size
  for (let fret of fretNumbers) {
    if (fret === -1) {
      context.fillText('x', x-size/2, size*5);
    } else if (fret === 0) {
      context.fillText('o', x-size/2, size*5);
    } else {
      let f = fret - lowestFret;
        context.beginPath();
        context.arc(x, f*size*3 + 4.5*size, size*(2/3), 0, 2*Math.PI);
        context.fill();
    }
    x += 2*size;
  }

}
