import { Page } from "../../common/component/Page";
import { useProfessor } from "./useProfessor";
import { InputText } from "primereact/inputtext";
import { Professor, StatusProfessor } from "../../common/model/Professor";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import './ProfessorCadastro.css';
import { Dropdown } from "primereact/dropdown";
import { ListBox } from 'primereact/listbox';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import disciplinasData from "../../../assets/data/disciplinas.json";

export const ProfessorCadastro = () => {

    const { formCadastro, onVoltar, isLoading, isFormFieldValid, classNames, toast } = useProfessor();
    
    const form = formCadastro;

    const [dataNascimento, setDataNascimento] = useState<any>();

    const [curso, setCurso] = useState<any>();

    const getFormErrorMessage = (name: keyof Professor) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    return (
        <Page title={!!form.values.id ? "Alterar Professor" : 'Matricular Professor'}
            breadCrumb={['Gerenciamento', !!form.values.id ? "Alterar Professor" : 'Matricular Professor']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <h4>Dados do Professor</h4>
                    <Divider />
                    <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-6'>
                            <label htmlFor='nome'
                                className={classNames({ 'p-error': isFormFieldValid('nome', form) })}>Nome do Professor
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
                            <Calendar dateFormat="dd/mm/yy" value={dataNascimento} placeholder="Informe a data de nascimento" className={classNames({ 'p-invalid': isFormFieldValid('dataNascimento', form) }, 'input-form')} onChange={(e) => setDataNascimento(e.value)}></Calendar>
                            {getFormErrorMessage('dataNascimento')}
                        </div>
                        <div className='p-field p-col-3'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('status', form) })}>Status do Professor</label>
                            <Dropdown id='status' value={form.values.status} optionLabel={"label"} optionValue={"value"} className={classNames({ 'p-invalid': isFormFieldValid('status', form) })}
                             placeholder={'Selecione o status do Professor'} onChange={form.handleChange} 
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: StatusProfessor.ATIVO
                                    },
                                    {
                                        label: 'Inativo',
                                        value: StatusProfessor.INATIVO
                                    },
                                    {
                                        label: 'Rascunho',
                                        value: StatusProfessor.RASCUNHO
                                    }
                                ]} />
                            {getFormErrorMessage('status')}
                        </div>
                        <div className="p-field p-col-5">
                            <label htmlFor='disciplina'
                                className={classNames({ 'p-error': isFormFieldValid('disciplina', form) })}>Disciplinas do Professor</label>
                            <ListBox value={curso} options={disciplinasData.data} optionLabel={'name'} onChange={(e) => setCurso(e.value)} filter multiple  />
                            {getFormErrorMessage('disciplina')}
                        </div>
                        <div className="p-field p-col-3">
                        <label htmlFor='salario'
                                className={classNames({ 'p-error': isFormFieldValid('salario', form) })}>Salário do Professor (Mensal)</label>
                            <InputText id="salario" value={form.values.salario} keyfilter="money" className={classNames({ 'p-invalid': isFormFieldValid('salario', form) }, 'input-form')} />
                            {getFormErrorMessage('salario')}
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
