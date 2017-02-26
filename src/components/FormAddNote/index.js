import React, { Component } from 'react';
import './index.css';

class FormAddNote extends Component {
    constructor(props) {
        super(props);

        localStorage.getItem('key') || localStorage.setItem('key', 0);
        localStorage.getItem('notes') || localStorage.setItem('notes', JSON.stringify([]));

        this.state = {
            title: '',
            description: '',
            data: JSON.parse(localStorage.getItem('notes')) || []
        };

        window.addEventListener('click', this.renderData.bind(this));

        window.addEventListener('storage', this.renderData.bind(this));
    }

    renderData() {
        this.setState({
            data: JSON.parse(localStorage.getItem('notes'))
        });
    }

    handleTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    addNote() {
        if (this.state.title && this.state.description) {
            localStorage.setItem('key', +localStorage.getItem('key') + 1);

            this.state.data.push({
                id: localStorage.getItem('key'),
                edit: false,
                filter: false,
                title: this.state.title,
                description: this.state.description
            });

            localStorage.setItem('notes', JSON.stringify(this.state.data));

            this.setState({
                title: '',
                description: ''
            });
        } else {
            alert('Введите все значения!');
        }
    }

    render() {
        return(
            <div className="add">
                <div className="app__subTitle">
                    Добавление заметок
                </div>
                <div className="add__components">
                    <input
                        type="text"
                        className="inputStyle"
                        placeholder="Введите название заметки"
                        value={this.state.title}
                        onChange={this.handleTitle.bind(this)}
                    />

                    <textarea
                        className="textareaStyle"
                        placeholder="Введите текст заметки"
                        value={this.state.description}
                        onChange={this.handleDescription.bind(this)}>

                    </textarea>

                    <button
                        className="buttonAdd"
                        onClick={this.addNote.bind(this)}>
                        Добавить заметку
                    </button>
                </div>
            </div>
        )
    }
}

export default FormAddNote;