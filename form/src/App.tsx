import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState, useEffect } from 'react'
import './App.css'


interface FormValues {
  nome: string
  email: string
  idade: number
  sexo: string
}

export default function MeuFormulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>()

  // Carega o localStorage ao iniciar
  const [submissoes, setSubmissoes] = useState<FormValues[]>(() => {
    const data =localStorage.getItem('submissoes')
    return data ? JSON.parse(data) : [] 
  })

  useEffect(() => {
    localStorage.setItem('submissoes', JSON.stringify(submissoes))
  }, [submissoes])

  const [editIndex, setEditIndex] = useState<number | null>(null)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (editIndex !== null) {
      // Editando um item existente
      const novasSubmissoes = submissoes.map((item, idx) =>
        idx === editIndex ? data : item
      )
      setSubmissoes(novasSubmissoes)
      setEditIndex(null)
    } else {
      // Adicionando novo item
      setSubmissoes([...submissoes, data])
    }
    reset()
  }

  const removerItem = (indice: number) => {
    setSubmissoes(submissoes.filter((_, idx) => idx !== indice))
    if (editIndex === indice) setEditIndex(null)
  }

  const editarItem = (indice: number) => {
    const item = submissoes[indice]
    setValue('nome', item.nome)
    setValue('email', item.email)
    setValue('idade', item.idade)
    setValue('sexo', item.sexo)
    setEditIndex(indice)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input
            {...register("nome", {
              required: "O nome é obrigátorio",
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
            })}
          />
          <br />
          {errors.nome && <span style={{ color: "#646cff" }}>{errors.nome.message}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "O email é obrigátorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de email Inválido",
              },
            })}
          />
          <br />
          {errors.email && <span style={{ color: "#646cff" }}>{errors.email.message}</span>}
        </div>

        <div>
          <label>Idade:</label>
          <input
            type="number"
            min={0}
            {...register("idade", {
              required: "Informe a idade",
              min: { value: 10, message: "você precisa ter pelo menos 10 anos" },
              max: { value: 100, message: "Muito velho" },
            })}
          />
          <br />
          {errors.idade && <span style={{ color: "#646cff" }}>{errors.idade.message}</span>}
        </div>
        
        <div>
          <label>Sexo:</label>
          <select
            {...register("sexo", { required: "Selecione o sexo" })}
            defaultValue=""     
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          <br />
          {errors.sexo && <span style={{ color: "#646cff" }}>{errors.sexo.message}</span>}
        </div>

        <button type="submit">{editIndex !== null ? "Salvar" : "Enviar"}</button>
        {editIndex !== null && (
          <button type="button" onClick={() => { reset(); setEditIndex(null); }}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de Envios</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {submissoes.map((item, idx) => (
            <tr key={idx}>
              <td>{item.nome}</td>
              <td>{item.email}</td>
              <td>{item.idade}</td>
              <td>{item.sexo}</td>
              <td>
                <button onClick={() => editarItem(idx)}>Editar</button>
                <button onClick={() => removerItem(idx)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

