import { Container, Texture } from "pixi.js";

export class AppManager {
    protected static instance: AppManager;
    
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
            //resolution: window.devicePixelRatio,
            backgroundColor: 0xFFFFFF 
        });
        document.body.appendChild(this.app.view);

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    public getTexture(name: string): Texture {
        return (this.resources[name] as PIXI.LoaderResource).texture;
    }
    
    public getSpriteTextures(spriteName: string, framesCount: number, frameWidth: number, frameHeight: number): Texture[] {
        const frames: PIXI.Texture[] = [];
        const spriteSheet: PIXI.BaseTexture = new PIXI.BaseTexture((this.resources[spriteName] as PIXI.LoaderResource).url);

        for (let i = 0; i < framesCount; i++)
        {
            const texture: PIXI.Texture = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight));
            frames.push(texture);
        }
        return frames;        
    }

    protected handleKeyDown(event: KeyboardEvent): void {
        this.keys[event.code] = true;
    }

    protected handleKeyUp(event: KeyboardEvent): void {
        this.keys[event.code] = false;
    }

    protected resize() {
       // this.app.renderer.resize(window.innerWidth, window.innerHeight);

        //this.gecko.x = this.app.renderer.width / 2;
        //this.gecko.y = this.app.renderer.height / 2;
    }
}