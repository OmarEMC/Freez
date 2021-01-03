const p = require("phin");

class FreezE extends TypeError {
  constructor(message) {
    super(message)
    this.name = "[FreezAPI]"
    this.message = message;
  }
}

class Freez {
  constructor(key) {
    this.key = key;
    this.base = "https://api.freez.gq";
  }
  
  async corazon(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/corazon?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async fallar(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/fallar?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async internet(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/internet?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async obradearte(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/obradearte?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async triturar(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/triturar?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async turner_web(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/turner_web?image=${image}&size=${size}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }
  
  async bob(image, size) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/bob?image=${image}&size=${size}`,
      method: "GET",
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }

  async test(endpoint, image, size, ops = {post: false, data: {}}) {
    if(!image) throw new FreezE("El parametro 'image' es obligatorio.")

    let response = await p({
      url: `${this.base}/${endpoint}?image=${image}&size=${size}`,
      method: ops.post ? "POST" : "GET",
      data: ops.data,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }

  async google(text_1, text_2) {
    if(!text_1) throw new FreezE("El parametro 'text_1' es obligatorio.");
    if(!text_2) throw new FreezE("El parametro 'text_2' es obligatorio.");
    let response = await p({
      url: `${this.base}/google?text_1=${text_1}&text_2=${text_2}`,
      headers: {
        Authorization: `${this.key}`
      }
    });
    if(this.isJSON(response.body.toString()) && JSON.parse(response.body.toString()).error) throw new FreezE(`Error al hacer la petición: ${JSON.parse(response.body.toString()).error}`);
    else return response.body;
  }

  isJSON(str) {
    try {
      JSON.parse(str)
      return true;
    } catch(e) {
      return false;
    }
  }
}

module.exports = Freez;
  