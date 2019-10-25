import { Usuario } from "./usuario";

export interface Galpao{
    nomeGalpao: string;
    largura: number;
    altura: number;
    profundidade: number;
    imagem?: any;
    usuarios?: Usuario[]
}

export interface Unidade{
    nomeUnidade: string;
    unidadesGalpao?: Galpao[];
    endereco?: string;
    telefone?: string;
}

export const snapshotToArrayUnidade = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let unidade = element.val();
       unidade.key = element.key;
      returnArray.push(unidade); 
    });
    return returnArray;
}

export const snapshotToArrayUnidadeNome = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let unidade = element.val();
       unidade.key = element.key;
      returnArray.push(unidade.nomeUnidade); 
    });
    return returnArray;
}

export const snapshotToArrayGalpao = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let galpao = element.val();
       galpao.key = element.key;
      returnArray.push(galpao); 
    });
    return returnArray;
}

export const snapshotToArrayGalpaoKey = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let galpao = element.val();
       galpao.key = element.key;
      returnArray.push(galpao.key); 
    });
    return returnArray;
}

export const snapshotToArrayUnidadeKey = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let unidade = element.val();
       unidade.key = element.key;
      returnArray.push(unidade.key); 
    });
    return returnArray;
}

export const snapshotToArrayGalpaoNome = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let galpao = element.val();
       galpao.key = element.key;
      returnArray.push(galpao.nomeGalpao); 
    });
    return returnArray;
}



export const snapshotToArrayUsuario = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let usuario = element.val();
       usuario.key = element.key;
      returnArray.push(usuario); 
    });
    return returnArray;
}

export const snapshotToArrayItens = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
        let item = element.val();
        item.key = element.key;
        returnArray.push(item); 
    });
    return returnArray;
}
