'use strict'

const repository = require('../repositories/order-repository');
const authServive = require('../services/auth-service'); 
const guid = require('guid');

exports.post = async (req, res, next) => {

    try {
        var token = req.body.token || req.query.token || req.headers['x-access-toeken'];
        var data = authServive.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0,6),
            total: req.body.total,
            itens: req.body.itens
        });

        res.status(201).send({
            message: 'Cadastro realizado com sucesso.'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Erro tentar ao realizar cadastro.',
            data: error.message
        });    
    }
} 

exports.get = async (req, res, next) => {

    try {
        var data = await repository.read();
        res.status(201).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao recuperar dados.',
            data: error.message
        });    
    }
} 

exports.getbyId = async (req, res, next) => {
    try {
        var data = await repository.readById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao recuperar dados.',
            data: error.message
        });    
    }
} 

exports.getbyId = async (req, res, next) => {
    try {
        var data = await repository.readById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao recuperar dados.',
            data: error.message
        });    
    }
} 

exports.put = async (req, res, next) => {
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Atualização realizada com sucesso.'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao tentar atualizar dados.',
            data: error.message
        });    
    }
} 

exports.delete = async (req, res, next) => {
    try {
        var data = await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Exclusão realizada com sucesso.'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao tentar excluir dados.',
            data: error.message
        });    
    }
} 