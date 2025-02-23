import Phaser from 'phaser';

var config = {
    type: Phaser.WEBGL,
    width: 400,
    height: 700,
    backgroundColor: '#94E5F5',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale: {
        mode: Phaser.Scale.NONE, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'main',
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;
var difficulty = 1;
var timerEvent;
var cactusGroup;

function preload() {
    this.load.image('ground', 'build/assets/ground_dino.png');
    this.load.image('herbe', 'build/assets/herbe_dino.png');
    this.load.image('montagnes', 'build/assets/montagnes_dino.png');
    this.load.image('nuages', 'build/assets/nuages_dino.png');
    this.load.image('cactus1', 'build/assets/cactus_1_dino.png');
    this.load.image('cactus2', 'build/assets/cactus_2_dino.png');
    this.load.image('cactus3', 'build/assets/cactus_3_dino.png');
    this.load.image('dino', 'build/assets/dino.png');
    
}

function create() {
    this.montagnes = this.add.tileSprite(200, 480, 400, 151, 'montagnes');
    this.nuages = this.add.tileSprite(200, 190, 591, 380, 'nuages');

    platforms = this.physics.add.staticGroup();
    platforms.create(200, 600, 'ground').setScale(1).refreshBody();

    this.herbes = this.add.tileSprite(200, 620, 400, 190, 'herbe');

    player = this.physics.add.sprite(350, 350, 'dino'); // Position initiale au-dessus de la plateforme
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    timerEvent = this.time.addEvent({
        delay: getDelay(),
        callback: generateCactus,
        callbackScope: this,
        loop: true
    });

    cactusGroup = this.physics.add.group();
    this.physics.add.collider(platforms, cactusGroup)
}

function update() {
    this.montagnes.tilePositionX -= 0.2 * difficulty;
    this.nuages.tilePositionX -= 0.1 * difficulty;
    this.herbes.tilePositionX -= 2 * difficulty;

    if ((cursors.space.isDown || this.input.activePointer.isDown) && player.body.touching.down) {
        player.setVelocityY(-400);
    }

    if (timerEvent.delay !== getDelay()) {
        timerEvent.reset({
            delay: getDelay(),
            callback: generateCactus,
            callbackScope: this,
            loop: true
        });
    }
}

function getDelay() {
    return 3000;
}

function generateCactus() {
    difficulty += 0.3
    
    var cactusTypes = ['cactus1', 'cactus2', 'cactus3'];
    var randomCactus = Phaser.Math.RND.pick(cactusTypes);
    var cactus = cactusGroup.create(0, 495, randomCactus);
    cactus.setOrigin(0.5, 1);
    cactus.setScale(0.4);
    cactus.setVelocityX(200 * difficulty);
}
