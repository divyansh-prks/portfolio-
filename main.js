// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1800,
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
  let breaker; 
  let isJumping = false; 

  
  // Preload: Load game assets
function preload() {
    // Replace with your asset paths
    this.load.image('background', 'assets/background.jpg');
    this.load.image('background2', 'assets/background2.jpg');
    this.load.image('background3', 'assets/background3.jpg'); // Third background
    this.load.image('background4', 'assets/background4.jpg'); // Fourth background
    this.load.image('character', 'assets/character2.png');
    //adding a cactus feature so that characeter will jump 
    // this.load.image('breaker' , 'assets/cactus.png')
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
    // player.body.setGravityY(3000); 



    //   // Create breaker
    //   breaker = this.physics.add.staticSprite(1000, this.scale.height - 205, 'breaker');
    //   breaker.setScale(0.4);
    //   breaker.refreshBody(); // Refresh physics body after scaling
  
      // Enable collision between player and breaker
    //   this.physics.add.collider(player, breaker, stopPlayer, null, this);


    // Disable downward Movement
    player.body.setAllowGravity(true); // Enable gravity for jump
    player.setBounce(2); // No bounce effect
    // player.body.setGravityY(300);
    
    // Create arrow key input
    cursors = this.input.keyboard.createCursorKeys();
    console.log("cursors hu bro" , cursors)
    // Play background music
    this.sound.play('backgroundMusic', { loop: true }); // Ensure it's looped



    // Add "Contact Me" button
    const contactButton = this.add.text(this.scale.width - 370, 150, 'Contact Me', {
        fontSize: '40px',
        color: '#000000',
        backgroundColor: "#D2B48C",
        padding: { x: 10, y: 15 },
        align: 'center',
    }).setInteractive(); // Make the button clickable

    // Position the button
    contactButton.setOrigin(0.5, 0.5);
    contactButton.setStyle({ borderRadius: '10px' });

    // Button click event to redirect
    contactButton.on('pointerup', () => {
        window.location.href = 'contact.html'; // Redirect to the contact page
    });
}

// Update: Game loop, checks for input
function update() {
    // Reset velocity (stop movement when no key is pressed)
    player.setVelocity(0);



    if (cursors.up.isDown ) {
        // jump();
        player.setVelocityY(-350); // Adjust jump height by changing -350
        
    }

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



    // //1
    // if (player.x > 1600 && background.texture.key === "background") {
    //     // Change the background image
    //     background.setTexture('background2');
    //     console.log(background.texture)
    //       // Reset character's position to starting point
    //       player.setVelocityX(0);
    //       player.setPosition(300, this.scale.height - 270);

    //     // Optional: Stop the character from moving further

    // }
    // if (player.x < 150 && background.texture.key === "background2" ) {
    //     // Change back to Background 1 and reset position
    //     background.setTexture('background');
    //     player.setPosition(0, this.scale.height - 270);
    //     player.setVelocityX(0);
    // }


    // //2
    // if (player.x > 1600 && background.texture.key === "background2") {
    //     // Change the background image
    //     background.setTexture('background3');
    //     console.log(background.texture)
    //       // Reset character's position to starting point
    //       player.setVelocityX(0);
    //       player.setPosition(300, this.scale.height - 270);

    //     // Optional: Stop the character from moving further

    // }
    // if (player.x < 150 && background.texture.key === "background3" ) {
    //     // Change back to Background 1 and reset position
    //     background.setTexture('background2');
    //     player.setPosition(0, this.scale.height - 270);
    //     player.setVelocityX(0);
    // }
  
// Transition to Background 2
if (player.x > 1600 && background.texture.key === "background") {
    background.setTexture('background2');
    console.log("Moved to Background 2");
    player.setVelocityX(0);
    player.setPosition(150, this.scale.height - 270); // Reset position closer to left boundary
}

// Move back to Background 1
if (player.x < 150 && background.texture.key === "background2") {
    background.setTexture('background');
    console.log("Moved back to Background 1");
    player.setVelocityX(0);
    player.setPosition(1600, this.scale.height - 270); // Reset closer to the right boundary
}

// Transition to Background 3
if (player.x > 1600 && background.texture.key === "background2") {
    background.setTexture('background3');
    console.log("Moved to Background 3");
    player.setVelocityX(0);
    player.setPosition(150, this.scale.height - 270);
}

// Move back to Background 2
if (player.x < 150 && background.texture.key === "background3") {
    background.setTexture('background2');
    console.log("Moved back to Background 2");
    player.setVelocityX(0);
    player.setPosition(1600, this.scale.height - 270);
}

//4
if (player.x > 1600 && background.texture.key === "background3") {
    background.setTexture('background4');
    console.log("Moved to Background 4");
    player.setVelocityX(0);
    player.setPosition(150, this.scale.height - 270);
}


if (player.x < 150 && background.texture.key === "background4") {
    background.setTexture('background3');
    console.log("Moved back to Background 3");
    player.setVelocityX(0);
    player.setPosition(1600, this.scale.height - 270);
}

 
}

// Function to handle player collision with the breaker
function stopPlayer(player, breaker) {
    player.setVelocityX(0); // Stop player movement
    console.log("Player hit the breaker! Jump to continue.");
}


// // Function to handle the jump arc
// function jumpOverBreaker() {
//     isJumping = true; // Set jumping flag
//     const jumpHeight = 200; // Adjust jump height
//     const jumpDuration = 500; // Duration to reach the apex of the jump

//     // Tween for upward jump
//     game.scene.scenes[0].tweens.add({
//         targets: player,
//         y: player.y - jumpHeight,
//         duration: jumpDuration,
//         ease: 'Power2',
//         onComplete: () => {
//             // Tween for downward motion
//             game.scene.scenes[0].tweens.add({
//                 targets: player,
//                 y: player.y + jumpHeight,
//                 duration: jumpDuration,
//                 ease: 'Bounce.easeOut',
//                 onComplete: () => {
//                     isJumping = false; // Reset jumping flag
//                 },
//             });
//         },
//     });
// }











//jumping feature will add more in future 

// function jump() {
//     isJumping = true; // Set jumping flag
//     const jumpHeight = 200; // Height of the jump
//     const jumpDuration = 1000; // Duration of the jump

//     // Tween for upward jump
//     this.tweens.add({
//         targets: player,
//         y: player.y - jumpHeight,
//         duration: jumpDuration / 2, // Half the duration for going up
//         ease: 'Power2',
//         onComplete: () => {
//             // After reaching the peak, wait for 2 seconds before coming down
//             this.time.delayedCall(2000, () => {
//                 // Tween for downward motion
//                 this.tweens.add({
//                     targets: player,
//                     y: player.y + jumpHeight,
//                     duration: jumpDuration / 2, // Half the duration for going down
//                     ease: 'Bounce.easeOut',
//                     onComplete: () => {
//                         isJumping = false; // Reset jumping flag
//                     },
//                 });
//             });
//         },
//     });
// }