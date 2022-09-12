import {useEffect, useState} from  'react';
import { api } from '../../api/api';
import AppStore from '../../stores/AppStore';

export default function StatistikapoKategoriji() {

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        api("get", "api/sesija/statistika/" + AppStore.getState().auth.id, "user")
        .then(res => {
           setCategories(res.data); 
        });
    }, []);

    return (
        <>
          <div className="container">
            <h1>Statistika</h1>

            <div className="m-5"></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Kategorija</th>
                            <th>Broj sesija</th>
                            <th>Prosecna brzina</th>
                            <th>Kategorija kojoj pripada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{category.kategorija_naziv}</td>
                                    <td>{category.broj_sesija}</td>
                                    <td>{category.prosek}</td>
                                    <td>{category.rank_ime}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}