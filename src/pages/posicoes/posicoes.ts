import { Component, ViewChild, ElementRef } from '@angular/core';
// import { NavController } from 'ionic-angular';
import * as THREE from 'three';
// import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ManterPosicaoPage } from '../manter-posicao/manter-posicao';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Galpao } from '../../app/Modelo/galpao';

@Component({
  selector: 'page-posicoes',
  templateUrl: 'posicoes.html',
})
export class PosicoesPage {

  exemploImg =  'assets/imgs/exemploImg.jpg';

  public keyGalpao = '';
  public nomeUsuario: any = '';
  public keyUsuario: any = '';
  public cpfUsuario: any = '';
  public nomeGalpao: any = '';
  public nomeUnidade: any = '';
  public keyUnidade: any = '';
  public galpao: Galpao;
  opcaoSelecionada: any;
  public opcoes: Array<{posicao: string}>
  galpoesPosicoes = [];
  public posicoes: Array<any> = [];
  ref = firebase.database().ref('/armazenamento');
  refUni = firebase.database().ref('/unidade');
  public posicao = '';
  public posicaoKey = '';
  public busca = '';
  public imagem;
  public windowWidth = window.innerWidth;

  public profundidade:number = 0;
  public altura:number = 0;
  public largura:number = 0;

  public profZoom = 1;
  public positions = [];
  public jsonPositions: Array<{}>=[]
  public pos = ''

  criaView(altura: number, largura: number){
    var arrayPositions = [];
    for(var x=0; x<altura; x++ ){
      arrayPositions = [];
      for(var y=0; y<largura; y++){
        this.pos = "A"+(x+1)+"-L"+(y+1)
        arrayPositions.push(this.pos)
        
      }
      this.jsonPositions[x]=arrayPositions
    }
    return this.jsonPositions;
  }

  constructor(public navCtrl: NavController,
    //     public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public dbService: FirebaseServiceProvider,
    public db: AngularFireDatabase
    ) {

      this.keyGalpao = navParams.get('keyGalpao');
      this.nomeUsuario = navParams.get('nome');
      this.keyUsuario = navParams.get('key'); 
      this.cpfUsuario = navParams.get('cpf');
      this.nomeGalpao = navParams.get('nomeGalpao');
      this.nomeUnidade = navParams.get('nomeUnidade');
      this.keyUnidade = navParams.get('keyUnidade');
      this.galpao = navParams.get('galpao');
      this.imagem = this.galpao.imagem;
  
      this.galpoesPosicoes = [];
      const snapshotToArrayPosicoes = snapshot => {
        snapshot.forEach(element => {
          let galpaoPosicao = element.val();
          galpaoPosicao.key = element.key;
          this.galpoesPosicoes.push(galpaoPosicao.key);
        });
        return this.galpoesPosicoes;
      }
      this.ref.child(this.keyGalpao+'/posicao/').on('value', resp => {
        this.posicoes = [];
        this.posicoes = snapshotToArrayPosicoes(resp);
      })
  
      var medidas = this.dbService.geraPosicao(this.galpao);


      this.profundidade = medidas[0];
      this.altura = medidas[1];
      this.largura = medidas[2];
  
      this.opcaoSelecionada = navParams.get('opcao');
      var i = 0;
      this.opcoes = [];
      while (i < this.posicoes.length){
        this.posicao = this.posicoes[i];
        this.opcoes.push({posicao: this.posicao})  
        i = i+1;
      }

      this.positions = this.criaView(this.altura, this.largura);

  }

  @ViewChild ('domObj') canvasEl: ElementRef;

  private _ELEMENT: any;
  private _SCENE;
  private _CAMERA;
  public renderer;
  // private _GEOMETRY;
  public _MATERIAL;
  public _CUBE;
  public _SPRITE;

  ionViewDidLoad (): void{
    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }

