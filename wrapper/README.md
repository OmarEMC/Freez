<center>
  <img src="https://freez.gq/logo512.png" alt="Logo" width="200"/>
</center><br>

Wrapper de api.Freez.gq
=======================

## Inicio
Para poder usar el modulo debes tener una clave, la cual consigues en https://freez.gq al iniciar sesión e ir a tu perfil.

```js
const Wrapper = require("freez.js")
const Freez = new Wrapper("CLAVE-DE-LA-API");

/* Ejemplo */
Freez.internet("https://cdn.discordapp.com/avatars/531305773029130250/e77906c3b7e966a3804de43e7eb34420.png", "md").then((a) => {
  console.log(a) // Si todo sale bien, la variable `a` debería tener el Buffer de la imagen.
})
// Async/Await
;(async() => {
  let imagen = await Freez.internet("https://cdn.discordapp.com/avatars/531305773029130250/e77906c3b7e966a3804de43e7eb34420.png", "md")
  console.log(imagen)
})()
```

## Errores
Todos los errores son una instancia de TypeError y cada uno te dice exactamente que fue lo que pasó, pero, si tienes algun problema y no sabes como solucionarlo ve al apartado de Dudas y problemas (Abajo).

## Endpoints
Puedes ver una lista detallada aquí: https://api.freez.gq/
- [] = parametro opcional.

```js
/* bob */
Freez.bob(image, [size])

/* corazon */
Freez.corazon(image, [size])

/* fallar */
Freez.fallar(image, [size])

/* google */
Freez.google(text_1, text_2)

/* internet */
Freez.internet(image, [size])

/* obradearte */
Freez.obradearte(image, [size])

/* triturar */
Freez.triturar(image, [size])

/* turner_web */
Freez.turner_web(image, [size])
```

## Tamaños aceptados (size)
- `xs`: Aceptado solo por: `internet`
- `sm`
- `md`
- `lg`

## Cambios
- 25/08/2020: Se añadieron los endpoints `google` y `bob`.

## Dudas y problemas
- OmarEMC#8916
- [MyBot en #ayuda_otras-libs](https://discord.gg/g6ssSmK)