class DotDrawer {
  constructor(id) {
    let div = document.getElementById(id);

    let tb = new KToggleButton("main");

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.style.borderColor = "gray";
    svg.style.borderStyle = "ridge";
    svg.style.borderWidth = "4px";
    svg.style.width = 320;
    svg.style.height = 320;

    let tgt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let x = 0, y = 0;
    tgt.setAttributeNS(null, "x", x);
    tgt.setAttributeNS(null, "y", y);
    tgt.setAttributeNS(null, "width", 10);
    tgt.setAttributeNS(null, "height", 10);
    tgt.setAttributeNS(null, "stroke", "black");
    tgt.setAttributeNS(null, "fill-opacity", 0);

    let cells = [];
    for (let j = 0; j < 32; j++) {
      cells.push([]);
      for (let i = 0; i < 32; i++) {
        let x = i * 10, y = j * 10;
        cells[j].push(new Cell());
        cells[j][i].put(svg, x, y);
        cells[j][i].setColor(0xffffffff);
        console.log(cells[j][i]._color.RGB);
      }
    }

    window.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "w":
        case "ArrowUp":
        case "k":
          y = y - 10;
          break;
        case "a":
        case "ArrowLeft":
        case "h":
          x = x - 10;
          break;
        case "s":
        case "ArrowDown":
        case "j":
          y = y + 10;
          break;
        case "d":
        case "ArrowRight":
        case "l":
          x = x + 10;
          break;
      }
      tgt.setAttributeNS(null, "x", x);
      tgt.setAttributeNS(null, "y", y);
    });

    svg.appendChild(tgt);

    div.appendChild(svg);

  }
}

class Cell {
  constructor() {
    this._color = new Color();
    this._svg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this._svg.setAttributeNS(null, "width", 10);
    this._svg.setAttributeNS(null, "height", 10);
    this._svg.setAttributeNS(null, "stroke", "darkgray");
    this.setColor(0x000000ff)
  }
  get Color() {
    return this._color;
  }
  put(svg, x, y) {
    this._svg.setAttributeNS(null, "x", x);
    this._svg.setAttributeNS(null, "y", y);
    svg.appendChild(this._svg);
  }
  setColor(number) {
    this._color.Number = number;
    this._svg.setAttributeNS(null, "fill", this._color.RGB);
    this._svg.setAttributeNS(null, "fill-opacity", this._color.AlphaRate);
  }
}

class Color {
  constructor(number) {
    this.Number = number;
  }
  get Red() {
    return (this._number & 0xff000000) >>> 24;
  }
  get Green() {
    return (this._number & 0x00ff0000) >>> 16;
  }
  get Blue() {
    return (this._number & 0x0000ff00) >>> 8;
  }
  get Alpha() {
    return (this._number & 0x000000ff) >>> 0;
  }
  get AlphaRate() {
    return this.Alpha / 0x000000ff;
  }
  get RGB() {
    return "rgb(" + this.Red + "," + this.Green + "," + this.Blue + ")";
  }
  set Number(number) {
    this._number = number;
  }
  setRGB(r, g, b) {
    this._number = (r << 24) & (g << 16) & (b << 8) & 0xff;
  }
  setRGBA(r, g, b, a) {
    this._number = (r << 24) & (g << 16) & (b << 8) & (a << 0);
  }
}


class KToggleButton {
  constructor(id, options) {
    if (options) {
      if (options.fontSize) {
        this.fontSize = options.fontSize;
      }
      if (options.on) {
        if (options.on.color) {
          this.oncolor = options.on.color;
        }
        if (options.on.text) {
          this.ontext = options.on.text;
        }
      }
      if (options.off) {
        if (options.off.color) {
          this.offcolor = options.off.color;
        }
        if (options.on.text) {
          this.offtext = options.off.text;
        }
      }
    }
    if (!this.fontSize) {
      this.fontSize = 12;
    }
    if (!this.oncolor) {
      this.oncolor = "lime";
    }
    if (!this.ontext) {
      this.ontext = "ON";
    }
    if (!this.offcolor) {
      this.offcolor = "rgb(200, 250, 200)";
    }
    if (!this.offtext) {
      this.offtext = "OFF";
    }
    this.div = document.createElement("div");
    let cir = Math.ceil(this.fontSize * 0.25);
    this.div.style.borderRadius = cir + "px";
    this.div.style.fontSize = this.fontSize + "px";
    this.div.style.padding = cir + "px " + (cir * 2) + "px";
    let w = Math.max(this.ontext.length, this.offtext.length) * this.fontSize * 1;
    this.div.style.width = w + "px";
    this.div.style.cursor = "pointer";
    this.div.style.userSelect = "none";
    this.div.style.transitionProperty = "background-color";
    this.div.style.transitionDuration = "0.1s";
    this.div.style.textAlign = "center";
    let self = this;
    this.div.addEventListener("click", function () {
      self.switching();
    });
    this.off();
    let parent = document.getElementById(id);
    parent.appendChild(this.div);
  }
  get Div() {
    return this.div;
  }
  switching() {
    if (this.state) {
      this.off();
    }
    else {
      this.on();
    }
  }
  on() {
    this.state = true;
    this.div.style.backgroundColor = this.Color;
    this.div.innerText = this.Text;
  }
  off() {
    this.state = false;
    this.div.style.backgroundColor = this.Color;
    this.div.innerText = this.Text;
  }
  get Color() {
    return this.state ? this.oncolor : this.offcolor;
  }
  get Text() {
    return this.state ? this.ontext : this.offtext;
  }
  get State() {
    return this.state;
  }
}