  initialiseWebGLObjectAndEnvironment (): void{
    this._ELEMENT = this.canvasEl.nativeElement;
    this._SCENE = new THREE.Scene();
    // this._CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this._CAMERA = new THREE.PerspectiveCamera(75, 9/8, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setSize (window.innerWidth, window.innerHeight);
    if (this.windowWidth > 600){
      this.renderer.setSize (750, 625);
    }else{
      this.renderer.setSize (240, 190);
    }
    this._ELEMENT.appendChild(this.renderer.domElement);
    /*this._GEOMETRY = new THREE.BoxGeometry(3, 3, 3);
    this._MATERIAL = new THREE.MeshBasicMaterial({
      color: 0x0000FF,
      wireframe: true
    });
    this._CUBE = new THREE.Mesh (this._GEOMETRY, this._MATERIAL);
    let spriteMap = new THREE.TextureLoader().load("../assets/imgs/pao_cru.jpeg");
    let spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      sizeAttenuation: false
    });
    this._SPRITE= new THREE.Sprite(spriteMaterial);
    this._SCENE.add (this._SPRITE)
    //this._SCENE.add(this._CUBE);
    this._CAMERA.position.z = 20;*/
    this._CAMERA.position.z = 5;
    let textureLoader = new THREE.TextureLoader();
    if(!this.imagem)
    this.imagem = this.exemploImg;
    // let texture1  = textureLoader.load(this.exemploImg)
    let texture1  = textureLoader.load(this.imagem)
    let materials = [
      new THREE.MeshBasicMaterial (null),
      new THREE.MeshBasicMaterial (null),
      new THREE.MeshBasicMaterial ({map: texture1}),
      new THREE.MeshBasicMaterial ({map: texture1}),
      new THREE.MeshBasicMaterial ({map: texture1}),
      
    ]
    //let faceMaterial = new THREE.MultiMaterial (materials);
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    this._CUBE  = new THREE.Mesh (geometry, materials);
    this._SCENE.add(this._CUBE);
  }



  private _animate (): void {
    requestAnimationFrame (() => {
      this._animate()
    })
    //this._CUBE.rotation.x += 0.015;
    //this._CUBE.rotation.y += 0.015;
    this.renderer.render(this._SCENE, this._CAMERA);
  }
  renderAnimation(): void{
    this._animate();
  }

  x (): void {
    this._CUBE.rotation.x -= 0.3;
    //this._CAMERA.position.x -= 0.2
  }

  y (): void {
    this._CUBE.rotation.y -= 0.3;
    //this._CAMERA.position.y -= 0.2
  }
  z (): void {
    this._CUBE.rotation.z -= 0.3;
    //this._CAMERA.position.y += 15

    //this._CAMERA.position.z -= 0.2
    /*this._CAMERA.position.z -= 0.5;
    if (this._CAMERA.position.z == 2){
      this._CAMERA.position.z = 5;
    }*/
    //alert ("executou zoom")
    
    
  }

  zoom (): void{
    var zoomPosition = 5 - (this.profundidade*0.1)
    this._CAMERA.position.z -= 0.1
    this.profZoom = this.profZoom + 1;
    if (this._CAMERA.position.z.toFixed(1) == zoomPosition){
      this._CAMERA.position.z = 5;
      this.profZoom = 1;
    }
    this.positions = this.criaView(this.altura, this.largura);
  }

  rotacionar (): void {
   
   
      //this._CUBE.rotation.y -=100
      //this._CUBE.rotation.x -=100
      //this._CUBE.rotation.y +=100
      this._CUBE.rotation.y +=100
  
    
  }

  tamanhoLinha(){     
    let fonte;
    if (this.windowWidth > 600){
      fonte = 625 - (this.altura * 14)
    }else{
      fonte = 190 - (this.altura * 12)
    }
    // let novaAltura:number = (Number(this.altura)) + 1; 
    let tamanho = fonte / this.altura;
    let tamanhoLinha = tamanho + 'px';
    return {'line-height': tamanhoLinha}
  }

  opcaoEscolhida(posicao){ 
    let posicaoModal = this.modalCtrl.create(ManterPosicaoPage, {
      galpao: this.keyGalpao,
      posicao: "P"+this.profZoom+"-"+ posicao});
    posicaoModal.present();

    posicaoModal.onDidDismiss(data => {  
      console.log(data);
    });
  }

