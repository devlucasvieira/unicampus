import { Page } from "../../common/component/Page";
import './AlunoListar.css';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAluno } from "./useAluno";
import { HistoricoAluno } from "../../common/model/Aluno";
import iconDelete from '../../../assets/images/delete.png';
import iconDetalhe from '../../../assets/images/detalhe.png';
import iconEdicao from '../../../assets/images/edit.png';

export const AlunoListar = () => {
    const {
        toast, formFiltro, onDetalhar, onEditar, onDetalharExclusao, isLoading,
        alunos, onCadastrar, onExportExcel, onExportPdf
    } = useAluno();
    const form = formFiltro;

    const opcoes = () => <>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalhar(1)}>
            <img className="icon" alt="Visualizar registro" src={iconDetalhe} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onEditar(1)}>
            <img className="icon" alt="Alterar o registro" src={iconEdicao} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalharExclusao(1)}>
            <img className="icon" alt="Excluir o registro" src={iconDelete} />
        </Button>
    </>;

    return (
        <Page title={'Consultar Aluno'} breadCrumb={['Gerenciamento', 'Consultar Aluno']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <Divider />
                <form onSubmit={form.handleSubmit} className='w-100'>
                    <div className='p-fluid p-formgrid p-grid'>

                        <div className='p-field p-col-9'>
                            <label htmlFor='nomeAluno'>Nome do Aluno</label>
                            <InputText id='nomeAluno' value={form.values.nome}
                                onChange={form.handleChange} />
                        </div>

                        <div className='p-field p-col-3'>
                            <label htmlFor='situacao'>Situação do Aluno</label>
                            <Dropdown id='situacao' value={form.values.status}  placeholder={"Selecione a Situação"}
                                optionLabel={"label"} optionValue={"value"} onChange={form.handleChange}
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: 'ativo'
                                    },
                                    {
                                        label: 'Cancelado',
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
                    alunos !== null &&
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
                            <DataTable value={alunos} paginator rows={5} emptyMessage="Nenhum aluno encontrado.">
                                <Column field='nome' header='Nome do Aluno' />
                                <Column field='matricula' header='Matrícula' />
                                <Column body={(e) => e?.status}
                                    header='Status' style={{ textAlign: 'center' }}
                                    headerStyle={{ textAlign: 'center' }} />
                                <Column body={() => opcoes()} style={{ textAlign: 'center' }}
                                    header='Opções' headerStyle={{ textAlign: 'center' }} />
                            </DataTable>
                        </div>
                        <p className="p-text-center pt-3 pb-3" >Total de alunos encontrados na pesquisa: {alunos?.lenght}</p>
                    </>
                }
            </>
        </Page>
    );
}