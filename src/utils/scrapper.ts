import puppeteer from 'puppeteer';
import hospital from '../schema/hospital.model';

export class ImgScrapper {
  constructor() {}

  public initiate = async () => {
    const browser = await puppeteer.launch({
      headless: false, // Change to true for production
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Remove for production
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
   

    const hospitalList = await hospital.find({$and:[{Ownership:'Private'},{Type:'Hospital'},{Region:'Greater Accra'}] })
    for (let i = 0; i < hospitalList.length; i++) {
      try {
      
    
        await page.goto('https://www.google.com/imghp?hl=en&ogbl');
        await page.waitForSelector('#APjFqb');
        const hospitalName = hospitalList[i].FacilityName;

        await page.type('#APjFqb', hospitalName, { delay: 100 });
        await page.keyboard.press('Enter');

        await page.waitForSelector('#islrg > div.islrc > div:nth-child(2) > a.FRuiCf.islib.nfEiy > div.fR600b.islir > img', {
          timeout: 5000, 
        });

        const imageUrl = await page.evaluate(() => {
          const imageElement = document.querySelector(
            '#islrg > div.islrc > div:nth-child(2) > a.FRuiCf.islib.nfEiy > div.fR600b.islir > img'
          ) as HTMLImageElement;

          return imageElement ? imageElement.src : null;
        });
        console.log(imageUrl);
      } catch (error:any) {
        console.error(`Error processing hospital ${hospitalList[i].FacilityName}: ${error.message}`);
      }
    }

    // Close the browser
    browser.close();
  };
}
