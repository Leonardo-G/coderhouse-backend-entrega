# Proyecto final CoderHouse - Backend

Proyecto realizado para la entrega final de CoderHouse con Node, creando una API y aparte sus plantillas, en la cual se demuestra el uso de la API.

### Instalación

Una vez clonado el repositorio o descargado el los archivos del repositorio, para poder iniciar la aplicación en tu entorno local, hay que instalar las dependencias necesarias con:

```
npm install
```

Una vez instalado, podemos correr la aplicación en un servidor local:

```
node app
```

### Herramientas utilizadas para crear este proyecto.
 - axios: Para realizar peticiones HTTP desde el lado del servidor(NODE): V0.27.2
 - bcryptjs: Hasheo de contraseñas: V2.4.3
 - body-parser: Para procesar datos enviados en las solicitudes HTTP: V1.20.0
 - cloudinary: Para realizar subidas de archivos a Cloudinary a tráves del paqueta: V1.29.1
 - dotenv: Permitir el uso de variables de entorno en la aplicación: V16.0.0
 - express: Marco de NodeJS facilitando el desarrollo. V4.18.1
 - express-fileupload: Middleware que facilita la carga de archivos usando el marco de Express: V1.3.1
 - express-validator: Middleware que valida el dato expecificado: V6.14.0
 - jsonwebtoken: Creacion de tokens: V8.5.1
 - mongoose: Para escribir consultas a la base de MongoDB: V6.3.2
 - nodemaile: Envio de correos: V6.7.5
 - pug: Plantilla que se ejecuta desde Node: V3.0.2
 - socket.io: Permite una conexión persistente entre el servidor y el cliente: V 4.5.1.

## API

### ${url}/api/auth
```
    - /sign-in-create - POST | Registrar un usuario, con un nombre de usuario único

            {
                -username: string;
                -password: string; 
                -email: string; 
                -password_repeat: string; 
            }

    - /login          - POST | Loguear un usuario. Se necesita tener un usuario registrado

            {
                email: string;
                password: string;
            }

    - /profile        - PUT  | Actualizar información del usuario solicitado. *** 
    
            {
                -username: string;
                -email: string; 
            }
    
    - /               - GET  | Obtener info del usuario solicitado. ***
```

### ${url}/api/cart

```
    - /         - GET  | Obtener el carrito del usuario solicitado. ***

    - /         - POST | Crear un carrito nuevo por usuario. ***

    - /modify   - PUT  | Actualizar los productos del carrito. ***

            {
                idProduct: string( Id del producto );
                quantity: number;
            }

    - /empty    - PUT  | Vaciar los productos del carrito. ***
```

### ${url}/api/category

```
    - /         - GET | Obtener todas las categorias que esta en la base de datos.

    - /:category/subcategories - GET | Obtener las subcategorías, de la categoría solicitada

            -:category: Categoria disponible de la aplicación. Ej herramientas 
```

### ${url}/api/favorite

```
    - /      - GET  | Obtener los productos favorites del usuario solicitado. ***

    - /      - POST | Crear el objeto favorito del usuario solicitado. ***
    
    - /:id   - POST | Actualizar los productos favoritos del usuario solicitado. ***

        -:id: ID del producto
```

### ${url}/api/image

```
    - /product - POST | Subir la imagen en la base de datos Cloudinary.

            clave: imgProduct
            key: files[0] - image/*
```

### ${url}/api/order

```
    - /new  - POST | Crear un nueva orden. ***

            {
                addres: string;
                totalPrice: object;
                    curent: number;
                    old: number;
                products: [];
                    idProduct: string( ID del producto );
                    quantity: number;
            }

    - /get  - GET  | Obtener la/s orden/es del usuario solicitado. ***
```

### ${url}/api/products

```
    - /     - GET  | Obtener los productos disponibles en la base de datos.

    - /:category - GET | Obtener los productos segun la categoría solicitada
    
            -:category: Categoria disponible de la aplicación. Ej herramientas 

    - /subcategory/:subcategory - GET | Obtener los productos según la subcateogría solicitada.

            -:subcategory: Sub Categoria disponible de la aplicación. Ej electricas 

    - /product/:id  - GET  | Obtener la info del producto segun el ID.

            -:id: ID del producto 

    - /     - POST | Crear un nuevo producto. Se necesita ser usuario ***
    
            {
                title: string;
                imgProduct: string;
                category: string;
                subCategory: string;
                characteristics: [string];
                typePrice: object;
                    current: number;
                    old: number;
                stock: number;
                description: string;
                delivery: [0, 1, 2];
            }

    - /:id          - PUT  | Actualizar el producto según el ID.***

            -:id: ID del producto 
    
    - /:id/buy      - PUT  | Actualizar el producto si fue comprado. ***

            -:id: ID del producto
             
    - /:id/visited  - PUT  | Actualizar el producto si fue visitado.

            -:id: ID del producto 
```

(***) Para consultar, se necesita un JsonWebToken válido.