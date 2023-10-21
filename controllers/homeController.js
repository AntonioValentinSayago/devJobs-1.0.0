exports.mostrarTrabajos = ( req, res ) => {
    res.render('home' , {
        nombrePagina: 'devJobs',
        tagline: 'Encuentra y Publica Trabajos para Desarrolladores Web',
        barra: true,
        boton: true
    })
}