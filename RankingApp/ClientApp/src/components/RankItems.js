/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import ItemCollection from './ItemCollection.js';
import MovieImageArr from "./MovieImages.js";
import RankingGrid from "./RankingGrid";

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;


    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
        console.log("Allow Drop!");
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;

        console.log("targetElm.nodeName -" + targetElm.nodeName);

        if (targetElm.nodeName === "IMG") {
            return false;
        }

        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data))
                ? { ...item, ranking: parseInt(targetElm.id.substring(5)) }
                : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
    }

    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((results) => { return results.json(); })
            .then(data => {
                setItems(data);
            })
    }, [])

    return (
        <main>
            <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
            <ItemCollection items={items} drag={drag} imgArr={MovieImageArr} />
        </main>
    )
}

export default RankItems;