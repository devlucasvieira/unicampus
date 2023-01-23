import React from "react";
import { Page } from "../../common/component/Page";
import './DisciplinaListar.css';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDisciplina } from "./useDisciplina";
import { HistoricoDisciplina } from "../../common/model/Disciplina";
import iconDelete from '../../../assets/images/delete.png';
import iconDetalhe from '../../../assets/images/detalhe.png';
import iconEdicao from '../../../assets/images/edit.png';
import iconHistorico from '../../../assets/images/historico.png';

export const DisciplinaListar = () => {
    const {
        toast, formFiltro, onDetalhar, onEditar, onDetalharExclusao, isLoading,
        disciplinas, onCadastrar, onExportExcel, onExportPdf
    } = useDisciplina();
    const form = formFiltro;

    const opcoes = (e: HistoricoDisciplina) => <>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalhar(e.id)}>
            <img className="icon" src={iconDetalhe} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onEditar(e)}>
            <img className="icon" src={iconEdicao} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalharExclusao(e)}>
            <img className="icon" src={iconDelete} />
        </Button>
    </>;

    return (
        <Page title={'Consultar Disciplina'} breadCrumb={['Gerenciamento', 'Consultar Disciplina']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <Divider />
                <form onSubmit={form.handleSubmit} className='w-100'>
                    <div className='p-fluid p-formgrid p-grid'>

                        <div className='p-field p-col-5'>
                            <label htmlFor='nomeDisciplina'>Nome do Disciplina</label>
                            <InputText id='nomeDisciplina' value={form.values.nome}
                                onChange={form.handleChange} />
                        </div>

                        <div className='p-field p-col-5'>
                            <label htmlFor='grupoDisciplina'>Período</label>
                            <Dropdown id='grupoDisciplina' value={form.values.status} placeholder={"Selecione o Grupo"}
                                optionLabel={"label"} optionValue={"value"} onChange={form.handleChange}
                                options={[
                                    {
                                        label: 'Matutino',
                                        value: '1'
                                    },
                                    {
                                        label: 'Vespertino',
                                        value: '2'
                                    },
                                    {
                                        label: 'Noturno',
                                        value: '3'
                                    }
                                ]} />
                        </div>

                        <div className='p-field p-col-2'>
                            <label htmlFor='situacao'>Status</label>
                            <Dropdown id='situacao' value={form.values.status}  placeholder={"Selecione a Situação"}
                                optionLabel={"label"} optionValue={"value"} onChange={form.handleChange}
                                options={[
                                    {
                                        label: 'Ativa',
                                        value: 'ativo'
                                    },
                                    {
                                        label: 'Cancelada',
                                        value: 'cancelado'
                                    }
                                ]} />
                        </div>
                    </div>

                    <div className='p-d-flex p-jc-end'>
                        <Button type="button" label="Cadastrar" className="p-ml-3 "
                            color='accent' onClick={() => onCadastrar()} />
                        <Button type="button" label="Limpar" className="p-ml-3  p-button-secondary"
                            onClick={() => form.resetForm()} color='accent' />
                        <Button type="submit" label="Consultar" className="p-ml-3 " />
                    </div>
                </form>

                <Divider />
                {
                    disciplinas !== null &&
                    <>
                        <div className='p-d-flex p-jc-end'>
                            <Button className='p-button-icon p-button-text'
                                icon='pi pi-file-pdf p-icon-28' type={"button"}
                                onClick={() => onExportPdf()} />
                            <Button className='p-button-icon p-button-text'
                                icon='pi pi-file-excel p-icon-28' type={"button"}
                                onClick={() => onExportExcel()} />
                        </div>
                        <div>
                            <DataTable value={disciplinas} paginator rows={5} emptyMessage="Nenhuma disciplina encontrada.">
                                <Column field='name' header='Nome' />
                                <Column field='description' header='Descrição' />
                                <Column body={(e) => e?.status}
                                    header='Status' style={{ textAlign: 'center' }}
                                    headerStyle={{ textAlign: 'center' }} />
                                <Column body={(e) => opcoes(e)} style={{ textAlign: 'center' }}
                                    header='Opções' headerStyle={{ textAlign: 'center' }} />
                            </DataTable>
                        </div>
                        <p className="p-text-center pt-3 pb-3">Total de disciplinas encontrados na pesquisa:</p>
                    </>
                }
            </>
        </Page>
    );
}