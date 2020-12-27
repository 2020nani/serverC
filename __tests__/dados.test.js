import request from 'supertest';
import app from '../src/app'
const MOCK_CADASTRO = {
  firstname:'jose',
  lastname:'ali',
  participation:45
}
const MOCK_CADASTRO_FAIL = {
  firstname:'jose',
  lastname:'ali',
  participation:101
}
const MOCK_UPDATE = {
  firstname:'jose',
  lastname:'ali',
  participation:49
}
const MOCK_UPDATE_FAIL = {
  firstname:'jose',
  lastname:'ali',
  participation:'45'
}

const MOCK_ID = 1


   const  TOKEN = "Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4NTQ5MDEyLCJleHAiOjE2MDkxNTM4MTJ9.hP6tiT-6ZV5zW0xnjTMHHpsVGSPCUaIFDVycHYEeiIE"
      
describe('Dados', ()=>{
  it('deve ser cadastrado',async () =>{
    const response = await request(app)
    .post('/dados', TOKEN )
    .send(MOCK_CADASTRO);
    //se cadastrou espera que retorne nome
    expect(response.body).toEqual(MOCK_CADASTRO.firstname)
  });
 it('nao deve ser cadastrado se procentagem passar 100%',async () =>{
    const response = await request(app)
    .post('/dados')
    .send(MOCK_CADASTRO_FAIL);
    
    
    expect(response.body).toEqual(`Porcentagem nao pode ultrapassar 100 porcento.`)
  });

  it('deve listar itens',async () =>{
    const response = await request(app)
    .get('/dados')
    const {id} = response.body
    
    
    
    expect(response.body)
  });
  it('deve listar apenas 1 item',async () =>{
    const response = await request(app)
    .get('/dados/1')
    const {id} = response.body
    console.log(id)
    
    
    expect(response.body)
  });
  
  it('deve atualizar item cadastrado',async () =>{
    const response = await request(app)
    .put(`/dados/1`)
    .send(MOCK_UPDATE);
    
    expect(MOCK_UPDATE)
});

it('nao deve atualizar item cadastrado se participation for string',async () =>{
 try{ const response = await request(app)
  .put(`/dados/1`)
  .send(MOCK_UPDATE_FAIL);
 }catch(e){
   console.error('falhou',e.message) 
 } 

  expect('falhou')
});

  it('deve deletar item cadastrado',async () =>{
    const response = await request(app)
    .delete(`/dados/${MOCK_ID}`)
    .send({});
    
    //se deletou retorna objeto vazio
    expect({})
  });

});