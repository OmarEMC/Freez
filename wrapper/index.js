const fs = require("fs");
const p = require("phin");

function generateEndpoint(name, params, post = false) {
  return `
  async ${name}(${params.map(p => p.name).join(", ")}) {
    ${params.map(p => {
      if(!p.optional) return `if(!${p.name}) throw new FreezE("El parametro '${p.name}' es obligatorio.")`
    }).join("\n")}
    let response = await p({
      url: \`${"$"}{this.base}/${name}${parseParams(params)}\`,${post !== undefined ? `\n\tmethod: ${post ? "\"POST\"" : "\"GET\""},` : ""}
      headers: {
        Authorization: \`${"$"}{this.key}\`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(\`Error al hacer la petición: ${"$"}{JSON.parse(response.body.toString()).error}\`);
    else return response.body;
  }
`
}

function generateClass(name, endpoints) {
  return `
class ${name} {
  constructor(key) {
    this.key = key;
    this.base = "https://api.freez.gq";
  }
  ${endpoints.map((end) => {
    return generateEndpoint(end.path.split("/")[1], end.params)
  }).join("")}

  isJSON(str) {
    try {
      JSON.parse(str)
      return true;
    } catch(e) {
      return false;
    }
  }
}

module.exports = ${name};
  `
}

function parseParams(params) {
  let parsed = params.map((p, i) => {
    if(i === 0) return `?${p.name}=${"$"}{${p.name}}`;
    else return `&${p.name}=${"$"}{${p.name}}`
  }).join("")
  return parsed;
}

function READMEENDPOINTS(endpoints, className) {
  if(Array.isArray(endpoints)) {
    return endpoints.map(({path, params}, i) => {
      if(i === 0) {
        return `
\`\`\`js
/* ${path.split("/")[1]} */
${className}.${path.split("/")[1]}(${params.map((p) => p.optional ? `[${p.name}]` : p.name).join(", ")})`
      } else if(i === (endpoints.length-1)) {
        return `
/* ${path.split("/")[1]} */
${className}.${path.split("/")[1]}(${params.map((p) => p.optional ? `[${p.name}]` : p.name).join(", ")})
\`\`\`
`
      } else {
        return `
/* ${path.split("/")[1]} */
${className}.${path.split("/")[1]}(${params.map((p) => p.optional ? `[${p.name}]` : p.name).join(", ")})
`
      }
    }).join("")
  } else {
    let { path, params } = endpoints;
    return `
/* ${path.split("/")[1]} */
${className}.${path.split("/")[1]}(${params.map((p) => p.optional ? `[${p.name}]` : p.name).join(", ")})
`
  }
}

/* p.unpromisified({url: "https://api.freez.gq", 'parse': 'json'}, (err, res) => {
  if(!err) {
    let endpoints = res.body.endpoints;
    let classe = generateClass("Freez", endpoints)
    fs.appendFile(require("path").join(__dirname, "src", "index.js"), classe, function (err,data) {
      if (err) {
        return console.log(err);
      }
    })
    /* fs.appendFile(require("path").join(__dirname, "README.md"), READMEENDPOINTS(endpoints, "Freez"), function (err,data) {
      if (err) {
        return console.log(err);
      }
    })
  } else {
    console.log(err)
  }
}) */

let generated = READMEENDPOINTS([
  {
    "path": "/bob",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/corazon",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/fallar",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/google",
    "params": [
      {
        "name": "text_1",
        "type": "text",
        "optional": false
      },
      {
        "name": "text_2",
        "type": "text",
        "optional": false
      }
    ],
    "type": "GET"
  },
  {
    "path": "/internet",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "xs",
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/obradearte",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/triturar",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  },
  {
    "path": "/turner_web",
    "params": [
      {
        "name": "image",
        "type": "image",
        "optional": false
      },
      {
        "name": "size",
        "type": "Size",
        "optional": true
      }
    ],
    "sizes": [
      "sm",
      "md",
      "lg"
    ],
    "type": "GET"
  }
], "Freez")

console.log(generated)

module.exports = {
  generateEndpoint,
  generateClass
};