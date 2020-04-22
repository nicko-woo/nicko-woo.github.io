class ModalWindow {
  constructor(options) {
    this.opts = Object.assign({}, ModalWindow._defaultOptions, options)
    this.modal = document.querySelector(this.opts.selector)
    this.initialize()
    this.addEventHandlers()
    this.afterRender()
  }
  initialize() {
    if (this.opts.headerText) {
      this.query('.md-dialog-header-text').textContent = this.opts.headerText
    }
    if (this.opts.htmlContent) {
      this.query('.md-dialog-content').innerHTML = this.opts.htmlContent
    } else if (this.opts.textContent) {
      this.query('.md-dialog-content').textContent = this.opts.textContent
    }
    if (this.opts.theme) {
      this.modal.classList.add(`md-theme-${this.opts.theme}`)
    }
  }
  addEventHandlers() {
    this.query('.md-dialog-header-close-btn').addEventListener('click', (e) => {
      this.setVisible(false)
    })
    if (this.opts.mode !== 'modal') {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.setVisible(false)
        }
      })
    }
  }
  afterRender() {
    if (this.opts.show === true) {
      this.setVisible(true);
    }
  }
  setVisible(visible) {
    this.modal.classList.toggle('md-dialog-visible', visible)
    if (visible) {
       this.onOpen() // class method override or callback (below)
       if (typeof this.opts.onOpen === 'function') {
        this.opts.onOpen(this.modal)
       }
    } else {
      this.onClose() // class method override or callback (below)
      if (typeof this.opts.onClose === 'function') {
        this.opts.onClose(this.modal)
       }
    }
  }
  query(childSelector) {
    return this.modal.querySelector(childSelector)
  }
  // Example hooks
  onOpen() { }
  onClose() { } 
}
ModalWindow._defaultOptions = {
  selector: '.md-dialog',
  show: false,
  mode: 'modal'
}

class MyCustomModalWindow extends ModalWindow {
  constructor(options) {
    super(options)
  }
  onOpen() {
    console.log('Opened!') // or you can use options.onOpen
  }
  onClose() {
    console.log('Closed!') // or you can use options.onClose
  }
}

let modal = new MyCustomModalWindow({
  show: true, // Show the modal on creation
  mode: null, // Disable modal mode, allow click outside to close
  headerText: 'Hello World!',
  htmlContent: '<p>This is an example of the popup.</p>',
  theme : 'dark',
  onClose : (self) => {
    console.log('Another close hook...')
  }
})
document.querySelector('#show-modal-btn').addEventListener('click', (e) => {
  modal.setVisible(true)
})