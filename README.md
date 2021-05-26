# [Nombre del Proyect]

[[Descripcion del Proyecto]]

> Antes de comenzar a usar este template por favor leer las instrucciones [aqui](tutorials/Instrucciones.md)

## Variables de entorno y npmrc

Antes de iniciar es necesario contar con 2 archivos en la raiz del proyecto:

- Un archivo `.env` conteniendo las variables de entorno que utilizara la API, debe tener la siguiente estructura:

```
PORT=3000
NODE_ENV=dev
NODE_LOG_FILE_PATH=./logs/
JWT_SECRET=<TU JWT SECRET>
MONGO_URI=<TU MONGODB CONNECTION STRING>
```

- Y un archivo de configuracion de NPM (`.npmrc`), el cual se utilizara para poder descargar la libreria FIF Common Logger del registro NPM de FIF. Debe contar con la siguiente estructura:

```
registry=https://npm-registry.fif.tech/
//npm-registry.fif.tech/:_authToken="<SECRET_TOKEN>"
```

**NOTA**: El secret token del archivo `.npmrc` se puede solicitar al Technical Lead o focal point.

## Iniciar la API localmente con Docker

- Primero construir la imagen:

```sh
npm run docker:dev:build
```

- Ahora se puede iniciar la API

```sh
npm run docker:dev:start
```

- La aplicacion deberia iniciar en el puerto 3000 o cualquier otro indicado por el archivo `.env`

- De igual manera se recomienda instalar las dependencias en el host para obtener una mejor experiencia con el editor. Por lo tanto correr:

```sh
npm install
```

## Iniciar la API desde el host (sin docker)

- Primero asegurarse de tener la version de node 14.6.X
- Instalar las dependencias:

```sh
npm install
```

- Iniciar la aplicacion en modo desarrollo:

```sh
npm run dev
```

- La aplicacion deberia iniciar en el puerto 3000 o cualquier otro indicado por el archivo `.env`

## Debuguear la aplicacion

La aplicacion puede ser debugueada desde docker o el host.

- Con docker:

```sh
npm run docker:dev:debug
```

- Con host:

```sh
npm run debug
```

- Despues de correr ambos comandos, un servidor de debugging debe quedar activo a traves del puerto 9229. Para asi poder utilizarlo usando las Chrome Developer tools o el mismo debugger de VSCode.

## Pruebas Unitarias o de Integracion

- Para correr la suite de pruebas se recomienda hacerlo desde el host (para una mejor experiencia con el editor). Para eso correr:

```sh
npm test
```

- Para una mejor experiencia con TDD se puede correr en modo `watch`:

```sh
npm run watch
```

- En caso de querer conocer la cobertura, utilizar el siguiente comando:

```sh
npm run coverage
```

## Pre-commits

Este proyecto esta configurado para que se ejecuten una serie de verificaciones antes de hacer cualquier commit. Inicialmente se ejecutan estos comandos:

- Para verificar que se cumplan las reglas relacionadas al estilo de codigo (linter)

```sh
npm run lint
```

- En caso de que el linter falle, pueden hacerse una correccion automatica usando el siguiente comando:

```sh
npm run lint:fix
```

- Y la cobertura de pruebas

```sh
npm run coverage
```

No podra realizarse el commit si alguna de estos dos ejecuciones falla. Tener en cuenta que aunque todas las pruebas pasen, sino se cumple el minimo threshold de cobertura, igual el segundo comando fallara.

## Compilar proyecto para Produccion o QA

Este template ya cuenta con un archivo `.gitlab-ci.yml` con los pasos iniciales del pipeline (lint, tests, compilacion, verificacion de vulnerabilidades/exposicion de secretos). A la hora de deployar, sera necesario descomentar los pasos finales.

Adicionalmente es necesario cambiar las configuraciones que hacen referencia al nombre del proyecto/artefacto. Dichas configuraciones se indican usando comentarios. Por ejemplo:

```yml
variables:
  # Change this to the corresponding IMAGE_NAME
  IMAGE_NAME: hub.fif.tech/seguros-core/ts-template-api
```
