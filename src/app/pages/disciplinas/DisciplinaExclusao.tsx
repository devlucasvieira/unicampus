import { Page } from "../../common/component/Page";
import { useDisciplina } from "./useDisciplina";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
export const DisciplinaExclusao = () => {
  const {
    formCadastro,
    onVoltar,
    onExcluir,
    isLoading,
    toast,
  } = useDisciplina();

  const form = formCadastro;

  return (
    <Page
      title={"Excluir Disciplina"}
      breadCrumb={["Gerenciamento", "Exclusão de Disciplina"]}
      loading={isLoading}
    >
      <>
        <Toast ref={toast} />

        <h4>Dados do Disciplina</h4>
        <Divider></Divider>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-9">
            <label>Nome do Disciplina</label>
            {formCadastro.values.nome}
          </div>
          <div className="p-field p-col-3">
            <label>Situação</label>
            {formCadastro.values?.status}
          </div>
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label>Descrição do Disciplina</label>
            {formCadastro.values.descricao}
          </div>
        </div>
        <div className="p-d-flex p-jc-end">
          <Button
            type="button"
            label="Voltar"
            className=" p-button-secondary"
            onClick={() => onVoltar()}
            color="accent"
          />
          <Button
            type="button"
            label="Excluir"
            color="accent"
            onClick={() => onExcluir(form.values)}
            className="p-ml-2 p-button-warn"
          />
        </div>
      </>
    </Page>
  );
};
