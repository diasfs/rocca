import { imoveis } from './api';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const root_folder = path.dirname(__dirname);
const data_folder = path.join(root_folder, 'data');


const getImoveis = async () => {
    let lastCodigo = 0;
    let Imoveis = [];
    let Fotos = [];
    let FotosEmpreendimento = [];
    let Anexos = [];
    let Videos = [];
    let CaracteristicasImovel = [];
    let InfraEstruturaImovel = [];
    
    let count = 0;
    let pagina = 0;
    
    do {
        pagina++;
        let rows = await imoveis.listar({
            fields: [
                "AceitaFinanciamento",
                "AdministradoraCondominio",
                "AlugarJaDestaque",
                "AnoConstrucao",
                "AptosAndar",
                "AptosEdificio",
                "AreaBoxTotal",
                "Bairro",
                "BairroComercial",
                "BanheiroSocialQtd",
                "Bloco",
                "CampanhaImportacao",
                "Categoria",
                "CEP",
                "Chave",
                "ChaveNaAgencia",
                "Cidade",
                "ClasseDoImovel",
                "CodigoMalote",
                "Complemento",
                "Construtora",
                "CorretorPrimeiroAge",
                "DataAtualizacao",
                "DataCadastro",
                "DataDisponibilizacao",
                "DataEntrega",
                "DataFimAutorizacao",
                "DataImportacao",
                "DataInicioAutorizacao",
                "DataLancamento",
                "DataPlaca",
                "DescricaoEmpreendimento",
                "DescricaoWeb",
                "DestaqueWeb",
                "DimensoesTerreno",
                "Dormitorios",
                "Edificio",
                "EEmpreendimento",
                "EmitiuNotaFiscalComissao",
                "EmpOrulo",
                "Empreendimento",
                "Endereco",
                "Exclusivo",
                "ExclusivoCorretor",
                "ExibirComentarios",
                "ExibirNoSite",
                "Finalidade",
                "FolhaSPModelo",
                "GaragemNumeroBox",
                "GaragemTipo",
                "HoraDomFim",
                "HoraDomInicio",
                "HoraFerFim",
                "HoraFerInicio",
                "HoraSabFim",
                "HoraSabInicio",
                "HoraSegSexFim",
                "HoraSegSexInicio",
                "Imediacoes",
                "ImovelaVendaDestaqueImovelaVenda",
                "ImovelwebModelo",
                "ImportadoMalote",
                "Incompleto",
                "Incorporadora",
                "InformacaoVenda",
                "InicioObra",
                "InscricaoMunicipal",
                "KeywordsWeb",
                "Lancamento",
                "Limpeza",
                "LocacaoAnual",
                "LocacaoTemporada",
                "LojasEdificio",
                "Lote",
                "LugarCertoDestaqueLugarCerto",
                "Matricula",
                "MercadoLivreTipoML",
                "MesConstrucao",
                "Midia",
                "NomeCondominio",
                "Numero",
                "Observacoes",
                "ObsLocacao",
                "ObsVenda",
                "Ocupacao",
                "OLXFinalidadesPublicadas",
                "Orientacao",
                "Orulo",
                "PadraoConstrucao",
                "Pais",
                "Pavimentos",
                "PercentualComissao",
                "Plantao",
                "PlantaoNoLocal",
                "PorteEstrutural",
                "Posicao",
                "PosicaoAndar",
                "PrazoDesocupacao",
                "Prestacao",
                "ProjetoArquitetonico",
                "Proposta",
                "PropostaLocacao",
                "QtdVarandas",
                "Quadra",
                "Reajuste",
                "Referencia",
                "Regiao",
                "ResponsavelReserva",
                "SaldoDivida",
                "Setor",
                "Situacao",
                "Status",
                "Suites",
                "SummerSale",
                "SuperDestaqueWeb",
                "TemPlaca",
                "TextoAnuncio",
                "TipoEndereco",
                "TipoImovel",
                "TiqueImoveisEmDestaque",
                "TituloSite",
                "TotalComissao",
                "UF",
                "URLVideo",
                "Vagas",
                "ValorACombinar",
                "ValorComissao",
                "ValorCondominio",
                "ValorDiaria",
                "ValorIptu",
                "ValorLimpeza",
                "ValorLivreProprietario",
                "ValorLocacao",
                "ValorM2",
                "ValorVenda",
                "Venda",
                "Visita",
                "VisitaAcompanhada",
                "VivaRealDestaqueVivaReal",
                "WebEscritoriosDestaque",
                "ZapTipoOferta",
                "ZeladorNome",
                "ZeladorTelefone",
                "Zona",
                "CategoriaImovel",
                "CategoriaMestre",
                "CategoriaGrupo",
                "ImoCodigo",
                "Moeda",
                "ConverterMoeda",
                "MoedaIndice",
                "CodigoEmpresa",
                "CodigoEmp",
                "CodigoEmpreendimento",
                "CodigoCategoria",
                "CodigoMoeda",
                "CodigoProprietario",
                "Proprietario",
                "FotoProprietario",
                "DataHoraAtualizacao",
                "VideoDestaque",
                "VideoDestaqueTipo",
                "FotoDestaque",
                "FotoDestaquePequena",
                "FotoDestaqueEmpreendimento",
                "FotoDestaqueEmpreendimentoPequena",
                "Latitude",
                "Longitude",
                "Agenciador",
                "CodigoCorretor",
                "CodigoAgencia",
                "TotalBanheiros",
                "Aberturas",
                "Adega",
                "AguaQuente",
                "Alarme",
                "AndarDoApto",
                "Andares",
                "AntenaParabolica",
                "AquecimentoEletrico",
                "ArCentral",
                "ArCondicionado",
                "AreaBoxPrivativa",
                "AreaConstruida",
                "AreaPrivativa",
                "AreaServico",
                "AreaTerreno",
                "AreaTotal",
                "ArmarioEmbutido",
                "BanheiroAuxiliar",
                "BanheiroSocial",
                "Bar",
                "Calefacao",
                "CanaletasNoRodape",
                "CercaEletrica",
                "Churrasqueira",
                "Closet",
                "ConstrucaoAlvenaria",
                "Copa",
                "CopaCozinha",
                "Cozinha",
                "CozinhaAmericana",
                "CozinhaComTanque",
                "CozinhaMontada",
                "CozinhaPlanejada",
                "Deck",
                "DependenciadeEmpregada",
                "DependenciaDeEmpregada",
                "Despensa",
                "DormitorioComArmario",
                "Edicula",
                "Escritorio",
                "EsperaSplit",
                "EstadoConservacaoImovel",
                "EstarIntimo",
                "Gabinete",
                "Hidromassagem",
                "HidroSuite",
                "HomeTheater",
                "JardimInverno",
                "Lareira",
                "Lavabo",
                "Leste",
                "Living",
                "LivingAmbientes",
                "LivingHall",
                "Mezanino",
                "Mobiliado",
                "Norte",
                "Oeste",
                "Patio",
                "PeDireitoAlto",
                "Piscina",
                "Piso",
                "PisoAreaIntima",
                "PisoDormitorio",
                "PisoElevado",
                "PisoSala",
                "Porao",
                "Reformado",
                "Sacada",
                "SacadaComChurrasqueira",
                "Sala",
                "SalaArmarios",
                "SalaEstar",
                "SalaJantar",
                "Salas",
                "SalaTV",
                "Sauna",
                "SemiMobiliado",
                "Sotao",
                "Split",
                "SuiteMaster",
                "Sul",
                "Terraco",
                "TVCabo",
                "Varanda",
                "VistaMar",
                "VistaPanoramica",
                "Vitrine",
                "WCEmpregada",
                "Agua",
                "AquecimentoCentral",
                "Bicicletario",
                "Brinquedoteca",
                "CabineDeForca",
                "Canil",
                "ChurrasqueiraCondominio",
                "CircuitoFechadoTV",
                "CondominioFechado",
                "ConstrucaoMista",
                "Deposito",
                "EdificioResidencial",
                "Elevador",
                "Elevadores",
                "ElevadorServico",
                "EmpresaDeMonitoramento",
                "EnergiaEletrica",
                "EnergiaTrifasica",
                "EntradaServicoIndependente",
                "EspacoGourmet",
                "Estacionamento",
                "EstacionamentoVagas",
                "EstacionamentoVisitantes",
                "EstadoConservacaoEdificio",
                "Face",
                "Fachada",
                "Frente",
                "Fundos",
                "Garagem",
                "GaragemCoberta",
                "GasCentral",
                "GeradorEnergia",
                "Gradeado",
                "Gradil",
                "Guarita",
                "Heliponto",
                "Iluminacao",
                "Interfone",
                "Jardim",
                "Junker",
                "Lavanderia",
                "Marquise",
                "NomeEmpresaMonitoramento",
                "OnibusProximo",
                "Pavimentacao",
                "Pilotis",
                "PiscinaAquecida",
                "PiscinaColetiva",
                "PiscinaInfantil",
                "PistaCaminhada",
                "Playground",
                "PocoArtesiano",
                "Portaria",
                "Portaria24Hrs",
                "PortariaBlindada",
                "PorteiroEletronico",
                "PortoesComEclusa",
                "PossuiViabilidade",
                "QuadraEsportes",
                "QuadraPoliEsportiva",
                "QuadraTenis",
                "Quintal",
                "Quiosque",
                "RedeEsgoto",
                "SalaDeRecepcao",
                "SalaFitness",
                "SalaoFestas",
                "SalaoJogos",
                "SalasEdificio",
                "SaunaCondominio",
                "SegurancaPatrimonial",
                "Shaft",
                "Spa",
                "TerracoColetivo",
                "Topografia",
                "Tubulacao",
                "Vigilancia24Horas",
                "Zelador"
            ],
            filter: {
                ImoCodigo: ['>', lastCodigo]
            },
            order: {
                ImoCodigo: 'asc'
            },
            paginacao: {
                quantidade: 50,
                pagina: 1
            }
        }).catch(({ response }) => console.error(response.data));
        rows = Object.values(rows);
        let codigos = rows.map(({ ImoCodigo }) => +ImoCodigo);
        count = codigos.length;
        lastCodigo = Math.max(lastCodigo, ...codigos);
        Imoveis = [...Imoveis, ...rows];

        console.log(`Loading page ${pagina}`);
    } while (count == 50);

    count = Imoveis.length;
    page = 0;
    for (let imovel of Imoveis) {
        page++;
        console.log(`loading row ${page} of ${count}`);
        let { Foto, FotoEmpreendimento, Video, Anexo, Caracteristicas, InfraEstrutura } = await imoveis.detalhes({
            fields: [
                "Caracteristicas",
                "InfraEstrutura",
                {
                    "Foto": [
                        "Ordem",
                        "Codigo",
                        "ImagemCodigo",
                        "Data",
                        "Descricao",
                        "Destaque",
                        "ExibirNoSite",
                        "ExibirSite",
                        "Foto",
                        "FotoPequena",
                        "Tipo"
                    ]
                },
                {
                    "FotoEmpreendimento": [
                        "Foto",
                        "FotoPequena",
                        "Codigo",
                        "Ordem",
                        "Data",
                        "Descricao",
                        "Destaque",
                        "Tipo",
                        "ExibirNoSite"
                    ]
                },
                {
                    "Anexo": [
                        "Codigo",
                        "CodigoAnexo",
                        "Descricao",
                        "Anexo",
                        "Arquivo",
                        "ExibirNoSite",
                        "ExibirSite"
                    ]
                },
                {
                    "Video": [
                        "Codigo",
                        "VideoCodigo",
                        "Data",
                        "Descricao",
                        "DescricaoWeb",
                        "Destaque",
                        "ExibirNoSite",
                        "ExibirSite",
                        "Video",
                        "Tipo"
                    ]
                },
            ],
            imovel: imovel.Codigo
        });
        /*
        imovel.Foto = Foto;
        imovel.FotoEmpreendimento = FotoEmpreendimento;
        imovel.Anexo = Anexo;
        imovel.Video = Video;
        */
        Fotos = [...Fotos, ...Object.values(Foto)];
        FotosEmpreendimento = [...FotosEmpreendimento, ...Object.values(FotoEmpreendimento)];
        Anexos = [...Anexos, ...Object.values(Anexo)];
        Videos = [...Videos, ...Object.values(Video)];
        CaracteristicasImovel = [...CaracteristicasImovel, {Codigo: imovel.Codigo, ...Caracteristicas}];
        InfraEstruturaImovel = [...InfraEstruturaImovel, {Codigo: imovel.Codigo, ...InfraEstrutura}];
    }

    return {Imoveis, Fotos, FotosEmpreendimento, Anexos, Videos, CaracteristicasImovel, InfraEstruturaImovel};
};

