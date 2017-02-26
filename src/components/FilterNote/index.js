import React, { Component } from 'react';
import './index.css';

class FilterNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterValue: '',
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


    handleFilter(event) {
        this.setState({
            filterValue: event.target.value
        });

        this.searchValue(event.target.value);
    }

    searchValue(value) {
        let array = this.state.data;

        array.map((notes, key) => {
            let notesTitleValue = notes.title.toLowerCase();
            let filterValue = value.toLowerCase();

            if (filterValue.length >= 1) {
                if (~notesTitleValue.indexOf(filterValue)) {
                    notes.filter = false;
                } else {
                    notes.filter = true;
                }
            } else {
                notes.filter = false;
            }
        });

        localStorage.setItem('notes', JSON.stringify(array));

        this.renderData();
    }

    render() {
        return(
            <div className="filter">
                <div className="app__subTitle">
                    Поиск заметок
                </div>
                <div className="filter__components">
                    <input
                        type="text"
                        className="inputStyle"
                        placeholder="Для поиска введите название заметки"
                        value={this.state.filterValue}
                        onChange={this.handleFilter.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default FilterNote;