import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import ModalWindow from './modalWindow';
import { useState } from 'react';

function App() {
    const [list, setList] = useState([]);

    const [isOpen, setOpen] = useState(false);

    const [data, setData] = useState(null);

    const [isBuild, setBuild] = useState(false);

    const [sortList, setSortList] = useState([]);

    function onClick() {
        setOpen(!isOpen);
        setData(null);
        setBuild(false);
    }

    function onSubmit(form) {
        setOpen(!isOpen);
        setList([...list, form]);
    }

    const onDeleteCard = (index) => {
        const copyList = [...list];

        copyList.splice(index,1)
        setList(copyList);
        setBuild(false);
    }

    const onChangeCard = (item, index) => {
        setOpen(!isOpen);
        setData({...item, index});
        setBuild(false);
    }

    const onModifyCard = (form, index) => {
        const copyList = [...list];

        copyList[index] = form;
        setList(copyList);
        setOpen(!isOpen);
        setData(null);
    }

    const onBuild = () => {
        setBuild(true);

        const copyList = [...list];

        for (let i=0; i<copyList.length; i++){
            for(let j=0; j<copyList.length; j++){
                if(copyList[i].to === copyList[j].from){
                    if(i==copyList.length-1){
                        copyList.push(copyList[j]);
                        copyList.splice(j,1);
                        j-=1;
                    }
                    else{
                        let t=copyList[i+1];
                        copyList[i+1]=copyList[j];
                        copyList[j]=t;
                    }
                }
            }
        }

        setSortList(copyList);
    }

    
    const getCards = () => {
        return list.map((item, i) => {
            return(
                <div className = 'map' key = {i}>
                    <div>
                        От {item.from}. {item.description}. До {item.to}.
                    </div>
                    <div>
                        <button className='rem' onClick={() => {onDeleteCard(i)}}>Удалить</button>
                        <button className='rem' onClick = {() => {onChangeCard(item, i)}}>Изменить</button>
                    </div>
                </div>
            )
        })
    }

    const BuildRoute = () => {
        return sortList.map((item, i) => {
            return(
                <div className = 'map' key = {i}>
                    <div>
                        От {item.from}. {item.description}. До {item.to}.
                    </div>
                </div>
            );
        })
    }

    return (
        
        <div className="App">
            <div className='place'>
                <div id="begin">
                    <div className="topheading">
                        <p className="podpis">
                            Карточки
                        </p>
                        
                    </div>
                    <div id="listmap" className="listmap">
                    {getCards()}
                    </div>
                </div>

                <div id="end">
                    <p className="podpis">
                        Маршрут
                    </p>
                    <div id="route" className="route">
                        {
                            isBuild
                            ? <BuildRoute />
                            : <button onClick={onBuild}>Построить маршрут</button>
                        }
                    
                    </div>
                </div>
            </div>
            
            <button id="newmap" onClick={onClick} className='newMap'>Новая карточка</button>
            {
                isOpen &&
                <ModalWindow
                    onClose={onClick}
                    onSubmit={onSubmit}
                    data={data}
                    onModify={onModifyCard}
                />
            }
        </div>
    );
}

export default App;
