const unlimitedAdventure = {
  roomId: 'gameIntro',
  inventory: [],
  rooms: [
    {
      name: 'GAME INTRO',
      id: 'gameIntro',
      img: `
   __   __  __   __  ______    _______  __   __ 
  |  |_|  ||  | |  ||    _ |  |       ||  |_|  |
  |       ||  | |  ||   | ||  |    ___||       |
  |       ||  |_|  ||   |_||_ |   |___ |       |
  |       ||       ||    __  ||    ___| |     | 
  | ||_|| ||       ||   |  | ||   |___ |   _   |
  |_|   |_||_______||___|  |_||_______||__| |__|
      `,
      desc: `
    Welcome to the world of SECRETS OF THE MUREX
    Unveil our mystery. Carry our tradition. Answer our call.
    We depend on you.

    "Enter GO EAST to approach the island."
    "Type HELP for further instructions."

      `,
      items: [
        { name: 'castle', desc: 'It\'s quite impressive.' },
      ],
      exits: [
        { dir: 'east', id: 'shipAwaken' }
      ]
    },
    {
      name: 'Ship Awaken',
      id: 'shipAwaken',
      img: `
              |    |    |
             )_)  )_)  )_)
            )___))___))___)\
           )____)____)_____)\\
         _____|____|____|____\\\__
---------\                   /---------
  ^^^^^ ^^^^^^^^^^^^^^^^^^^^^
    ^^^^      ^^^^     ^^^    ^^
         ^^^^      ^^^

------------------------------------------------

      `,
      desc: `
      For days you've dreamed of the sight of land, 
      but the tiny island that lies on the horizon does nothing 
      to quell the uneasy feeling you've had this entire trip.
      Seasickness has kept your mouth sour for the week you've been on the boat,
      and this morning is no different.
      Some distant spire catches the sun and glints impossibly bright, 
      making your headache even worse.
      You close your eyes and recoil, stepping back from your vantage point 
      and directly into the ship's captain.
      He glares down at you. Do you apologize? Or run away?
      `,
      items: [
        { name: 'key', desc: 'It looks like a key.', isTakeable: true, use: ({disk, println, getRoom}) => {
          const room = getRoom(disk.roomId);
          const door = room.items.find(item => item.name === 'door');
          if (door) {
            println('The door has opened!');
            door.isOpen = true;
          } else {
            println('There\'s nothing to use the key on.');
          }
        }},
        { name: 'book', desc: 'It appears to contain some sort of encantation, or perhaps... code.', isTakeable: true, use: ({disk, println, getRoom}) => {
          const room = getRoom(disk.roomId);
          const door = room.items.find(item => item.name === 'door');

          if (door) {
            println('You already used the book!');
            return;
          }

          println('A door has appeared from nothing! It seems to go nowhere...');
          room.items.push({ name: 'door', desc: 'It seems to go nowhere...', isOpen: false, use: ({disk, println, enterRoom}) => {
            const door = room.items.find(item => item.name === 'door');
            if (door.isOpen) {
              enterRoom('gameReallyOver');
            } else {
              println('The door is locked.');
            }
          }});
        }},
        { name: 'castle', desc: 'It has been... corrupted somehow.' },
      ],
      exits: [
        { dir: 'east', id: 'shipAwaken' }
      ]
    },
    {
      name: 'GAME REALLY OVER',
      id: 'gameReallyOver',
      img: '¯\\_(ツ)_/¯',
      desc: `
        That's all I've written so far! If you liked this and want more, write me on Twitter: @okaybenji
      `,
    },
  ],
};
