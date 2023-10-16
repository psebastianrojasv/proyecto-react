# Proyecto creado para la Empresa Evol Service

## Powershell:

- npm i pg

  ![image](https://github.com/psebastianrojasv/proyecto-react/blob/master/src/pg.png)

- npm i bootstrap bootstrap.
  
  ![image](https://github.com/psebastianrojasv/proyecto-react/blob/master/src/bootstrap.png)

***Realizar la importacion de la libreria de bootstrap, en el archivo App.js***

- import "bootstrap/dist/css/bootstrap.min.css"; 

## Conexión de BBDD ~ en el archov db.js:

  ![image](https://github.com/psebastianrojasv/proyecto-react/blob/master/src/db.png)

**Se realiza la importacion de la libreria en el archivo App.js**

- import pool from './db.js';

<br>
## BBDD ~ Postgres:

- Tabla clientes:

  CREATE TABLE IF NOT EXISTS public.clientes
(
    id integer NOT NULL DEFAULT nextval('clientes_id_seq'::regclass),
    codigo text COLLATE pg_catalog."default",
    nombre text COLLATE pg_catalog."default",
    fecha date,
    descripcion text COLLATE pg_catalog."default",
    CONSTRAINT pk_id_cliente PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clientes
    OWNER to postgres;

- Tabla medidores:

  CREATE TABLE IF NOT EXISTS public.medidores
(
    id integer NOT NULL DEFAULT nextval('medidores_id_seq'::regclass),
    rut text COLLATE pg_catalog."default",
    nombre text COLLATE pg_catalog."default",
    direccion text COLLATE pg_catalog."default",
    CONSTRAINT pk_id_medidor PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.medidores
    OWNER to postgres;
  
- Tabla asociacion:

  CREATE TABLE IF NOT EXISTS public.asociacion
(
    id integer NOT NULL DEFAULT nextval('ordenes_id_seq'::regclass),
    id_cliente integer,
    id_medidor integer,
    fecha time without time zone,
    CONSTRAINT pk_id_orden PRIMARY KEY (id),
    CONSTRAINT fk_orden_id_cliente FOREIGN KEY (id_cliente)
        REFERENCES public.clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_orden_id_medidor FOREIGN KEY (id_medidor)
        REFERENCES public.medidores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.asociacion
    OWNER to postgres;


### Problemática:

En Evol Services se necesita crear una interfaz gráfica que permita listar, crear, actualizar y eliminar datos de medidores y de nuestros clientes. Un cliente puede tener de 1 hasta 3 medidores  asignados.

Considere necesario ingresar los siguientes campos o atributos para cada medidor:

***Campos Requeridos:***

- código: texto alfanumérico único
- nombre: texto
- fecha de creación: fecha

***Campos Opcionales:***

- descripción: texto con descripción del medidor

Para los datos de clientes se debe ingresar:

***Campos Requeridos***

- RUT: texto con formato RUT
- nombre: texto
- dirección : texto

Considere distribuir la arquitectura de este requerimento según estime conveniente.
Para almacenar los datos utilice una base de datos Postgres.
Para la interfaz es importante usar React.
Si decide crear una API de servicios puede utilizar Nodejs o Java con Springboot.
Deberá incluir la documentación necesaria para configuración/ejecución o scripts de la solución.
Puede utilizar las librerías que estime necesarias para el desarrollo de la solución.

Deberá crear un repositorio público en github con el código fuente y enviar al correo [edison.delgado@evol.energy](mailto:edison.delgado@evol.energy) con copia a [carolina.duarte@evol.energy](mailto: carolina.duarte@evol.energy) el enlace con el asunto "Prueba Técnica Evol".

***No requerido, pero deseable:***

- Documentación, de API e interfaz.
- Pruebas unitarias y E2E.
- Mobile friendly.
- Uso de alguna librería de estilos (Bootstrap 5, Tailwind o similar).
- Manejo de errores.
- Modularización de componentes
