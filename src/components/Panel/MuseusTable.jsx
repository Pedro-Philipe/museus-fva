/* eslint no-console: "off", no-debugger: "off", no-unused-vars: "off", react/prop-types:"off", no-undef: "off", react/jsx-no-undef: "off", react/no-direct-mutation-state: "off" */
import React from'react';
import ReactTable from'react-table';
import'react-table/react-table.css';
import DeleteButton from'./DeleteButton.jsx';

export default class MuseusTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fvaOpenYear: this.props.openYear,
        };

        this.handler = this.props.parentHandler;
    }

    respostaMuseu(e) {
        if(e.row['fva' + this.props.fvaYear] !== null) {
            if(this.state.fvaOpenYear !== null) {
                if(this.props.fvaYear.toString() === this.state.fvaOpenYear.toString()) {
                    return(<DeleteButton museumId={e.original.id} parentHandler={this.handler}/>);
                }
            }

            return(<b>Sim</b>);
        }
        else{
            return'Não';
        }
    }


    render() {

        const filterMuseu = (filter, row) => row.name.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
        const filterMunicipio = (filter, row) => row.En_Municipio === null ? false : row.En_Municipio.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;

        const columns = [{
            Header: 'Museu',
            accessor: 'name',
            width: 350,
            filterMethod: filterMuseu,
            Filter: ({filter, onChange}) =>
                <input
                    type="text"
                    placeholder="Pesquise por Nome do Museu"
                    style={{ width: '100%' }}
                    onChange={event => onChange(event.target.value)}
                />
        }, {
            Header: 'Respondido',
            filterable: false,
            accessor: 'fva' + this.props.fvaYear,
            getProps: () => {
                return{
                    style: {
                        textAlign: 'center'
                    }
                };
            },
            Cell: props => <span>{
                this.respostaMuseu(props)
            }</span>,
            width: 100
        }, {
            Header: 'Cidade',
            accessor: 'En_Municipio',
            width: 160,
            filterMethod: filterMunicipio,
            Filter: ({filter, onChange}) =>
                <input
                    type="text"
                    placeholder="Pesquise por Cidade"
                    style={{ width: '100%' }}
                    onChange={event => onChange(event.target.value)}
                />

        }, {
            Header: 'UF',
            filterable: false,
            accessor: 'En_Estado',
            getProps: () => {
                return{
                    style: {
                        textAlign: 'center'
                    }
                };
            },
            width: 50

        }, {
            Header: 'Email',
            filterable: false,
            accessor: 'emailPublico',
            width: 200
        }, {
            Header: 'Telefone',
            filterable: false,
            accessor: 'telefonePublico',
            width: 100
        }];

        return(
            <ReactTable
                className="-striped -highlight fva-table"
                data={this.props.museus}
                columns={columns}
                filterable
                defaultPageSize={10}
                previousText='Anterior'
                nextText='Próximo'
                pageText='Página'
                ofText='de'
                rowsText='linhas'
                noDataText='Registros Não Encontrados'
            />
        );
    }
}
