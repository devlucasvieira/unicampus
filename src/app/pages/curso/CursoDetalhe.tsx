import {Page} from "../../common/component/Page";
import {useCurso} from "./useCurso";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Divider } from "primereact/divider";

export const CursoDetalhe = () => {
    const {
        formCadastro,
        onVoltar,
        onEditar,
        isLoading,
        toast
    } = useCurso();

    const form = formCadastro;

    return (
        <Page title={'Visualizar Curso'} breadCrumb={['Gerenciamento', 'Visualizar Curso']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Curso</h4>
                <Divider></Divider>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-9'>
                        <label>Nome do Curso</label>
                        {formCadastro.values.nome}
                    </div>
                    <div className='p-field p-col-3'>
                        <label>Situação</label>
                        {formCadastro.values?.status}
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
                    <Button type="button" label="Editar" color="accent"
                            onClick={() => onEditar(form.values)} className="p-ml-2 "/>
                </div>
            </>
        </Page>
    );
}
