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
    this.load.image('character', 'assets/character.jpg');
    this.load.audio('backgroundMusic', 'assets/background-music.mp3');
  }
  
  // Create: Add assets to the screen
  function create() {
    // Add the first background image
    background = this.add.image(0, 0, 'background').setOrigin(0, 0); 
    background.setDisplaySize(this.scale.width, this.scale.height); // Set to fill the screen
    
    // Add the character with physics
    player = this.physics.add.sprite(0, this.scale.height - 300, 'character'); 
    player.setScale(0.1);
    player.setCollideWorldBounds(true); // Prevent character from leaving the screen
    
    // Disable downward Movement
    player.body.setAllowGravity(true); // Enable gravity for jump
    player.setBounce(0); // No bounce effect
    
    // Create arrow key input
    cursors = this.input.keyboard.createCursorKeys();
    

    //play background mysic
    this.sound.play("backgroundMusic" , {loop: true});
  }
  
  // Update: Game loop, checks for input
  function update() {
    // Reset velocity (stop movement when no key is pressed)
    player.setVelocity(0);
  
    // Move right
    if (cursors.right.isDown) {
      player.setVelocityX(200);
    }
  
    // Move left
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    }
  
    // If the player touches the right boundary of the first background
    if (player.x + 100 > config.width && currentBackground === 'background') {
      // Reset player to left side
      player.x = 0; 
      
      // Change the background image to the second one
      background.setTexture('background2');
      currentBackground = 'background2'; // Update current background
      console.log("Player touched the right boundary of the first background, changing to background2!");
    }
  
    // If the player touches the right boundary of the second background
    if (player.x + 100 > config.width && currentBackground === 'background2') {
      // Reset player to left side
      player.x = 0; 
      
      // Change the background image to the third one
      background.setTexture('background3');
      currentBackground = 'background3'; // Update current background
      console.log("Player touched the right boundary of the second background, changing to background3!");
    }
  
    // If the player moves back to the left side of the third background
    if (player.x < 0 && currentBackground === 'background3') {
      // Change the background back to the second one
      background.setTexture('background2');
      currentBackground = 'background2'; // Update current background
      console.log("Player moved back to the left, changing to background2!");
    }
  
    // If the player moves back to the left side of the second background
    if (player.x < 0 && currentBackground === 'background2') {
      // Change the background back to the first one
      background.setTexture('background');
      currentBackground = 'background'; // Update current background
      console.log("Player moved back to the left, changing to background!");
    }
  }
  