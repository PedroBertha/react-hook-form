import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import './index.css'

interface TodoItem {
    texto: string
    concluido: boolean
}

interface FormValues {
    nome: string
    email: string
    idade: number
    sexo: string
    todos?: TodoItem[]
}

export default function UserTodo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<FormValues | null>(null)
    const [todos, setTodos] = useState<TodoItem[]>([])

    useEffect(() => {
        const data = localStorage.getItem('submissoes')
        if (data) {
            const users: FormValues[] = JSON.parse(data)
            const found = users[Number(id)]
            if (found) {
                setUser(found)
                setTodos(found.todos || [])
            }
        }
    }, [id])

    useEffect(() => {
        if (user) {
            const data = localStorage.getItem('submissoes')
            if (data) {
                const users: FormValues[] = JSON.parse(data)
                users[Number(id)] = { ...user, todos }
                localStorage.setItem('submissoes', JSON.stringify(users))
            }
        }
    }, [todos])

    if (!user) return <div>Usuário não encontrado</div>

    return (
        <div>
            <button onClick={() => navigate("/")}>Voltar</button>
            <h2>ToDo List DE {user.nome}</h2>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    const input = (e.currentTarget.elements.namedItem('todo') as HTMLInputElement)
                    if (input.value.trim()) {
                        setTodos([...todos, { texto: input.value, concluido: false }])
                        input.value = ''
                    }
                }}
            >
                <input name="todo" placeholder="Nova Tarefa"/>
            </form>
            <ul>
                {todos.map((todo, idx) => {
                    const checkboxId = `todo-checkbox-${idx}`;
                    return (
                        <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <input
                                id={checkboxId}
                                type="checkbox"
                                checked={todo.concluido}
                                onChange={() => {
                                    setTodos(todos.map((t, i) =>
                                        i === idx ? { ...t, concluido: !t.concluido } : t
                                    ))
                                }}
                            />
                            <label htmlFor={checkboxId} className="btn">{todo.texto}</label>
                            <button style={{}} onClick={() => setTodos(todos.filter((_, i) => i !== idx ))}>
                                Remover
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
