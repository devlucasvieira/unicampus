import {Page} from "../../common/component/Page";
import {useProfessor} from "./useProfessor";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Divider } from "primereact/divider";

export const ProfessorDetalhe = () => {
    const {
        formCadastro,
        onVoltar,
        onEditar,
        isLoading,
        toast
    } = useProfessor();

    const form = formCadastro;

    return (
        <Page title={'Visualizar Professor'} breadCrumb={['Gerenciamento', 'Visualizar Professor']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Professor</h4>
                <Divider></Divider>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-9'>
                        <label>Nome do Professor</label>
                        {formCadastro.values.nome}
                    </div>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
                    </div>
                </div>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Disciplinas do Professor</label>
                        {formCadastro.values.disciplina}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Editar" color="accent"
                            onClick={() => onEditar(form.values)} className="p-ml-2 "/>
                </div>
            </>
        </Page>
    );
}
