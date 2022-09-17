# brzo-kucannje


Uputstvo:


git clone https://github.com/ilijb/brzo-kucannje.git

cd brzo-kucanje

- Baza
  mysql -u user -p <br/>
  (Unutar mysql konzole) <br/>
  create database brzo_kucanje; <br/>
  grant all on brzo_kucanje.* to 'user'@'localhost'; <br/>
  exit; <br/>
  (Import) <br/>
  mysql -u user -p brzo_kucanje < baza_dump.sql <br/>


cd back-end 
(back-end\src\config.ts editovati database deo za informacije o bazi)
npm install
npm start
cd ..

cd front-end
npm install
npm start




