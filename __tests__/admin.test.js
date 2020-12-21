import request from 'supertest';
import app from '../src/app'
const MOCK_CADASTRO = {
  name:'jose',
  email:'ali@hotmail.com',
  password:'123456'
}
const MOCK_CADASTRO_FAIL = {
    name:'joao',
    email:'ali@hotmail.com',
    password:'1234567'
}
const MOCK_CADASTRO_FAIL_CAMPO = {
  name:'',
  email:'ali@hotmail.com',
  password:'1234567'
}
const MOCK_UPDATE = {
  name:"jose",
  email: "nani3@hotmail.com",
  password:"123456"
 
}


describe('Cadastrando administradores', ()=>{
  it('deve ser cadastrado admin',async () =>{
    const response = await request(app)
    .post('/admins')
    .send(MOCK_CADASTRO);
    //se cadastrou espera que retorne objeto cadastro
    
    expect(response.body).toEqual(MOCK_CADASTRO)
  });

 it('nao deve cadastrar se email ja existir',async () =>{
    const response = await request(app)
    .post('/admins')
    .send(MOCK_CADASTRO_FAIL);
    
    
    expect(response.body.error).toEqual("Este email ja esta cadastrado")
  });
  it('nao deve cadastrar se faltar algum campo',async () =>{
    const response = await request(app)
    .post('/admins')
    .send(MOCK_CADASTRO_FAIL_CAMPO);
    
    
    expect(response.body.error).toEqual("Validacao Falhou")
  });
  it('atualizar administrador',async () =>{
    const response = await request(app)
    .post('/admins/2', headers)
    .send(MOCK_UPDATE, );
    
    
    expect(MOCK_UPDATE)
  });
 

});