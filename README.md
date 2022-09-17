# brzo-kucannje


Uputstvo:


git clone https://github.com/ilijb/brzo-kucannje.git

cd brzo-kucanje<br/>
<br/>
- Baza <br/> 
  mysql -u user -p <br/>
  (Unutar mysql konzole) <br/>
  create database brzo_kucanje; <br/>
  grant all on brzo_kucanje.* to 'user'@'localhost'; <br/>
  exit; <br/>
  (Import) <br/>
  mysql -u user -p brzo_kucanje < baza_dump.sql <br/>
<br/>
<br/>
cd back-end  <br/>
(back-end\src\config.ts editovati database deo za informacije o bazi) <br/>
npm install <br/>
npm start <br/>
cd .. <br/>
<br/>
cd front-end <br/>
npm install  <br/>
npm start <br/>




