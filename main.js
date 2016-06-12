class Questioner {
  constructor(qs){
    this.data = qs[0];
    this.actions = [];
    this.loadUI();
    this.addListeners();
  }
  loadUI() {
    this.loadUICats()
    this.loadBackButton();
  }
  loadUICats(){
    let qCats = document.getElementById('qCats');
    let cats = Object.keys(this.data);
    let Q = this;
    cats.forEach(function(cat){
      let n = document.createElement('li');
      n.className = "q-cat";
      n.id = cat;
      n.innerHTML = cat;
      Q.actions[cat] = function(){
        Q.loadUIQuestions(cat);
        for (let i = 0; i < qCats.children.length; i++) {
          let node = qCats.children[i];
          if (node.id !== cat) node.className += " hidden";
        }
      };
      qCats.appendChild(n);
    });
  }
  loadUIQuestions(cat){
    let Qs = document.getElementById('Qs');
    while (Qs.children.length > 0) Qs.removeChild(Qs.children[0])
    let qs = this.data[cat];
    // loads one
    let qNum = Math.floor(Math.random() * (qs.length - 0)) + 0;
    let n = document.createElement('li');
    n.className = "q";
    n.innerHTML = qs[qNum];
    Qs.appendChild(n);
  }
  loadBackButton(){
    this.actions['backButton'] = function(){
      let qCats = document.getElementById('qCats');
      let Qs = document.getElementById('Qs');
      while (Qs.children.length > 0) Qs.removeChild(Qs.children[0]);
      for (let i = 0; i < qCats.children.length; i++) {
        let node = qCats.children[i];
        node.className = "q-cat";
      }
    }
  }
  addListeners(){
    let actions = this.actions;
    document.onclick = function(e){
      if (Object.keys(actions).indexOf(e.target.id) !== -1) {
        actions[e.target.id].call();
      }
    };
  }
}

window.onload = function() {
  var q = new Questioner(QS);
};
