import { Container, Texture } from "pixi.js";

export class AppManager {
    private static instance: AppManager;
    
    public app: PIXI.Application;
    public resources: PIXI.LoaderResource;

    protected sceneWidth: number = 900;
    protected sceneHeight: number = 720;

       public keys: any = {};

    constructor() {
        if (AppManager.instance) {
            throw new Error("Error - use AppManager.getInstance()");
        }
        this.initPixiApp();   
    }

    public static getInstance(): AppManager {
        if (!AppManager.instance) {
            AppManager.instance = new AppManager();
        }
        return AppManager.instance;
    }

    public getSceneWidth(): number {
        return this.sceneWidth;
    }

    public getSceneHeight(): number {
        return this.sceneHeight;
    }

    public startAssetsLoading(assets: Object, onComplete: Function, onProgress?: Function): void {
        const loader: PIXI.Loader = new PIXI.Loader();

        Object.keys(assets).forEach((key: string) => {
            loader.add(assets[key], assets[key]);
        });

        loader.onProgress.add((loader: PIXI.Loader, resources: PIXI.LoaderResource) => {
            onProgress.call(this, loader.progress);
        });

        loader.onComplete.add((loader: PIXI.Loader, resources: PIXI.LoaderResource) => {
            this.resources = resources;
            onComplete.call(this);
        });

        loader.load();
    }

    public addLayerToScene(container: Container): void {
        this.app.stage.addChild(container);
    }

    protected initPixiApp(): void {
        this.app = new PIXI.Application({ 
            width: this.sceneWidth, 
            height: this.sceneHeight, 
            backgroundColor: 0xFFFFFF 
        });
        document.body.appendChild(this.app.view);

        window.addEventListener('keydown', AppManager.handleKeyDown);
        window.addEventListener('keyup', AppManager.handleKeyUp);
    }

    public getTexture(name: string): Texture {
        return (this.resources[name] as PIXI.LoaderResource).texture;
    }

    public swapScenes(): void {

    }
    
    // public init(): void {
    //     window.addEventListener('resize', this.resize.bind(this));
    //     this.resize();
    // }

    private onAssetsLoadingComplete(loader: PIXI.Loader, resources: PIXI.LoaderResource, onComplete: Function){
        this.resources = resources;
        onComplete();
        
        // this.gameScene = new GameScene();
        // this.app.stage.addChild(this.gameScene);
        // this.app.stage.scale.set(0.6, 0.6);

        // window.addEventListener('keydown', AppManager.handleKeyDown);
        // window.addEventListener('keyup', AppManager.handleKeyUp);

        // this.app.ticker.add(() => {
        //     this.gameScene.update();
        // });  

        //this.app.renderer.resize(500, 500);
    }

    private static handleKeyDown(event: KeyboardEvent): void {
        //GameManager.instance.keys = {};
        AppManager.instance.keys[event.code] = true;
    }

    private static handleKeyUp(event: KeyboardEvent): void {
        //GameManager.instance.keys = {};
        AppManager.instance.keys[event.code] = false;
    }

    // Resize function window
    private resize() {
       // this.app.renderer.resize(window.innerWidth, window.innerHeight);

        //this.gecko.x = this.app.renderer.width / 2;
        //this.gecko.y = this.app.renderer.height / 2;
    }
}