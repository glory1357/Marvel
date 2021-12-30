import { useParams } from "react-router";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarverService";
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

const SinglePage = ({Componet, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'))
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Componet, data)}
        </>
    )
}

export default SinglePage;
