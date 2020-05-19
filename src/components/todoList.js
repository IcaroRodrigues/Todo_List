import React, { Component } from 'react';

import './todoList.css';

export default class TodoList extends Component {

    constructor(props) {

        super(props);

        this.state = {

            newItem: '',
            newCheckedItem: '',
            list: JSON.parse(localStorage.getItem('todo_list')) || [],
            checkedList: JSON.parse(localStorage.getItem('completed_todos')) || [],
        };
    }

    updateInput(key, value) {

        // ATUALIZA ESTADO DO REACT

        this.setState({
            [key]: value
        });
    }

    addItem(newValue) {

        if (newValue === '') {

            return;
        }

        // CRIANDO UM ITEM COM UM ID UNICO

        const newItem = {

            id: 1 + Math.random(),
            value: newValue
        };

        // COPIA DA LISTA ATUAL DE ITENS

        const list = [...this.state.list]

        // ADICIONA UM NOVO ITEM NA LISTA

        list.push(newItem);

        // ATUALIZA O ESTADO COM UMA NOVA LISTA E RESETA O INPUT DE NOVO ITEM


        this.setState({
            list,
            newItem: '',
        });

        this.saveStorage();
    }

    addCheckItem(newValue, id) {

        const newCheckedItem = {
            id: 1 + Math.random(),
            value: newValue
        };

        const checkedList = [...this.state.checkedList]
        const list = [...this.state.list]

        checkedList.push(newCheckedItem)


        const updateList = list.filter(item => item.id !== id);

        this.setState({
            checkedList,
            newCheckedItem: '',
            list: updateList,
        });

        this.saveStorage();

    }

    deleteItem(id) {

        // COPIA A LISTA ATUAL DE ITENS

        const list = [...this.state.list]
        const checkedList = [...this.state.checkedList]

        // FILTRAR E TIRAR O ITEM QUE DESEJA SER REMOVIDO

        const updateList = list.filter(item => item.id !== id);
        const updateCheckedList = checkedList.filter(item => item.id !== id);

        this.setState({
            list: updateList,
            checkedList: updateCheckedList
        });

        this.saveStorage();

    }

    saveStorage() {
        localStorage.setItem('todo_list', JSON.stringify(this.state.list));
        localStorage.setItem('completed_todos', JSON.stringify(this.state.checkedList));
    }

    render() {

        return (
            <>
                <header >

                    <div>
                        <h1>To-do List</h1>

                        <input
                            type="text"
                            placeholder="Coloque sua tarefa aqui..."
                            value={this.state.newItem}
                            onChange={e => this.updateInput("newItem", e.target.value)}
                        />

                        <button onClick={() => this.addItem(this.state.newItem)}>
                            Adicionar
                        </button>
                    </div>

                </header >

                <main>

                    <div>
                        <h1>Tarefas </h1>

                        <ul>
                            {this.state.list.map(tarefa =>

                                <div className="list">
                                    <li key={tarefa.id}>
                                        <div>{tarefa.value}</div>
                                    </li>

                                    < button onClick={() => this.addCheckItem(tarefa.value, tarefa.id)}>✔</button>

                                    < button onClick={() => this.deleteItem(tarefa.id)}>X</button>
                                </div>
                            )}
                        </ul>

                    </div>

                    <div>

                        <h1 className="checked">Tarefas Concluidas</h1>

                        <ul>

                            {this.state.checkedList.map(concluida =>

                                <div className="newList">
                                    <li key={concluida.id}>
                                        <div>{concluida.value}</div>
                                    </li>

                                    < button onClick={() => this.deleteItem(concluida.id)}>X</button>

                                </div>
                            )}

                        </ul>

                    </div>

                </main>
            </>
        );
    }
}
