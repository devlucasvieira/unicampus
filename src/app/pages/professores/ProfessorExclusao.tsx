import {Page} from "../../common/component/Page";
import {useProfessor} from "./useProfessor";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

export const ProfessorExclusao = () => {
    const {formCadastro, onVoltar, onExcluir, isLoading, toast} = useProfessor();

    const form = formCadastro;

    return (
        <Page title={'Excluir Professor'} breadCrumb={['Gerenciamento', 'Exclusão de Professor']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Professor</h4>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Nome do Professor</label>
                        {formCadastro.values.nome}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Descrição do Professor</label>
                        {formCadastro.values.disciplina}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Excluir" color="accent"
                            onClick={() => onExcluir()} className="p-ml-2 p-button-warn"/>
                </div>
            </>
        </Page>
    );
}
