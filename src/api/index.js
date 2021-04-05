require('dotenv').config();
import axios from 'axios';

const endpoint = process.env.VISTA_ENDPOINT;
const key = process.env.VISTA_KEY;

export const api = axios.create({
    baseURL: endpoint,
    params: {
        key
    },
    headers: {
        'Content-Type': "application/json"
    }
});

export const imoveis = {
    reloadcache() {
        return api.get('/reloadcache').then(({ data }) => data);
    },
    listarcampos() {
        return api.get('/imoveis/listarcampos').then(({ data }) => data);
    },
    listarConteudo({fields = [], filter = null}) {
        let params = {
            pesquisa: {
                fields
            }
        }
        if (filter != null) {
            params.pesquisa.filter = filter;
        }
        return api.get('/imoveis/listarConteudo', {
            params
        }).then(({ data }) => data);
    },
    listar({ fields = [], filter = null, order = null, paginacao = null }) {
        let params = {
            pesquisa: {
                fields
            }
        }
        if (filter !== null) {
            params.pesquisa.filter = filter;
        }
        if (paginacao !== null) {
            params.pesquisa.paginacao = paginacao;
        }
        if (order !== null) {
            params.pesquisa.order = order;
        }

        return api.get('/imoveis/listar', { params })
            .then(({ data }) => data);
    },
    detalhes({ fields = [], imovel }) {
        return api.get('/imoveis/detalhes', {
            params: {
                imovel,
                pesquisa: {
                    fields
                }
            }
        }).then(({ data }) => data);
    }
};