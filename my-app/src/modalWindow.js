import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import { useEffect, useState } from 'react';

function ModalWindow(props) {
    const {
        onClose,
        onSubmit,
        data,
        onModify
    } = props;

    const [form, setForm] = useState({ from: '', description: '', to: '' });

    useEffect(() => {
        if (!data) {
            return
        }

        const { index, ...form } = data;

        setForm(form);
    }, [])

    function onChange(value, name) {
        setForm({ ...form, [name]: value });
    }

    return (
        <div className='modalback' id="modalback">
            <div className="modalfront">
                <div className="header">
                    <h1>Карточка</h1>
                    <button id="exit" onClick={onClose}>&times;</button>
                </div>
                <div>
                    <div className="mainplace">
                        <p>Полезная информация о маршруте</p>
                        <textarea
                            required
                            name=""
                            cols="60"
                            rows="12"
                            id="description"
                            value = {form.description}
                            onChange={(event) => { onChange(event.target.value, 'description'); }}
                        />
                    </div>
                    <div className="way">
                        <p>Населенные пункты</p><br></br>
                        <input
                            required
                            type="text"
                            id="from"
                            placeholder="От"
                            value = {form.from}
                            onChange={(event) => { onChange(event.target.value, 'from'); }}
                        />
                        <input
                            required
                            type="text"
                            id="before"
                            placeholder="До"
                            value = {form.to}
                            onChange={(event) => { onChange(event.target.value, 'to'); }}
                        />
                    </div>
                </div>
                <div id="buttons" className="buttons">
                    <button id="cancel" onClick={onClose}>Отменить</button>
                    {
                        !data
                        ? <button onClick={() => { onSubmit(form) }}>Добавить</button>
                        : <button onClick={() => { onModify(form, data.index) }}>Изменить</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;