import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';

export default function KucanjeApp() {

    const [ucitaniRedovi, setUcitaniRedovi] = useState<string[]>([]);
    const [aktivniRedIndex, setAktivniRedIndex] = useState(0);
    const [aktivniKarakterIndex, setAktivniKarakterIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [pocetakOdobren, setPocetakOdobren] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        api("get", "api/tekst/" + id, "user")
        .then(res => {
            setUcitaniRedovi(res.data);
        })
    }, []);

    useEffect(() => {
        if (userInput === ucitaniRedovi[aktivniRedIndex]) {
            setAktivniKarakterIndex(0);
            setAktivniRedIndex(prev => prev + 1);
            setUserInput("")
        }

        setAktivniKarakterIndex(userInput.length - 1);
    }, [userInput])

    const zapocni = () => {
        setPocetakOdobren(true);
    }
    
    return (
        <>

        <div className="m-5"></div>

        {aktivniRedIndex === ucitaniRedovi.length && <h1>Cestitamo, pobedili ste!</h1>}

        <div className="w-75 border border-dark p-3 m-auto display-4 text-start" style={{borderWidth: "2px", borderStyle: "solid", background: "#6495ED"}}>
            {pocetakOdobren && ucitaniRedovi.length > 0 && aktivniRedIndex < ucitaniRedovi.length && ucitaniRedovi[aktivniRedIndex].split("").map((character, index) => {
                return (
                    <span className={index <= aktivniKarakterIndex && ucitaniRedovi[aktivniRedIndex][index] !== userInput[index]? 'text-danger': ''} key={index}>{character}</span>
                )
            })}
        </div>

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