  liberarGalpao(){
    const alert = this.alertCtrl.create({
      subTitle: 'Deseja liberar este galpão?',
      message: 'Atenção, todos os itens cadastrados serão excluidos. Essa ação não pode ser desfeita!',
      buttons: [{
      text: 'Não',
      handler: () => {}
      },
      {
      text: 'Sim',
      handler: () => {this.liberarGalpaoUser();}
      }]});
    alert.present()
  }
  
  liberarGalpaoUser(){
    const loading = this.loadingCtrl.create({
      content: 'Logando...'
    });
    loading.present();
    this.db.object('/armazenamento/'+this.keyGalpao).remove();
    const snapshotToArrayUnidadeKey = snapshot => {
      let returnArray = [];
      let unidadeKey = '';
      snapshot.forEach(element => {
        let unidade = element.val();
        unidade.key = element.key;
        unidadeKey = unidade.key;
  
        const snapshotToArrayGalpao = snapshot => {
          let outroArray = [];
          snapshot.forEach(element => {
              let galpao = element.val();
              galpao.key = element.key;
              if(galpao.key == this.keyGalpao){
              outroArray.push(galpao); 
              this.dbService.cadastraGalpaoLiberar(galpao, this.keyGalpao);
              }
          });
          return outroArray;
        }
        this.refUni.child(unidadeKey+'/unidadesGalpao/').on('value', resp => {
          this.posicoes = [];
          this.posicoes = snapshotToArrayGalpao(resp);
        })
  
      });
      return returnArray;
    }
  
    this.refUni.on('value', resp => {
      this.posicoes = [];
      this.posicoes = snapshotToArrayUnidadeKey(resp);
    })
    loading.dismiss(); 
    const alert = this.alertCtrl.create({
      subTitle: 'Galpão liberado com sucesso!',
      buttons: [{
      text: 'Ok',
      handler: () => {this.voltar();}
      }]});
    alert.present()
  }
      
    
  voltar(){
    this.navCtrl.setRoot(HomePage, {
      key: this.keyUsuario,
      nome: this.nomeUsuario,
      cpf: this.cpfUsuario
    })
  }
    


}




// import { Component, ViewChild, ElementRef } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import * as THREE from 'three';

// @Component({
//   selector: 'page-posicoes',
//   templateUrl: 'posicoes.html',
// })
// export class PosicoesPage {

//   constructor(public navCtrl: NavController) {

//   }

//   @ViewChild ('domObj') canvasEl: ElementRef;

//   private _ELEMENT: any;
//   private _SCENE;
//   private _CAMERA;
//   public renderer;
//   // private _GEOMETRY;
//   public _MATERIAL;
//   public _CUBE;
//   public _SPRITE;

//   ionViewDidLoad (): void{
//     this.initialiseWebGLObjectAndEnvironment();
//     this.renderAnimation();
//   }

//   initialiseWebGLObjectAndEnvironment (): void{
//     this._ELEMENT = this.canvasEl.nativeElement;
//     this._SCENE = new THREE.Scene();
//     this._CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     this.renderer = new THREE.WebGLRenderer();
//     this.renderer.setSize (window.innerWidth, window.innerHeight);
//     this._ELEMENT.appendChild(this.renderer.domElement);
//     /*this._GEOMETRY = new THREE.BoxGeometry(3, 3, 3);
//     this._MATERIAL = new THREE.MeshBasicMaterial({
//       color: 0x0000FF,
//       wireframe: true
//     });
//     this._CUBE = new THREE.Mesh (this._GEOMETRY, this._MATERIAL);
//     let spriteMap = new THREE.TextureLoader().load("../assets/imgs/pao_cru.jpeg");
//     let spriteMaterial = new THREE.SpriteMaterial({
//       map: spriteMap,
//       sizeAttenuation: false
//     });
//     this._SPRITE= new THREE.Sprite(spriteMaterial);
//     this._SCENE.add (this._SPRITE)
//     //this._SCENE.add(this._CUBE);
//     this._CAMERA.position.z = 20;*/
//     this._CAMERA.position.z = 5;
//     let textureLoader = new THREE.TextureLoader();
//     let texture1  = textureLoader.load("assets/imgs/exemploImg.jpg")
//     let materials = [
//       new THREE.MeshBasicMaterial (null),
//       new THREE.MeshBasicMaterial (null),
//       new THREE.MeshBasicMaterial ({map: texture1}),
//       new THREE.MeshBasicMaterial ({map: texture1}),
//       new THREE.MeshBasicMaterial ({map: texture1}),
      
