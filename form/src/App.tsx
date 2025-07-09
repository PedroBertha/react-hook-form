import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import './App.css'


interface FormValues {
  nome: string
  email: string
  idade: number
}

export default function MeuFormulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const [submissoes, setSubmissoes] = useState<FormValues[]>([])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmissoes((submissoes) => [...submissoes, data])
    reset()
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
            {...register("idade", {
              required: "Informe a idade",
              min: { value: 10, message: "você precisa ter pelo menos 10 anos" },
              max: { value: 100, message: "Muito velho" },
            })}
          />
          <br />
          {errors.idade && <span style={{ color: "#646cff" }}>{errors.idade.message}</span>}
        </div>

        <button type="submit">Enviar</button>
      </form>

      <h2>Lista de Envios</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
          </tr>
        </thead>
        <tbody>
          {submissoes.map((item, idx) => (
            <tr key={idx}>
              <td>{item.nome}</td>
              <td>{item.email}</td>
              <td>{item.idade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}