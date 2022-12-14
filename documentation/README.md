# Aplikacija za ucenje brzog kucanja

Projekat za predmet Praktikum - Internet i web tehnologije <br/>

Broj Indeksa: 2021202576 <br/> 
Ime i prezime: Ilija Bjelic <br/>
Skolska Godina: 2021/2022 <br/>


## Projektni zahtev

Aplikacija treba da omogući korisnicu da se registruje, potom da se prijavi na aplikaciju sa svojim pristupnim parametrima. Prijavljeni korisnik može da pokrene vežbanje kucanja. Aplikacija korisniku prikazuje kategorije tekstova. U svakoj kategoriji postoje tekstovi koje korisnik može da vežba da kuca. Aplikacija treba da podržava pet ciljanih brzina kucanja: veoma sporo, sporo, srednje, brzo i veoma brzo kucanje, koje su određene otkucanim brojem karaktera za jedan minut. Samostalno odrediti koji su pragovi. Aplikacija treba da pamti prosečno vreme brzine kucanja najviše 10 poslednjih vežbanja i da na osnovu toga odredi kojoj grupi prema brzini postignutog kucanja pripada korisnik. Novi korisnici imaju na početku dodeljenu veoma sporu brzinu kucanja. Kada pokrenu vežbanje, aplikacija prikazuje tekst korisniku na ekranu, tako što se pojavljuje red po red teksta, brzinom koja je za prvu narednu brzinu veća, a ako korisnik već kuca veoma brzo, to je brzina kojom se tekst pojavljuje. Korisnik kuca tekst koji vidi i aplikacija obeležava crvenim svako slovo u tekstu koje pogrešno otkucano u odnosu na gore prikazani tekst. Dokle god postoji barem jedno obeleženo crveno slovo u kucanom tekstu, ne pojavljuje se novi red teksta za kucanje, a vreme nastavlja da teče i na osnovu vremena se računa prosečno vreme kucanja slova. Kada korisnik do kraja otkuca tekst, prikazuje mu se postignuti rezultat, sa prikazom statistike i najčešće pogrešno otkucanih slova, cifara, simbola itd. Korisnik ima uvid u istoriju svojih vežbanja i pregled koliko procenata svake kategorije tekstova je vežbao i koju je brzinu kucanja postigao. 

## Tehnicka ogranicenja

- Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u jednom Git spremištu u okviru korisničkog naloga za ovaj projekat, sa podelom kao u primeru zadatka sa vežbi.
- Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
- Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
- Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).
- Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
- Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
- Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).


## Baza podataka
![image](https://user-images.githubusercontent.com/112157001/190861832-05fc514b-04d5-41fc-9a4f-ca60a6300101.png)

## Use-Case dijagrami

![image](https://user-images.githubusercontent.com/112157001/190865566-bb8e30d1-5118-44c7-a66d-c3a0275ec683.png)


## 
