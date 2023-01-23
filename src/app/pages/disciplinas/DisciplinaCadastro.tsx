import { Page } from "../../common/component/Page";
import { useDisciplina } from "./useDisciplina";
import { InputText } from "primereact/inputtext";
import { Disciplina, StatusDisciplina } from "../../common/model/Disciplina";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import './DisciplinaCadastro.css';
import { InfoIcon } from "../../common/component/InfoIcon";
import { Dropdown } from "primereact/dropdown";
import { Editor } from 'primereact/editor';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";

export const DisciplinaCadastro = () => {

    const { formCadastro, onVoltar, isLoading, isFormFieldValid, classNames, toast } = useDisciplina();

    const [diasSemana, setDiasSemanas] = useState(null);
    
    const form = formCadastro;

    const setTexto = (e: any) => {
        form.values.descricao = e.htmlValue;
    }

    const getFormErrorMessage = (name: keyof Disciplina) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    const dias = [
        { name: 'Domingo', code: 'Dom' },
        { name: 'Segunda', code: 'Seg' },
        { name: 'Terça', code: 'Ter' },
        { name: 'Quarta', code: 'Qua' },
        { name: 'Quinta', code: 'Qui' },
        { name: 'Sexta', code: 'Sex' },
        { name: 'Sábado', code: 'Sab' }
    ];

    const [horarios, setHorarios] = useState([] as any);

    const onCityChange = (e: any) => {
        let selectedCities = [...horarios];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);
            setHorarios(selectedCities);
    }

    return (
        <Page title={!!form.values.id ? "Alterar Disciplina" : 'Cadastrar Disciplina'}
            breadCrumb={['Gerenciamento', !!form.values.id ? "Alterar Disciplina" : 'Cadastrar Disciplina']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <h4>Dados do Disciplina</h4>
                    <Divider />
                    <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-9'>
                            <label htmlFor='nome'
                                className={classNames({ 'p-error': isFormFieldValid('nome', form) })}>Nome do Disciplina
                                <InfoIcon
                                    info="Nome do Disciplina"
                                    className="sigla-info" />
                            </label>
                            <InputText id='nome' value={form.values.nome}
                                onChange={form.handleChange} maxLength={10}
                                className={classNames({ 'p-invalid': isFormFieldValid('nome', form) }, 'input-form')} />
                            {getFormErrorMessage('nome')}
                        </div>
                        <div className='p-field p-col-3'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('sigla', form) })}>Status do Disciplina</label>
                            <Dropdown id='status' value={form.values.status} optionLabel={"label"} optionValue={"value"} className={classNames({ 'p-invalid': isFormFieldValid('status', form) })}
                             placeholder={'Selecione o status do Disciplina'} onChange={form.handleChange} 
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: StatusDisciplina.ATIVO
                                    },
                                    {
                                        label: 'Inativo',
                                        value: StatusDisciplina.INATIVO
                                    },
                                    {
                                        label: 'Rascunho',
                                        value: StatusDisciplina.RASCUNHO
                                    }
                                ]} />
                            {getFormErrorMessage('status')}
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor='descricao'
                                className={classNames({ 'p-error': isFormFieldValid('descricao', form) })}>Descrição do Disciplina</label>
                            <Editor style={{height:'200px'}} id='descricao' className={classNames({ 'p-invalid': isFormFieldValid('descricao', form) })} value={form.values.descricao} onTextChange={(e) => setTexto(e)} />
                            {getFormErrorMessage('descricao')}
                        </div>
                        <div className="p-field p-col-7">
                            <label htmlFor='dias'
                                className={classNames({ 'p-error': isFormFieldValid('descricao', form) })}>Dias que haverão aula</label>
                            <MultiSelect value={diasSemana} options={dias} onChange={(e) => setDiasSemanas(e.value)} optionLabel="name" placeholder="Selecione os dias" display="chip" />
                        </div>
                        <div className="p-field p-col-5">
                            <label htmlFor='horario'
                                className={classNames({ 'p-error': isFormFieldValid('descricao', form) })}>Horário da Aula</label>
                            <div className="field-checkbox">
                                <Checkbox inputId="city1" name="city" value="8h" onChange={onCityChange} checked={horarios.indexOf('8h') !== -1} />
                                <label htmlFor="city1" style={{marginLeft: '10px'}}>08h às 11h</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox inputId="city2" name="city" value="13h" onChange={onCityChange} checked={horarios.indexOf('13h') !== -1} />
                                <label htmlFor="city2" style={{marginLeft: '10px'}}>13h às 16h</label>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox inputId="city3" name="city" value="19h" onChange={onCityChange} checked={horarios.indexOf('19h') !== -1} />
                                <label htmlFor="city3" style={{marginLeft: '10px'}}>19h às 22h</label>
                            </div>
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
