const router = require("express").Router();
const { createCanvas, loadImage } = require("canvas");
const { SizeManager } = require("../utils");
const path = require("path")

router.get("/", async function(req, res) {

  const Manager = new SizeManager(768, 1185, [160, 105, 264, 308])
  const SecondManager = new SizeManager(768, 1185, [259, 973, 279, 260])
  let { size, image } = req.query;
  if(!image) return res.json({
    error: "Falta 'image' en la consulta."
  })
  const { w, h, coords } = Manager.useSize(size ? size : "lg");
  const { coords: coordinates } = SecondManager.useSize(size ? size : "lg");
  const canvas = createCanvas(w, h)
  const ctx = canvas.getContext("2d")

  try {
    image = await loadImage(image);
    ctx.save()
    ctx.rotate(-19)
    ctx.drawImage(image, coords[0], coords[1], coords[2], coords[3])
    ctx.restore()

    ctx.drawImage(image, coordinates[0], coordinates[1], coordinates[2], coordinates[3])
  } catch(e) {
    return res.json({
      error: `Error al cargar la imagen:\n${e.message}`
    })
  }

  const template = await loadImage(path.join(__dirname, "..", "..", "images/triturar.png"))
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
  path: "/triturar",
  params: [
    {name: "image", type: "image", optional: false},
    {name: "size", type: "Size", optional: true}
  ],
  sizes: ["sm", "md", "lg"],
  type: "GET"
}