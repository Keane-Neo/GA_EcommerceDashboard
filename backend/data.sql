create table customers (
	customer_id UUID NOT NULL PRIMARY KEY,
	customer_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(5255) NOT NULL,
	contact_no VARCHAR(15) UNIQUE
);

create table orders (
	order_id UUID NOT NULL PRIMARY KEY,
	customer_id UUID REFERENCES customers(customer_id) NOT NULL,
	order_date TIMESTAMPTZ NOT NULL,
	total_price FLOAT NOT NULL,
	no_of_items INT NOT NULL
);

insert into
	customers (
		customer_id,
		customer_name,
		email,
		password,
		contact_no
	)
values
	(
		uuid_generate_v4(),
		'Tanya O''Lunney',
		'tolunney0@google.de',
		'sM5#d%b4u',
		'6793628255'
	);

insert into
	customers (
		customer_id,
		customer_name,
		email,
		password,
		contact_no
	)
values
	(
		uuid_generate_v4(),
		'Corbet Bestwick',
		'cbestwick1@hao123.com',
		'fG3}@\0Km6z',
		'2287456605'
	);

insert into
	customers (
		customer_id,
		customer_name,
		email,
		password,
		contact_no
	)
values
	(
		uuid_generate_v4(),
		'Tamarra Alldread',
		'talldread2@ycombinator.com',
		'nO3`!c&=4i"%',
		'2754948589'
	);

insert into
	customers (
		customer_id,
		customer_name,
		email,
		password,
		contact_no
	)
values
	(
		uuid_generate_v4(),
		'Jolynn Gething',
		'jgething3@sogou.com',
		'aN8%}f3T#WY8m9',
		'5653733628'
	);

insert into
	customers (
		customer_id,
		customer_name,
		email,
		password,
		contact_no
	)
values
	(
		uuid_generate_v4(),
		'Hanna Vinas',
		'hvinas4@pbs.org',
		'qI7}5,bIpGr{a8',
		'2104591366'
	);

--insert into
--	orders (order_id, order_date, total_price, no_of_items)
--values
--	(uuid_generate_v4(), '2023-05-25', 2.31, 1);
--
--insert into
--	orders (order_id, order_date, total_price, no_of_items)
--values
--	(uuid_generate_v4(), '2023-01-29', 0.40, 3);
--
--insert into
--	orders (order_id, order_date, total_price, no_of_items)
--values
--	(uuid_generate_v4(), '2023-04-22', 1.93, 4);
--
--insert into
--	orders (order_id, order_date, total_price, no_of_items)
--values
--	(uuid_generate_v4(), '2022-10-05', 1.30, 5);
--
--insert into
--	orders (order_id, order_date, total_price, no_of_items)
--values
--	(uuid_generate_v4(), '2023-05-11', 9.46, 5);
--
--UPDATE
--	orders
--SET
--	customer_id = '568826b6-7a72-498c-a3d0-3daeb5143af3'
--WHERE
--	order_date > '2020-01-01';