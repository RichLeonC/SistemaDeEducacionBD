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


create table Padre(
	cedula int not null primary key,
	nombreCompleto varchar(250) not null,
	sexo varchar(50),
	fechaNacimiento date not null,
	conyugeNombre varchar(250),
	

)

create table Padre_Ubicacion(
	cedula int not null foreign key references Padre(cedula),
	distrito varchar(250) not null,
	canton varchar(250) not null,
	localidad varchar(250),
	provincia varchar(250) not null

)

create table Estudiante(
	cedula int not null primary key,
	cedulaPadre int not null foreign key references Padre(cedula),
	nombreCompleto varchar(250) not null,
	sexo varchar(50),
	fechaNacimiento date not null,

)

create table Estudiante_Ubicacion(
	cedula int not null foreign key references Estudiante(cedula),
	distrito varchar(250) not null,
	canton varchar(250) not null,
	localidad varchar(250),
	provincia varchar(250) not null.
	

)

create table Profesor(
	cedula int not null primary key,
	nombreCompleto varchar(250) not null,
	sexo varchar(50),
	fechaNacimiento date not null,
	salario float not null

)

create table Profesor_Ubicacion(
	cedula int not null foreign key references Profesor(cedula),
	distrito varchar(250) not null,
	canton varchar(250) not null,
	localidad varchar(250),
	provincia varchar(250) not null.
	

)

create table Profesor_HistorialSalario(
	cedula int not null foreign key references Profesor(cedula),
	inicio date not null,
	fin date not null,
	monto float not null

)


create table Periodo(
	numero int not null PRIMARY KEY,
	anno int not null ,
	fechaInicio date not null,
	fechaFinal date not null
);

create table Grupo (
  codigo int not null PRIMARY KEY,
  cedulaProfesor int not null foreign key references Profesor(cedula),--FK
  cupo int not null,
  numeroPeriodo int not null foreign key references Periodo(numero)---FK
);

create table GrupoHorario(
	codigoGrupo int not null foreign key references Grupo(codigo), ---FK
	dias varchar(200) not null,
	horaInicio time not null,
	horaFin time not null
);


create table Grado(
	numeroGrado int not null PRIMARY KEY,
	codigoGrupo int not null foreign key references Grupo(codigo)---FK
);

create table Materia(
	nombre varchar(100) not null PRIMARY KEY,
	codigoGrupo int not null foreign key references Grupo(codigo), ---FK

);

create table GrupoMateria(
	codigoGrupo int not null foreign key references Grupo(codigo), ---FK
	nombreMateria varchar(100) not null foreign key references Materia(nombre), ---FK
	precio int not null

);

create table Evaluacion(
	codigoGrupo int not null foreign key references Grupo(codigo),--FK
	examenes float not null,
	cotidiano float not null,
	asistencia float not null,
	extraClase float not null
);


create table ProfesorHistorialSalario(
	cedulaProfesor int not null foreign key references Profesor(cedula), --FK
	inicio date not null,
	fin date not null,
	monto float not null
);

create table Precio_Materia(
	nombreMateria varchar(100) foreign key references Materia(nombre),
	precio int not null primary key

)

create table Matricula(
	idMatricula int not null primary key,
	costeMatricula float not null,
	fechaCreacion date not null,
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	cedulaPadre int not null foreign key references Padre(cedula),
	numeroGrado int not null foreign key references Grado(numeroGrado),
	codigoGrupo int not null foreign key references Grupo(codigo)


)

create table Cobros(
	idMatricula int not null foreign key references Matricula(idMatricula),
	codigoGrupo int not null foreign key references Grupo(codigo),
	costeMateria int not null foreign key references Precio_Materia(precio),
	estado varchar(100) not null,

)

create table GestionPagos(
	idMatricula int not null foreign key references Matricula(idMatricula),
	cedulaPadre int not null foreign key references Padre(cedula),
	montoTotal float not null,
	fechaPago date
)


---------DROPS DE LAS TABLAS -------------------

drop table ProfesorHistorialSalario
drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoMateria
drop table Grado
drop table GrupoHorario
drop table Grupo 









