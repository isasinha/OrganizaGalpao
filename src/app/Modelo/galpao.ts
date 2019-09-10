export interface Galpao{
    nomeGalpao: string;
    largura: number;
    altura: number;
    profundidade: number;
    imagem?: any;
}

export interface Unidade{
    nomeUnidade: string;
    unidadesGalpao?: Galpao;
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

export const snapshotToArrayGalpao = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
       let galpao = element.val();
       galpao.key = element.key;
      returnArray.push(galpao); 
    });
    return returnArray;
}