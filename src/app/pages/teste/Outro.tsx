import {useHttpClient} from "../../common/hooks/useHttpClient";
import {useEffect} from "react";
import {Page} from "../../common/component/Page";

const Outro = () => {

    const { httpGet, isLoading } = useHttpClient<any>();

    useEffect( () => {
        httpGet( '/cfops' ).then( data => console.log( data ) );
    }, [ httpGet ] );

    return (
        <Page title={'Outra pagina'} loading={isLoading}>
            <div>Outro</div>
        </Page>
    );
}

export default Outro;