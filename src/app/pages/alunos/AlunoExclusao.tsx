import {Page} from "../../common/component/Page";
import {useAluno} from "./useAluno";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

export const AlunoExclusao = () => {
    const {formCadastro, onVoltar, onExcluir, isLoading, toast} = useAluno();

    const form = formCadastro;

    return (
        <Page title={'Excluir Aluno'} breadCrumb={['Gerenciamento', 'Exclusão de Aluno']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Aluno</h4>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Nome do Aluno</label>
                        {formCadastro.values.nome}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Curso do Aluno</label>
                        {formCadastro.values.curso}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Excluir" color="accent"
                            onClick={() => onExcluir(form.values)} className="p-ml-2 p-button-warn"/>
                </div>
            </>
        </Page>
    );
}
