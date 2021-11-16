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

--Tabla que guarda la información para cada usuario existente
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

--Almacena la información de la ubicación del usuario creado
create table Usuario_Ubicacion(
	cedula int not null foreign key references Usuario(cedula),
	provincia varchar(250) not null,
	canton varchar(250) not null,
	distrito varchar(250) not null,	
	localidad varchar(250),
	
	primary key(cedula)

)

--Tabla para usuario con rol de padre
create table Padre(
	cedula int not null foreign key references Usuario(cedula),
	profesion varchar(200) not null,
	conyugeNombre varchar(250),
	telefonoConyugue int,
	primary key(cedula)

)


--Tabla para usuario con rol de estudiante, contiene su padre también
create table Estudiante(
	cedula int not null foreign key references Usuario(cedula),
	cedulaPadre int not null foreign key references Padre(cedula),
	grado int not null,
	primary key(cedula)

)


--Tabla para usuario con rol de profesor
create table Profesor(
	cedula int not null foreign key references Usuario(cedula),
	salario decimal(10,2) not null,
	primary key(cedula)
	

)

--Tabla que guarda los salarios historicos del profesor
create table Profesor_HistorialSalario(
	cedula int not null foreign key references Profesor(cedula),
	inicio date not null,
	fin date not null,
	monto decimal not null,
	primary key(cedula, inicio, fin)

)

--Tabla para guardar la información de las materias
create table Materia(
	nombre varchar(100) not null PRIMARY KEY,
	precio decimal(8,2), ---FK

);


--Tabla que guarda la información de los periodos
create table Periodo(
	numero int not null,
	anno int not null,
	fechaInicio date not null,
	fechaFinal date not null,
	primary key(numero,anno)

);
--Tabla que almecena toda la información respecto a cada Grupo
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

--Tabla que contienes los horarios de un grupo
create table Grupo_Horario(
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	dias varchar(200) not null,
	horaInicio varchar(50) not null,
	horaFin varchar(50) not null,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(codigoGrupo,numPeriodo,anno,nombreMateria)
);

--Tabla para llevar registro de la asistencia de un estudiante en un grupo
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
	primary key(cedulaEstudiante,codigoGrupo,nombreMateria,numPeriodo,anno,fecha)
)






----Tabla con todos los rublos de evalución de un grupo 
create table Evaluacion(
    rubro varchar(50) not null,
    porcentaje int,
    codigoGrupo varchar(25) not null,
    numPeriodo int not null,
    anno int not null,
    nombreMateria varchar(100),
    foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
    references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
    primary key(rubro,codigoGrupo,numPeriodo,anno,nombreMateria)

);

