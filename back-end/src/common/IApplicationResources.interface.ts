import * as mysql2 from "mysql2/promise";
import korisnikService from "../components/korisnik/korisniKService.service";
import kategorijaService from "../components/kategorija/kategorijaService.service";
import rankService from "../components/rank/rankService.service";
import greskaService from "../components/greska/greskaService.service";
import sesijaService from "../components/sesija/sesijaService.service";

export interface IServices {
    kategorija: kategorijaService
    sesija: sesijaService
    greska: greskaService
    rank: rankService
    korisnik: korisnikService
    db: mysql2.Connection;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
}