//     ]
//     //let faceMaterial = new THREE.MultiMaterial (materials);
//     let geometry = new THREE.BoxGeometry(3, 3, 3);
//     this._CUBE  = new THREE.Mesh (geometry, materials);
//     this._SCENE.add(this._CUBE);
//   }



//   private _animate (): void {
//     requestAnimationFrame (() => {
//       this._animate()
//     })
//     //this._CUBE.rotation.x += 0.015;
//     //this._CUBE.rotation.y += 0.015;
//     this.renderer.render(this._SCENE, this._CAMERA);
//   }
//   renderAnimation(): void{
//     this._animate();
//   }

//   x (): void {
//     this._CUBE.rotation.x -= 0.3;
//     //this._CAMERA.position.x -= 0.2
//   }

//   y (): void {
//     this._CUBE.rotation.y -= 0.3;
//     //this._CAMERA.position.y -= 0.2
//   }
//   z (): void {
//     this._CUBE.rotation.z -= 0.3;
//     //this._CAMERA.position.y += 15

//     //this._CAMERA.position.z -= 0.2
//     /*this._CAMERA.position.z -= 0.5;
//     if (this._CAMERA.position.z == 2){
//       this._CAMERA.position.z = 5;
//     }*/
//     //alert ("executou zoom")
    
    
//   }

//   zoom (): void{
//     this._CAMERA.position.z -= 0.5
//     if (this._CAMERA.position.z == 2){
//       this._CAMERA.position.z = 5;
//     }

//   }

//   rotacionar (): void {
   
   
//       //this._CUBE.rotation.y -=100
//       //this._CUBE.rotation.x -=100
//       //this._CUBE.rotation.y +=100
//       this._CUBE.rotation.y +=100
  
    
//   }
// }


// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
// import { HomePage } from '../home/home';
// import * as firebase from 'firebase';
// import { ManterPosicaoPage } from '../manter-posicao/manter-posicao';
// import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { Galpao } from '../../app/Modelo/galpao';

// @IonicPage()
// @Component({
//   selector: 'page-posicoes',
//   templateUrl: 'posicoes.html',
// })
// export class PosicoesPage {

//   exemploImg =  'assets/imgs/exemploImg.jpg';

//   public keyGalpao = '';
//   public nomeUsuario: any = '';
//   public keyUsuario: any = '';
//   public cpfUsuario: any = '';
//   public nomeGalpao: any = '';
//   public nomeUnidade: any = '';
//   public keyUnidade: any = '';
//   public galpao: Galpao;
//   opcaoSelecionada: any;
//   public opcoes: Array<{posicao: string}>
//   galpoesPosicoes = [];
//   public posicoes: Array<any> = [];
//   ref = firebase.database().ref('/armazenamento');
//   refUni = firebase.database().ref('/unidade');
//   public posicao = '';
//   public posicaoKey = '';
//   public busca = '';
//   public imagem;

//   public profundidade:number = 0;
//   public altura:number = 0;
//   public largura:number = 0;

//   constructor(
//     public navCtrl: NavController, 
//     public navParams: NavParams,
//     public modalCtrl: ModalController,
//     private loadingCtrl: LoadingController,
//     private alertCtrl: AlertController,
//     public dbService: FirebaseServiceProvider,
//     public db: AngularFireDatabase
//     ) {
//       this.keyGalpao = navParams.get('keyGalpao');
//       this.nomeUsuario = navParams.get('nome');
//       this.keyUsuario = navParams.get('key'); 
//       this.cpfUsuario = navParams.get('cpf');
//       this.nomeGalpao = navParams.get('nomeGalpao');
//       this.nomeUnidade = navParams.get('nomeUnidade');
//       this.keyUnidade = navParams.get('keyUnidade');
//       this.galpao = navParams.get('galpao');
//       this.imagem = this.galpao.imagem;
  