create table Evaluacion_Grupo_Estudiante(
	cedulaEstudiante int not null foreign key references Estudiante(cedula),
	codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	notaObtenida float not null,
	estado varchar(50) not null,
	descripcionEvaluacion varchar(250)  null,
	foreign key(codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Grupo(codigoNombre,numeroPeriodo,anno,nombreMateria),
	primary key(codigoGrupo,numPeriodo,anno,nombreMateria,cedulaEstudiante)

);

--Tabla que registra cada nota del estudiante por grupo, además con su estado (Aprobado-Reprobado)
create table Evaluacion_Estudiante(
    cedulaEstudiante int not null foreign key references Estudiante(cedula),
    codigoGrupo varchar(25) not null,
    nombreMateria varchar(100) not null,
	numPeriodo int not null,
	anno int not null,
	notaObtenida float not null,
	rubro varchar(50) not null ,
	foreign key(rubro,codigoGrupo,numPeriodo,anno,nombreMateria) 
	references Evaluacion(rubro,codigoGrupo,numPeriodo,anno,nombreMateria),
	primary key(cedulaEstudiante,codigoGrupo,nombreMateria,numPeriodo,anno)

)


--Tabla  que guarda la informacion de cada matricula que se realiza
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



--Tabla que guarda la informacion del cobro de una matriucla efectuada
create table Cobros(
	consecutivo int not null IDENTITY(1,1) primary key,
	--numFactura int foreign key references Factura(numFactura),
	idMatricula int not null foreign key references Matricula(idMatricula),
	estado varchar(20)

)

--Tabla que almacena una factura cuando un cobro se realizó
create table Factura(
	consecutivo int foreign key references Cobros(consecutivo),
	totalPago decimal,
	iva decimal,
	fechaPago date,
	primary key(consecutivo)

)


--Vista que lista la información personaL de los padres completa
create view Padre_Vista as
select Usuario.cedula,concat(nombre,' ',apellido1,' ',apellido2) as nombreCompleto,sexo,fechaNacimiento,provincia,canton,distrito,localidad,
Padre.profesion, Padre.conyugeNombre,Padre.telefonoConyugue from Usuario
inner join Usuario_Ubicacion on Usuario_Ubicacion.cedula = Usuario.cedula
inner join Padre on Padre.cedula = Usuario.cedula

select * from Padre_Vista

--Vista que lista la información personaL de los estudiantes completa
create view Estudiante_Vista as
select Usuario.cedula,concat(Usuario.nombre,' ',Usuario.apellido1,' ',Usuario.apellido2) as nombreCompleto,Usuario.sexo,Usuario.fechaNacimiento,provincia,canton,distrito,localidad,
Estudiante.grado,Estudiante.cedulaPadre,CONCAT(Padres.nombre,' ',Padres.apellido1,' ',Padres.apellido2) as nombrePadre from Usuario
inner join Usuario_Ubicacion on Usuario.cedula = Usuario_Ubicacion.cedula
inner join Estudiante on Estudiante.cedula = Usuario.cedula
inner join Usuario as Padres on Padres.cedula = Estudiante.cedulaPadre



select * from Estudiante_Vista

--Vista que lista la información personaL de los profesores completa

create view Profesor_Vista as
select Usuario.cedula,concat(nombre,' ',apellido1,' ',apellido2) as nombreCompleto,sexo,fechaNacimiento,provincia,canton,distrito,localidad,
Profesor.salario from Usuario
inner join Usuario_Ubicacion on Usuario.cedula = Usuario_Ubicacion.cedula
inner join Profesor on Profesor.cedula = Usuario.cedula

select * from Profesor_Vista

--Vista que muestra todo el desglose de la factura del cobro por matricula
create view Factura_Vista as
select Factura.consecutivo,Cobros.idMatricula,Matricula.cedulaEstudiante,concat(nombre,' ',apellido1,' ',apellido2) as nombreCompleto
,Matricula.codigoGrupo,Matricula.nombreMateria,Matricula.numPeriodo,Matricula.anno,Factura.iva,Factura.totalPago,
((Matricula.costeMatricula*(Factura.iva/100))+Matricula.costeMatricula) as totalPagadoIva, Factura.fechaPago
from Factura
inner join Cobros on Cobros.consecutivo = Factura.consecutivo
inner join Matricula on Matricula.idMatricula = Cobros.idMatricula
inner join Usuario on Usuario.cedula = Matricula.cedulaEstudiante


select * from Factura_Vista

--INSERTS




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

insert into Usuario values(117950392,'Melissa','Alguera','Castillo','0192023a7bbd73250516f069df18b500','Femenino',
'2000/10/25','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(117950392,'San José','Desamparados','San Miguel','Centro');
insert into Estudiante values(117950392,114140008,1);

insert into Usuario values(122543102,'Adrian','Herrera','Segura','0192023a7bbd73250516f069df18b500','Masculino',
'2002/11/9','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(122543102,'San José','San Sebastian','Calle Blanco','Residencial MegaSuper');
insert into Estudiante values(122543102,429847293,1);

insert into Usuario values(115150008,'Shermie','Madrid','Orellana','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(115150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(115150008,114140008,1);

--4
insert into Usuario values(215150008,'Leandro','Kapello','Orellana','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(215150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(215150008,429847293,1);

--5
insert into Usuario values(315150008,'Jose','Calvo','Orellana','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(315150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(315150008,114140008,1);

--6
insert into Usuario values(415150008,'Jose','Figueres','OlsenPresidente','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(415150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(415150008,779331110,2);
--7
insert into Usuario values(515150008,'Francisco','Fofo','Olloa','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(515150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(515150008,679331110,2);

--8
insert into Usuario values(615150008,'Hector','Hernandez','Hugo','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(615150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(615150008,579331110,2);

--9
insert into Usuario values(715150008,'Keylor','Navas','Diaz','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(715150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(715150008,479331110,2);

--10
insert into Usuario values(815150008,'Oscar','Duarte','Lopez','0192023a7bbd73250516f069df18b500','Masculino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(815150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(815150008,279331110,2);

--11
insert into Usuario values(125150008,'Angelina','Castro','Madrid','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(125150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(125150008,179331110,1);

--12
insert into Usuario values(225150008,'Angelica','Carmona','Granada','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(225150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(225150008,179331290,1);

--13
insert into Usuario values(325150008,'Gabriela','Retana','Piedra','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(325150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(325150008,149345290,1);

--14
insert into Usuario values(425150008,'Shirley','Retana','Hoja','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(425150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(425150008,179345290,1);

--15
insert into Usuario values(525150008,'Brenda','Oviedo','Tijera','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(525150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(525150008,329847293,1);

--16

insert into Usuario values(625150008,'Summer','Laitano','Cortes','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(625150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(625150008,449847293,2);

--17

insert into Usuario values(725150008,'Juliana','Barboza','Rojas','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(725150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(725150008,449847293,2);

--18
insert into Usuario values(825150008,'Julieta','Mendoza','Fonseca','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(825150008,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(825150008,149345290,2);

--19
insert into Usuario values(190150018,'Susana','Vividea','Chinchilla','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(190150018,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(190150018,279331110,2);

--20
insert into Usuario values(290150018,'Lara','Gean','Porras','0192023a7bbd73250516f069df18b500','Femenino',
'2000/7/3','Estudiante','2021/11/6')
insert into Usuario_Ubicacion values(290150018,'Heredia','Belén','Lindora','La Panasonic');
insert into Estudiante values(290150018,679331110,2);


insert into Materia values('Español',25000);
insert into Materia values('Matemáticas',45000);
insert into Materia values('Estudios Sociales',15000);
insert into Materia values('Biología',34000);
insert into Materia values('Química',34000);
insert into Materia values('Fisica',34000);
insert into Materia values('Informática',20000);
insert into Materia values('Inglés',18000)



insert into Periodo values(1,2020,'2020/2/2','2020/4/28');
insert into Periodo values(2,2020,'2020/4/30','2020/7/28');
--insert into Periodo values(3,2020,'2020/8/1','2020/10/28');

insert into Periodo values(1,2021,'2020/2/2','2020/4/28');
insert into Periodo values(2,2021,'2020/4/30','2020/7/28');
--insert into Periodo values(3,2021,'2020/8/1','2020/10/28');

--1 2020
insert into Grupo values('Matemáticas-A1','Matemáticas',110100005,1,2020,1,30,'Abierto')
insert into Grupo values('Matemáticas-A2','Matemáticas',115173422,1,2020,2,30,'Abierto')
insert into Grupo values('Estudios Sociales-A1','Estudios Sociales',120183421,1,2020,1,30,'Abierto')
insert into Grupo values('Estudios Sociales-A2','Estudios Sociales',126175451,1,2020,2,30,'Abierto')



--2 2020
insert into Grupo values('Biología-A1','Biología',256175651,2,2020,1,30,'Abierto')
insert into Grupo values('Biología-A2','Biología',302302414,2,2020,2,30,'Abierto')
insert into Grupo values('Español-A1','Español',421933720,2,2020,1,25,'Abierto')
insert into Grupo values('Español-A2','Español',511133320,2,2020,2,25,'Abierto')


--1 2021
insert into Grupo values('Inglés-A1','Inglés',115173422,1,2021,1,30,'Abierto')
insert into Grupo values('Inglés-A2','Inglés',118180009,1,2021,2,30,'Abierto')
insert into Grupo values('Informática-A1','Informática',130173422,1,2021,1,30,'Abierto')
insert into Grupo values('Informática-A2','Informática',219161321,1,2021,2,30,'Abierto')


--2 2021
insert into Grupo values('Química-A1','Química',356175651,2,2021,1,30,'Abierto')
insert into Grupo values('Química-A2','Química',416173452,2,2021,2,30,'Abierto')
insert into Grupo values('Fisica-A1','Fisica',811133320,2,2021,1,30,'Abierto')
insert into Grupo values('Fisica-A2','Fisica',115173422,2,2021,2,30,'Abierto')


--1 2020
insert into Matricula values(5000,'2020/2/2',115150008,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',117950392,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',122543102,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',125150008,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',215150008,'Matemáticas-A1',1,2020,'Matemáticas')

insert into Matricula values(5000,'2020/2/2',515150008,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',615150008,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',625150008,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',715150008,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Matricula values(5000,'2020/2/2',725150008,'Matemáticas-A2',1,2020,'Matemáticas')


insert into Matricula values(5000,'2020/2/2',115150008,'Estudios Sociales-A1',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',117950392,'Estudios Sociales-A1',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',122543102,'Estudios Sociales-A1',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',125150008,'Estudios Sociales-A1',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',215150008,'Estudios Sociales-A1',1,2020,'Estudios Sociales')

insert into Matricula values(5000,'2020/2/2',515150008,'Estudios Sociales-A2',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',615150008,'Estudios Sociales-A2',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',625150008,'Estudios Sociales-A2',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',715150008,'Estudios Sociales-A2',1,2020,'Estudios Sociales')
insert into Matricula values(5000,'2020/2/2',725150008,'Estudios Sociales-A2',1,2020,'Estudios Sociales')


--2 2020
insert into Matricula values(5000,'2020/2/2',225150008,'Biología-A1',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',315150008,'Biología-A1',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',325150008,'Biología-A1',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',525150008,'Biología-A1',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',425150008,'Biología-A1',2,2020,'Biología')

insert into Matricula values(5000,'2020/2/2',815150008,'Biología-A2',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',825150008,'Biología-A2',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',415150008,'Biología-A2',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',290150018,'Biología-A2',2,2020,'Biología')
insert into Matricula values(5000,'2020/2/2',190150018,'Biología-A2',2,2020,'Biología')

insert into Matricula values(5000,'2020/2/2',225150008,'Español-A1',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',315150008,'Español-A1',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',325150008,'Español-A1',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',525150008,'Español-A1',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',425150008,'Español-A1',2,2020,'Español')

insert into Matricula values(5000,'2020/2/2',815150008,'Español-A2',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',825150008,'Español-A2',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',415150008,'Español-A2',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',290150018,'Español-A2',2,2020,'Español')
insert into Matricula values(5000,'2020/2/2',190150018,'Español-A2',2,2020,'Español')


--1 2021
insert into Matricula values(5000,'2021/2/2',115150008,'Informática-A1',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',117950392,'Informática-A1',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',122543102,'Informática-A1',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',125150008,'Informática-A1',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',215150008,'Informática-A1',1,2021,'Informática')

insert into Matricula values(5000,'2021/2/2',515150008,'Informática-A2',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',615150008,'Informática-A2',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',625150008,'Informática-A2',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',715150008,'Informática-A2',1,2021,'Informática')
insert into Matricula values(5000,'2021/2/2',725150008,'Informática-A2',1,2021,'Informática')

insert into Matricula values(5000,'2021/2/2',115150008,'Inglés-A1',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',117950392,'Inglés-A1',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',122543102,'Inglés-A1',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',125150008,'Inglés-A1',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',215150008,'Inglés-A1',1,2021,'Inglés')

insert into Matricula values(5000,'2021/2/2',515150008,'Inglés-A2',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',615150008,'Inglés-A2',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',625150008,'Inglés-A2',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',715150008,'Inglés-A2',1,2021,'Inglés')
insert into Matricula values(5000,'2021/2/2',725150008,'Inglés-A2',1,2021,'Inglés')

--2 2021
insert into Matricula values(5000,'2021/2/2',225150008,'Fisica-A1',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',315150008,'Fisica-A1',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',325150008,'Fisica-A1',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',525150008,'Fisica-A1',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',425150008,'Fisica-A1',2,2021,'Fisica')

insert into Matricula values(5000,'2021/2/2',815150008,'Fisica-A2',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',825150008,'Fisica-A2',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',415150008,'Fisica-A2',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',290150018,'Fisica-A2',2,2021,'Fisica')
insert into Matricula values(5000,'2021/2/2',190150018,'Fisica-A2',2,2021,'Fisica')

insert into Matricula values(5000,'2021/2/2',225150008,'Química-A1',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',315150008,'Química-A1',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',325150008,'Química-A1',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',525150008,'Química-A1',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',425150008,'Química-A1',2,2021,'Química')

insert into Matricula values(5000,'2021/2/2',815150008,'Química-A2',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',825150008,'Química-A2',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',415150008,'Química-A2',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',290150018,'Química-A2',2,2021,'Química')
insert into Matricula values(5000,'2021/2/2',190150018,'Química-A2',2,2021,'Química')

--------------------------------------------------Asistencia-------------------------------

insert into Asistencia_Estudiante values(115150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(115150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(115150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/6',0);
insert into Asistencia_Estudiante values(115150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/7',0);

insert into Asistencia_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/6',0);
insert into Asistencia_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/7',0);
insert into Asistencia_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/8',0);

insert into Asistencia_Estudiante values(122543102,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(122543102,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(122543102,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(125150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(125150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(125150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(215150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(215150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(215150008,'Matemáticas-A1','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(515150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(515150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/5',0);
insert into Asistencia_Estudiante values(515150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/6',0);


insert into Asistencia_Estudiante values(615150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(615150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/5',0);

insert into Asistencia_Estudiante values(625150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(625150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(715150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/4',0);
insert into Asistencia_Estudiante values(715150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(725150008,'Matemáticas-A2','Matemáticas',1,2020,'2020/4/6',0);

insert into Asistencia_Estudiante values(815150008,'Fisica-A2','Fisica',2,2021,'2021/4/2',0);

insert into Asistencia_Estudiante values(825150008,'Fisica-A2','Fisica',2,2021,'2021/4/2',0);

insert into Asistencia_Estudiante values(415150008,'Fisica-A2','Fisica',2,2021,'2021/4/2',0);

insert into Asistencia_Estudiante values(290150018,'Fisica-A2','Fisica',2,2021,'2021/4/2',0);


DECLARE @cnt INT = 5000;

WHILE @cnt < 5080
BEGIN
   if @cnt%3=0 insert into Cobros values(@cnt,'Pagado')

   else insert into Cobros values(@cnt,'Pendiente')
   SET @cnt = @cnt + 1;
END;

select * from Cobros

DECLARE @consecutivo INT = 1;

--WHILE @consecutivo < 80
--BEGIN
 --  if 'Pagado' = (select estado from Cobros)
--		insert into Factura values (@consecutivo,50000,2,'2021/11/15')
	
--SET @consecutivo = @consecutivo + 1;
--END;

--insert into Grupo_Horario values('Matemáticas-A1','Matemáticas',1,2020,
--'Martes y Jueves','15:00','16:50');

select * from Matricula 

insert into Evaluacion values('Tareas',10,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Cotidiano',20,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Proyectos',30,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Examenes',40,'Matemáticas-A1',1,2020,'Matemáticas')



-------Procedimientos-----------------------------------------------------------------------

go
create proc EliminarMatricula (@idMatricula int,@costeMatricula float,@fechaCreacion date,@cedulaEstudiante int,@codigoGrupo varchar(25),
	@numPeriodo int ,@anno int, @nombreMateria varchar(100))
as begin
delete from Matricula where idMatricula=@idMatricula
end
go

go
create proc EliminarCobro (@consecutivo int ,@idMatricula int,@estado varchar(20))
as begin
delete from Cobros where consecutivo=@consecutivo
end
go


go
create proc ActualizarCerrado (@codigoNombre varchar(25),@numeroPeriodo int ,@anno int, @nombreMateria varchar(100), @estado varchar(20))
as begin 
Update Grupo set estado=@estado
where codigoNombre=@codigoNombre and numeroPeriodo=@numeroPeriodo and nombreMateria= @nombreMateria and anno=@anno
end 
go

select * from Grupo


execute ActualizarCerrado'Química-B1', 3, 2021, 'Química', 'Abierto' 

---------DROPS DE LAS TABLAS -------------------


drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoHorario
drop table Grupo 









