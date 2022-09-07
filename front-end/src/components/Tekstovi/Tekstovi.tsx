import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { api } from "../../api/api";
import ITekstModel from "./ITekstModel";

export default function Tekstovi() {
    const [texts, setTexts] = useState<ITekstModel[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();

    const redirectToText = (textId: number) => {
        navigate("/tekst/" + textId);
    }

    useEffect(() => {
        api("get", "api/tekst/kategorija/" + id, "user")
        .then(res => {
            console.log(res)
            setTexts(res.data);
        })
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                {texts.map(text => {
                    return (
                    <button key={text.tekst_id} className="col-md-5 btn-primary text-center display-3 p-3 text-white mb-2 mx-2" onClick={() => redirectToText(text.tekst_id)}>
                        {text.naslov}
                    </button>
                    )
                })}
                </div>
            </div>
        </>
    )
}