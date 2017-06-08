if (!String.prototype.padEnd) {
  Object.defineProperty(String.prototype, 'padEnd', {
    configurable: true,
    enumerable: false,
    value: function padEnd(targetLength, padString) {
      targetLength = targetLength | 0;
      if (targetLength <= this.length) return String(this);
      padString = String(padString || ' ');
      var repeat = Math.ceil((targetLength - this.length) / padString.length);
      while (repeat--) {
        padString += padString;
      }
      return String(this) + padString.substr(0, targetLength - this.length);
    },
    writable: true
  });
};

if (!String.prototype.padStart) {
  Object.defineProperty(String.prototype, 'padStart', {
    configurable: true,
    enumerable: false,
    value: function padStart(targetLength, padString) {
      targetLength = targetLength | 0;
      if (targetLength <= this.length) return String(this);
      padString = String(padString || ' ');
      var repeat = Math.ceil((targetLength - this.length) / padString.length);
      while (repeat--) {
        padString += padString;
      }
      return padString.substr(0, targetLength - this.length) + String(this);
    },
    writable: true
  });
};

const number = [`
  ██████╗
 ██╔═████╗
 ██║██╔██║
 ████╔╝██║
 ╚██████╔╝
  ╚═════╝
`, `
     ██╗
    ███║
    ╚██║
     ██║
     ██║
     ╚═╝
`, `
 ██████╗
 ╚════██╗
  █████╔╝
 ██╔═══╝
 ███████╗
 ╚══════╝
`, `
 ██████╗
 ╚════██╗
  █████╔╝
  ╚═══██╗
 ██████╔╝
 ╚═════╝
`, `
 ██╗  ██╗
 ██║  ██║
 ███████║
 ╚════██║
      ██║
      ╚═╝
`, `
 ███████╗
 ██╔════╝
 ███████╗
 ╚════██║
 ███████║
 ╚══════╝
`, `
  ██████╗
 ██╔════╝
 ███████╗
 ██╔═══██╗
 ╚██████╔╝
  ╚═════╝
`, `
 ███████╗
 ╚════██║
     ██╔╝
    ██╔╝
    ██║
    ╚═╝
`, `
  █████╗
 ██╔══██╗
 ╚█████╔╝
 ██╔══██╗
 ╚█████╔╝
  ╚════╝
`, `
  █████╗
 ██╔══██╗
 ╚██████║
  ╚═══██║
  █████╔╝
  ╚════╝
`].map(e => e.replace(/^\r?\n|\r?\n$/g, '').split('\n').map(e => e.padEnd(10)));

const colon = `

 ██╗
 ╚═╝
 ██╗
 ╚═╝

`.replace(/^\r?\n|\r?\n$/g, '').split('\n').map(e => e.padEnd(5));

const slash = `
     ██╗
    ██╔╝
   ██╔╝
  ██╔╝
 ██╔╝
 ╚═╝
`.replace(/^\r?\n|\r?\n$/g, '').split('\n').map(e => e.padEnd(8));

const space = Array(6).fill('   ');

const addAsciiNumber = (ascii, numbers) => {
  ascii = ascii.map(e => e.slice());
  numbers.reduce((p, c) => {
    p.forEach((e, i) => e.push(number[c][i]));
    return p;
  }, ascii);
  return ascii;
};

const addAsciiChar = (ascii, char) => {
  ascii = ascii.map(e => e.slice());
  ascii.forEach((e, i) => {
    e.push(char[i]);
  });
  return ascii;
};

const displayTime = () => {
  const date = new Date();

  console.log('\033c\x1B[2J\x1B[0f\u001b[0;0H\n\n\n\n');
  let asciiDate = Array(6).fill().map(() => []);
  asciiDate = addAsciiNumber(asciiDate, (date.getMonth() + 1).toString().padStart(2, '0').split('').map(e => +e));
  asciiDate = addAsciiChar(asciiDate, slash);
  asciiDate = addAsciiNumber(asciiDate, (date.getDate()).toString().padStart(2, '0').split('').map(e => +e));
  asciiDate = addAsciiChar(asciiDate, slash);
  asciiDate = addAsciiNumber(asciiDate, (date.getFullYear() % 100).toString().split('').map(e => +e));
  console.log(asciiDate.map(e => e.join('')).join('\n'));
  console.log('');

  let asciiTime = Array(6).fill().map(() => []);
  asciiTime = addAsciiChar(asciiTime, space);
  asciiTime = addAsciiNumber(asciiTime, ((date.getHours()) || 12).toString().padStart(2, '0').split('').map(e => +e));
  asciiTime = addAsciiChar(asciiTime, colon);
  asciiTime = addAsciiNumber(asciiTime, (date.getMinutes()).toString().padStart(2, '0').split('').map(e => +e));
  asciiTime = addAsciiChar(asciiTime, colon);
  asciiTime = addAsciiNumber(asciiTime, (date.getSeconds()).toString().padStart(2, '0').split('').map(e => +e));
  console.log(asciiTime.map(e => e.join('')).join('\n'));

  setTimeout(displayTime, 1000 - (Date.now() % 1000));
};

displayTime();
