create table veiculos (
  id serial primary key,
  placa text not null unique,
  cor text not null,
  modelo text
)