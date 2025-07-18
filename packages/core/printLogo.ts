export default function () {
  if (PROD) {
    const logo = `
   -----------------------------  
              ▜          ▗ 
        ▀▌▄▖█▌▐ █▌▛▛▌█▌▛▌▜▘
        ▙▖  ▙▖▐▖▙▖▌▌▌▙▖▌▌▐▖                                                                                                                                                               
    ----------------------------
          author：yang zheng                                           
    `;
    const rainbowGradient = `
    background: linear-gradient(135deg, orange 60%, cyan);
    background-clip: text;
    color: transparent;
    font-size: 16px;
    line-height: 1;
    font-family: monospace;
    font-weight: 600;
    `
    console.info(`%c${logo}`, rainbowGradient)
  } else if(DEV) {
    console.log("[Z-ELEMENT]: dev mode...")
  }

}