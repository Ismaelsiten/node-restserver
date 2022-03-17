const Role = require('../models/rol');
const Usuario = require('../models/usuario');



 const esRolValido =async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol) {
      throw new Error(`El ${ rol } no está registrado en la BD`);
    }

  }

  const existeEmail = async(correo= '') => {
        // Verificar si el correo existe
    emailexiste=await Usuario.findOne({ correo });
    if ( emailexiste ) {
     
     throw new Error(` ${correo } no es válido o ya está registrado  `);
    }
    
  }

  const existeUsuarioPorId = async(id= '') => {
    // Verificar si el usurio 
const exiteUsuario=await Usuario.findById( id );
if ( !exiteUsuario ) {
 
 throw new Error(`El  ${id } no es válido `);
}


}
  
      


  module.exports= {
      esRolValido,
      existeEmail,
      existeUsuarioPorId

  }