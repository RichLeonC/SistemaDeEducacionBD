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
	contrase�a varchar(100) not null,
	sexo varchar(20) not null,
	fechaNacimiento date not null,
	rol varchar(20) not null,
	fechaCreacion date

)

create table Usuario_Ubicacion(
	cedula int not null foreign key references Usuario(cedula),
	provincia varchar(250) not null,
	canton varchar(250) not null,
	distrito varchar(250) not null,	
	localidad varchar(250),
	
	primary key(cedula)

)
create table Padre(
	cedula int not null foreign key references Usuario(cedula),
	profesion varchar(200) not null,
	conyugeNombre varchar(250),
	telefonoConyugue int,
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
	a�o int not null,
	fechaInicio date not null,
	fechaFinal date not null,
	primary key(numero,a�o)

);

create table Grupo (
  codigoNombre varchar(25) not null,
  nombreMateria varchar(100) foreign key references Materia(nombre),
  cedulaProfesor int not null foreign key references Profesor(cedula),
  numeroPeriodo int not null,
  a�o int not null,
  grado int not null,
  cupo int not null,
  estado varchar(20) not null,
  foreign key(numeroPeriodo,a�o) references Periodo(numero,a�o),
  primary key(codigoNombre,numeroPeriodo,a�o,nombreMateria)

);

create table Grupo_Horario(
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	a�o int not null,
	dias varchar(200) not null,
	horaInicio time not null,
	horaFin time not null,
	foreign key(codigoGrupo,numPeriodo,a�o,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,a�o,nombreMateria),
	primary key(codigoGrupo,numPeriodo,a�o,nombreMateria)
);

create table Asistencia_Estudiante (
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	a�o int not null,
	fecha date,
	asistencia bit,
	foreign key(codigoGrupo,numPeriodo,a�o,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,a�o,nombreMateria)
)


create table Evaluacion(
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	a�o int not null,
	nombreMateria varchar(100),
	descripcion varchar(250) not null,
	foreign key(codigoGrupo,numPeriodo,a�o,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,a�o,nombreMateria),
	primary key(codigoGrupo,numPeriodo,a�o,nombreMateria)
	
);





create table Matricula(
	idMatricula varchar(100) not null primary key,
	costeMatricula float not null,
	fechaCreacion date not null,
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	a�o int not null,
	nombreMateria varchar(100),
	foreign key(codigoGrupo,numPeriodo,a�o,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,a�o,nombreMateria),



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

insert into Usuario values(118180009,'Richard','Leon','Chinchilla','0192023a7bbd73250516f069df18b500','Masculino',
'2001/7/29','admin','2021/10/19')

---------DROPS DE LAS TABLAS -------------------


drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoHorario
drop table Grupo 









