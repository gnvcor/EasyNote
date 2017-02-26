import React, { Component } from 'react';
import './index.css';

class ListNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            data: JSON.parse(localStorage.getItem('notes')) || []
        };

        window.addEventListener('keyup', this.renderList.bind(this));

        window.addEventListener('click', this.renderList.bind(this));

        window.addEventListener('storage', this.renderList.bind(this));
    }

    componentDidMount() {
        this.renderList();
    }

    renderList() {
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

    editNotes(oldTitle, oldDescription, event) {
        let array = this.state.data;

        array.map((notes, key) => {
            notes.edit = false;

            if (notes.id === event.target.value) {
                notes.edit = true;
            }
        });

        this.setState({
            title: oldTitle,
            description: oldDescription
        });

        localStorage.setItem('notes', JSON.stringify(array));
    }

    removeNotes(event) {
        let array = this.state.data;

        array.map((notes, key) => {
            if (notes.id === event.target.value) {
                array.splice(key, 1);
            }
        });

        localStorage.setItem('notes', JSON.stringify(array));

        this.renderList();
    }

    saveNotes(event) {
        let array = this.state.data;

        array.map((notes, key) => {
            if (notes.id === event.target.value) {
                if(this.state.title && this.state.description) {
                    notes.edit = false;
                    notes.title = this.state.title;
                    notes.description = this.state.description;
                } else {
                    alert('Введите все значения!');
                }
            }
        });

        localStorage.setItem('notes', JSON.stringify(array));

        this.renderList();
    }

    render() {
        return(
            <div className="list">
                {this.state.data.length > 0 ?
                    this.state.data.map((notes, key) => {
                        return(
                            <div key={key} className={notes.filter ? 'list__item hidden' : 'list__item'}>
                                <div className="list__itemTitle">
                                    {!notes.edit ?
                                        <div className="list__title">{notes.title}</div> :
                                        <div>
                                            <input
                                                placeholder="Введите название заметки"
                                                className="inputStyle"
                                                type="text"
                                                value={this.state.title}
                                                onChange={this.handleTitle.bind(this)}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="list__itemDescription">
                                    {!notes.edit ?
                                        <div className="list__description">{notes.description}</div> :
                                        <div>
                                            <textarea
                                                placeholder="Введите текст заметки"
                                                className="textareaStyle"
                                                value={this.state.description}
                                                onChange={this.handleDescription.bind(this)}>

                                            </textarea>
                                        </div>
                                    }
                                </div>
                                <div className="list__itemButtons">
                                    {!notes.edit ?
                                        <div className="list__buttons">
                                            <button
                                                value={notes.id}
                                                className="list__button list__button--edit"
                                                onClick={this.editNotes.bind(this, notes.title, notes.description)}>
                                                Изменить
                                            </button>
                                            <button
                                                value={notes.id}
                                                className="list__button list__button--delete"
                                                onClick={this.removeNotes.bind(this)}>
                                                Удалить
                                            </button>
                                        </div> :
                                        <div>
                                            <button
                                            value={notes.id}
                                            className="list__button list__button--save"
                                            onClick={this.saveNotes.bind(this)}>
                                                Сохранить
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        );
                    }) :
                    <div className="list__empty">Заметок пока нет</div>
                }
            </div>
        )
    }
}

export default ListNote;