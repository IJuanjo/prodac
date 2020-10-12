import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2'
import Pagination from 'react-paginating';

export const TablaScreen = () => {
    const [data, setData] = useState([])
    const [countPage, setCountPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [offset, setOffset] = useState(0)
    const [tipoPage, setTipoPage] = useState('')
    
    useEffect(() => {
        const abortController=new AbortController();
        const getAll = async () => {
            try {
                let body;
                if(tipoPage===''){
                    body = await fetch('http://localhost/phpprodac/controllers/selectForm.php',{
                        method:'POST',
                        body:JSON.stringify({offset}),
                       signal:abortController.signal
                    })
                 
                }else{
                    body = await fetch('http://localhost/phpprodac/controllers/selectType.php',{
                       method:'POST',
                       body:JSON.stringify({tipopage:tipoPage,offset})
                   })
                }
    
                const resp = await body.json();
                const {datos,count}=resp
                setCountPage(count.total);
                setData(datos)
            } catch (error) {
               console.log(error)
            }
        }
        getAll()
        
        return ()=>{
            abortController.abort();            
        }
    }, [offset])

    const showMsg = (msg) => {
        swal.fire({
            text: msg,
            imageWidth: 164,
            imageHeight: 205,
            padding: 10,
            animation: true,
            showConfirmButton:false,
            confirmButtonColor: '#EF892E',

        });

    }

    const filterTipe = async ({ target }) => {
         const body = await fetch('http://localhost/phpprodac/controllers/selectTipePage.php', {
             method: 'POST',
             body: JSON.stringify({ tipopage: target.value,offset:0 })
            })
            const resp = await body.json();
            const {datos,count}=resp
    
        setCountPage(count.total)
        setData(datos)
        setTipoPage(target.value)
    }

    const filterLine = async ({ target }) => {
        const body = await fetch('http://localhost/phpprodac/controllers/selecLinea.php', {
            method: 'POST',
            body: JSON.stringify({ linea: target.value,offset:0  })
        })
        const resp = await body.json();
        const {datos,count}=resp
       
        setCountPage(count.total)
        setData(datos)
        setTipoPage(target.value)
    }

    const handlePageChange = (page, e) => {
        setCurrentPage(page)
        setOffset((page*10)-10)
    }

 
    return (
        <div className="max-w-screen-xl mx-auto mt-16">

            <img className="m-auto mb-10" src="./assets/images/logo.jpg" alt="" />
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="grid sm:grid-cols-1 xl:grid-cols-3  w-7/12 mb-5 gap-4 mt-8">
                    
                    <select onChange={filterTipe} className="border-gray-600 mr-4 px-1 py-2 border" name="" id="">
                        <option value="">Seleccione página web *</option>
                        <option value="tienda">Tienda</option>
                        <option value="web">web</option>

                    </select>
                    <select name="" onChange={filterLine} id="" className="px-1 py-2 border-gray-600 border">
                        <option value="">Seleccione linea de negocio *</option>
                        <option value="agropecuario">Agropecuario</option>
                        <option value="construccion">Construcción</option>
                        <option value="ferretero">Ferretero</option>
                        <option value="infraestructura">Infraestructura</option>
                        <option value="mineria">Minería</option>
                        <option value="industrial">Industrial</option>
                    </select>
                   <a className="contents" href="http://localhost/phpprodac/controllers/printExcel.php">
                   <div  className=" bg-blue-500 flex justify-around items-center cursor-pointer">
                        <span className="text-sm mr-4 text-white">Descargar reporte</span>
                        <img src="./assets/icons/excel.svg" alt=""/>
                    </div>
                   </a>
                    
                </div>

                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">




                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Nombres y Apellidos
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Tipo Pagina
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Linea de Negocio
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Empresa
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Consulta
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Ruc
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Telefono
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold text-black uppercase tracking-wider">
                                    Mensaje
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((d, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{d.nombres}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{d.tipopage}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{d.linea}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {d.empresa}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {d.slug_consulta}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {d.ruc}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {d.email}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {d.telefono}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            <a className="outline-none cursor-pointer" onClick={() => showMsg(d.mensaje)}>Ver detalle</a>
                                        </p>
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    </table>

               

                </div>
                <Pagination
                        className="pagination mt-5"
                        total={parseInt(countPage)}
                        limit={10}
                        pageCount={10}
                        currentPage={currentPage}
                    >
                        {({
                            pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,
                            totalPages,
                            getPageItemProps
                        }) => (
                                <ul className="flex justify-end" role="button">


                                    {hasPreviousPage && (
                                        <li role="button"
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {'<'}
                                        </li>
                                    )}

                                    {pages.map(page => {

                                        let active = null;
                                        if (currentPage === page) {
                                            active = 'text-red-700 font-bold';
                                        }
                                        return (
                                            <li   role="button"
                                                {...getPageItemProps({
                                                    pageValue: page,
                                                    key: page,
                                                    className: active,
                                                    "aria-label":"pagina",
                                                    onPageChange: handlePageChange
                                                })}
                                            >
                                                {page}
                                            </li>
                                        );
                                    })}

                                    {hasNextPage && (
                                        <li role="button"
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {'>'}
                                        </li>
                                    )}
                                </ul>
                            )}
                    </Pagination>
            </div>
        </div>
    )
}
