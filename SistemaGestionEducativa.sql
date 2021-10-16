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
	nombre varchar(100) not null,
	apellido1 varchar(100) not null,
	apellido2 varchar(100) not null,
	sexo varchar(20) not null,
	fechaNacimiento date not null,
	rol varchar(20) not null,
	fechaCreacion date

)

create table Usuario_Ubicacion(
	cedula int not null foreign key references Usuario(cedula),
	distrito varchar(250) not null,
	canton varchar(250) not null,
	localidad varchar(250),
	provincia varchar(250) not null,
	primary key(cedula)

)
create table Padre(
	cedula int not null foreign key references Usuario(cedula),
	conyugeNombre varchar(250),
	telefonoConyugue int,
	profesion varchar(200) not null,
	primary key(cedula)

)

create table Estudiante(
	cedula int not null foreign key references Usuario(cedula),
	cedulaPadre int not null foreign key references Padre(cedula),
	primary key(cedula)

)



create table Profesor(
	cedula int not null foreign key references Usuario(cedula),
	salario decimal(10,2) not null,
	primary key(cedula)
	

)


create table Profesor_HistorialSalario(
	cedula int not null foreign key references Profesor(cedula),
	inicio date not null,
	fin date not null,
	monto float not null,
	primary key(cedula)

)

create table Materia(
	nombre varchar(100) not null PRIMARY KEY,
	precio decimal(8,2) ---FK

);

create table Periodo(
	numero int not null,
	año int not null,
	fechaInicio date not null,
	fechaFinal date not null,
	primary key(numero,año)

);

create table Grupo (
  codigoNombre varchar(25) not null,
  cedulaProfesor int not null foreign key references Profesor(cedula),
  cupo int not null,
  numeroPeriodo int not null,
  año int not null,
  grado int not null,
  nombreMateria varchar(100) foreign key references Materia(nombre),
  estado varchar(20) not null,
  foreign key(numeroPeriodo,año) references Periodo(numero,año),
  primary key(codigoNombre,numeroPeriodo,año,nombreMateria),

);

create table GrupoHorario(
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	año int not null,
	nombreMateria varchar(100) not null,
	dias varchar(200) not null,
	horaInicio time not null,
	horaFin time not null,
	foreign key(codigoGrupo,numPeriodo,año,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,año,nombreMateria),
	primary key(codigoGrupo,numPeriodo,año,nombreMateria)
);



create table Evaluacion(
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	año int not null,
	nombreMateria varchar(100),
	descripcion varchar(250) not null,
	foreign key(codigoGrupo,numPeriodo,año,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,año,nombreMateria),
	primary key(codigoGrupo,numPeriodo,año,nombreMateria)
	
);





create table Matricula(
	idMatricula varchar(100) not null primary key,
	costeMatricula float not null,
	fechaCreacion date not null,
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	año int not null,
	nombreMateria varchar(100),
	foreign key(codigoGrupo,numPeriodo,año,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,año,nombreMateria),



)

create table Matricula_Precio(
	idMatricula varchar(100) not null  foreign key references Matricula(idMatricula),
	precio decimal(8,2)

)

create table Cobros(
	consecutivo int not null primary key,
	--numFactura int foreign key references Factura(numFactura),
	idMatricula varchar(100) not null  foreign key references Matricula(idMatricula),
	estado varchar(20)

)

create table Factura(
	numeroFactura int not null primary key,
	consecutivo int foreign key references Cobros(consecutivo),
	totalPago decimal(10,2),
	iva decimal(3,2),
	fechaPago date

)


---------DROPS DE LAS TABLAS -------------------


drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoHorario
drop table Grupo 









