use master
go
alter database SistemaGestionEducativa set single_user with rollback immediate --Cierra las conexiones de la base de datos
go
Drop database if exists SistemaGestionEducativa
go
create database SistemaGestionEducativa
go
use SistemaGestionEducativa
go

create table Usuario(
	cedula int not null primary key,
	nombreCompleto varchar(250) not null,
	sexo varchar(50),
	fechaNacimiento date not null,

)

create table Usuario_Ubicacion(
	cedulaUsuario int not null foreign key references Usuario(cedula),
	distrito varchar(250) not null,
	canton varchar(250) not null,
	localidad varchar(250),
	provincia varchar(250) not null

)

create table Padre(
	cedula int not null foreign key references Usuario(cedula),
	conyugeNombre varchar(250),
	

)

create table Estudiante(
	cedula int not null foreign key references Usuario(cedula),
	cedulaPadre int not null foreign key references Padre(cedula),

)
