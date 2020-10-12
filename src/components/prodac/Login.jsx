import React, { useRef } from 'react'
import { useForm } from '../../hook/useForm';
import '../../css/main.css';
export const Login = () => {

    const [inputValues, setIputChange] = useForm({
        user: '',
        pass: ''
    });

    const {user,pass} = inputValues;

    const ref_user = useRef();
    const ref_password = useRef();
    
    const handleSubmit= (e) => {
        e.preventDefault(); 
        const campos = [ref_user,ref_password];
        console.log(campos);
        campos.map(campo => {
            if(campo.current.value.trim() < 1){
                console.log(campo.current.nextElementSibling);
                console.log('F');
            }
        })
    }

    return (
        <div className="max-w-md mx-auto flex mt-20 mb-20 p-8 bg-white rounded-lg shadow-xl">
            <div className="flex-shrink-0  w-full ">
                <img className="m-auto" src="./assets/images/logo.jpg" alt="" />
                <h1 className="text-center mt-5 text-3xl text_color">PANEL DE ADMINISTRACIÓN</h1>
                <form  onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-1  gap-4 mt-8 mb-8">
                        <input 
                            className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none"
                            type="text"
                            placeholder="Usuario*"
                            name='user'
                            value={user}
                            onChange={setIputChange}
                            ref={ref_user}
                        /> <span className="none">Campo obligatorio</span>
                        <input 
                            autoComplete="off"
                            className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none"
                            name="pass" 
                            placeholder="Clave*"
                            type="password" 
                            onChange={setIputChange}
                            ref={ref_password}
                            value={pass}
                        /><span className="none">Campo obligatorio</span>
                    </div>
                    <input type="submit" className="boton_prodac pt-3 pb-3 pr-4 pl-4 hover:bg-white hover:text-red-400 hover:border-red-400 outline-none hover:boder-red-400 cursor-pointer w-full" value="Enviar"/>
                </form>
            </div>
        </div>
    )
}
