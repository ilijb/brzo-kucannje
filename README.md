# brzo-kucannje


Uputstvo:


git clone https://github.com/ilijb/brzo-kucannje.git

cd brzo-kucanje

- Baza
  mysql -u user -p 
  (Unutar mysql konzole)
  create database brzo_kucanje;
  grant all on brzo_kucanje.* to 'user'@'localhost';
  exit;
  (Import)
  mysql -u user -p brzo_kucanje < baza_dump.sql


cd back-end 
(back-end\src\config.ts editovati database deo za informacije o bazi)
npm install
npm start
cd ..

cd front-end
npm install
npm start




