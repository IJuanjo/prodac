import React, { useContext, useState } from 'react'
import { useForm } from '../../hook/useForm';
import '../../css/main.css';
import swal from 'sweetalert2'
import { UserConext } from '../../conext/UserConext';
export const Login = ({history}) => {
    const {setCheckToken} = useContext(UserConext)
    const [inputValues, setIputChange] = useForm({
        user: '',
        pass: ''
    });

    const {user,pass} = inputValues;


    const [error, setError] = useState({});
  
    
    const handleSubmit= async(e) => {
        e.preventDefault(); 
        const mensajeserror = {};
        if(user.trim()!=='' && pass.trim()!==''){
            const body= await fetch('http://localhost/phpprodac/controllers/loginForm.php', {
                method: 'POST',
                body: JSON.stringify({
                    user,
                    password: pass,
                   
                })
            });
            const resp=await body.json();
            const {type,msg}=resp;
            if(type==='success'){
                localStorage.setItem('token', resp.token)
                localStorage.setItem('token-init-date', new Date().getTime())
                setCheckToken(true);
                return history.replace('panel');
            }

            return swal.fire('Error',msg,'error')
        }
        if (user.trim() === '') {
            mensajeserror.userMsg = "El campo usuario no puede estar vacio *"
        }

        if (pass.trim() === '') {
            mensajeserror.passMsg = "El campo password no puede estar vacio *"
        }
        setError(mensajeserror);

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
                        />  <span className="text-red-600 text-sm">{error.userMsg}</span>
                        <input 
                            autoComplete="off"
                            className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none"
                            name="pass" 
                            placeholder="Clave*"
                            type="password" 
                            onChange={setIputChange}        
                            value={pass}
                        /><span className="text-red-600 text-sm">{error.passMsg}</span>

                    </div>
                    <input type="submit" className="boton_prodac pt-3 pb-3 pr-4 pl-4 hover:bg-white hover:text-red-400 hover:border-red-400 outline-none hover:boder-red-400 cursor-pointer w-full border" value="Enviar"/>
                </form>
            </div>
        </div>
    )
}
