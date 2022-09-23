import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";


import SecurityLogo from "../../assets/security.svg";
import {rangePasswordRegex} from "../../utils";


import  "./styles.css";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

let schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Digite um e-mail válido").required("E-mail é obrigatório"),
  password: yup.string().min(6,"Mínimo 6 digitos").max(6,"Máximo 6 digitos").required("Senha é obrigatorio").matches(rangePasswordRegex, "A senha deve estar entre 184759-856920"),
});

function Form() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Inputs>({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data:Inputs) => {
        axios.post('https://61e036950f3bdb0017934eb0.mockapi.io/api/valid-passwords/results',data)
        .then(()=>{
            alert('Resultado enviado com sucesso!')
        })
        .catch(()=>{
            alert('Falha ao enviar resultado. Tente novamente.')
        })
    }

  return (
    <div className="container">
        <div className="form-image">
            <img src={SecurityLogo} alt=""/>
        </div>
        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <div className="title">
                        <h1>Valide sua Senha</h1>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-box">
                        <label>Nome</label>
                        <input type="text" placeholder="Nome" {...register("name")}/>
                        <div className="error-box">
                            {errors.name && (
                                <span>{errors.name.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="input-box">
                        <label>E-mail</label>
                        <input id="email" type="email" placeholder="E-mail" {...register("email")}/>
                        <div className="error-box">
                            {errors.email && (
                                <span>{errors.email.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="input-box">
                        <label>Senha</label>
                        <input id="password" placeholder="Senha" type="number" {...register("password")}/>
                        <div className="error-box">
                            {errors.password && (
                                <span>{errors.password.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="success-box">
                        {isValid && (
                                <span>Senha válida!</span>
                            )}
                    </div>
                </div>

                <div className="send-button">
                    <button type="submit" disabled={!isValid}>
                            Enviar
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Form
