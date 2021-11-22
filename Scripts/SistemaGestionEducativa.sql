use master
go
create database SistemaGestionEducativa
go
use SistemaGestionEducativa
go

--Tabla que guarda la información para cada usuario existente
create table (
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
    primary key(cedulaEstudiante,codigoGrupo,nombreMateria,numPeriodo,anno,rubro)

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
select * from Factura
select * from Matricula


--------------------FUNCIONES---------------------------------
--2. Promedio de aprobación por período por grupo (selecciona un período). Gráfico de barras.
create function PromedioEstudiantes_F(@numPeriodo int,@anno int)
returns table
as
return(
	select top 1000 Evaluacion_Grupo_Estudiante.codigoGrupo, Evaluacion_Grupo_Estudiante.numPeriodo,anno,
	(cast(count(estado)as float)/(select CantidadEstudiantes from CantidadEstudiantesGrupo(codigoGrupo)))*100
	as promedio
	from Evaluacion_Grupo_Estudiante where numPeriodo=@numPeriodo
	and anno=@anno
	and Evaluacion_Grupo_Estudiante.estado='Aprobado'
	group by codigoGrupo,numPeriodo,anno 
	--order by avg(estado) desc

)

drop function PromedioEstudiantes_F
select * from  dbo.PromedioEstudiantes_F (2,2020)

select count(estado) as cantidad from Evaluacion_Grupo_Estudiante where estado='Aprobado'
--group by codigoGrupo
-----1. Promedio de Notas por Profesor por Grupo --------------------
create function Promedio_Notas_P (@cedulaProfesor int)
returns table 
as 
return (

	select Evaluacion_Grupo_Estudiante.codigoGrupo,Evaluacion_Grupo_Estudiante.numPeriodo,Evaluacion_Grupo_Estudiante.anno,
	avg(Evaluacion_Grupo_Estudiante.notaObtenida) as PromedioNota from Evaluacion_Grupo_Estudiante 
	inner join Grupo on Grupo.codigoNombre =Evaluacion_Grupo_Estudiante.codigoGrupo and Grupo.cedulaProfesor= @cedulaProfesor
	group by codigoGrupo,numPeriodo, Evaluacion_Grupo_Estudiante.anno
	

)

select * from  dbo.Promedio_Notas_P(115173422)


---------3. Cantidad de estudiantes por periodo por grupo----------------------
create function Cantidad_Estudiantes_Pe(@numeroPeriodo int, @annoPeriodo int)
returns table
as 
return (
		select count(Matricula.idMatricula) as CantidadEstudiantes , Matricula.codigoGrupo, Matricula.anno, Matricula.numPeriodo 
		from Matricula where Matricula.numPeriodo = @numeroPeriodo and Matricula.anno = @annoPeriodo
		group by codigoGrupo,anno,numPeriodo

)


select * from dbo.Cantidad_Estudiantes_Pe (2, 2021)

create function CantidadEstudiantesGrupo(@codigoGrupo varchar(25))
returns table
as 
return (
		select count(Matricula.idMatricula) as CantidadEstudiantes , Matricula.codigoGrupo, Matricula.anno, Matricula.numPeriodo 
		from Matricula where Matricula.codigoGrupo = @codigoGrupo
		group by codigoGrupo,anno,numPeriodo

)

select * from CantidadEstudiantesGrupo('Español-A1')

--4. Top 10 de padres con más deudas. Nombre y cantidad
create view Padre_DeudasVista as 
select top 10 Estudiante_Vista.nombrePadre,Estudiante_Vista.cedulaPadre, count(Cobros.consecutivo) as cantidad from Estudiante_Vista
inner join Matricula on Estudiante_Vista.cedula = Matricula.cedulaEstudiante
inner join Cobros on Cobros.idMatricula = Matricula.idMatricula and Cobros.estado='Pendiente'
group by nombrePadre,cedulaPadre
order by count(Cobros.consecutivo) desc


select * from Padre_DeudasVista 

--4,5. ver el detalle de los cobros pendientes al seleccionar un padre del top 10
create function DetalleCobrosPadre_F(@cedulaPadre int)
returns table
as
return(
	select Cobros.consecutivo,Cobros.idMatricula, Matricula.cedulaEstudiante, Matricula.codigoGrupo,
	Matricula.nombreMateria,Matricula.numPeriodo,Matricula.anno from Cobros 
	inner join Estudiante_Vista on Estudiante_Vista.cedulaPadre = @cedulaPadre
	inner join Matricula on Matricula.cedulaEstudiante = Estudiante_Vista.cedula and Matricula.idMatricula = Cobros.idMatricula
	and Cobros.estado='Pendiente'


)

--5. Ingresos por grado por período. Gráfico circular (porcentual). Seleccionar un periodo
create function Ingresos(@numPeriodo int,@anno int) 
returns table
as
return(
	select distinct Grupo.grado, Grupo.numeroPeriodo,Grupo.anno,round((cast(sum(totalPago) as float)/(select total from TotalIngresos(@numPeriodo,@anno))*100),2)as ingreso, 
	(select total from TotalIngresos(@numPeriodo,@anno)) as totalPeriodo,count(Matricula.idMatricula) as matriculas from Factura
	inner join Grupo on Grupo.numeroPeriodo = @numPeriodo and Grupo.anno = @anno
	inner join Matricula on Matricula.numPeriodo = @numPeriodo and Matricula.anno =@anno and Matricula.codigoGrupo=Grupo.codigoNombre
	inner join Cobros on Matricula.idMatricula = Cobros.idMatricula and Factura.consecutivo = Cobros.consecutivo
	and Cobros.estado = 'Pagado'
	group by grado,numeroPeriodo,Grupo.anno
)

select * from Ingresos(2,2021)




--Total de ingresos percibidos, se cuentan los cobros pagados
create view TotalIngresos as
select sum(totalPago) as total from Factura, Cobros,Matricula where Factura.consecutivo = Cobros.consecutivo
and Cobros.idMatricula = Matricula.idMatricula and Cobros.estado = 'Pagado'

select * from TotalIngresos
--------6 Cantidad de grupos por periodo. Periodo y cantidad.

create view Cantidad_Grupos_Periodo as
	select Periodo.numero , Periodo.anno , count (Grupo.codigoNombre) as CantidadGrupos from Periodo
	inner join Grupo on Grupo.anno = Periodo.anno and Grupo.numeroPeriodo = Periodo.numero
	group by Periodo.numero, Periodo.anno


select * from Cantidad_Grupos_Periodo
drop view Cantidad_Grupos_Periodo

------7 - Top 10 de estudiantes con más ausencias. Nombre y cantidad. Puedo opcionalmente filtrar por período.

create view Top_10_Ausencias as

select top 10  Estudiante_Vista.nombreCompleto, count(Asistencia_Estudiante.cedulaEstudiante)as CantidadAusencias 
from Asistencia_Estudiante
inner join Estudiante_Vista on Estudiante_Vista.cedula= Asistencia_Estudiante.cedulaEstudiante
group by  nombreCompleto
order by count(Asistencia_Estudiante.cedulaEstudiante) desc

select * from Top_10_Ausencias

drop view Top_10_Ausencias
----7.5 Opcional filtrado por periodo

create function Top_10_Ausencias_Filtrar(@numPeriodo int,@anno int)
returns table 
as 
return (
	select top 10  Estudiante_Vista.nombreCompleto, count(Asistencia_Estudiante.cedulaEstudiante)as CantidadAusencias 
	from Asistencia_Estudiante
	inner join Estudiante_Vista on Estudiante_Vista.cedula= Asistencia_Estudiante.cedulaEstudiante and 
	Asistencia_Estudiante.anno = @anno and Asistencia_Estudiante.numPeriodo= @numPeriodo
	group by  nombreCompleto
)
 
 select  * from Top_10_Ausencias_Filtrar(2,2021)

 drop function Top_10_Ausencias_Filtrar


---- 8 Cantidad de grupos por estudiante por periodo, ordenado por grado. Seleccionar un periodo

create function Cantidad_Grupos_Estudiante(@numPeriodo int,@anno int)
returns table
as
return (
	select Estudiante.grado, Estudiante_Vista.nombreCompleto, Matricula.numPeriodo, Matricula.anno , 
	count(Matricula.codigoGrupo) as  CantidadGrupos from Matricula
	inner join Estudiante on  Estudiante.cedula = Matricula.cedulaEstudiante 
	inner join Estudiante_Vista on Estudiante_Vista.cedula = Matricula.cedulaEstudiante and
	Matricula.numPeriodo = @numPeriodo and Matricula.anno = @anno
	group by  nombreCompleto, numPeriodo, anno, Estudiante.grado
	

)

select * from Cantidad_Grupos_Estudiante(1,2020)

drop function  Cantidad_Grupos_Estudiante


execute sp_helpindex Estudiante


 --9. Porcentaje de estudiantes por género por período. Género y porcentaje. Gráfico circular.

create view Generos as
select cast(count(case when Estudiante_Vista.sexo = 'Femenino' then 1 else null end)as float) /(select count(sexo) from Estudiante_Vista 
where sexo='Femenino' or sexo='Masculino')*100 as femenino,cast(count (case when Estudiante_Vista.sexo = 'Masculino'then 1 else null end)as float)/ (select count(sexo) from Estudiante_Vista 
where sexo='Femenino' or sexo='Masculino')*100 as masculino,
concat(numPeriodo,' ',anno) as periodo from Estudiante_Vista 
inner join Matricula ma on ma.cedulaEstudiante = Estudiante_Vista.cedula
group by numPeriodo,anno


select * from Generos

----10 Cantidad de Aprobados y Reprobados por grupo por periodo. Comparativo. Gráfico de barras. Selecciona uno o más períodos.

create function CantidadAR (@numPeriodo int,@anno int)
returns table
as
return (
	select Grupo.codigoNombre, count(case when Evaluacion_Grupo_Estudiante.estado = 'Aprobado' then 1 else null end ) as CantidadAprobados,
	count(case when Evaluacion_Grupo_Estudiante.estado = 'Reprobado' then 1 else null end ) as CantidadReprobados from Grupo
	inner join Evaluacion_Grupo_Estudiante  on Evaluacion_Grupo_Estudiante.anno =@anno and Evaluacion_Grupo_Estudiante.numPeriodo= @numPeriodo 
	and Grupo.codigoNombre = Evaluacion_Grupo_Estudiante.codigoGrupo
	group by codigoNombre
)

select * from CantidadAR(2,2021)

drop function CantidadAR

--11. Ventas por periodo (cobros). Gráfico circular (porcentual). Seleccionar rango de períodos.
create function VentasPeriodo(@fecha1 date,@fecha2 date)
returns table
as 
return(

	select cast(count(Cobros.consecutivo) as float)/(select count(Cobros.consecutivo) from Cobros)*100 as ventas, 
	concat('Inicio: ',@fecha1,' - Fin: ',@fecha2) as rango, 
	cast((select count(Cobros.consecutivo) from Cobros)-count(Cobros.consecutivo)as float)/(select count(Cobros.consecutivo) from Cobros)*100
	as otrosPeriodos from Cobros
	inner join Periodo on Periodo.fechaInicio = @fecha1 or (Periodo.fechaFinal between @fecha1 and @fecha2)
	inner join Matricula m on m.anno = Periodo.anno and m.numPeriodo = Periodo.numero and m.idMatricula = Cobros.idMatricula

)



drop function VentasPeriodo
select * from VentasPeriodo('2021-02-02','2021-07-28')

select idMatricula,numPeriodo,anno from Matricula where (anno between 2020 and 2021) and (numPeriodo between 1 and 1)
--12. Cobros vs facturados por grado, por período. Gráfico de barras
--Vista que muestra el total de cobros pendientes por grado por periodo
create view Cobros_Grado_Periodo as
select count(c.consecutivo) as cobros, concat('Grado: ',Grupo.grado,' Período: ',numeroPeriodo,' ',grupo.anno ) as gradoPeriodo from Grupo
inner join Matricula m on m.codigoGrupo = Grupo.codigoNombre and m.numPeriodo = Grupo.numeroPeriodo and m.anno = grupo.anno
inner join Cobros c on c.idMatricula = m.idMatricula and c.estado = 'Pendiente'
group by grado,numeroPeriodo,Grupo.anno

--Vista que muestra el total de cobros pagados por grado por periodo
create view Facturas_Grado_Periodo as
select count(c.consecutivo) as facturas, concat('Grado: ',Grupo.grado,' Período: ',numeroPeriodo,' ',grupo.anno ) as gradoPeriodo from Grupo
inner join Matricula m on m.codigoGrupo = Grupo.codigoNombre and m.numPeriodo = Grupo.numeroPeriodo and m.anno = grupo.anno
inner join Cobros c on c.idMatricula = m.idMatricula and c.estado = 'Pagado'
group by grado,numeroPeriodo,Grupo.anno


--Une las dos vistas anteriores
create view CobrosVsFacturas_Grado_Periodo as
select cobros,facturas,c.gradoPeriodo from Cobros_Grado_Periodo c
inner join Facturas_Grado_Periodo f on f.gradoPeriodo = c.gradoPeriodo



--13. Top 10 de profesores con más aumento salarial. Nombre y monto. Compara salario inicial contra actual.

create view TopProfesores as
select top 10 nombreCompleto, (p.monto) as salarioInicial, salario as salarioActual,
salario - p.monto as aumento from Profesor_Vista
inner join Profesor_HistorialSalario p on p.cedula = Profesor_Vista.cedula
order by aumento desc

---- 14 Promedio ponderado por estudiante. Cantidad de grupos, cantidad de grupos aprobados y reprobados,
--promedio de aprobados y promedio de reprobados. Lista de grupos con nota. Filtra por estudiante

create function CedulaEstudiante(@NombreCompleto varchar(60)) returns int
as 
begin
declare @cedula int
select @cedula = Estudiante_Vista.cedula from Estudiante_Vista where Estudiante_Vista.nombreCompleto=@NombreCompleto
return @cedula
end

select dbo.CedulaEstudiante('Shermie Madrid Orellana')
drop function CedulaEstudiante


create function infoAcademica(@cedula int)
returns table 
as
return (
	select avg(Evaluacion_Grupo_Estudiante.notaObtenida) as Ponderado, count (Evaluacion_Grupo_Estudiante.codigoGrupo) as CantidadGrupos,
	count(case when Evaluacion_Grupo_Estudiante.estado = 'Aprobado' then 1 else null end ) as CantidadAprobados,
	count(case when Evaluacion_Grupo_Estudiante.estado = 'Reprobado' then 1 else null end ) as CantidadReprobados from Evaluacion_Grupo_Estudiante
	where Evaluacion_Grupo_Estudiante.cedulaEstudiante = @cedula

)

select * from infoAcademica (117950392)

drop function infoAcademica

create function listadoGrupos(@cedula int)
returns table
as
return (
	
	select Evaluacion_Grupo_Estudiante.codigoGrupo, Evaluacion_Grupo_Estudiante.notaObtenida from Evaluacion_Grupo_Estudiante
	where Evaluacion_Grupo_Estudiante.cedulaEstudiante = @cedula
)


select * from listadoGrupos(117950392)

drop function listadoGrupos 

----16--- Top 15 de grupos con mayor porcentaje aprobación histórico.
--Muestra toda la información incluyendo el profesor que imparte.

create view top15Grupos as
	select top 15 Evaluacion_Grupo_Estudiante.codigoGrupo, Evaluacion_Grupo_Estudiante.numPeriodo,anno,
	(cast(count(estado)as float)/(select CantidadEstudiantes from CantidadEstudiantesGrupo(codigoGrupo)))*100
	as promedio , dbo.ProfesorImparte( Evaluacion_Grupo_Estudiante.codigoGrupo,  Evaluacion_Grupo_Estudiante.numPeriodo, anno)
	as ProfesorImparte, dbo.grado(Evaluacion_Grupo_Estudiante.codigoGrupo) as Grado
	from Evaluacion_Grupo_Estudiante where Evaluacion_Grupo_Estudiante.estado='Aprobado'
	group by codigoGrupo,numPeriodo,anno 
	order by  promedio desc


create function grado (@codigoGrupo varchar(60)) returns int
as
begin
declare @grado int
select @grado = Grupo.grado  from Grupo where Grupo.codigoNombre = @codigoGrupo
return @grado
end

create function ProfesorImparte(@codigoGrupo varchar(60), @numPeriodo int , @anno int) 
returns varchar(60)
as 
begin
declare @nombreCompleto varchar(60)
select @nombreCompleto = Profesor_Vista.nombreCompleto from Profesor_Vista
inner join Grupo on Grupo.codigoNombre= @codigoGrupo and 
Grupo.numeroPeriodo=@numPeriodo and Grupo.anno = @anno and Profesor_Vista.cedula = Grupo.cedulaProfesor
return @nombreCompleto
end

------17 Porcentaje de reprobación por grupo. Ordenados ascendente y descendente.
--Muestra toda la información incluyendo el profesor que imparte. Permite filtrar rango de período.



--Borrar todos los planes de memoria caché
DBCC FREEPROCCACHE WITH NO_INFOMSGS

--- Vaciar la cache  de datos 
DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS


 execute sp_helpindex Asistencia_Estudiante

 --create clustered index IDX_nombres
 --on Usuario (nombre)

 drop view Top_10_Ausencias

 --drop index Usuario.IDX_nombres

-- select * from Usuario

select * from Cobros where estado = 'Pagado' order by idMatricula asc

--INSERTS
insert into Usuario values(111,'Admin','Leon','Chinchilla','0192023a7bbd73250516f069df18b500','Masculino',
'2001/7/29','Admin','2021/10/19')

--1
insert into Usuario values(118180009,'Richard','Leon','Chinchilla','0192023a7bbd73250516f069df18b500','Masculino',
'2001/7/29','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(118180009,'San José','Desamparados','Gravilias','Villa Nueva');
insert into Profesor values(118180009,605000)
insert into Profesor_HistorialSalario values(118180009,'2008/10/10','2020/11/5',482000)
--2
insert into Usuario values(110100005,'Eduardo','Camavinga','Arias','242a7df6497824b3e47e062856610a7a','Masculino',
'1980/4/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(110100005,'San José','Santa Ana','Pozos','La esquinita');
insert into Profesor values(110100005,815000)
insert into Profesor_HistorialSalario values(110100005,'2012/10/10','2019/4/7',536000)
--3
insert into Usuario values(302302414,'Claudia','Poll','Retana','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(302302414,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(302302414,942320)
insert into Profesor_HistorialSalario values(302302414,'2001/10/10','2013/4/7',601000)
--4
insert into Usuario values(356175651,'Faustina','Castro','Alguera','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(356175651,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(356175651,902320)
insert into Profesor_HistorialSalario values(356175651,'2001/10/10','2013/4/7',801000)

--5
insert into Usuario values(256175651,'Calamardo','Estrella','Abano','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(256175651,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(256175651,432320)
insert into Profesor_HistorialSalario values(256175651,'2001/10/10','2013/4/7',401050)

--6
insert into Usuario values(126175451,'Carlos','Tevez','Apache','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(126175451,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(126175451,532520)
insert into Profesor_HistorialSalario values(126175451,'2001/10/10','2013/4/7',502150)

--7
insert into Usuario values(416173452,'Oscar','Arias','Sanchez','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(416173452,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(416173452,631520)
insert into Profesor_HistorialSalario values(416173452,'2001/10/10','2013/4/7',411150)

--8
insert into Usuario values(115173422,'Katniss','Katoa','Kakatua','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(115173422,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(115173422,731520)
insert into Profesor_HistorialSalario values(115173422,'2001/10/10','2013/4/7',813141)

--9
insert into Usuario values(130173422,'Carmen','Lira','Lora','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(130173422,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(130173422,631520)
insert into Profesor_HistorialSalario values(130173422,'2001/10/10','2013/4/7',423141)

--10

insert into Usuario values(120183421,'Kirtein','Gadjens','Ruiz','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(120183421,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(120183421,731420)
insert into Profesor_HistorialSalario values(120183421,'2001/10/10','2013/4/7',523041)

--11
insert into Usuario values(120163421,'Lupita','Lapita','Loquita','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(120163421,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(120163421,1031420)
insert into Profesor_HistorialSalario values(120163421,'2001/10/10','2013/4/7',823041)

--12

insert into Usuario values(219161321,'Ludmila','Lopez','Herrera','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(219161321,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(219161321,1041420)
insert into Profesor_HistorialSalario values(219161321,'2001/10/10','2013/4/7',623110)

--13

insert into Usuario values(511133320,'Adolfo','Mussolinni','Frank','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(511133320,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(511133320,1141420)
insert into Profesor_HistorialSalario values(511133320,'2001/10/10','2013/4/7',813810)

--14

insert into Usuario values(811133320,'Benito','Hitlor','Stanley','242a7df6497824b3e47e062856610a7a','Masculino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(811133320,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(811133320,941420)
insert into Profesor_HistorialSalario values(811133320,'2001/10/10','2013/4/7',815810)

--15
insert into Usuario values(421933720,'Maria','Becerra','Alguera','242a7df6497824b3e47e062856610a7a','Femenino',
'1974/12/12','Profesor','2021/10/19')
insert into Usuario_Ubicacion values(421933720,'Heredia','San Joaquín','La Trinidad','Las Flores');
insert into Profesor values(421933720,2041420)
insert into Profesor_HistorialSalario values(421933720,'2001/10/10','2013/4/7',915915)


-----------------------------Padres--------------------------------------------------
--1
insert into Usuario values(114140008,'Francisco','Paredes','Mora','242b9ab779ee5a9b937d300817d96144','Masculino',
'1975/5/5','Padre','2021/10/25')
insert into Usuario_Ubicacion values(114140008,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(114140008,'Mecanico','Hanna',88705025);

--2
insert into Usuario values(429847293,'Mauricio','Aviles','Carmeno','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(429847293,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(429847293,'Programador','Carolina',85134560);
--3
insert into Usuario values(449847293,'Mauricio','Estrada','Alvarado','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(449847293,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(449847293,'Programador','Carolina',85134560);

--4
insert into Usuario values(329847293,'Maria','Alvarado','Costa','242b9ab779ee5a9b937d300817d96144','Femenino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(329847293,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(329847293,'Programador','Carolina',85134560);

--5
insert into Usuario values(179345290,'Karlos','Mercedes','Rodriguez','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(179345290,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(179345290,'Programador','Carolina',85134560);

--6

insert into Usuario values(149345290,'Fausto','Araya','Araya','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(149345290,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(149345290,'Programador','Carolina',85134560);

--7
insert into Usuario values(179331290,'Pedro','Picapiedra','Rodriguez','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(179331290,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(179331290,'Programador','Carolina',85134560);

--8
insert into Usuario values(179331110,'Felipe','Poya','Caya','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(179331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(179331110,'Programador','Carolina',85134560);

--9
insert into Usuario values(279331110,'Juan','Pizcuan','Messi','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(279331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(279331110,'Programador','Carolina',85134560);

--10
insert into Usuario values(379331110,'Mario','Mortadela','De la i','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(379331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(379331110,'Programador','Carolina',85134560);

--11
insert into Usuario values(479331110,'Adrian','Roca','Villalta','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(479331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(479331110,'Programador','Carolina',85134560);

--12
insert into Usuario values(579331110,'Roberto','Leon','Vindas','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(579331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(579331110,'Programador','Carolina',85134560);

--13
insert into Usuario values(679331110,'Rob','Vindas','Vindas','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(679331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(679331110,'Programador','Carolina',85134560);

--14

insert into Usuario values(779331110,'Malcom','Bedoya','Solis','242b9ab779ee5a9b937d300817d96144','Masculino',
'1985/6/16','Padre','2021/10/25')
insert into Usuario_Ubicacion values(779331110,'San José','Desamparados','San Miguel','Centro');
insert into Padre values(779331110,'Programador','Carolina',85134560);

-------------------------------Estudiantes----------------------------------------------------
--1
insert into Usuario values(117950392,'Melissa','Alguera','Castillo','0192023a7bbd73250516f069df18b500','Femenino',
'2000/10/25','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(117950392,'San José','Desamparados','San Miguel','Centro');
insert into Estudiante values(117950392,114140008,1);
--2
insert into Usuario values(122543102,'Adrian','Herrera','Segura','0192023a7bbd73250516f069df18b500','Masculino',
'2002/11/9','Estudiante','2021/10/19')
insert into Usuario_Ubicacion values(122543102,'San José','San Sebastian','Calle Blanco','Residencial MegaSuper');
insert into Estudiante values(122543102,429847293,1);
--3
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
-------------------------Evalucion por curso -------------------------------------------------------------------

insert into Evaluacion values ('Tarea', 20,'Biología-A1',2,2020,'Biología');
insert into Evaluacion values ('Cotidiano', 20,'Biología-A1',2,2020,'Biología');
insert into Evaluacion values ('Examenes', 60,'Biología-A1',2,2020,'Biología');


insert into Evaluacion values ('Tarea', 20,'Biología-A2',2,2020,'Biología');
insert into Evaluacion values ('Cotidiano', 20,'Biología-A2',2,2020,'Biología');
insert into Evaluacion values ('Examenes', 60,'Biología-A2',2,2020,'Biología');


insert into Evaluacion values ('ExtraClase', 20,'Español-A1',2,2020,'Español');
insert into Evaluacion values ('Cotidiano', 20,'Español-A1',2,2020,'Español');
insert into Evaluacion values ('Redaccion', 20,'Español-A1',2,2020,'Español');
insert into Evaluacion values ('Examenes', 40,'Español-A1',2,2020,'Español');


insert into Evaluacion values ('ExtraClase', 20,'Español-A2',2,2020,'Español');
insert into Evaluacion values ('Cotidiano', 20,'Español-A2',2,2020,'Español');
insert into Evaluacion values ('Redaccion', 20,'Español-A2',2,2020,'Español');
insert into Evaluacion values ('Examenes', 40,'Español-A2',2,2020,'Español');


insert into Evaluacion values ('Proyecto Final', 30,'Estudios Sociales-A1',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Tareas', 20,'Estudios Sociales-A1',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Cotidiano', 20,'Estudios Sociales-A1',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Examenes', 30,'Estudios Sociales-A1',1,2020,'Estudios Sociales');


insert into Evaluacion values ('Proyecto Final', 30,'Estudios Sociales-A2',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Tareas', 20,'Estudios Sociales-A2',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Cotidiano', 20,'Estudios Sociales-A2',1,2020,'Estudios Sociales');
insert into Evaluacion values ('Examenes', 30,'Estudios Sociales-A2',1,2020,'Estudios Sociales');


insert into Evaluacion values ('Laboratorio', 60,'Fisica-A1',2,2021,'Fisica');
insert into Evaluacion values ('Tareas', 40,'Fisica-A1',2,2021,'Fisica');

insert into Evaluacion values ('Laboratorio', 60,'Fisica-A2',2,2021,'Fisica');
insert into Evaluacion values ('Tareas', 40,'Fisica-A2',2,2021,'Fisica');

insert into Evaluacion values ('Proyectos', 60,'Informática-A1',1,2021,'Informática');
insert into Evaluacion values ('Tareas', 20,'Informática-A1',1,2021,'Informática');
insert into Evaluacion values ('Examenes', 20,'Informática-A1',1,2021,'Informática');

insert into Evaluacion values ('Proyectos', 60,'Informática-A2',1,2021,'Informática');
insert into Evaluacion values ('Tareas', 20,'Informática-A2',1,2021,'Informática');
insert into Evaluacion values ('Examenes', 20,'Informática-A2',1,2021,'Informática');

insert into Evaluacion values ('Speaking', 60,'Inglés-A1',1,2021,'Inglés');
insert into Evaluacion values ('Listening', 20,'Inglés-A1',1,2021,'Inglés');
insert into Evaluacion values ('Writing', 20,'Inglés-A1',1,2021,'Inglés');


insert into Evaluacion values ('Speaking', 60,'Inglés-A2',1,2021,'Inglés');
insert into Evaluacion values ('Listening', 20,'Inglés-A2',1,2021,'Inglés');
insert into Evaluacion values ('Writing', 20,'Inglés-A2',1,2021,'Inglés');

insert into Evaluacion values('Tareas',10,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Cotidiano',20,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Proyectos',30,'Matemáticas-A1',1,2020,'Matemáticas')
insert into Evaluacion values('Examenes',40,'Matemáticas-A1',1,2020,'Matemáticas')


insert into Evaluacion values('Tareas',10,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Evaluacion values('Cotidiano',20,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Evaluacion values('Proyectos',30,'Matemáticas-A2',1,2020,'Matemáticas')
insert into Evaluacion values('Examenes',40,'Matemáticas-A2',1,2020,'Matemáticas')



insert into Evaluacion values ('Laboratorio', 60,'Química-A2',2,2021,'Química');
insert into Evaluacion values ('Tareas', 40,'Química-A2',2,2021,'Química');


insert into Evaluacion values ('Laboratorio', 60,'Química-A1',2,2021,'Química');
insert into Evaluacion values ('Tareas', 40,'Química-A1',2,2021,'Química');


-------------------------Evalucion nota obtenida por rubro por estudiante --------------------------------------


----Ejemplo de uso 

insert into Evaluacion_Estudiante values (117950392,'Matemáticas-A1','Matemáticas',1,2020,8,'Tareas');
insert into Evaluacion_Estudiante values (117950392,'Matemáticas-A1','Matemáticas',1,2020,15,'Cotidiano');
insert into Evaluacion_Estudiante values (117950392,'Matemáticas-A1','Matemáticas',1,2020,26,'Proyectos');
insert into Evaluacion_Estudiante values (117950392,'Matemáticas-A1','Matemáticas',1,2020,23,'Examenes');

insert into Evaluacion_Estudiante values (122543102,'Matemáticas-A1','Matemáticas',1,2020,8,'Tareas');
insert into Evaluacion_Estudiante values (122543102,'Matemáticas-A1','Matemáticas',1,2020,15,'Cotidiano');
insert into Evaluacion_Estudiante values (122543102,'Matemáticas-A1','Matemáticas',1,2020,26,'Proyectos');
insert into Evaluacion_Estudiante values (122543102,'Matemáticas-A1','Matemáticas',1,2020,23,'Examenes');


insert into Evaluacion_Estudiante values (115150008,'Matemáticas-A1','Matemáticas',1,2020,9,'Tareas');
insert into Evaluacion_Estudiante values (115150008,'Matemáticas-A1','Matemáticas',1,2020,10,'Cotidiano');
insert into Evaluacion_Estudiante values (115150008,'Matemáticas-A1','Matemáticas',1,2020,20,'Proyectos');
insert into Evaluacion_Estudiante values (115150008,'Matemáticas-A1','Matemáticas',1,2020,30,'Examenes');


insert into Evaluacion_Estudiante values (125150008,'Matemáticas-A1','Matemáticas',1,2020,10,'Tareas');
insert into Evaluacion_Estudiante values (125150008,'Matemáticas-A1','Matemáticas',1,2020,15,'Cotidiano');
insert into Evaluacion_Estudiante values (125150008,'Matemáticas-A1','Matemáticas',1,2020,20,'Proyectos');
insert into Evaluacion_Estudiante values (125150008,'Matemáticas-A1','Matemáticas',1,2020,30,'Examenes');


insert into Evaluacion_Estudiante values (215150008,'Matemáticas-A1','Matemáticas',1,2020,10,'Tareas');
insert into Evaluacion_Estudiante values (215150008,'Matemáticas-A1','Matemáticas',1,2020,18,'Cotidiano');
insert into Evaluacion_Estudiante values (215150008,'Matemáticas-A1','Matemáticas',1,2020,23,'Proyectos');
insert into Evaluacion_Estudiante values (215150008,'Matemáticas-A1','Matemáticas',1,2020,28,'Examenes');



-------------------------Evalucion nota obtenida final por estudiante por curso --------------------------------

insert into Evaluacion_Grupo_Estudiante values(117950392,'Matemáticas-A1','Matemáticas',1,2020,72, 'Aprobado','Examenes 23%, Proyecto 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(122543102,'Matemáticas-A1','Matemáticas',1,2020,72, 'Aprobado','Examenes 23%, Proyecto 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(115150008,'Matemáticas-A1','Matemáticas',1,2020,69, 'Reprobado','Examenes 30%, Proyecto 20%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(125150008,'Matemáticas-A1','Matemáticas',1,2020,75, 'Aprobado','Examenes 30%, Proyecto 20%, Cotidiano 15%,Tareas 10% ');
insert into Evaluacion_Grupo_Estudiante values(215150008,'Matemáticas-A1','Matemáticas',1,2020,79, 'Aprobado','Examenes 28%, Proyecto 23%, Cotidiano 18%,Tareas 10% ');


insert into Evaluacion_Grupo_Estudiante values(515150008,'Matemáticas-A2','Matemáticas',1,2020,72, 'Aprobado','Examenes 23%, Proyecto 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(615150008,'Matemáticas-A2','Matemáticas',1,2020,72, 'Aprobado','Examenes 23%, Proyecto 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(625150008,'Matemáticas-A2','Matemáticas',1,2020,69, 'Reprobado','Examenes 30%, Proyecto 20%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(715150008,'Matemáticas-A2','Matemáticas',1,2020,75, 'Aprobado','Examenes 30%, Proyecto 20%, Cotidiano 15%,Tareas 10% ');
insert into Evaluacion_Grupo_Estudiante values(725150008,'Matemáticas-A2','Matemáticas',1,2020,59, 'Reprobado','Examenes 28%, Proyecto 23%, Cotidiano 8%,Tareas 0% ');


insert into Evaluacion_Grupo_Estudiante values(115150008,'Estudios Sociales-A1','Estudios Sociales',1,2020,72, 'Aprobado','Examenes 23%, Proyecto Final 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(117950392,'Estudios Sociales-A1','Estudios Sociales',1,2020,72, 'Aprobado','Examenes 23%, Proyecto Final 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(122543102,'Estudios Sociales-A1','Estudios Sociales',1,2020,69, 'Reprobado','Examenes 30%, Proyecto Final 20%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(125150008,'Estudios Sociales-A1','Estudios Sociales',1,2020,75, 'Aprobado','Examenes 30%, Proyecto Final 20%, Cotidiano 15%,Tareas 10% ');
insert into Evaluacion_Grupo_Estudiante values(215150008,'Estudios Sociales-A1','Estudios Sociales',1,2020,59, 'Reprobado','Examenes 28%, Proyecto Final 23%, Cotidiano 8%,Tareas 0% ');


insert into Evaluacion_Grupo_Estudiante values(515150008,'Estudios Sociales-A2','Estudios Sociales',1,2020,52, 'Reprobado','Examenes 13%, Proyecto Final 16%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(615150008,'Estudios Sociales-A2','Estudios Sociales',1,2020,72, 'Aprobado','Examenes 23%, Proyecto Final 26%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(625150008,'Estudios Sociales-A2','Estudios Sociales',1,2020,69, 'Reprobado','Examenes 30%, Proyecto Final 20%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(715150008,'Estudios Sociales-A2','Estudios Sociales',1,2020,75, 'Aprobado','Examenes 30%, Proyecto Final 20%, Cotidiano 15%,Tareas 10% ');
insert into Evaluacion_Grupo_Estudiante values(725150008,'Estudios Sociales-A2','Estudios Sociales',1,2020,79, 'Aprobado','Examenes 28%, Proyecto Final 23%, Cotidiano 8%,Tareas 20% ');

insert into Evaluacion_Grupo_Estudiante values(225150008,'Biología-A1','Biología',2,2020,79, 'Aprobado','Examenes 52%, Cotidiano 15%,Tareas 12% ');
insert into Evaluacion_Grupo_Estudiante values(315150008,'Biología-A1','Biología',2,2020,63, 'Reprobado','Examenes 40%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(325150008,'Biología-A1','Biología',2,2020,58, 'Reprobado','Examenes 39%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(525150008,'Biología-A1','Biología',2,2020,65, 'Reprobado','Examenes 30%, Cotidiano 15%,Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(425150008,'Biología-A1','Biología',2,2020,56, 'Reprobado','Examenes 28%, Cotidiano 8%,Tareas 20% ');

insert into Evaluacion_Grupo_Estudiante values(815150008,'Biología-A2','Biología',2,2020,79, 'Aprobado','Examenes 52%, Cotidiano 15%,Tareas 12% ');
insert into Evaluacion_Grupo_Estudiante values(825150008,'Biología-A2','Biología',2,2020,63, 'Reprobado','Examenes 40%, Cotidiano 15%,Tareas 8% ');
insert into Evaluacion_Grupo_Estudiante values(415150008,'Biología-A2','Biología',2,2020,58, 'Reprobado','Examenes 39%, Cotidiano 10%,Tareas 9% ');
insert into Evaluacion_Grupo_Estudiante values(290150018,'Biología-A2','Biología',2,2020,65, 'Reprobado','Examenes 30%, Cotidiano 15%,Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(190150018,'Biología-A2','Biología',2,2020,76, 'Aprobado','Examenes 38%, Cotidiano 18%,Tareas 20% ');



insert into Evaluacion_Grupo_Estudiante values(815150008,'Español-A2','Español',2,2020,100, 'Aprobado','Examenes 40%, Cotidiano 20%, Redaccion 20%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(825150008,'Español-A2','Español',2,2020,80, 'Aprobado','Examenes 40%, Cotidiano 10%, Redaccion 10%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(415150008,'Español-A2','Español',2,2020,81, 'Aprobado','Examenes 40%, Cotidiano 10%, Redaccion 11%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(290150018,'Español-A2','Español',2,2020,70, 'Aprobado','Examenes 20%, Cotidiano 10%, Redaccion 20%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(190150018,'Español-A2','Español',2,2020,75, 'Aprobado','Examenes 40%, Cotidiano 20%, Redaccion 5%, ExtraClase 10% ');


insert into Evaluacion_Grupo_Estudiante values(225150008,'Español-A1','Español',2,2020,99, 'Aprobado','Examenes 40%, Cotidiano 19%, Redaccion 20%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(315150008,'Español-A1','Español',2,2020,50, 'Reprobado','Examenes 10%, Cotidiano 10%, Redaccion 10%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(325150008,'Español-A1','Español',2,2020,81, 'Aprobado','Examenes 40%, Cotidiano 10%, Redaccion 11%, ExtraClase 20% ');
insert into Evaluacion_Grupo_Estudiante values(525150008,'Español-A1','Español',2,2020,36, 'Reprobado','Examenes 6%, Cotidiano 10%, Redaccion 20%, ExtraClase 0% ');
insert into Evaluacion_Grupo_Estudiante values(425150008,'Español-A1','Español',2,2020,75, 'Aprobado','Examenes 40%, Cotidiano 20%, Redaccion 5%, ExtraClase 10% ');


insert into Evaluacion_Grupo_Estudiante values(115150008,'Informática-A1','Informática',1,2021,58, 'Reprobado','Examenes 15%, Proyectos 28%,Tareas 15% ');
insert into Evaluacion_Grupo_Estudiante values(117950392,'Informática-A1','Informática',1,2021,75, 'Aprobado','Examenes 4%, Proyectos 52%,Tareas 19% ');
insert into Evaluacion_Grupo_Estudiante values(122543102,'Informática-A1','Informática',1,2021,58, 'Reprobado','Examenes 19%, Proyectos 25%,Tareas 14% ');
insert into Evaluacion_Grupo_Estudiante values(125150008,'Informática-A1','Informática',1,2021,100, 'Aprobado','Examenes 20%, Proyectos 60%,Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(215150008,'Informática-A1','Informática',1,2021,66, 'Reprobado','Examenes 20%, Proyectos 36%,Tareas 10% ');


insert into Evaluacion_Grupo_Estudiante values(515150008,'Informática-A2','Informática',1,2021,68, 'Reprobado','Examenes 15%, Proyectos 38%,Tareas 15% ');
insert into Evaluacion_Grupo_Estudiante values(615150008,'Informática-A2','Informática',1,2021,75, 'Aprobado','Examenes 4%, Proyectos 52%,Tareas 19% ');
insert into Evaluacion_Grupo_Estudiante values(625150008,'Informática-A2','Informática',1,2021,85, 'Aprobado','Examenes 14%, Proyectos 52%,Tareas 19% ');
insert into Evaluacion_Grupo_Estudiante values(715150008,'Informática-A2','Informática',1,2021,58, 'Reprobado','Examenes 19%, Proyectos 25%,Tareas 14% ');
insert into Evaluacion_Grupo_Estudiante values(725150008,'Informática-A2','Informática',1,2021,66, 'Reprobado','Examenes 20%, Proyectos 36%,Tareas 10% ');


insert into Evaluacion_Grupo_Estudiante values(515150008,'Inglés-A2','Inglés',1,2021,68, 'Reprobado','Listening 15%, Speaking 38%,Writing 15% ');
insert into Evaluacion_Grupo_Estudiante values(615150008,'Inglés-A2','Inglés',1,2021,75, 'Aprobado','Listening 4%, Speaking 52%,Writing 19% ');
insert into Evaluacion_Grupo_Estudiante values(625150008,'Inglés-A2','Inglés',1,2021,85, 'Aprobado','Listening 14%, Speaking 52%,Writing 19% ');
insert into Evaluacion_Grupo_Estudiante values(715150008,'Inglés-A2','Inglés',1,2021,58, 'Reprobado','Listening 19%, Speaking 25%,Writing 14% ');
insert into Evaluacion_Grupo_Estudiante values(725150008,'Inglés-A2','Inglés',1,2021,66, 'Reprobado','Listening 20%, Speaking 36%,Writing 10% ');


insert into Evaluacion_Grupo_Estudiante values(115150008,'Inglés-A1','Inglés',1,2021,100, 'Aprobado','Listening 20%, Speaking 50%,Writing 20% ');
insert into Evaluacion_Grupo_Estudiante values(117950392,'Inglés-A1','Inglés',1,2021,75, 'Aprobado','Listening 4%, Speaking 52%,Writing 19% ');
insert into Evaluacion_Grupo_Estudiante values(122543102,'Inglés-A1','Inglés',1,2021,85, 'Aprobado','Listening 14%, Speaking 52%,Writing 19% ');
insert into Evaluacion_Grupo_Estudiante values(125150008,'Inglés-A1','Inglés',1,2021,78, 'Aprobado','Listening 19%, Speaking 45%,Writing 14% ');
insert into Evaluacion_Grupo_Estudiante values(215150008,'Inglés-A1','Inglés',1,2021,85, 'Aprobado','Listening 20%, Speaking 45%,Writing 20% ');



insert into Evaluacion_Grupo_Estudiante values(225150008,'Fisica-A1','Fisica',2,2021,70, 'Aprobado','Laboratorio 50%, Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(315150008,'Fisica-A1','Fisica',2,2021,72, 'Aprobado','Laboratorio 52%, Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(325150008,'Fisica-A1','Fisica',2,2021,81, 'Aprobado','Laboratorio 52%, Tareas 29% ');
insert into Evaluacion_Grupo_Estudiante values(525150008,'Fisica-A1','Fisica',2,2021,59, 'Reprobado','Laboratorio 45%, Tareas 14% ');
insert into Evaluacion_Grupo_Estudiante values(425150008,'Fisica-A1','Fisica',2,2021,65, 'Reprobado','Laboratorio 45%, Tareas 20% ');

insert into Evaluacion_Grupo_Estudiante values(815150008,'Fisica-A2','Fisica',2,2021,60, 'Reprobado','Laboratorio 40%, Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(825150008,'Fisica-A2','Fisica',2,2021,69, 'Reprobado','Laboratorio 52%, Tareas 17% ');
insert into Evaluacion_Grupo_Estudiante values(415150008,'Fisica-A2','Fisica',2,2021,41, 'Reprobado','Laboratorio 22%, Tareas 19% ');
insert into Evaluacion_Grupo_Estudiante values(290150018,'Fisica-A2','Fisica',2,2021,59, 'Reprobado','Laboratorio 45%, Tareas 14% ');
insert into Evaluacion_Grupo_Estudiante values(190150018,'Fisica-A2','Fisica',2,2021,65, 'Reprobado','Laboratorio 45%, Tareas 20% ');



insert into Evaluacion_Grupo_Estudiante values(225150008,'Química-A1','Química',2,2021,70, 'Aprobado','Laboratorio 50%, Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(315150008,'Química-A1','Química',2,2021,72, 'Aprobado','Laboratorio 52%, Tareas 20% ');
insert into Evaluacion_Grupo_Estudiante values(325150008,'Química-A1','Química',2,2021,81, 'Aprobado','Laboratorio 52%, Tareas 29% ');
insert into Evaluacion_Grupo_Estudiante values(525150008,'Química-A1','Química',2,2021,59, 'Reprobado','Laboratorio 45%, Tareas 14% ');
insert into Evaluacion_Grupo_Estudiante values(425150008,'Química-A1','Química',2,2021,98, 'Aprobado','Laboratorio 60%, Tareas 38% ');

insert into Evaluacion_Grupo_Estudiante values(815150008,'Química-A2','Química',2,2021,23, 'Reprobado','Laboratorio 10%, Tareas 13% ');
insert into Evaluacion_Grupo_Estudiante values(825150008,'Química-A2','Química',2,2021,69, 'Reprobado','Laboratorio 52%, Tareas 17% ');
insert into Evaluacion_Grupo_Estudiante values(415150008,'Química-A2','Química',2,2021,41, 'Reprobado','Laboratorio 22%, Tareas 19% ');
insert into Evaluacion_Grupo_Estudiante values(290150018,'Química-A2','Química',2,2021,79, 'Aprobado','Laboratorio 55%, Tareas 24% ');
insert into Evaluacion_Grupo_Estudiante values(190150018,'Química-A2','Química',2,2021,65, 'Reprobado','Laboratorio 45%, Tareas 20% ');

DECLARE @cnt INT = 5000;

WHILE @cnt < 5080
BEGIN
   if @cnt%3=0 insert into Cobros values(@cnt,'Pagado')

   else insert into Cobros values(@cnt,'Pendiente')
   SET @cnt = @cnt + 1;
END;

select * from Cobros

DECLARE @consecutivo INT = 5000;

WHILE @consecutivo < 5080
BEGIN

	if @consecutivo%3=0 insert into Factura values(@consecutivo-4999,50000,2,'2021/11/16')

SET @consecutivo = @consecutivo + 1;
END;

--insert into Grupo_Horario values('Matemáticas-A1','Matemáticas',1,2020,
--'Martes y Jueves','15:00','16:50');

select * from Matricula 
select * from Cobros






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









