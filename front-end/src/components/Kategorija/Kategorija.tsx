import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import IKategorijaModel from './KategorijaModel';

export default function Kategorija() {

    const [categories, setCategories] = useState<IKategorijaModel[]>([]);
    const navigate = useNavigate();

    const redirectToTexts = (categoryId: number) => {
        navigate("/category/" + categoryId);
    }

    useEffect(() => {
        api("get", "api/kategorija", "user")
        .then(res => {
            setCategories(res.data);
        })
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                {categories.map(category => {
                    return (
                    <div key={category.kategorija_id} className="col-md-5 btn-primary text-center display-3 p-3 text-white mb-2 mx-2" onClick={() => redirectToTexts(category.kategorija_id)}>
                        {category.kategorija}
                    </div>
                    )
                })}
                </div>
            </div>
        </>
    )
}