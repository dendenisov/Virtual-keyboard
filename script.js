function createKeyboardSpace() {
    document.body.innerHTML = ''
    document.body.insertAdjacentHTML('afterbegin', '<div class="keyboard-container" id="keyboard-id"></div>')
    document.body.insertAdjacentHTML('afterbegin', '<textarea class="input-class" id="input-id" autofocus></textarea>')
    document.body.insertAdjacentHTML('beforeend', '<div class="support" id="support"><p>Change language: Alt + Shift or Ctrl + Shift</p></div>')
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

  createKeyboardSpace()