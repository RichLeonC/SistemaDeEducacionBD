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
	precio decimal(8,2) ---FK

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


--Tabla que almacena la información de la evaluacion de un grupo
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

--Tabla que registra cada nota del estudiante por grupo, además con su estado (Aprobado-Reprobado)
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


insert into Usuario values(111,'Richard','Leon','Chinchilla','0192023a7bbd73250516f069df18b500','Masculino',
'2001/7/29','Admin','2021/10/19')

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
insert into Grupo values('Español-C1','Español',302302414,2,2021,1,25,'Abierto')

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

--Procedimiento para la creacion de usuarios
create proc InsertarUsuario (@cedula int,@nombre varchar(100),@apellido1 varchar(100),@apellido2 varchar(100),@clave
varchar(100),@sexo varchar(20),@fechaNacimiento date,@rol varchar(20),@fechaCreacion date)
as begin
insert into Usuario values (@cedula,@nombre,@apellido1,@apellido2,@clave,@sexo,@fechaNacimiento,@rol,@fechaCreacion )
end


--Procedimiento para la insercion de matriculas

create proc InsertarMatriculas(@costeMatricula float,@fechaCreacion date,@cedulaEstudiante int,@codigoGrupo varchar(25),
@numPeriodo int, @anno int,@nombreMateria varchar(100))
as begin
insert into Matricula values(@costeMatricula,@fechaCreacion,@cedulaEstudiante,@codigoGrupo,@numPeriodo,@anno,@nombreMateria)
end

--Procedimiento para la insercion de Cobros

create proc InsertarCobros (@idMatricula int, @estado varchar(20))
as begin
insert into Cobros values(@idMatricula, @estado)
end
--Procedimiento para la insercion de Facturas
create proc InsertarFactura (@consecutivo int,@totalPago decimal,@iva decimal,@fechaPago date)
as begin
insert into Factura values(@consecutivo,@totalPago,@iva,@fechaPago)
end

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





---------DROPS DE LAS TABLAS -------------------


drop table Evaluacion
drop table Periodo
drop table Materia
drop table GrupoHorario
drop table Grupo 









