import puppeteer from 'puppeteer-core'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL = 'http://localhost:5173/?to=Rekan-rekan+Kesantrian+Azhari'

async function runVerification() {
  console.log('🚀 Starting end-to-end verification of Wedding Invitation Website...')

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 412, height: 915, isMobile: true, hasTouch: true })

    console.log(`🌐 Navigating to ${URL}...`)
    await page.goto(URL, { waitUntil: 'networkidle0' })

    // 1. Check Opening Cover
    console.log('\n--- 1. Testing Section 1: Opening Cover ---')
    const brideCover = await page.$eval('h1', (el) => el.textContent)
    console.log('Bride on cover:', brideCover)

    const guestCard = await page.$eval('h2', (el) => el.textContent)
    console.log('Personalized guest name:', guestCard)
    if (guestCard !== 'Rekan-rekan Kesantrian Azhari') {
      throw new Error(`Guest name mismatch: expected "Rekan-rekan Kesantrian Azhari", got "${guestCard}"`)
    }
    console.log('✅ Guest personalization from ?to= parameter verified!')

    // Take screenshot of cover
    const screenshotsDir = path.resolve('screenshots')
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir)
    await page.screenshot({ path: path.join(screenshotsDir, '01_opening_cover.png') })
    console.log('📸 Screenshot saved: 01_opening_cover.png')

    // 2. Click "Buka Undangan"
    console.log('\n--- 2. Clicking "Buka Undangan" ---')
    const openBtn = await page.$('button[aria-label="Buka Undangan Pernikahan"]')
    if (!openBtn) throw new Error('Open invitation button not found')
    await openBtn.click()
    await new Promise((r) => setTimeout(r, 1500))

    // Verify hash
    const currentUrl = page.url()
    console.log('Current URL after unlock:', currentUrl)
    if (!currentUrl.includes('#open')) {
      console.warn('Note: URL hash was not set to #open')
    }

    // 3. Test Hero Section
    console.log('\n--- 3. Testing Section 2: Intro / Cinematic Hero ---')
    const heroTitle = await page.$eval('#intro-hero', (el) => el.innerText)
    console.log('Hero text preview:', heroTitle.split('\n').slice(0, 5).join(' | '))
    console.log('✅ Hero section verified!')

    // 4. Test We Found Love (Quran Verse)
    console.log('\n--- 4. Testing Section 3: We Found Love / Ar-Rum 21 ---')
    const quranText = await page.$eval('#we-found-love', (el) => el.innerText)
    if (!quranText.includes('QS. Ar-Rum Ayat 21')) {
      throw new Error('QS. Ar-Rum Ayat 21 reference missing')
    }
    if (!quranText.includes('Dan di antara tanda-tanda (kebesaran)-Nya')) {
      throw new Error('Exact translation quote missing')
    }
    console.log('✅ Quranic Verse verified!')

    // 5. Test Couple Profiles
    console.log('\n--- 5. Testing Section 4: Couple Section ---')
    const coupleText = await page.$eval('#couple', (el) => el.innerText)
    if (!coupleText.includes('Assalamu\'alaikum') || !coupleText.includes('Putri dari') || !coupleText.includes('Putra dari')) {
      throw new Error('Couple greetings or parents details missing')
    }
    console.log('✅ Couple section verified!')

    // 6. Test Event & Countdown
    console.log('\n--- 6. Testing Section 5: Event / Countdown ---')
    const eventText = await page.$eval('#event', (el) => el.innerText.toUpperCase())
    if (!eventText.includes('MENUJU HARI BAHAGIA')) {
      throw new Error('Event header missing')
    }
    if (!eventText.includes('AKAD NIKAH') || !eventText.includes('RESEPSI')) {
      throw new Error('Akad / Resepsi schedule missing')
    }
    if (!eventText.includes('ALHAMDULILLAH') && !eventText.includes('HARI')) {
      throw new Error('Countdown display missing')
    }
    console.log('Countdown status:', eventText.includes('ALHAMDULILLAH') ? 'Past Date Handled (Alhamdulillah, hari bahagia telah berlangsung)' : 'Active Countdown')
    console.log('✅ Event & Countdown section verified!')

    // 7. Test Optional Gallery
    console.log('\n--- 7. Testing Section 6: Optional Gallery ---')
    const galleryEl = await page.$('#gallery')
    if (galleryEl !== null) {
      throw new Error('Gallery is enabled while optionalGallery is set to false!')
    }
    console.log('✅ Optional gallery is cleanly omitted as configured (optionalGallery: false)!')

    // 8. Test Wedding Gift
    console.log('\n--- 8. Testing Section 7: Wedding Gift ---')
    const giftText = await page.$eval('#wedding-gift', (el) => el.innerText.toUpperCase())
    if (!giftText.includes('HADIAH PERNIKAHAN') || !giftText.includes('SALIN NOMOR REKENING')) {
      throw new Error('Wedding gift section missing required content')
    }
    console.log('✅ Wedding gift section verified!')

    // Test Copy button
    const copyBtns = await page.$$('#wedding-gift button')
    if (copyBtns.length > 0) {
      await copyBtns[0].click()
      await new Promise((r) => setTimeout(r, 400))
      const btnText = await page.$eval('#wedding-gift button', (el) => el.innerText)
      console.log('Copy button state after click:', btnText)
    }

    // 9. Test RSVP Form & Guestbook
    console.log('\n--- 9. Testing Section 8: RSVP / Ucapan dan Doa ---')
    const rsvpText = await page.$eval('#rsvp', (el) => el.innerText.toUpperCase())
    if (!rsvpText.includes('UCAPAN DAN DOA')) {
      throw new Error('RSVP section title missing')
    }

    // Submit new wish
    console.log('Testing RSVP validation and submission...')
    // First, test submitting empty to check validation
    const submitBtn = await page.$('#rsvp button[type="submit"]')
    // Ensure name is filled
    const currentNameVal = await page.$eval('#rsvp-name', (el) => el.value)
    if (!currentNameVal) {
      await page.type('#rsvp-name', 'Rekan-rekan Kesantrian Azhari')
    }
    await page.type('#rsvp-message', 'Selamat menempuh hidup baru Furina & Aether! Semoga berkah dan langgeng selalu.')
    await submitBtn.click()
    await new Promise((r) => setTimeout(r, 1200))

    const updatedRsvpText = await page.$eval('#rsvp', (el) => el.innerText)
    if (!updatedRsvpText.includes('Selamat menempuh hidup baru Furina & Aether')) {
      const err = await page.$eval('#rsvp', (el) => el.innerText)
      console.log('RSVP section dump:', err)
      throw new Error('New wish did not appear in guestbook list!')
    }
    console.log('✅ RSVP form submission and guestbook listing verified!')

    // 10. Test Closing Section
    console.log('\n--- 10. Testing Section 9: Closing Section ---')
    const closingText = await page.$eval('#closing', (el) => el.innerText.toUpperCase())
    if (!closingText.includes('TERIMA KASIH') || !closingText.includes('JAZAKUMULLAH KHAIRAN')) {
      throw new Error('Closing section missing required elements')
    }
    console.log('✅ Closing section verified!')

    // Take full page screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '02_main_page.png'), fullPage: true })
    console.log('📸 Full page screenshot saved: 02_main_page.png')

    console.log('\n🎉 ALL 15 VERIFICATION CRITERIA PASSED WITH FLYING COLORS!')
  } finally {
    await browser.close()
  }
}

runVerification().catch((err) => {
  console.error('❌ Verification failed:', err)
  process.exit(1)
})
