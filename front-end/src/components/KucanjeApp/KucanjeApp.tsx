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

        if (userInput === ucitaniRedovi[aktivniRedIndex]) {
            setAktivniKarakterIndex(0);
            setAktivniRedIndex(prev => prev + 1);
            setUserInput("");
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

    const zapocni = () => {
        setPocetakOdobren(true);
        setTimeout(() => {
            if (aktivniRedIndex < ucitaniRedovi.length) {
                alert("Zavrseno");
                setPocetakOdobren(false);
                setAktivniKarakterIndex(0);
                setAktivniRedIndex(0);
                setUserInput("");
            }
        }, 60_000);
    }

    const ucitajSledeciRed = () => {
        if (vremeRedIndex === aktivniRedIndex) {
            setAktivniRedIndex(prev => prev + 1);
        }
        
        setVremeRedIndex(prev => prev + 1);

        if (aktivniRedIndex === ucitaniRedovi.length - 1) {
            setPocetakOdobren(false);
        }
    };
    
    return (
        <>

        <div className="m-5"></div>

        {aktivniRedIndex === ucitaniRedovi.length && <h1>Cestitamo, pobedili ste!</h1>}

        <div>
            {pocetakOdobren && <Timer />}
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
           onChange={(e) => setUserInput(e.target.value)} disabled={!pocetakOdobren || ucitaniRedovi.length === 0 || aktivniRedIndex === ucitaniRedovi.length} onPaste={(e) =>{ e.preventDefault()}} />
        
        </div>

        <div className="m-5"></div>

        <div className="w-50 m-auto">
            <button id="zapocni" className="btn btn-success w-100 p-4" style={{fontSize: 25}} onClick={zapocni}>Zapocni</button>
        </div>

        </>
    );
}