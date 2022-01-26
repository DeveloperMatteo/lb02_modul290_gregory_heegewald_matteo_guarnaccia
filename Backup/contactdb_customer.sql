create table customer
(
    id         int auto_increment
        primary key,
    firstName  varchar(30) not null,
    lastName   varchar(30) not null,
    email      varchar(30) not null,
    geburtstag varchar(30) not null,
    adress     varchar(30) not null,
    zipcode    varchar(4)  not null,
    city       varchar(30) not null,
    phone      varchar(30) not null,
    registered datetime    not null
)
    charset = utf8;

INSERT INTO contactdb.customer (id, firstName, lastName, email, geburtstag, adress, zipcode, city, phone, registered) VALUES (3, 'Matteo', 'Guarnaccia', 'matteo@guarnaccia.ch', '11.09.2003', 'Luchsweg 22', '8135', 'Langnau am Albis', '+41784059889', '2022-01-26 01:22:57');
INSERT INTO contactdb.customer (id, firstName, lastName, email, geburtstag, adress, zipcode, city, phone, registered) VALUES (4, 'Matteo', 'Guarnaccia', 'matteo@guarnaccia.ch', '11.09.2003', 'Luchsweg 22', '8135', 'Langnau am Albis', '+41784059889', '2022-01-26 01:25:40');
INSERT INTO contactdb.customer (id, firstName, lastName, email, geburtstag, adress, zipcode, city, phone, registered) VALUES (6, 'Gregory', 'Heegewald', 'gregory@heegewald.ch', '11.09.2003', 'Chüegass 4', '8193', 'Eglisau', '+41784059889', '2022-01-26 01:36:00');
INSERT INTO contactdb.customer (id, firstName, lastName, email, geburtstag, adress, zipcode, city, phone, registered) VALUES (7, 'Gregory', 'Heegewald', 'gregory@heegewald.ch', '2003-09-11', 'Chüegass 4', '8139', 'Eglisau', '+41784059889', '2022-01-26 01:38:55');