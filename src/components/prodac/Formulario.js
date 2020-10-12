import React, { useEffect } from 'react'
import { useState } from 'react';
import { preguntas } from '../../data/preguntas';
import { useForm } from '../../hook/useForm';
import './style.css';
import swal from 'sweetalert2'
export const Formulario = ({ history }) => {
    const [backurl, setBackurl] = useState('');
    useEffect(() => {
        const backurlt=document.referrer;
        console.log(backurlt)
        let url='web';
        if(backurlt==='http://localhost/'){
            url='tienda';
        }
        setBackurl(url)
    }, [])
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

    const [error, setError] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        const mensajeserror = {};
        const terminos = document.querySelector('#checkP');

        if (Inombre.trim() !== '' && Ilinea.trim() !== ''
            && Iconsulta.trim() !== '' && Iempresa.trim() !== ''
            && Iruc.trim() !== '' && Iemail.trim() !== ''
            && Itelefono.trim() !== '' && Imensaje.trim() !== ''
            && terminos.checked === true
        ) {
           const body= await fetch('http://localhost/phpprodac/controllers/insertForm.php', {
                method: 'POST',
                body: JSON.stringify({
                    nombres: Inombre,
                    linea: Ilinea,
                    empresa: Iempresa,
                    consulta: Iconsulta,
                    ruc: Iruc,
                    email: Iemail,
                    telefono: Itelefono,
                    mensaje: Imensaje,
                    tipopagina: backurl
                })
            });
            const resp=await body.json();
            const {resultado}=resp;
            if(resultado.type==='success'){
                return history.replace('agradecimiento');
            }
            return swal.fire('Error',resultado.mensaje,'error')
            /* history.replace('agradecimiento')  */
        }
        if (Inombre.trim() === '') {
            mensajeserror.nameMsg = "El campo nombre no puede estar vacio *"

        }
        if (Ilinea.trim() === '') {
          
            mensajeserror.lineaMsg = "El campo linea no puede estar vacio *"

        }
        if (Iempresa.trim() === '') {
            mensajeserror.empresaMsg = "El campo empresa no puede estar vacio *"

        }
        if (Iruc.trim() === '') {
            mensajeserror.rucMsg = "El campo ruc no puede estar vacio *"

        }
        if (Itelefono.trim() === '') {
            mensajeserror.telefonoMsg = "El campo telefono no puede estar vacio *"

        }
        if (Imensaje.trim() === '') {
            mensajeserror.mensajeMsg = "El campo mensaje no puede estar vacio *"

        }
        if (Iemail.trim() === '') {
            mensajeserror.emailMsg = "El campo email no puede estar vacio *"

        }
        if (Iconsulta.trim() === '') {
            mensajeserror.consultaMsg = "El campo consulta no puede estar vacio *"

        }

        if(!terminos.checked){
            mensajeserror.terminosMsg="El campo terminos y condiciones es obligatorio *"
        }


        setError(mensajeserror)

    }

    const handleChange = ({ target }) => {
        const selectConsulta = document.querySelector('#Iconsulta');
        selectConsulta.selectedIndex = 0;
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
                    <p className="text-gray-700 ">Obtenga respuestas de los expertos de soporte de ventas de Prodac antes de comprar o al realizar una compra.</p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <div>
                            <input type="text" onChange={setIputChange} value={Inombre} name="Inombre" id="Inombre" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none w-full" placeholder="Ingrese su nombre y apellidos *" />
                            <span className="text-red-600 text-sm">{error.nameMsg}</span>
                        </div>
                        <div>
                            <select onChange={(e) => { setIputChange(e); handleChange(e) }} name="Ilinea" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none text-gray-700 w-full" id="">
                                <option value="">Seleccione la línea de negocio * </option>
                                <option value="agropecuario">Agropecuario</option>
                                <option value="construccion">Construcción</option>
                                <option value="ferretero">Ferretero</option>
                                <option value="infraestructura">Infraestructura</option>
                                <option value="mineria">Minería</option>
                                <option value="industrial">Industrial</option>
                            </select>
                            <span className="text-red-600 text-sm">{error.lineaMsg}</span>

                        </div>
                    </div>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <div>
                            <input type="text" onChange={setIputChange} value={Iempresa} name="Iempresa" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none w-full" placeholder="Ingrese su empresa *" />
                            <span className="text-red-600 text-sm">{error.empresaMsg}</span>
                        </div>
                        <div>
                            <select onChange={setIputChange} name="Iconsulta" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none text-gray-700 w-full" id="Iconsulta">
                                <option value="">Seleccione su consulta *</option>
                                {consulta.map(({ slug, text }) => (
                                    <option key={slug} value={text}>{text}</option>
                                ))}
                            </select>
                            <span className="text-red-600 text-sm">{error.consultaMsg}</span>

                        </div>
                    </div>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-2  gap-4 mt-8">
                        <div>
                            <div className="pb-8">
                                <input type="text" onChange={setIputChange} value={Iruc} name="Iruc" className="w-full  border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su RUC *" />
                                <span className="text-red-600 text-sm">{error.rucMsg}</span>

                            </div>
                            <div className="mb-8">
                                <input type="email" onChange={setIputChange} value={Iemail} name="Iemail" className="w-full border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su email *" />
                                <span className="text-red-600 text-sm">{error.emailMsg}</span>
                            </div>
                            <div>
                                <input type="text" onChange={setIputChange} value={Itelefono} name="Itelefono" className="w-full  border-gray-600 border pt-3 pb-3 pr-4 pl-4 outline-none" placeholder="Ingrese su teléfono *" />
                                <span className="text-red-600 text-xs">{error.telefonoMsg}</span>
                            </div>
                        </div>
                        <div>

                            <textarea onChange={setIputChange} value={Imensaje} name="Imensaje" placeholder="Mensaje *" className="border-gray-700 border pt-3 pb-3 pr-4 pl-4 outline-none w-full text_prodac"  ></textarea>
                            <span className="text-red-600 text-sm">{error.mensajeMsg}</span>
                        </div>

                    </div>

                    <div className="grid sm:grid-cols-1  xl:grid-cols-2  gap-4 mt-10">
                        <div></div>
                        <div>
                            <label className="text_color">
                                <input type="checkbox" className="mr-3" name="" id="checkP" />
                                Aceptar las políticas de privacidad de Prodac
                    </label>
                    <span className="text-red-600 inline-block mt-2 text-sm">{error.terminosMsg}</span>       
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div></div>
                        <input type="submit" className="boton_prodac pt-3 pb-3 pr-4 pl-4 hover:bg-white hover:text-prodac   hover:border-prodac outline-none cursor-pointer border" value="ENVIAR" />
                    </div>
                </form>


            </div>


        </div>
    )
}