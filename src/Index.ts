
import * as PIXI from 'pixi.js';
import { Unit } from './unit';
import { Enemy } from './enemy';
import { Map } from './map';
import { GameScene } from './game-scene';

//Tile 36x36
// Map 25x20
export enum SceneSize {
    width = 900,
    height = 720
};

export class GameManager {
    private static instance: GameManager;
    private app: PIXI.Application;
    private gameScene: GameScene;
    public keys: any = {};

    /**
     * code entry point, it is triggered by the window.onload event found at the bottom of this class
     */
    private constructor() {
        
        this.app = new PIXI.Application({ width: SceneSize.width, height: SceneSize.height, backgroundColor: 0xFFFFFF });
        document.body.appendChild(this.app.view);

        PIXI.Loader.shared.add('tank', 'assets/tanks/tank.png');
        PIXI.Loader.shared.add('enemy', 'assets/tanks/enemy_red.png');
        PIXI.Loader.shared.add('wall', 'assets/board/wall.png');
        PIXI.Loader.shared.add('bullet', 'assets/board/small_wall_4.png');        
        PIXI.Loader.shared.once('complete', this.onLoadComplete.bind(this) );
        PIXI.Loader.shared.load();

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    public static getInstance(): GameManager {
    
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    /**
     * 
     * @param loader loader provided by the PIXI load event, useful for cleaning up any events attached to loader
     * @param resources resources provided by the PIXI load event, we use this to extract loaded items
     */
    private onLoadComplete( loader: PIXI.Loader, resources: PIXI.LoaderResource){
        this.gameScene = new GameScene(this.app, resources);
        this.app.stage.addChild(this.gameScene);
        this.app.stage.scale.set(0.6, 0.6);

        // window.addEventListener('keydown', this.gameScene.onKeyDown.bind(this.gameScene));
        // window.addEventListener('keyup', this.gameScene.onKeyUp.bind(this.gameScene));

        window.addEventListener('keydown', GameManager.handleKeyDown);
        window.addEventListener('keyup', GameManager.handleKeyUp);

        this.app.ticker.add(() => {
            this.gameScene.update();
            //console.log(this.keys);
            
        });  

        //this.app.renderer.resize(500, 500);
    }

    private static handleKeyDown(event: KeyboardEvent): void {
        GameManager.instance.keys = {};
        GameManager.instance.keys[event.code] = true;
    }

    private static  handleKeyUp(event: KeyboardEvent): void {
        GameManager.instance.keys = {};
    }

    // Resize function window
    private resize() {
       // this.app.renderer.resize(window.innerWidth, window.innerHeight);

        //this.gecko.x = this.app.renderer.width / 2;
        //this.gecko.y = this.app.renderer.height / 2;
    }
}


/**
 * on the window event create the GameManager class
 * some people like to add this into a seperate .js file
 */
window.onload = function () {
    GameManager.getInstance();
    //new GameManager();
}