import { Page } from "../../common/component/Page";
import { useAluno } from "./useAluno";
import { InputText } from "primereact/inputtext";
import { Aluno, StatusAluno } from "../../common/model/Aluno";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import './AlunoCadastro.css';
import { Dropdown } from "primereact/dropdown";
import { ListBox } from 'primereact/listbox';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import cursosData from "../../../assets/data/cursos.json";

export const AlunoCadastro = () => {

    const { formCadastro, onVoltar, isLoading, isFormFieldValid, classNames, toast } = useAluno();
    
    const form = formCadastro;

    const [dataNascimento, setDataNascimento] = useState<any>();

    const [curso, setCurso] = useState<any>();

    const getFormErrorMessage = (name: keyof Aluno) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    return (
        <Page title={!!form.values.id ? "Alterar Aluno" : 'Matricular Aluno'}
            breadCrumb={['Gerenciamento', !!form.values.id ? "Alterar Aluno" : 'Matricular Aluno']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <h4>Dados do Aluno</h4>
                    <Divider />
                    <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-6'>
                            <label htmlFor='nome'
                                className={classNames({ 'p-error': isFormFieldValid('nome', form) })}>Nome do Aluno
                            </label>
                            <InputText id='nome' value={form.values.nome}
                                onChange={form.handleChange} maxLength={10}
                                className={classNames({ 'p-invalid': isFormFieldValid('nome', form) }, 'input-form')} />
                            {getFormErrorMessage('nome')}
                        </div>
                        <div className='p-field p-col-3'>
                            <label htmlFor='dataNascimento'
                                className={classNames({ 'p-error': isFormFieldValid('dataNascimento', form) })}>Data de Nascimento
                            </label>
                            <Calendar dateFormat="dd/mm/yy" value={dataNascimento} placeholder="Informe a data de nascimento" onChange={(e) => setDataNascimento(e.value)}></Calendar>
                            {getFormErrorMessage('dataNascimento')}
                        </div>
                        <div className='p-field p-col-3'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('status', form) })}>Status do Aluno</label>
                            <Dropdown id='status' value={form.values.status} optionLabel={"label"} optionValue={"value"} className={classNames({ 'p-invalid': isFormFieldValid('status', form) })}
                             placeholder={'Selecione o status do Aluno'} onChange={form.handleChange} 
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: StatusAluno.ATIVO
                                    },
                                    {
                                        label: 'Inativo',
                                        value: StatusAluno.INATIVO
                                    },
                                    {
                                        label: 'Rascunho',
                                        value: StatusAluno.RASCUNHO
                                    }
                                ]} />
                            {getFormErrorMessage('status')}
                        </div>
                        <div className="p-field p-col-5">
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('status', form) })}>Curso do Aluno</label>
                            <ListBox value={curso} options={cursosData.data} optionLabel={'name'} onChange={(e) => setCurso(e.value)} filter  />
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
