const path = require("path")

class SizeManager {
  constructor(defaultW, defaultH, defaultCoords = [], xs = false) {
    this.size = "lg";
    this.xs = xs;
    this.defaults = {
      w: defaultW,
      h: defaultH,
      coords: defaultCoords
    }
    this.h = 0;
    this.w = 0;
    this.coords = defaultCoords;
  }

  useSize(size = this.size) {
    switch (size) {
      case "xs":
        if(this.xs) this.useXS();
        else this.useDefaults();
        break;
      case "sm":
        this.h = p(50, this.defaults.h)
        this.w = p(50, this.defaults.w)
        this.coords = [
          p(50, this.defaults.coords[0]),
          p(50, this.defaults.coords[1]),
          p(50, this.defaults.coords[2]),
          p(50, this.defaults.coords[3])
        ]
        break;
      case "md":
        this.h = p(70, this.defaults.h)
        this.w = p(70, this.defaults.w)
        this.coords = [
          p(70, this.defaults.coords[0]),
          p(70, this.defaults.coords[1]),
          p(70, this.defaults.coords[2]),
          p(70, this.defaults.coords[3])
        ]
        break;
      case "lg":
        this.useDefaults();
        break;
      default:
        this.useDefaults();
        break;
    }

    return {h: this.h, w: this.w, coords: this.coords}
  }

  useDefaults() {
    this.h = this.defaults.h
    this.w = this.defaults.w
    this.coords = [
      this.defaults.coords[0],
      this.defaults.coords[1],
      this.defaults.coords[2],
      this.defaults.coords[3]
    ]
  }

  useXS() {
    this.h = p(30, this.defaults.h)
    this.w = p(30, this.defaults.w)
    this.coords = [
      p(30, this.defaults.coords[0]),
      p(30, this.defaults.coords[1]),
      p(30, this.defaults.coords[2]),
      p(30, this.defaults.coords[3])
    ]
  }
}

function p(number, of) {
  return (number/100) * of;
}

function getEndpoints() {
  const files = require('fs').readdirSync(path.join(__dirname, "/endpoints/"));
  let endpoints = [];
  for (var i = 0; i < files.length; i++) {
    endpoints.push(require(`./endpoints/${files[i]}`).endpoint)
  }

  return endpoints;
}

function isInner(number, options = { from: 10, to: 20 }) {
  if(number > options.from && number < options.to) return true;
  else return false;
}


module.exports = {
  SizeManager,
  getEndpoints,
  isInner,
  percentage: p
}