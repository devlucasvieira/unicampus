import {Page} from "../../common/component/Page";
import {useAluno} from "./useAluno";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Divider } from "primereact/divider";

export const AlunoDetalhe = () => {
    const {
        formCadastro,
        onVoltar,
        onEditar,
        isLoading,
        toast
    } = useAluno();

    const form = formCadastro;

    return (
        <Page title={'Visualizar Aluno'} breadCrumb={['Gerenciamento', 'Visualizar Aluno']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Aluno</h4>
                <Divider></Divider>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-9'>
                        <label>Nome do Aluno</label>
                        {formCadastro.values.nome}
                    </div>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
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
                    <Button type="button" label="Editar" color="accent"
                            onClick={() => onEditar(form.values)} className="p-ml-2 "/>
                </div>
            </>
        </Page>
    );
}
