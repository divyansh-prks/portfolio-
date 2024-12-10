// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }, // No gravity
        debug: true, // Enable debugging for collision boundaries
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  // Initialize Phaser Game
  const game = new Phaser.Game(config);
  
  // Global variables
  let player;
  let cursors;
  let background;
  let currentBackground = 'background'; // Keep track of the current background
  
  // Preload: Load game assets
function preload() {
    // Replace with your asset paths
    this.load.image('background', 'assets/background.jpg');
    this.load.image('background2', 'assets/background2.jpg');
    this.load.image('background3', 'assets/background3.jpg'); // Third background
    this.load.image('background4', 'assets/background4.jpg'); // Fourth background
    this.load.image('character', 'assets/character.png');
    this.load.audio('backgroundMusic', 'assets/background-music.mp3');
  }
  
  // Create: Add assets to the screen
// Create: Add assets to the screen
function create() {
    // Add the first background image
    background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setDisplaySize(this.scale.width, this.scale.height); // Set to fill the screen
    
    // Add the character with physics
    player = this.physics.add.sprite(0, this.scale.height - 270, 'character');
    player.setScale(0.8);
    player.setCollideWorldBounds(true); // Prevent character from leaving the screen

    // Disable downward Movement
    player.body.setAllowGravity(true); // Enable gravity for jump
    player.setBounce(0); // No bounce effect
    
    // Create arrow key input
    cursors = this.input.keyboard.createCursorKeys();
    
    // Play background music
    this.sound.play('backgroundMusic', { loop: true }); // Ensure it's looped
}

// Update: Game loop, checks for input
function update() {
    // Reset velocity (stop movement when no key is pressed)
    player.setVelocity(0);

    // Move right
    if (cursors.right.isDown) {
        player.setVelocityX(400); // Move right

        // Make the character face right (reset scale to normal)
        player.setFlipX(false); // Set flip to false to face right
    }

    // Move left
    if (cursors.left.isDown) {
        player.setVelocityX(-400); // Move left

        // Make the character face left (flip scale horizontally)
        player.setFlipX(true); // Flip the character to face left
    }

    // If no key is pressed, the character should stand straight (no movement)
    if (!cursors.left.isDown && !cursors.right.isDown) {
        player.setVelocityX(0); // Stop horizontal movement
        
        // Reset character facing direction (keep standing straight)
        player.setFlipX(false); // Default to facing right (or facing forward)
    }

    // Additional logic for background transitions (if applicable)
    if (player.x + 300 > config.width && currentBackground === 'background') {
        player.x = 0; 
        background.setTexture('background2');
        currentBackground = 'background2';
        console.log("Player touched the right boundary of the first background, changing to background2!");
    }

    if (player.x + 300 > config.width && currentBackground === 'background2') {
        player.x = 0;
        background.setTexture('background3');
        currentBackground = 'background3';
        console.log("Player touched the right boundary of the second background, changing to background3!");
    }

    if (player.x + 300 > config.width && currentBackground === 'background3') {
        player.x = 0;
        background.setTexture('background4');
        currentBackground = 'background4';
        console.log("Player touched the right boundary of the third background, changing to background4!");
    }

    if (player.x < 0 && currentBackground === 'background4') {
        background.setTexture('background3');
        currentBackground = 'background3';
        console.log("Player moved back to the left, changing to background3!");
    }

    if (player.x < 0 && currentBackground === 'background3') {
        background.setTexture('background2');
        currentBackground = 'background2';
        console.log("Player moved back to the left, changing to background2!");
    }

    if (player.x < 0 && currentBackground === 'background2') {
        background.setTexture('background');
        currentBackground = 'background';
        console.log("Player moved back to the left, changing to background!");
    }

    if (player.x < 0 && currentBackground === 'background2') {
        player.x = config.width - 100;
        background.setTexture('background');
        currentBackground = 'background';
        console.log("Player touched the left boundary of the second background, changing to background!");
    }
}
