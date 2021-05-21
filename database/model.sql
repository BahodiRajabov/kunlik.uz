create database day_serve_uz_db;

create extension pgcrypto;

create type role as enum ('user', 'moderator', 'superadmin');

create table users (
  user_id int generated by default as identity not null primary key,
  first_name character varying(256) not null,
  last_name character varying(256) not null,
  phone_number character varying(13) not null,
  password character varying(128) not null,
  user_role role not null default 'user',
  created_at timestamp with time zone  not null default current_timestamp
);


create table user_sessions (
  session_id int generated by default as identity not null primary key,
  user_id int references users (user_id) not null,
  token_id character varying(36) not null,
  is_logged_out boolean not null default false,
  logged_in_at timestamp with time zone not null default current_timestamp,
  logged_out_at timestamp with time zone,
  remote_ip inet not null, 
  device text not null
);

create table services (
  service_id int generated by default as identity not null primary key,
  service_name varchar(256) not null,
  image_src varchar(256) not null,
  created_at timestamptz not null default current_timestamp
);

create table sub_services (
  service_id int generated by default as identity not null primary key,
  service_name varchar(256) not null,
  created_at timestamptz not null default current_timestamp
);

create table workers (
  worker_id int generated by default as identity not null primary key,
  user_id int references users (user_id) not null,
  created_at timestamp with time zone  not null default current_timestamp
);

create table worker_services (
  order_id int generated by default as identity not null primary key,
  service_id int references services (service_id) not null,
  worker_id int references workers (worker_id) not null,
  created_at timestamptz not null default current_timestamp
);

create table worker_viewes(
  view_id serial not null primary key,
  worker_id int references workers (worker_id) not null,
  created_at timestamptz not null default current_timestamp
);

create table regions (
  region_id int generated by default as identity not null primary key,
  region_name character varying(128) not null,
  created_at timestamp with time zone not null default current_timestamp
);

create table districts (
  district_id int generated by default as identity not null primary key,
  district_name character varying(128) not null,
  region_id int references regions (region_id) not null,
  created_at timestamp with time zone not null default current_timestamp
);

create table orders (
  order_id int generated by default as identity not null primary key,
  title text not null,
  descripton text not null,
  district_id int references districts (district_id) not null,
  service_id int references services (service_id) not null,
  is_closed boolean not null default false,
  created_at timestamptz not null default current_timestamp
);


create table order_viewes(
  view_id serial not null primary key,
  order_id int references orders (order_id) not null,
  created_at timestamptz not null default current_timestamp
);


create table order_files (
  file_id int generated by default as identity not null primary key,
  order_id int references orders (order_id) not null,
  file_src varchar(256) not null
);

create table job_budget_types (
  jbt_id int generated by default as identity not null primary key,
  jbt_name character varying(128) not null,
  created_at timestamp with time zone not null default current_timestamp
);