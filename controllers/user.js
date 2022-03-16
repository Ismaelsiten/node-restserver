const { request } = require('express');
const { response } = require('express');

 const userGet = (req=request, res=response) => {
     const {q,nombre = 'No name',apikey,page=1,limit} = req.query;
    const body = req.body;
    res.json({
       
        msg:'get API - controlador',
        body,
        q,
        nombre,apikey,
        page,limit

    });
  };
  const userPost = (req, res=response) => {

    const body = req.body;
    res.json({
       
        msg:'post API - controlador',
        body

    });
  };
  const userPut = (req, res=response) => {
    const body = req.body;

    const {id}=req.params;

    
    res.json({
       
        msg:'put API - controlador',
        body,id

    });
  };
  const userDelete = (req, res=response) => {
    const body = req.body;
    res.status(201).json({
       
        msg:'Delete API - controlador',
        body

    });
  };
  






  module.exports = {
      userGet,
      userPost,
      userPut,
      userDelete
  }