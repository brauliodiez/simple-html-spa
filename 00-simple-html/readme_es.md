# Creando una aplicación web simple con HTML

Vamos a utilizar la api de Github para:

- En una página leer la lista de miembros que pertenecen a la organización 'Microsoft', esa página va a tener un enlace a otra página que va a mostrar la información de cada miembro de la organización.
- En la segunda página leemos de la API de Github del endpoint en el que se encuentra la información de cada miembro de la organización y la mostramos en la página.

## Creando la primera página

En la primera página vamos a leer la lista de miembros de la organización 'Microsoft' y vamos a mostrarla en una lista, cada elemento de la lista va a tener un enlace a la segunda página.

### Creando el archivo index.html

En el archivo index.html vamos a crear una lista vacía, en la que vamos a ir agregando los elementos de la lista.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Microsoft Members</title>
  </head>
  <body>
    <h1>Microsoft Members</h1>
    <ul id="members"></ul>
  </body>
</html>
```

### Creando el archivo members.js

En el archivo member.js vamos a leer la lista de miembros de la organización 'Microsoft' y vamos a mostrarla en la página.

```javascript
const membersList = document.getElementById("members");

fetch("https://api.github.com/orgs/Microsoft/members")
  .then((response) => response.json())
  .then((members) => {
    members.forEach((member) => {
      const memberItem = document.createElement("li");
      const memberLink = document.createElement("a");
      memberLink.href = `./member.html?login=${member.login}`;
      memberLink.textContent = member.login;
      memberItem.appendChild(memberLink);
      membersList.appendChild(memberItem);
    });
  });
```

Vamos a referenciarlo en el HTML

```diff
  <body>
    <h1>Microsoft Members</h1>
    <ul id="members"></ul>
+    <script src="./members.js"></script>
  </body>
```

## Creando la segunda página

En la segunda página vamos a leer la información de un miembro de la organización 'Microsoft' y vamos a mostrarla en la página.

### Creando el archivo member.html

En el archivo member.html vamos a mostrar la información de un miembro de la organización 'Microsoft'.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Member</title>
  </head>
  <body>
    <h1 id="member-name"></h1>
    <img id="member-avatar" src="" alt="Member avatar" />
    <p id="member-bio"></p>
  </body>
</html>
```

### Creando el archivo member.js

En el archivo member.js vamos a leer la información de un miembro de la organización 'Microsoft' y vamos a mostrarla en la página.

```javascript
const memberName = document.getElementById("member-name");

const memberAvatar = document.getElementById("member-avatar");

const memberBio = document.getElementById("member-bio");

const urlParams = new URLSearchParams(window.location.search);

const login = urlParams.get("login");

fetch(`https://api.github.com/users/${login}`)
  .then((response) => response.json())
  .then((member) => {
    memberName.textContent = member.name;
    memberAvatar.src = member.avatar_url;
    memberBio.textContent = member.bio;
  });
```

Vamos referenciar el fichero member.js en el fichero member.html

```diff
  <body>
    <h1 id="member-name"></h1>
    <img id="member-avatar" src="" alt="Member avatar" />
    <p id="member-bio"></p>
+    <script src="./member.js"></script>
  </body>
```

## Arrancando el proyecto

Vamos a utilizar _lite-server_, abrimos el terminal de visual studio code y ejecutamos:

Si no tenemos _lite-server_ instalado, ejecutamos:

```bash
npm install -g lite-server
```

Y después lo levantamos

```bash
lite-server
```

> Asegurate que estás en el directorio donde está el _index.html_

> Por defecto te abrirá una ventana en el navegador con la URL http://localhost:3000 (si está ocupado buscará el primero que esta libre a partir del 3000), y en el terminal te indica en que puerto está escuchando.

# Analizando lo que hemos creado

Ahora podemos ejecutar, y si abrimos la pestaña de Network y le indicamos que capture todo el tráfico, podrás ver que:

- Se carga el fichero index.html
- Se ejecuta la llamada asíncrona a la API de Github para obtener la lista de miembros de la organización 'Microsoft'

Cuando hacemos click en un miembro de la lista, se carga el fichero member.html y se ejecuta la llamada asíncrona a la API de Github para obtener la información del miembro.

Fijate que si vemos el HTML está casí vacio de primeras, en este caso estamos cargando el contenido desde _cliente_ si estuvieramos en PHP podríamos haber realizado la llamada desde servidor y haber precargado la información en el HTML sin utilizar JavaScript en cliente.
