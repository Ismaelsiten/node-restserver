const { request } = require('express');
const { response } = require('express');
const becrypt = require('bcryptjs');
const  Usuario  = require('../models/usuario');
const bcrypt = require('bcryptjs/dist/bcrypt');
const usuario = require('../models/usuario');


 const userGet = async(req=request, res=response) => {
//const {q,nombre = 'No name',apikey,page=1,limit} = req.query;
    

    const { limite = 5, desde =0} = req.query;
    const query = {estado:true};
    /*const usuaios =await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number (limite));


    const total = await Usuario.countDocuments(query);*/

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
    .skip(Number(desde))
    .limit(Number (limite))

    ])
    res.json({
     total,
     usuarios
      
    });
  };
  const userPost = async (req, res=response) => {
  


    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo, password,rol});

  
    
    


    //Encriptar la contraseña
    const salt = becrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password,salt) ;

    // Guardar en BD
    await usuario.save();
    
    res.json({
       
        usuario
      

    });
  };
  const userPut = async(req, res=response) => {
    const body = req.body;
   
    const {id}=req.params;
    const {_id,password,google,correo,...resto} = req.body;

    // TODO validar contra base de datos

    if(password) {
       //Encriptar la contraseña
    const salt = becrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password,salt) ;

    }
    const usuriodb = await Usuario.findByIdAndUpdate (id, resto);

    
    res.json(usuario);
  };
  const userDelete = async (req, res=response) => {
    const {id} = req.params;

    // Físicamente lo borramos
   // const usuario = await Usuario.findByIdAndDelete( id );ç

   const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
       
     
       usuario

    });
  };
  






  module.exports = {
      userGet,
      userPost,
      userPut,
      userDelete
  }