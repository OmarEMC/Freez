const router = require("express").Router();
const { createCanvas, loadImage } = require("canvas");
const { SizeManager } = require("../utils");
const path = require("path")

router.get("/", async function(req, res) {
  const Manager = new SizeManager(552, 667, [45, 57, 167, 226])
  let { size, image } = req.query;
  if(!image) return res.json({
    error: "Falta 'image' en la consulta."
  })
  const { w, h, coords } = Manager.useSize(size ? size : "lg")
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext("2d")

  try {
    const Imagen = await loadImage(image);
    ctx.drawImage(Imagen, coords[0], coords[1], coords[2], coords[3]);
  } catch(e) {
    return res.json({
      error: `Error al cargar la imagen:\n${e.message}`
    })
  }

  const template = await loadImage(path.join(__dirname, "..", "..", "images/bob.jpg"))
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height)
  
  const buffer = canvas.toBuffer();
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length
  });

  res.end(buffer);
})

module.exports = router;
module.exports.endpoint = {
  path: "/bob",
  params: [
    {name: "image", type: "image", optional: false},
    {name: "size", type: "Size", optional: true}
  ],
  sizes: ["sm", "md", "lg"],
  type: "GET"
} 