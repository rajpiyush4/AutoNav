class Controls {
    constructor() {
        this.left = false
        this.right = false
        this.forward = false
        this.back = false
        this.#addkeyListeners()
    }
    #addkeyListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.left = true
            }
            if (e.key === 'ArrowRight') {
                this.right = true
            }
            if (e.key === 'ArrowUp') {
                this.forward = true
            }
            if (e.key === 'ArrowDown') {
                this.back = true
            }
            
        })
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') {
                this.left = false
            }
            if (e.key === 'ArrowRight') {
                this.right = false
            }
            if (e.key === 'ArrowUp') {
                this.forward = false
            }
            if (e.key === 'ArrowDown') {
                this.back = false
            }
        })
    }

    

}