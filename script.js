import { VALUE_OF_KEYS } from './values-of-keys.js';

let CAPS_LOCK = false;

function createKeyboardSpace() {
    document.body.innerHTML = ''
    document.body.insertAdjacentHTML('afterbegin', '<div class="keyboard-container" id="keyboard-id"></div>')
    document.body.insertAdjacentHTML('afterbegin', '<textarea class="input-class" id="input-id" autofocus></textarea>')
    document.body.insertAdjacentHTML('beforeend', '<div class="support" id="support"><p>Change language: Alt + Ctrl</p></div>')
    if (localStorage.getItem('language') === null) {
      localStorage.setItem('language', 'EN')
      createKeyboardSpace()
    } else if (localStorage.getItem('language') === 'EN') {
      getEngKeys()
    } else {
      getRusKeys()
    }
    return true
  }

  function markActiveKeys() {
    document.addEventListener('keydown', (event) => {
      document.getElementById(`${event.code}`).classList.add('key-down');
    });
  
    document.addEventListener('keyup', (event) => {
      document.getElementById(`${event.code}`).classList.remove('key-down');
    });
  
    return true;
  }

function capsLockActivation() {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'CapsLock') {
      if (CAPS_LOCK === false) {
        CAPS_LOCK = true;
      } else {
        CAPS_LOCK = false;
      }
    }

    if (event.code === 'CapsLock'
    && CAPS_LOCK === true
    && document.getElementById('KeyQ').innerText === 'й') {
    getRusCapsKeys();
  }
  if (event.code === 'CapsLock'
    && CAPS_LOCK === false
    && document.getElementById('KeyQ').innerText === 'Й') {
    getRusKeys();
  }

  if (event.code === 'CapsLock'
    && CAPS_LOCK === true
    && document.getElementById('KeyQ').innerText === 'q') {
    getEngCapsKeys();
  }
  if (event.code === 'CapsLock'
    && CAPS_LOCK === false
    && document.getElementById('KeyQ').innerText === 'Q') {
    getEngKeys();
  }
});
return true;
}

function changeLanguage() {
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.ctrlKey && event.altKey) {
      if (localStorage.getItem('language') === 'EN' && document.getElementById('KeyQ').innerText === 'q') {
        localStorage.setItem('language', 'RU');
        getRusKeys();
      } else if (localStorage.getItem('language') === 'RU' && document.getElementById('KeyQ').innerText === 'й') {
        localStorage.setItem('language', 'EN');
        getEngKeys();
      } else if (localStorage.getItem('language') === 'EN' && document.getElementById('KeyQ').innerText === 'Q') {
        localStorage.setItem('language', 'RU');
        getRusCapsKeys();
      } else if (localStorage.getItem('language') === 'RU' && document.getElementById('KeyQ').innerText === 'Й') {
        localStorage.setItem('language', 'EN');
        getEngCapsKeys();
      } else {
        localStorage.setItem('language', 'EN');
      }
    }
  });
  return true;
}

function getEngKeys() {
  const arrayOfKeys = Object.keys(VALUE_OF_KEYS);
  const arrayOfValues = Object.values(VALUE_OF_KEYS);
  const engKeys = arrayOfValues.map((el) => el.eng);

  document.getElementById('keyboard-id').innerHTML = '';

  for (let i = 0, j = 0; i < engKeys.length; i += 1, j += 1) {
    document.getElementById('keyboard-id').insertAdjacentHTML('beforeend', `<div class="key" id="${arrayOfKeys[j]}">${engKeys[i]}</div>`);
  }

  return true;
}

function getRusKeys() {
  const arrayOfKeys = Object.keys(VALUE_OF_KEYS);
  const arrayOfValues = Object.values(VALUE_OF_KEYS);
  const rusKeys = arrayOfValues.map((el) => el.rus);

  document.getElementById('keyboard-id').innerHTML = '';

  for (let i = 0, j = 0; i < rusKeys.length; i += 1, j += 1) {
    document.getElementById('keyboard-id').insertAdjacentHTML('beforeend', `<div class="key" id="${arrayOfKeys[j]}">${rusKeys[i]}</div>`);
  }

  return true;
}

function pressShift() {
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (localStorage.getItem('language') === 'RU' && CAPS_LOCK === false) {
        getRusHighKeys();
      }
      if (localStorage.getItem('language') === 'RU' && CAPS_LOCK === true) {
        getRusKeys();
      }
      if (localStorage.getItem('language') === 'EN' && CAPS_LOCK === false) {
        getEngHighKeys();
      }
      if (localStorage.getItem('language') === 'EN' && CAPS_LOCK === true) {
        getEngKeys();
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && CAPS_LOCK === false) {
      if (document.getElementById('KeyQ').innerText === '?') {
        getRusKeys();
      } else {
        getEngKeys();
      }
    }

    if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && CAPS_LOCK === true) {
      if (document.getElementById('KeyQ').innerText === 'q') {
        getEngHighKeys();
      }
      if (document.getElementById('KeyQ').innerText === '?') {
        getRusHighKeys();
      }
    }
  });
  return true;
}

createKeyboardSpace();
changeLanguage();
pressShift();
markActiveKeys();