/*
imoveis.listarcampos().then(async campos => {
    const filename = path.join(data_folder, 'campos.json');
    await fs.promises.writeFile(filename, JSON.stringify(campos));
})
*/



getImoveis().then(async ({ Imoveis: imoveis, Fotos: fotos, FotosEmpreendimento: fotos_empreendimento, Anexos: anexos, Videos: videos, CaracteristicasImovel: caracteristicas_imovel, InfraEstruturaImovel: infra_estrutura_imovel}) => {

    const filename = path.join(data_folder, 'imoveis.json');
    if (!fs.existsSync(data_folder)) {
        await fs.promises.mkdir(data_folder, { recursive: true });
    }
    
        console.log('writing imoveis.json');
        await fs.promises.writeFile(filename, JSON.stringify(imoveis));
        
        console.log('writing imoveis.csv');
        let imoveis_csv = Papa.unparse(imoveis);
        await fs.promises.writeFile(path.join(data_folder,'imoveis.csv'), imoveis_csv);
        
        console.log('writing fotos.csv');
        let fotos_csv = Papa.unparse(fotos);
        await fs.promises.writeFile(path.join(data_folder,'fotos.csv'), fotos_csv);
        
        console.log('writing fotos_empreendimento.csv');
        let fotos_empreendimento_csv = Papa.unparse(fotos_empreendimento);
        await fs.promises.writeFile(path.join(data_folder,'fotos_empreendimento.csv'), fotos_empreendimento_csv);
        
        console.log('writing anexos.csv');
        let anexos_csv = Papa.unparse(anexos);
        await fs.promises.writeFile(path.join(data_folder,'anexos.csv'), anexos_csv);
        
        console.log('writing videos.csv');
        let videos_csv = Papa.unparse(videos);
        await fs.promises.writeFile(path.join(data_folder,'videos.csv'), videos_csv);
        
        console.log('writing caracteristicas_imovel.csv');
        let caracteristicas_imovel_csv = Papa.unparse(caracteristicas_imovel);
        await fs.promises.writeFile(path.join(data_folder,'caracteristicas_imovel.csv'), caracteristicas_imovel_csv);
        
        console.log('writing infra_estrutura_imovel.csv');
        let infra_estrutura_imovel_csv = Papa.unparse(infra_estrutura_imovel);
        await fs.promises.writeFile(path.join(data_folder,'infra_estrutura_imovel.csv'), infra_estrutura_imovel_csv);

        console.log('writing destaques.csv');
        let destaques = imoveis.filter(imovel => imovel.DestaqueWeb.toLowerCase() == 'sim');
        let destaques_csv = Papa.unparse(destaques);
        await fs.promises.writeFile(path.join(data_folder, 'destaques.csv'), destaques_csv);

        console.log('writing super_destaques.csv');
        let super_destaques = imoveis.filter(imovel => imovel.SuperDestaqueWeb.toLowerCase() == 'sim');
        let super_destaques_csv = Papa.unparse(super_destaques);
        await fs.promises.writeFile(path.join(data_folder, 'super_destaques.csv'), super_destaques_csv);

    
})

//require('net').createServer().listen();