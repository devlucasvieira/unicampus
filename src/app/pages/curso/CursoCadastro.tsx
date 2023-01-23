import { Page } from "../../common/component/Page";
import { useCurso } from "./useCurso";
import { InputText } from "primereact/inputtext";
import { Curso, StatusCurso } from "../../common/model/Curso";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import './CursoCadastro.css';
import { InfoIcon } from "../../common/component/InfoIcon";
import { Dropdown } from "primereact/dropdown";
import { Editor } from 'primereact/editor';

export const CursoCadastro = () => {

    const { formCadastro, onVoltar, isLoading, isFormFieldValid, classNames, toast } = useCurso();
    
    const form = formCadastro;

    const setTexto = (e: any) => {
        form.values.descricao = e.htmlValue;
    }

    const getFormErrorMessage = (name: keyof Curso) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    return (
        <Page title={!!form.values.id ? "Alterar Curso" : 'Cadastrar Curso'}
            breadCrumb={['Gerenciamento', !!form.values.id ? "Alterar Curso" : 'Cadastrar Curso']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <h4>Dados do Curso</h4>
                    <Divider />
                    <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-9'>
                            <label htmlFor='nome'
                                className={classNames({ 'p-error': isFormFieldValid('nome', form) })}>Nome do Curso
                                <InfoIcon
                                    info="Nome do Curso"
                                    className="sigla-info" />
                            </label>
                            <InputText id='nome' value={form.values.nome}
                                onChange={form.handleChange} maxLength={10}
                                className={classNames({ 'p-invalid': isFormFieldValid('nome', form) }, 'input-form')} />
                            {getFormErrorMessage('nome')}
                        </div>
                        <div className='p-field p-col-3'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('status', form) })}>Status do Curso</label>
                            <Dropdown id='status' value={form.values.status} optionLabel={"label"} optionValue={"value"} className={classNames({ 'p-invalid': isFormFieldValid('status', form) })}
                             placeholder={'Selecione o status do Curso'} onChange={form.handleChange} 
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: StatusCurso.ATIVO
                                    },
                                    {
                                        label: 'Inativo',
                                        value: StatusCurso.INATIVO
                                    },
                                    {
                                        label: 'Rascunho',
                                        value: StatusCurso.RASCUNHO
                                    }
                                ]} />
                            {getFormErrorMessage('status')}
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor='descricao'
                                className={classNames({ 'p-error': isFormFieldValid('descricao', form) })}>Descrição do Curso</label>
                            <Editor style={{height:'320px'}} id='descricao' className={classNames({ 'p-invalid': isFormFieldValid('descricao', form) })} value={form.values.descricao} onTextChange={(e) => setTexto(e)} />
                            {getFormErrorMessage('descricao')}
                        </div>
                    </div>
                    <div className='p-d-flex p-jc-end'>
                        <Button type="button" label="Limpar" className="p-ml-3  p-button-secondary"
                                onClick={() => form.resetForm()} color='accent'/>
                        <Button type="button" label="Voltar" className="p-ml-3 p-button-secondary"
                            onClick={() => onVoltar()} color='accent' />
                        <Button type="submit" label="Confirmar" className="p-ml-3" />
                    </div>
                </form>
            </>
        </Page>
    );
}
