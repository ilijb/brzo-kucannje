import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import AppStore from '../../stores/AppStore';
import { Timer } from '../CountDown/CountDown';
import RedTekstaZaKucanje from '../RedTekstaZaKucanje/RedTekstaZaKucanje';

interface IGreska {
    [key: string]: number
}

export default function KucanjeApp() {

    const [ucitaniRedovi, setUcitaniRedovi] = useState<string[]>([]);
    const [aktivniRedIndex, setAktivniRedIndex] = useState(0);
    const [aktivniKarakterIndex, setAktivniKarakterIndex] = useState(0);
    const [vremeRedIndex, setVremeRedIndex] = useState(0);

    const [brojUspesnihKaraktera, setBrojUspesnihKaraktera] = useState(0);
    const [brojNeuspesnihKaraktera, setBrojNeuspesnihKaraktera] = useState(0);

    const [userInput, setUserInput] = useState("");
    const [pocetakOdobren, setPocetakOdobren] = useState(false);
    const [greske, setGreske] = useState<IGreska>({});
    const [nivo, setNivo] = useState("");
    const [brojSekundiRefresh, setBrojSekundiRefresh] = useState(0);

    const {id} = useParams();

    useEffect(() => {
        api("get", "api/tekst/" + id + "?userId=" + AppStore.getState().auth.id, "user")
        .then(res => {
            setUcitaniRedovi(res.data.rows);
            setBrojSekundiRefresh(res.data.broj_sekundi);
            setNivo(res.data.rank);
        })
    }, []);

    useEffect(() => {
        if (ucitaniRedovi.length > 0 && userInput.length > ucitaniRedovi[aktivniRedIndex].length) {
            return;
        }

        if (userInput === ucitaniRedovi[aktivniRedIndex]) {
            setBrojUspesnihKaraktera(prev => prev + ucitaniRedovi[aktivniRedIndex].length);
            setAktivniKarakterIndex(0);
            setAktivniRedIndex(prev => prev + 1);
            setUserInput("");

            if (aktivniRedIndex === ucitaniRedovi.length - 1) {
                zavrsiSesiju();
            }
        }

        if (pocetakOdobren && userInput[aktivniKarakterIndex] !== ucitaniRedovi[aktivniRedIndex][aktivniKarakterIndex]) {
            setGreske(prev => {
                if (prev[ucitaniRedovi[aktivniRedIndex][aktivniKarakterIndex]]) {
                    prev[ucitaniRedovi[aktivniRedIndex][aktivniKarakterIndex]]++;
                } else {
                    prev[ucitaniRedovi[aktivniRedIndex][aktivniKarakterIndex]] = 1;
                }
                return prev;
            })
        }

        setAktivniKarakterIndex(userInput.length - 1);
    }, [userInput])

    const zavrsiSesiju = () => {
        console.log(brojNeuspesnihKaraktera);
        console.log(brojUspesnihKaraktera);
        setPocetakOdobren(false);
        setAktivniKarakterIndex(0);
        setAktivniRedIndex(0);
        setUserInput("");
        api("post", "api/sesija/", "user",
            {
                brzina: brojUspesnihKaraktera / brojNeuspesnihKaraktera,
                korisnik_id: AppStore.getState().auth.id,
                tekst_id: id
            })
        .then(res => {
            console.log(res);
        });

        setBrojNeuspesnihKaraktera(0);
        setBrojUspesnihKaraktera(0);
        setVremeRedIndex(0);
    }

    const zapocni = () => {
        setPocetakOdobren(true);
        setGreske({});
    }

    const ucitajSledeciRed = () => {
        if (vremeRedIndex === aktivniRedIndex) {
            let brojUsp = 0;
            let brojNeusp = 0;
            
            let tempUserString = userInput.substring(0, ucitaniRedovi[aktivniRedIndex].length);
            tempUserString.split("").forEach((karakter, index) => {
                if (ucitaniRedovi[aktivniRedIndex][index] === karakter) {
                    brojUsp++;
                } else {
                    brojNeusp++;
                }
            })

            const razlikaUDuzini = ucitaniRedovi[aktivniRedIndex].length - tempUserString.length;
            for (let i = 0; i < razlikaUDuzini; i++) {
                brojNeusp++;
            }

            setBrojUspesnihKaraktera(prev => prev + brojUsp);
            setBrojNeuspesnihKaraktera(prev => prev + brojNeusp);
            setAktivniRedIndex(prev => prev + 1);
        }

        setUserInput("");
        setVremeRedIndex(prev => prev + 1);
        
        if (aktivniRedIndex === ucitaniRedovi.length - 1) {
            zavrsiSesiju();
        }
    };

    const vremeZaKucanjeIsteklo = () => {
        if (aktivniRedIndex < ucitaniRedovi.length) {
            zavrsiSesiju();
        }
    }
    
    return (
        <>

        <div className="m-5"></div>

        {aktivniRedIndex === ucitaniRedovi.length && <h1>Sesija je zavrsena</h1>}

        <div>
            {pocetakOdobren && <Timer vremeIsteklo={vremeZaKucanjeIsteklo} />}
        </div>

        <div className="text-end display-6 mx-3">
            Trenutni nivo - <b>{nivo}</b>
        </div>

        <div className="m-5"></div>

        {pocetakOdobren && ucitaniRedovi.length > 0 && aktivniRedIndex < ucitaniRedovi.length && 
            ucitaniRedovi.map((ucitaniRed, index) => {
                if (aktivniRedIndex === index) {
                    return <RedTekstaZaKucanje key={index} redZaPrikaz={ucitaniRed} aktivniKaratkerIndex={aktivniKarakterIndex} unosKorisnika={userInput} vremeIsteklo={ucitajSledeciRed} brojSekundiRefresh={brojSekundiRefresh} />
                } else {
                    return null;
                }
            })
        }

        <div className="m-5"></div>
        <div className="w-75 m-auto">

          <input type="text" id="userInput" name="userInput" className="form-control" style={{fontSize: 25}} value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} disabled={!pocetakOdobren || ucitaniRedovi.length === 0 || aktivniRedIndex === ucitaniRedovi.length}
                    // onPaste={(e) =>{ e.preventDefault()}} 
                    />
        
        </div>

        <div className="m-5"></div>

        <div className="w-50 m-auto">
            <button id="zapocni" className="btn btn-success w-100 p-4" style={{fontSize: 25}} onClick={zapocni}>Zapocni</button>
        </div>

        <div className="m-5"></div>

        <div className="container">
            <h1>Statistika</h1>

            <h3 className="my-4">Najcesce greske</h3>
            <div className="row">
            {Object.keys(greske).sort((a:string, b:string):number => {
                return greske[b] - greske[a];
            }).slice(0, 3).map(slovo => {
                return (
                    <div className="col-4" key={slovo}>{slovo === " " ? "space": slovo}: {greske[slovo] / 2}</div>
                )
            })}
            </div>
        </div>

        </>
    );
}