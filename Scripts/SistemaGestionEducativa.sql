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
	clave varchar(100) not null,
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
	grado int not null,
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
	anno int not null,
	fechaInicio date not null,
	fechaFinal date not null,
	primary key(numero,anno)

);

create table Grupo (
  codigoNombre varchar(25) not null,
  nombreMateria varchar(100) foreign key references Materia(nombre),
  cedulaProfesor int not null foreign key references Profesor(cedula),
  numeroPeriodo int not null,
  anno int not null,
  grado int not null,
  cupo int not null,
  estado varchar(20) not null,
  foreign key(numeroPeriodo,anno) references Periodo(numero,anno),
  primary key(codigoNombre,numeroPeriodo,anno,nombreMateria)

);

create table Grupo_Horario(
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	dias varchar(200) not null,
	horaInicio time not null,
	horaFin time not null,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(codigoGrupo,numPeriodo,anno,nombreMateria)
);

create table Asistencia_Estudiante (
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	fecha date,
	asistencia bit,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(cedulaEstudiante,codigoGrupo,nombreMateria,numPeriodo,anno)
)


create table Evaluacion(
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	anno int not null,
	nombreMateria varchar(100),
	descripcion varchar(250) not null,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(codigoGrupo,numPeriodo,anno,nombreMateria)
	
);

create table Evaluacion_Estudiante(
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	notaObtenida float not null,
	estado varchar(20) not null,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(cedulaEstudiante,codigoGrupo,nombreMateria,numPeriodo,anno)

)



create table Matricula(
	idMatricula int not null IDENTITY(5000,1) primary key,
	costeMatricula float not null,
	fechaCreacion date not null,
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
	numPeriodo int not null,
	anno int not null,
	nombreMateria varchar(100),
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria)

)



create table Cobros(
	consecutivo int not null IDENTITY(1,1) primary key,
	--numFactura int foreign key references Factura(numFactura),
	idMatricula int not null foreign key references Matricula(idMatricula),
	estado varchar(20)

)

create table Factura(
	numeroFactura int not null primary key,
	consecutivo int foreign key references Cobros(consecutivo),
	totalPago decimal(10,2),
	iva decimal(3,2),
	fechaPago date

)

insert into Matricula values(5000,'2001/10/10',1010,'Español-C1', 2, 2021,'Español')




insert into Usuario values(118180009,'Richard','Leon','Chinchilla','0192023a7bbd73250516f069df18b500','Masculino',
'2001/7/29','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(118180009,'San José','Desamparados','Gravilias','Villa Nueva');
insert into Profesor values(118180009,605000)
insert into Profesor_HistorialSalario values(118180009,'2008/10/10','2020/11/5',482000)

insert into Usuario values(110100005,'Eduardo','Camavinga','Arias','242a7df6497824b3e47e062856610a7a','Masculino',
'1980/4/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(110100005,'San José','Santa Ana','Pozos','La esquinita');
insert into Profesor values(110100005,815000)
insert into Profesor_HistorialSalario values(110100005,'2012/10/10','2019/4/7',536000)

insert into Usuario values(302302414,'Claudia','Poll','Retana','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(302302414,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(302302414,942320)
insert into Profesor_HistorialSalario values(302302414,'2001/10/10','2013/4/7',601000)


insert into Usuario values(114140008,'Francisco','Paredes','Mora','242b9ab779ee5a9b937d300817d96144','Masculino',
'1975/5/5','Padre','2021/10/25')
insert into Usuario_Ubicacion values(114140008,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(114140008,'Mecanico','Hanna',88705025);

insert into Usuario values(429847293,'Mauricio','Aviles','Carmeno','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(429847293,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(429847293,'Programador','Carolina',85134560);

insert into Usuario values(1010,'Melissa','Alguera','Castillo','0192023a7bbd73250516f069df18b500','Femenino',
'2000/10/25','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(1010,'San José','Desamparados','San Miguel','Centro');
insert into Estudiante values(1010,114140008,1);

insert into Usuario values(122543102,'Adrian','Herrera','Segura','0192023a7bbd73250516f069df18b500','Masculino',
'2002/11/9','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(122543102,'San José','San Sebastian','Calle Blanco','Residencial MegaSuper');
insert into Estudiante values(122543102,429847293,1);


insert into Materia values('Español',25000);
insert into Materia values('Matemáticas',45000);
insert into Materia values('Estudios Sociales',15000);
insert into Materia values('Biología',34000);
insert into Materia values('Química',34000);
insert into Materia values('Fisica Elemental',34000);


insert into Periodo values(1,2020,'2020/2/2','2020/4/28');
insert into Periodo values(2,2020,'2020/4/30','2020/7/28');
insert into Periodo values(3,2020,'2020/8/1','2020/10/28');

insert into Periodo values(1,2021,'2020/2/2','2020/4/28');
insert into Periodo values(2,2021,'2020/4/30','2020/7/28');
insert into Periodo values(3,2021,'2020/8/1','2020/10/28');

insert into Grupo values('Matemáticas-A1','Matemáticas',118180009,1,2020,1,30,'Abierto')
insert into Grupo values('Biología-A1','Biología',118180009,1,2020,1,30,'Abierto')
insert into Grupo values('Español-C1','Español',302302414,2,2021,1,25,'Abierto')
insert into Grupo values('Química-B1','Química',110100005,3,2021,1,25,'Abierto')


insert into Grupo_Horario values('Matemáticas-A1','Matemáticas',1,2020,
'Martes y Jueves','15:00','16:50');
insert into Grupo_Horario values('Biología-A1','Biología',1,2020,
'Viernes','13:00','16:50');
insert into Grupo_Horario values('Español-C1','Español',2,2021,
'Lunes y Miercoles','8:00','11:25');
insert into Grupo_Horario values('Química-B1','Química',3,2021,
'Lunes y Miercoles','13:00','15:30');

insert into Evaluacion values('Matemáticas-A1',1,2020,'Matemáticas','Examenes 90%, Tareas 10%')
insert into Evaluacion values('Biología-A1',1,2020,'Biología','Examenes 60%, Tareas 20%, Cotidiano 20%')
insert into Evaluacion values('Español-C1',2,2021,'Español','Examenes 60%, Tareas 20%, Comunicación 20%')
insert into Evaluacion values('Química-B1',3,2021,'Química','Examenes 80%, Tareas 10%')

insert into Matricula values(5000,'2021/5/5',1010,'Matemáticas-A1',1,2020,'Matemáticas');


insert into Evaluacion_Estudiante values(1010,'Matemáticas-A1','Matemáticas',1,2020,70,'Aprobado')
insert into Evaluacion_Estudiante values(1010,'Biología-A1','Biología',1,2020,60,'Reprobado')

---------DROPS DE LAS TABLAS -------------------


drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoHorario
drop table Grupo 









