DROP TABLE users cascade;
DROP TABLE address;
drop table carts;
drop table listings cascade;
drop table transactions;

CREATE TABLE "users" (
  "userid" serial,
  "name" varchar not null,
  "email" varchar unique not null,
  "password" varchar not null,
  PRIMARY KEY ("userid")
);

CREATE TABLE "address" (
  "addressid" serial,
  "userid" int not null,
      FOREIGN KEY (userid) REFERENCES users(userid),
  "address" varchar not null,
  "city" varchar not null,
  "state" varchar(2) not null,
  "zip" integer not null,
  PRIMARY KEY ("addressid")
);

CREATE TABLE "carts" (
  "cartid" serial,
  "userid" int not null,
      FOREIGN KEY (userid) REFERENCES users(userid),
  "listingid" integer[],
  "numberOfItems" integer,
  PRIMARY KEY ("cartid")
);

CREATE TABLE "listings" (
  "listingid" serial,
  "userid" int not null,
      FOREIGN KEY (userid) REFERENCES users(userid),
  "product_title" varchar not null,
  "price" real not null,
  "description" text not null,
  "category" varchar not null,
  "img_url" varchar not null,
  PRIMARY KEY ("listingid")
);

CREATE TABLE "transactions" (
  "transactionid" serial,
  "listingid" int not null,
    FOREIGN KEY (listingid) REFERENCES listings(listingid),
  "userid" int,
      FOREIGN KEY (userid) REFERENCES users(userid),
  "date" timestamp,
  PRIMARY KEY ("transactionid")
);