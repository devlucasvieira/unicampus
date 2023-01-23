import {Page} from "../../common/component/Page";
import {useCurso} from "./useCurso";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

export const CursoExclusao = () => {
    const {formCadastro, onVoltar, onExcluir, isLoading, toast} = useCurso();

    const form = formCadastro;

    return (
        <Page title={'Excluir Curso'} breadCrumb={['Gerenciamento', 'Exclusão de Curso']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Curso</h4>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Nome do Curso</label>
                        {formCadastro.values.nome}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Descrição do Curso</label>
                        {formCadastro.values.descricao}
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
