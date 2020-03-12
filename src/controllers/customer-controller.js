'use strict'

const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailservice = require('../services/email-service');
const authService = require('../services/auth-service');


exports.post = async (req, res, next) => {

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        await emailservice.send(req.body.email, 'Bem vindo ao Node Store',global.EMAIL_TMPL.replace('{0}', req.body.name));

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

exports.authenticate = async (req, res, next) => {

    const customer = await repository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
    });

    if(!customer){
        res.status(401).send({
            message: 'Customer não enontrado'
        });
    }

    const token = await authService.generateToken({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        roles: customer.roles
    });

    res.status(200).send({
        token: token,
        data: {
            name: customer.name,
            email: customer.email
        }
    });

}

exports.refreshToken = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = authService.decodeToken(token);

    const customer = await repository.getbyId(data.id);

    if(!customer){
        res.status(401).send({
            message: 'Customer não enontrado'
        });
    }

    const tokenData = await authService.generateToken({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        roles: customer.roles
    });

    res.status(200).send({
        token: tokenData,
        data: {
            name: customer.name,
            email: customer.email
        }
    });

}