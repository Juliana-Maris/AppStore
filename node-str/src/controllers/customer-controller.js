
'use strict'
const ValidationContract = require('../validators/file-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
const emailServices = require('../services/email-service');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 letras');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 letras');
    // se os dados forem invalidos
    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY), //este global aumenta segurança
            roles: ["admin"] //para cadastrar admin mudar para admin
        });
        //emailService.send(req.body.email, 'bem vindo a Api Node Store','global.EMAIL_TMPL.replace('{ 0}', req.body.name));
        res.status(201).send({ message: "Cliente cadastrado com sucesso!" });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar cliente.' });
    }
};
exports.authenticate = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 letras');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 letras');
    // se os dados forem invalidos
    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) // este global é para aumentar a segurança
        });
        if (!customer) {
            res.status(404).send({ message: "Usuário ou senha inválidos!" });
            return;
        }
        const token = await authService.generateToken({
            id: customer._id, //id do usuario
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar cliente.' });
    }
};
exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(401).send({ message: "Cliente não encontrado!" });
            return;
        }
        const tokenData = await authService.generateToken({
            id: customer._id, //id do usuario
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar cliente.' });
    }
};