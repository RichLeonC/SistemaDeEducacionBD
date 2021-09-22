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


create table Grupo (
  codigo int not null PRIMARY KEY,
  cedulaProfesor int not null,--FK
  cupo int not null,
  numeroPeriodo int not null ---FK
);

create table GrupoHorario(
	codigoGrupo int not null, ---FK
	dias varchar(200) not null,
	horaInicio time not null,
	horaFin time not null
);


create table Grado(
	numeroGrado int not null PRIMARY KEY,
	codigoGrupo int not null ---FK
);

create table GrupoMateria(
	codigoGrupo int not null, ---FK
	nombreMateria varchar(100) not null, ---FK
	precio int not null

);

create table Material(
	nombre varchar(100) not null PRIMARY KEY,
	codigoGrupo int not null, ---FK

);


create table Periodo(
	numero int not null PRIMARY KEY,
	anno int not null ,
	fechaInicio date not null,
	fechaFinal date not null
);

create table Evaluacion(
	codigoGrupo int not null,--FK
	examenes float not null,
	cotidiano float not null,
	asistencia float not null,
	extraClase float not null
);

--Comentario xd







