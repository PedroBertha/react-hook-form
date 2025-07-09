import { useForm, type SubmitHandler } from 'react-hook-form'
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
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Dados validados:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome:</label>
        <input
          {...register("nome", {
            required: "O nome é obrigátorio",
            maxLength: { value: 50, message: "Máximo 50 caracteres" },
          })}
        />
        {errors.nome && <span style={{ color: "red"}}>{errors.nome.message}</span>}
        </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Oemail é obrigátorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de email Inválido",
            },
          })}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
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
            {errors.idade && <span style={{ color: "red" }}>{errors.idade.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}