import axios from 'axios';

const state = {
    //    Can be used to load without getting response from json place holder
    //    todos: [
    //        {
    //            id: 1,
    //            title: "Todo One"
    //        },
    //        {
    //            id: 2,
    //            title: "Todo Two"
    //        },
    //        {
    //            id: 3,
    //            title: "Todo Three"
    //        },
    //        {
    //            id: 4,
    //            title: "Todo Four"
    //        },
    //        {
    //            id: 5,
    //            title: "Todo Five"
    //        }
    //    ]

    todos: []
};

const getters = {
    allTodos: state => state.todos
};

const actions = {
    async fetchTodos({
        commit
    }) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        commit('setTodos', response.data);
    },
    async addTodo({
        commit
    }, title) {
        const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
            title,
            completed: false
        });
        commit('newTodo', response.data);
    },
    async delteTodo({
        commit
    }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({
        commit
    }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', response.data);
    },
    async updateTodo({
        commit
    }, updatedTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
        commit('updateTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id == updatedTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
