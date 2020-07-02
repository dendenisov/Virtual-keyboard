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

function pressKeyboardKey() {
  const form = document.getElementById('input-id');

  document.getElementById('input-id').onblur = () => {
    document.getElementById('input-id').focus();
  };

  document.addEventListener('keydown', (event) => {
    const positionOfEntry = document.getElementById('input-id').selectionStart;
    const valueOfKey = document.getElementById(event.code).innerText;
    const formContentToArray = document.getElementById('input-id').value.split('');

    event.preventDefault();

    if (event.code !== 'ShiftLeft'
    && event.code !== 'ShiftRight'
    && event.code !== 'Tab'
    && event.code !== 'Delete'
    && event.code !== 'AltLeft'
    && event.code !== 'AltRight'
    && event.code !== 'CapsLock'
    && event.code !== 'Backspace'
    && event.code !== 'Space'
    && event.code !== 'ControlLeft'
    && event.code !== 'ControlRight'
    && event.code !== 'Enter'
    && event.code !== 'MetaRight'
    && event.code !== 'MetaLeft'
    && event.code !== 'ArrowUp'
    && event.code !== 'ArrowLeft'
    && event.code !== 'ArrowDown'
    && event.code !== 'ArrowRight') {
      formContentToArray.splice(positionOfEntry, 0, valueOfKey);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.code === 'Space') {
      formContentToArray.splice(positionOfEntry, 0, ' ');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.code === 'Tab') {
      formContentToArray.splice(positionOfEntry, 0, '    ');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 4, positionOfEntry + 4);
    }

    if (event.code === 'Enter') {
      formContentToArray.splice(positionOfEntry, 0, '\n');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.code === 'Backspace') {
      formContentToArray.splice(positionOfEntry - 1, 1);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry - 1, positionOfEntry - 1);
    }

    if (event.code === 'Delete') {
      formContentToArray.splice(positionOfEntry, 1);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry, positionOfEntry);
    }

    if (event.code === 'ArrowLeft') {
      form.setSelectionRange(positionOfEntry - 1, positionOfEntry - 1);
    }

    if (event.code === 'ArrowRight') {
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.code === 'ArrowUp') {
      form.setSelectionRange(document.getElementById('input-id').value.length, document.getElementById('input-id').value.length);
    }

    if (event.code === 'ArrowDown') {
      form.setSelectionRange(0, 0);
    }
  });
  return true;
}

function pressMouseKey() {
  const form = document.getElementById('input-id');

  document.getElementById('input-id').onblur = () => {
    document.getElementById('input-id').focus();
  };

  document.getElementById('keyboard-id').addEventListener('mousedown', (event) => {
    const positionOfEntry = document.getElementById('input-id').selectionStart;
    const formContentToArray = document.getElementById('input-id').value.split('');

    if (event.target.id !== 'ShiftLeft'
    && event.target.id !== 'ShiftRight'
    && event.target.id !== 'Tab'
    && event.target.id !== 'Delete'
    && event.target.id !== 'AltLeft'
    && event.target.id !== 'AltRight'
    && event.target.id !== 'CapsLock'
    && event.target.id !== 'Backspace'
    && event.target.id !== 'Space'
    && event.target.id !== 'ControlLeft'
    && event.target.id !== 'ControlRight'
    && event.target.id !== 'Enter'
    && event.target.id !== 'MetaRight'
    && event.target.id !== 'MetaLeft'
    && event.target.id !== 'ArrowUp'
    && event.target.id !== 'ArrowLeft'
    && event.target.id !== 'ArrowDown'
    && event.target.id !== 'ArrowRight'
    && event.target.id !== 'Clear'
    && event.target.className === 'key') {
      formContentToArray.splice(positionOfEntry, 0, event.target.innerText);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.target.id === 'Space') {
      formContentToArray.splice(positionOfEntry, 0, ' ');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.target.id === 'Tab') {
      formContentToArray.splice(positionOfEntry, 0, '    ');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 4, positionOfEntry + 4);
    }

    if (event.target.id === 'Enter') {
      formContentToArray.splice(positionOfEntry, 0, '\n');
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.target.id === 'Backspace') {
      formContentToArray.splice(positionOfEntry - 1, 1);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry - 1, positionOfEntry - 1);
    }

    if (event.target.id === 'Delete') {
      formContentToArray.splice(positionOfEntry, 1);
      document.getElementById('input-id').value = formContentToArray.join('');
      form.setSelectionRange(positionOfEntry, positionOfEntry);
    }

    if (event.target.id === 'Clear') {
      document.getElementById('input-id').value = '';
    }

    if (event.target.id === 'ArrowLeft') {
      document.getElementById('input-id').setSelectionRange(positionOfEntry - 1, positionOfEntry - 1);
    }

    if (event.target.id === 'ArrowRight') {
      form.setSelectionRange(positionOfEntry + 1, positionOfEntry + 1);
    }

    if (event.target.id === 'ArrowUp') {
      form.setSelectionRange(document.getElementById('input-id').value.length, document.getElementById('input-id').value.length);
    }

    if (event.target.id === 'ArrowDown') {
      form.setSelectionRange(0, 0);
    }

    if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
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

    if (event.target.className === 'key') {
      event.target.classList.add('key-down');
    }

    if (event.target.id === 'CapsLock') {
      if (CAPS_LOCK === false) {
        CAPS_LOCK = true;
      } else {
        CAPS_LOCK = false;
      }
    }

    if (event.target.id === 'CapsLock' && CAPS_LOCK === true && document.getElementById('KeyQ').innerText === '?') {
      getRusCapsKeys();
    }
    if (event.target.id === 'CapsLock' && CAPS_LOCK === false && document.getElementById('KeyQ').innerText === '?') {
      getRusKeys();
    }

    if (event.target.id === 'CapsLock' && CAPS_LOCK === true && document.getElementById('KeyQ').innerText === 'q') {
      getEngCapsKeys();
    }
    if (event.target.id === 'CapsLock' && CAPS_LOCK === false && document.getElementById('KeyQ').innerText === 'Q') {
      getEngKeys();
    }
  });

  document.getElementById('keyboard-id').addEventListener('mouseup', (event) => {
    if ((event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') && CAPS_LOCK === false) {
      if (document.getElementById('KeyQ').innerText === '?') {
        getRusKeys();
      } else {
        getEngKeys();
      }
    }

    if ((event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') && CAPS_LOCK === true) {
      if (document.getElementById('KeyQ').innerText === 'q') {
        getEngHighKeys();
      }

      if (document.getElementById('KeyQ').innerText === '?') {
        getRusHighKeys();
      }
    }

    event.target.classList.remove('key-down');
  });

  document.getElementById('keyboard-id').addEventListener('mouseout', (event) => {
    if ((event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') && CAPS_LOCK === false) {
      if (document.getElementById('KeyQ').innerText === '?') {
        getRusKeys();
      } else {
        getEngKeys();
      }
    }

    event.target.classList.remove('key-down');
  });
  return true;
}

createKeyboardSpace();
capsLockActivation();
changeLanguage();
pressShift();
markActiveKeys();
pressKeyboardKey();
pressMouseKey();
