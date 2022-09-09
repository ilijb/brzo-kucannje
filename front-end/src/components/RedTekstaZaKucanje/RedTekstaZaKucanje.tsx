import {useState, useEffect} from 'react';

type Props = {
    redZaPrikaz: string,
    aktivniKaratkerIndex: number
    unosKorisnika: string,
    brojSekundiRefresh: number,
    vremeIsteklo:() => void
}

export default function RedTekstaZaKucanje(props: Props) {

    const [timeLeft, setTimeLeft] = useState(props.brojSekundiRefresh);
  
    useEffect(() => {
      if (!timeLeft) 
        return;
  
      const intervalId = setInterval(() => {
        if (timeLeft - 1 === 0) {
            props.vremeIsteklo();
        }
          setTimeLeft(timeLeft - 1);
      }, 1000);
  
      return () => {
        clearInterval(intervalId)
      };
    }, [timeLeft]);

    return (
        <div className="w-75 border border-dark p-3 m-auto display-4 text-start" style={{borderWidth: "2px", borderStyle: "solid", background: "#6495ED"}}>
            {props.redZaPrikaz.split("").map((character, index) => {
                return (
                    <span className={index <= props.aktivniKaratkerIndex && props.redZaPrikaz[index] !== props.unosKorisnika[index]? 'text-danger': ''} key={index}>{character}</span>
                )
            })}
        </div>
    )
}