create table veiculos (
  id serial primary key,
  placa text not null unique,
  cor text not null,
  modelo text
)

create table usuarios (
  id serial primary key,
  login text not null unique,
  senha text not null,
  nome text
)