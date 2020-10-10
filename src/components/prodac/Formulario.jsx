import React from 'react'
import { useState } from 'react';
import { preguntas } from '../../data/preguntas';
import { useForm } from '../../hook/useForm';
import './style.css';
export const Formulario = ({ history }) => {

    const [inputValues, setIputChange] = useForm({
        Inombre: '',
        Ilinea: '',
        Iconsulta: '',
        Iempresa: '',
        Iruc: '',
        Iemail: '',
        Itelefono: '',
        Imensaje: ''
    });

    const { Inombre, Ilinea, Iconsulta, Iempresa, Iruc, Iemail, Itelefono, Imensaje } = inputValues;

    const [consulta, setConsulta] = useState([])




    const handleSubmit =  (e) => {
        e.preventDefault();
        const terminos=document.querySelector('#checkP');

        if(Inombre.trim()!=='' && Ilinea.trim()!==''
            && Iconsulta.trim()!=='' && Iempresa.trim()!==''
            && Iruc.trim()!=='' && Iemail.trim()!==''
            && Itelefono.trim()!=='' && Imensaje.trim()!==''
            && terminos.checked===true
        ){
             return fetch('http://localhost/phpprodac/controllers/insertForm.php',{
                 method:'POST',
                 body:JSON.stringify({
                     nombres:Inombre,
                     linea:Ilinea,
                     empresa:Iempresa,
                     consulta:Iconsulta,
                     ruc:Iruc,
                     email:Iemail,
                     telefono:Itelefono,
                     mensaje:Imensaje,
                     tipopagina:'web'
                 })
             }).then(x=>x.json()).then(console.log)/* history.replace('agradecimiento')  */
        }
        console.log("Los campos no pueden estar vacios!")
    }
    const handleChange = ({ target }) => {
        if (target.value.trim() !== '') {
            const select = preguntas.filter(preg => preg.slug === target.value);
            return setConsulta(select[0].preguntas)
        }
        setConsulta([])
    }

    return (
        <div className="max-w-screen-md mx-auto flex mt-20 mb-20 p-8 bg-white rounded-lg shadow-xl">
            <div className="flex-shrink-0  w-full ">
                <img className="m-auto" src="./assets/images/logo.jpg" alt="" />

                <h1 className="text-center mt-5 text-3xl text_color">Contactenos</h1>
                <div className="mt-6">
                    <p className="text-gray-700">Obtenga respuestas de los expertos de soporte de ventas de Prodac antes de comprar o al realizar una compra.</p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <input type="text" onChange={setIputChange} value={Inombre} name="Inombre" id="Inombre" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su nombre y apellidos *" />
                        <select onChange={(e) => { setIputChange(e); handleChange(e) }} name="Ilinea" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none text-gray-700" id="">
                            <option value="">Seleccione la línea de negocio * </option>
                            <option value="agropecuario">Agropecuario</option>
                            <option value="construccion">Construcción</option>
                            <option value="ferretero">Ferretero</option>
                            <option value="infraestructura">Infraestructura</option>
                            <option value="mineria">Minería</option>
                            <option value="industrial">Industrial</option>
                        </select>
                    </div>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <input type="text" onChange={setIputChange} value={Iempresa} name="Iempresa" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su empresa *" />
                        <select onChange={setIputChange} name="Iconsulta" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none text-gray-700" id="Iconsulta">
                            <option value="">Seleccione su consulta *</option>
                            {consulta.map(({ slug, text }, index) => (
                                <option key={index} value={slug}>{text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <div>
                            <input type="text" onChange={setIputChange} value={Iruc} name="Iruc" className="w-full mb-8 border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su RUC *" />
                            <input type="email" onChange={setIputChange} value={Iemail} name="Iemail" className="w-full mb-8 border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su email *" />
                            <input type="text" onChange={setIputChange} value={Itelefono} name="Itelefono" className="w-full  border-gray-600 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su teléfono *" />
                        </div>
                        <textarea onChange={setIputChange} value={Imensaje} name="Imensaje" placeholder="Mensaje *" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none "  ></textarea>

                    </div>

                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <div></div>
                        <div>
                            <label className="text_color">
                                <input type="checkbox" className="mr-3" name="" id="checkP" />
                    Aceptar las políticas de privacidad de Prodac
                    </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div></div>
                        <input type="submit" className="boton_prodac pt-3 pb-3 pr-4 pl-4 hover:bg-white hover:text-red-400 hover:border-red-400 outline-none cursor-pointer border" value="ENVIAR" />
                    </div>
                </form>


            </div>


        </div>
    )
}