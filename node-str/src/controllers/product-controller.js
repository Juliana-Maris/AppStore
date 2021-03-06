
'use strict'
const ValidationContract = require('../validators/file-validator');
const repository = require('../repositories/product-repository');
const guid = require('guid'); //para qdo tiver o serviço de email contratado??
// const azure = require('azure-storage'); para qdo tiver conta azure cadastrada
var config = require('../config');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
};
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
};
exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
};
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter pelo menos 3 letras');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve ter pelo menos 3 letras');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve ter pelo menos 3 letras');
    // se os dados forem invalidos
    if (!contract.errorsisValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    // aqui é para ser feita configuração para imagens, mas deve ser feita somente qdo tiver conta no azure 
    // criar o Blob Service
    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Produto cadastrado com sucesso." });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
};
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Produto atualizado com sucesso' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }

};
exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id); // ou req.params.id???
        res.status(201).send({ message: 'Produto excluído com sucesso' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
};