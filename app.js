
let word = 'Here you can se.'.toLocaleLowerCase();
class stringWorkspace {
    constructor(words) {
        this.words = words.split('');
        this.currchar = 0;
        this.wordcontainer = document.querySelector('.cnt');
        this.typedEntries = 0;
        this.errors = 0
        this.secs = 0;
    }
    addwords() {
        // cleaning the words
        this.words.forEach((el) => {
            this.wordcontainer.innerHTML += `<span class="inwrd">${el}</span>`;
        })
    }
    cursors(num) {
        this.wordcontainer.children[num].classList.add('active');
        this.remove = this.currchar > 0 ? this.wordcontainer.children[num - 1].classList.remove('active') : false;
        return this.wordcontainer.children[num];
    };
    movecursor() {
        setInterval(() => {
            this.secs += 1
        }, 1000);
        setInterval(() => {
            this.grossWpm()
        }, 1000);
        document.onkeypress = (el) => {
            if (el.key == this.cursors(this.currchar).textContent) {
                this.active = el.key == this.wordcontainer.children[this.currchar].textContent ? this.currchar++ : false;
                document.querySelector('.cnt').style.transform += `translateX(-${this.cursors(this.currchar).getBoundingClientRect().width}px)`;
            } else {
                this.cursors(this.currchar).outerHTML = `<span class="inerr">${el.key}</span><span class="inwrd">${this.cursors(this.currchar).innerHTML}</span>`;
                document.querySelector('.cnt').style.transform += `translateX(-${this.cursors(this.currchar).getBoundingClientRect().width+3}px)`;
                this.currchar += 1;
                this.cursors(this.currchar);
                this.errors++;
            }
            if (this.currchar == this.wordcontainer.childNodes.length){
                this.wordcontainer.childNodes[this.currchar].classList.remove('active');
                console.log('hello')
            }
            this.typedEntries++;
            this.displaylastchar(el.key)
            }
        }

    displaylastchar(char){
        document.querySelector('.last-char').innerText = char;
    }
    grossWpm() {
        this.gwpm = Math.floor((this.typedEntries / 4) / (this.secs / 60));
        document.querySelector('.speed').innerText = `${this.gwpm}wpm`;
    }
}
let workspace = new stringWorkspace(word);
workspace.addwords();
workspace.cursors(0);
workspace.movecursor();
