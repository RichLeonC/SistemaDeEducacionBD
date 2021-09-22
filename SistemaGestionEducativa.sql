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