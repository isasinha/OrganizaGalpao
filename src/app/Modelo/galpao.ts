export interface Galpao{
    unidade: string;
    nomeGalpao: string;
    largura: number;
    altura: number;
    profundidade: number;
    imagem?: any;
}

export interface Unidade{
    unidade: string;
    galpao?: Galpao;
}