//       this.galpoesPosicoes = [];
//       const snapshotToArrayPosicoes = snapshot => {
//         snapshot.forEach(element => {
//           let galpaoPosicao = element.val();
//           galpaoPosicao.key = element.key;
//           this.galpoesPosicoes.push(galpaoPosicao.key);
//         });
//         return this.galpoesPosicoes;
//       }
//       this.ref.child(this.keyGalpao+'/posicao/').on('value', resp => {
//         this.posicoes = [];
//         this.posicoes = snapshotToArrayPosicoes(resp);
//       })
  
//       var medidas = this.dbService.geraPosicao(this.galpao);


//       this.profundidade = medidas[0];
//       this.altura = medidas[1];
//       this.largura = medidas[2];
  
//       this.opcaoSelecionada = navParams.get('opcao');
//       var i = 0;
//       this.opcoes = [];
//       while (i < this.posicoes.length){
//         this.posicao = this.posicoes[i];
//         this.opcoes.push({posicao: this.posicao})  
//         i = i+1;
//       }

//     }
  
//   ionViewDidLoad() {

//   }


//   opcaoEscolhida(event, opcao){ 
//     let posicaoModal = this.modalCtrl.create(ManterPosicaoPage, {
//       galpao: this.keyGalpao,
//       posicao: opcao.posicao});
//     posicaoModal.present();

//     posicaoModal.onDidDismiss(data => {  
//       console.log(data);
//     });
//   }

//   liberarGalpao(){
//     const alert = this.alertCtrl.create({
//       subTitle: 'Deseja liberar este galpão?',
//       message: 'Atenção, todos os itens cadastrados serão excluidos. Essa ação não pode ser desfeita!',
//       buttons: [{
//       text: 'Não',
//       handler: () => {}
//       },
//       {
//       text: 'Sim',
//       handler: () => {this.liberarGalpaoUser();}
//       }]});
//     alert.present()
//   }
  
//   liberarGalpaoUser(){
//     const loading = this.loadingCtrl.create({
//       content: 'Logando...'
//     });
//     loading.present();
//     this.db.object('/armazenamento/'+this.keyGalpao).remove();
//     const snapshotToArrayUnidadeKey = snapshot => {
//       let returnArray = [];
//       let unidadeKey = '';
//       snapshot.forEach(element => {
//         let unidade = element.val();
//         unidade.key = element.key;
//         unidadeKey = unidade.key;
  
//         const snapshotToArrayGalpao = snapshot => {
//           let outroArray = [];
//           snapshot.forEach(element => {
//              let galpao = element.val();
//              galpao.key = element.key;
//              if(galpao.key == this.keyGalpao){
//               outroArray.push(galpao); 
//               this.dbService.cadastraGalpaoLiberar(galpao, this.keyGalpao);
//              }
//           });
//           return outroArray;
//         }
//         this.refUni.child(unidadeKey+'/unidadesGalpao/').on('value', resp => {
//           this.posicoes = [];
//           this.posicoes = snapshotToArrayGalpao(resp);
//         })
  
//       });
//       return returnArray;
//     }
  
//     this.refUni.on('value', resp => {
//       this.posicoes = [];
//       this.posicoes = snapshotToArrayUnidadeKey(resp);
//     })
//     loading.dismiss(); 
//     const alert = this.alertCtrl.create({
//       subTitle: 'Galpão liberado com sucesso!',
//       buttons: [{
//       text: 'Ok',
//       handler: () => {this.voltar();}
//       }]});
//     alert.present()
//   }
  

//   voltar(){
//     this.navCtrl.setRoot(HomePage, {
//       key: this.keyUsuario,
//       nome: this.nomeUsuario,
//       cpf: this.cpfUsuario
//     })
//   }

// }
