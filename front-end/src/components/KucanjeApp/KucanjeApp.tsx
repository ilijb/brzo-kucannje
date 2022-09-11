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
    const [vremeRedIndex, setVremeRedIndex] = useState(0);

    const [brojUspesnihKaraktera, setBrojUspesnihKaraktera] = useState(0);

    const [userInput, setUserInput] = useState("");
    const [greske, setGreske] = useState<IGreska>({});
    const [nivo, setNivo] = useState("");
    const [brojSekundiRefresh, setBrojSekundiRefresh] = useState(0);

    const [prethodneSesije, setPrethodneSesije] = useState<any[]>([]);

    const [pocetakOdobren, setPocetakOdobren] = useState(false);
    const [sesijaZavrsena, setSesijaZavrsena] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        api("get", "api/tekst/" + id + "?userId=" + AppStore.getState().auth.id, "user")
        .then(res => {
            setUcitaniRedovi(res.data.rows);
            setBrojSekundiRefresh(res.data.broj_sekundi);
            setNivo(res.data.rank);
        })

        api("get", "api/sesija?userId=" + AppStore.getState().auth.id, "user")
        .then(res => {
            setPrethodneSesije(res.data);
        })
    }, []);
    
    useEffect(() => {
        if (!pocetakOdobren || sesijaZavrsena) {
            return;
        }

        if (userInput.length > ucitaniRedovi[aktivniRedIndex].length) {
            return;
        }

        if (userInput === ucitaniRedovi[aktivniRedIndex]) {
            setBrojUspesnihKaraktera(prev => prev + userInput.length);

            setUserInput("");
            setAktivniRedIndex(prev => prev + 1);
            setUserInput("");

            if (aktivniRedIndex === ucitaniRedovi.length - 1) {
                setSesijaZavrsena(true);
            }
        }

        const indexTrenutnogKaraktera = userInput.length - 1;
        if (userInput[indexTrenutnogKaraktera] !== ucitaniRedovi[aktivniRedIndex][indexTrenutnogKaraktera]) {
            setGreske(prev => {
                return {
                    ...prev,
                    [ucitaniRedovi[aktivniRedIndex][indexTrenutnogKaraktera]]: (prev[ucitaniRedovi[aktivniRedIndex][indexTrenutnogKaraktera]] ? prev[ucitaniRedovi[aktivniRedIndex][indexTrenutnogKaraktera]] + 1: 1)                }
            });
        }

        setVremeRedIndex(aktivniRedIndex);
    }, [userInput])

    const zavrsiSesiju = () => {
        setPocetakOdobren(false);
        setAktivniRedIndex(0);
        setUserInput("");
        
        let ukupanBrojKaraktera = 0;
        for (let i = 0; i < aktivniRedIndex; i++) {
            ukupanBrojKaraktera += ucitaniRedovi[i].length;
        }

        api("post", "api/sesija/", "user",
            {
                brzina: +Math.round((brojUspesnihKaraktera / ukupanBrojKaraktera + Number.EPSILON) * 100) / 100,
                korisnik_id: AppStore.getState().auth.id,
                tekst_id: id
            })
        .then(res => {
            
        });

        setBrojUspesnihKaraktera(0);
        setVremeRedIndex(0);
    }

    const zapocni = () => {
        setPocetakOdobren(true);
        setGreske({});
        setSesijaZavrsena(false);
        setBrojUspesnihKaraktera(0);
    }

    const ucitajSledeciRed = () => {
        if (vremeRedIndex === aktivniRedIndex) {
            let brojUsp = 0;
            
            let tempUserString = userInput.substring(0, ucitaniRedovi[aktivniRedIndex].length);
            tempUserString.split("").forEach((karakter, index) => {
                if (ucitaniRedovi[aktivniRedIndex][index] === karakter) {
                    brojUsp++;
                }
            })

            setBrojUspesnihKaraktera(prev => prev + brojUsp);
            setAktivniRedIndex(prev => prev + 1);
        }

        setUserInput("");
        setVremeRedIndex(prev => prev + 1);
        
        if (aktivniRedIndex === ucitaniRedovi.length - 1) {
            setSesijaZavrsena(true);
        }
    };

    const vremeZaKucanjeIsteklo = () => {
        if (aktivniRedIndex < ucitaniRedovi.length) {
            zavrsiSesiju();
        }
    }

    useEffect(() => {
        if (sesijaZavrsena) {
            zavrsiSesiju();
        }

    }, [sesijaZavrsena])
    
    return (
        <>

        <div className="m-5"></div>

        {sesijaZavrsena && <h1>Sesija je zavrsena</h1>}

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
                    return <RedTekstaZaKucanje key={index} redZaPrikaz={ucitaniRed} unosKorisnika={userInput} vremeIsteklo={ucitajSledeciRed} brojSekundiRefresh={brojSekundiRefresh} />
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
            <h3 className="my-4">Najcesce greske</h3>
            <div className="row">
            {Object.keys(greske).sort((a:string, b:string):number => {
                return greske[b] - greske[a];
            }).slice(0, 3).map(slovo => {
                return (
                    <div className="col-4" key={slovo}>{slovo === " " ? "space": slovo}: {greske[slovo]}</div>
                )
            })}
            </div>
        </div>
        
        <div className="m-5"></div>
        
        <div className="container">
            <h1>Statistika</h1>

            <div className="row">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Naslov teksta</th>
                        <th>Brzina</th>
                    </tr>
                    </thead>
                    <tbody>
                    {prethodneSesije.map(sesija => {
                        return (
                            <tr key={sesija.sesija_id}>
                                <td>{sesija.tekst_naslov}</td>
                                <td>{sesija.brzina}</td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        </>
    );
}