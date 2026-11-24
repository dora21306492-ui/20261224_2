let walkSprite; // 儲存向右行走的精靈圖。
let backwalkSprite; // 儲存向左行走的精靈圖。
let idleSprite; // 儲存原地待機的精靈圖。
let jumpPrepareSprite; // 儲存起跳前的預備動作精靈圖。
let jumpAirSprite; // 儲存空中跳躍動作精靈圖。
let jumpLandSprite; // 儲存落地後的收尾動作精靈圖。
let runSprite; // 儲存向右奔跑的精靈圖。
let backrunSprite; // 儲存向後翻滾（往左）的精靈圖。
let spaceSprite; // 儲存空白鍵出招的角色精靈圖。
let effectSprite; // 儲存出招時的刀光特效精靈圖。
let characterX; // 儲存角色 2 畫面上的水平位置。
let backgroundImage; // 背景圖 bg/0.png（紫色森林，左右可無縫接續）。
let backgroundCameraX = 0; // 鏡頭在「3 張背景串成的長圖」上的位置（0 = 最左邊）。
let p1WalkingLeft = false; // 角色 1 這個畫面是否正在往左走（給繪製時選動作用）。
let p1WalkingRight = false; // 角色 1 這個畫面是否正在往右走（給繪製時選動作用）。
let lightningActive = false; // 閃電特效是否正在進行。
let lightningStartedAt = 0; // 這次閃電特效開始的時間（毫秒）。
let lightningWorldX = 0; // 閃電在背景長圖上的位置（世界座標），背景捲動時會跟著移動。
let lastThunderStrikeId = -1; // 上一次播過雷聲的是第幾道閃電，避免同一道閃電重複播放。
let thunderRumble; // 合成雷聲用的低沉噪音（轟隆聲）。
let thunderCrack; // 合成雷聲用的尖銳噪音（劈啪聲）。
let thunderRumbleFilter; // 低通濾波器，讓轟隆聲更低沉。
let thunderRumbleEnvelope; // 轟隆聲的音量包絡（快速變大、慢慢消失）。
let thunderCrackEnvelope; // 劈啪聲的音量包絡（非常短促）。
let audioReady = false; // 合成雷聲是否已建立成功。
let lightningSheet; // 閃電精靈圖 effect/1/effect_1.png（14 格）。
let explosionSheet; // 藍色爆炸精靈圖 effect/2/effect_2.png（10 格）。
let airExplosionSheet; // 橘色空中爆炸精靈圖 effect/3/explosion_air.png（10 格）：閃電循環的爆炸階段，和藍色爆炸一起出現。
let groundExplosionSheet; // 橘色地面爆炸精靈圖 effect/4/explosion_ground.png（10 格）：每道閃電打到地面時出現。
let lastAirBoomCycle = -1; // 上一次播過橘色空中爆炸的是第幾個循環，避免重複。
let orangeExplosions = []; // 目前正在播放的橘色爆炸（可同時好幾個）。
let thunderFile = null; // 雷聲 mp3（有放檔案才會載入，沒有就用合成雷聲）。
let bgmSound = null; // 背景音樂 audio/bgm.mp3（有放檔案才會載入）。
let masterVolume = 1; // 整體音量（0～1），由音量滑桿控制。
let isMuted = false; // 是否靜音。
let muteButton; // 靜音按鈕。
let volumeSlider; // 音量滑桿。
let switchButton; // 「換角色」按鈕。
let controlledCharacter = null; // 玩家控制的角色："p1" 角色 1、"p2" 角色 2，null 代表還在選角畫面。
let char2Facing = 1; // 角色 2 面向：1 朝右（原圖），-1 水平翻轉朝左（不是玩家時會自動面向玩家）。
let selectionCards = []; // 選角畫面上兩張卡片的位置（給滑鼠點選用）。
let quizActive = false; // 答題方框是否顯示中。
let quizQuestion = ""; // 題目文字，例如「7 + 5 = ?」。
let quizOptions = []; // 四個選項的數字。
let quizAnswerIndex = 0; // 正確答案是第幾個選項（0～3）。
let quizChosenIndex = -1; // 玩家選了第幾個選項（-1 代表還沒作答）。
let quizAnsweredAt = 0; // 作答的時間（用來決定結果顯示多久）。
let quizOptionRects = []; // 四個選項按鈕的位置（給滑鼠點選用）。
let quizArmed = false; // 是否可以觸發下一題（離開範圍後才會重新開啟，避免一直跳題）。
let quizCorrectCount = 0; // 答對題數。
let quizWrongCount = 0; // 答錯題數。
let knockbackRemaining = 0; // 答錯被擊退還要移動的距離（正數往右、負數往左）。
let penaltyStrikes = []; // 答錯時打在玩家身上的閃電。
let floatingTexts = []; // 飄在角色頭上的文字（+1、答錯）。
let hurtFlashAt = -10000; // 答錯畫面閃紅光的時間。
let p1StandSprite; // 角色 1 的站立待機精靈圖。
let p1WalkSprite; // 角色 1 的向前行走精靈圖（原圖朝右）。
let p1WalkbackSprite; // 角色 1 的往後退精靈圖（原圖朝右）。
let p1X; // 角色 1 畫面上的水平位置。
let p1Facing = -1; // 角色 1 面向：-1 把圖水平翻轉成朝左，1 使用原圖方向（朝右）。當角色 1 不是玩家時會自動面向玩家。
let p1Step = 0; // 角色 1 的動畫步數。
let p1LastFrameTime = 0; // 角色 1 上次換格的時間。
let p1PreviousSprite; // 角色 1 上一個動作使用的精靈圖。
let p1RunSprite; // 角色 1 的跑步精靈圖（原圖朝右）。
let p1Running = false; // 記錄角色 1 是否正在跑步。
let p1LastLeftTapTime = -1000; // 記錄角色 1 上一次按左鍵的時間，用來判斷連按兩次。
let p1BackrunSprite; // 角色 1 的快速後退精靈圖（原圖朝右）。
let p1Backrunning = false; // 記錄角色 1 是否正在快速後退。
let p1JumpSprite; // 角色 1 的跳躍精靈圖（原圖朝右）。
let p1Jumping = false; // 記錄角色 1 是否正在跳躍（含預備與落地）。
let p1JumpPhase = "none"; // 角色 1 跳躍階段：none、prepare 蹲下預備、air 空中、landing 落地。
let p1JumpFrameBottoms = []; // 角色 1 跳躍每一格腳底下方的透明留白（原圖是靠上對齊，需逐格把腳對齊地面）。
let p1JumpOffset = 0; // 角色 1 離開地面的垂直距離（0 代表站在地面）。
let p1VerticalVelocity = 0; // 角色 1 目前的垂直速度。
let p1AirFrames = 0; // 角色 1 這次跳躍已經在空中經過的畫面數。
let p1LastRightTapTime = -1000; // 記錄角色 1 上一次按右鍵的時間，用來判斷連按兩次。
let jumpOffset = 0; // 儲存角色跳躍時離開地面的垂直距離（0 代表站在地面）。
let verticalVelocity = 0; // 儲存角色目前的垂直速度。
let jumpPhase = "none"; // 記錄跳躍階段：none 沒跳、prepare 預備、airborne 空中、landing 落地。
let isRunning = false; // 記錄角色是否正在奔跑。
let isBackrunning = false; // 記錄角色是否正在向後翻滾。
let isAttacking = false; // 記錄角色是否正在出招。
let effectActive = false; // 記錄刀光特效是否正在播放。
let effectStep = 0; // 記錄刀光特效播放到第幾格。
let effectLastTime = 0; // 記錄刀光特效上次換格的時間。
let effectX = null; // 刀光在畫面上的水平位置（null 代表剛觸發、還沒決定位置）。
let effectY = 0; // 刀光在畫面上的垂直位置。
let effectTraveled = 0; // 刀光已經飛行的距離。
let effectDir = 1; // 刀光飛行方向：1 往右、-1 往左（依出招時角色 2 的面向）。
let frameRects = new Map(); // 儲存每張精靈圖依實際內容切出的影格範圍。
let lastRightTapTime = -1000; // 記錄上一次按下右鍵的時間，用來判斷連按兩次。
let lastLeftTapTime = -1000; // 記錄上一次按下左鍵的時間，用來判斷連按兩次。
let animationStep = 0; // 記錄目前動畫播放到第幾步（待機來回播放時會超過影格數）。
let lastFrameTime = 0; // 記錄上次切換影格的時間。
let previousSprite; // 記錄上一個動作使用的精靈圖。
let idleFrameOffsets = []; // 儲存待機影格的水平置中補償值。
let spriteBottomPadding = new Map(); // 儲存每張精靈圖底部透明留白佔圖高的比例，讓腳能貼齊畫布底端。
const runSpritePath = "2/run/run.png"; // 奔跑圖的路徑，若檔名不同請改這裡。
const p1StandFrameCount = 24; // 角色 1 站立圖的影格數。
const p1WalkFrameCount = 12; // 角色 1 行走圖的影格數。
const p1StandFrameDuration = 70; // 角色 1 站立每格毫秒數。
const p1WalkFrameDuration = 80; // 角色 1 行走每格毫秒數。
const p1RunFrameCount = 24; // 角色 1 跑步圖的影格數。
const p1RunFrameDuration = 45; // 角色 1 跑步每格毫秒數。
const p1RunMoveFrames = 19; // 角色 1 跑步只在第 1～19 格移動，第 20 格起停在原地播完動畫。
const p1BackrunFrameCount = 28; // 角色 1 快速後退圖的影格數。
const p1BackrunFrameDuration = 40; // 角色 1 快速後退每格毫秒數。
const p1JumpFrameCount = 27; // 角色 1 跳躍圖的影格數（1696×102）。
const p1JumpPrepareFrames = [0, 6]; // 第 1～7 格：在地面蹲下預備。
const p1JumpAirFrames = [7, 21]; // 第 8～22 格：空中（起跳、翻身、下落），跟著滯空進度播放。
const p1JumpLandFrames = [22, 26]; // 第 23～27 格：落地蹲下再站起。
const p1JumpPrepareDuration = 40; // 預備每格毫秒數。
const p1JumpLandDuration = 45; // 落地每格毫秒數。
const p1BackrunMoveFrames = 22; // 角色 1 快速後退只在第 1～22 格移動，第 23 格起停在原地播完動畫。
const characterHeight = 218; // 設定所有動作共用的角色顯示高度。
const characterWidth = 144; // 設定角色移動時保留的最大水平範圍。
const movementSpeed = 4; // 設定角色行走時每影格的水平移動距離。
const runSpeed = 9; // 設定角色奔跑時每影格的水平移動距離。
const doubleTapWindow = 250; // 設定兩次按鍵之間多少毫秒內算作連按兩次。
const gravity = 1.05; // 跳躍時的重力加速度（沿用舊版三段式跳躍的手感）。
const jumpStrength = 18.4; // 預備動作結束後的起跳速度。
const idleFrameCount = 12; // 待機圖的影格數。
const walkFrameCount = 12; // 行走圖的影格數。
const jumpPrepareFrameCount = 5; // 預備動作的影格數。
const jumpAirFrameCount = 11; // 空中動作的影格數。
const jumpLandFrameCount = 5; // 落地動作的影格數。
const jumpPrepareFrameDuration = 25; // 預備動作每格毫秒數。
const jumpAirFrameDuration = 53; // 空中動作每格毫秒數。
const jumpLandFrameDuration = 25; // 落地動作每格毫秒數。
const runFrameCount = 18; // 奔跑圖的影格數。
const backrunFrameCount = 29; // 向後翻滾圖的影格數。
const runFrameDuration = 45; // 奔跑每格播放的毫秒數。
const backrunFrameDuration = 40; // 向後翻滾每格播放的毫秒數。
const spaceFrameCount = 12; // 出招圖的影格數。
const spaceFrameDurations = [55, 55, 55, 60, 60, 60, 70, 120, 45, 45, 80, 90]; // 出招每格的毫秒數：1-4 蓄力、5-7 舉刀、第 8 格刀在最高點停頓、9-10 快速揮下、11-12 收招。
const effectFrameCount = 6; // 特效圖的影格數。
const effectFrameDuration = 60; // 特效每格播放的毫秒數。
const effectFlyFrames = 4; // 特效前 4 格（完整刀光）在飛行時循環播放，最後 2 格當作消散。
const effectSpeed = 12; // 刀光每畫面向前飛的距離（會跟著角色縮放）。
const effectRange = 520; // 刀光飛多遠後開始消散（會跟著角色縮放）。
const effectStartFrame = 4; // 出招從第 4 格進到第 5 格時發出刀光（4 代表第 5 格）。
const effectOffsetX = 40; // 特效中心在角色前方多遠（以原圖像素計算，會跟著角色縮放）。
const effectOffsetY = 75; // 特效中心離腳底多高（以原圖像素計算，會跟著角色縮放）。
const runMoveFrames = 11; // 奔跑只在第 1～11 格移動，第 12 格起停在原地播完動畫。
const backrunMoveFrames = 22; // 翻滾只在第 1～22 格移動，第 23 格起停在原地播完動畫。
const backrunSpeed = runSpeed * (runMoveFrames * runFrameDuration) / (backrunMoveFrames * backrunFrameDuration); // 讓向後翻滾移動的總距離和奔跑一樣。
const backgroundTileCount = 3; // 背景左右各複製一份，共 3 張串接。
const lightningCycleDuration = 4000; // 一個循環：3 次閃電（各 1 秒）＋ 1 次爆炸（1 秒）＝ 4000 毫秒。
const lightningStrikeDuration = 1000; // 每次閃電 1 秒。
const lightningStrikeCount = 3; // 每個循環打 3 次閃電。
const lightningFrameCount = 14; // 每次閃電分成 14 格動畫（對應學習單 effect_1 的 14 張）。
const explosionFrameCount = 10; // 爆炸分成 10 格動畫（對應學習單 effect_2 的 10 張）。
const lightningScreenRatio = 0.75; // 閃電出現在「距離視窗右邊 1/4 寬」＝ 視窗寬度 0.75 的位置。
const explosionHeightRatio = 0.2; // 爆炸高度 = 畫布高的 0.2，貼齊畫面底端。
const thunderVolume = 0.25; // 雷聲音量：原本的 25%（原本 100% 太大聲）。
const bgmVolume = 0.25; // 背景音樂音量：原本的 25%（原本 100% 太大聲）。
const defaultMasterVolume = 50; // 音量滑桿的預設位置（0～100）。
const groundRatio = 0.935; // 地面（背景道路）在畫布高度的比例：角色、閃電、爆炸都以這條線為地面。
const thunderFilePath = "audio/chrysalyn-clean-dramatic-lightning-crash-547378.mp3"; // 學習單指定的雷聲檔（放進 audio 資料夾就會自動使用）。
const bgmFilePaths = ["audio/bgm.mp3", "audio/bgm.mp3.mp3"]; // 背景音樂檔（Windows 隱藏副檔名時常變成 bgm.mp3.mp3，兩種都會嘗試）。
const orangeExplosionFrameCount = 10; // 橘色爆炸的影格數。
const orangeExplosionFrameDuration = 60; // 橘色爆炸每格毫秒數（10 格共 0.6 秒）。
const quizRangeRatio = 1.1; // 玩家距離非控制角色多近就要答題（× 角色保留寬度）。
const quizBoxOpacity = 153; // 答題方框不透明度 153/255 ＝ 60%，也就是透明度 40%。
const quizResultTime = 1500; // 作答後結果顯示多久（毫秒）才關閉方框。
const knockbackDistanceRatio = 2.2; // 答錯被擊退的距離（× 角色保留寬度）。
const penaltyStrikeDuration = 700; // 懲罰閃電播放時間（毫秒）。
const bottomModeHeightRatio = 0.3; // 角色高度最多佔畫布高度的比例。
const bottomModeWidthRatio = 0.45; // 角色高度最多佔畫布寬度的比例（避免直式手機上角色過大）。

function preload() { // 在畫面開始前載入所有角色精靈圖。
  walkSprite = loadImage("2/walk/WalkAll.png"); // 載入向右行走的 12 格精靈圖。
  backwalkSprite = loadImage("2/backwalk/BackAll.png"); // 載入向左行走的 12 格精靈圖。
  idleSprite = loadImage("2/free/free.png"); // 載入原地待機的 12 格精靈圖。
  p1StandSprite = loadImage("1/stand/stand.png"); // 載入角色 1 的 24 格站立動畫。
  p1WalkSprite = loadImage("1/walk/walk.png"); // 載入角色 1 的 12 格向前行走動畫。
  p1WalkbackSprite = loadImage("1/walkback/walkback.png"); // 載入角色 1 的 12 格往後退動畫。
  p1RunSprite = loadImage("1/run/run.png"); // 載入角色 1 的 24 格跑步動畫（2659×105）。
  p1JumpSprite = loadImage("1/jump/jump.png"); // 載入角色 1 的 27 格跳躍動畫（1696×102）。
  p1BackrunSprite = loadImage("1/backrun/backrun.png"); // 載入角色 1 的 28 格快速後退動畫（2123×102）。
  jumpPrepareSprite = loadImage("2/jump/jump1.png"); // 載入起跳前的 5 格預備動作。
  jumpAirSprite = loadImage("2/jump/jump2.png"); // 載入空中的 11 格跳躍動作。
  jumpLandSprite = loadImage("2/jump/jump3.png"); // 載入落地的 5 格收尾動作。
  runSprite = loadImage(runSpritePath); // 載入向右奔跑的 18 格精靈圖。
  backrunSprite = loadImage("2/backrun/backrun.png"); // 載入向後翻滾的 29 格精靈圖。
  spaceSprite = loadImage("2/space/space.png"); // 載入空白鍵出招的 12 格精靈圖。
  effectSprite = loadImage("2/space_effect/effect.png"); // 載入刀光特效的 6 格精靈圖。
  backgroundImage = loadImage("bg/0.png"); // 載入可無縫串接的紫色森林背景。
  lightningSheet = loadImage("effect/1/effect_1.png"); // 載入 14 格閃電精靈圖。
  explosionSheet = loadImage("effect/2/effect_2.png"); // 載入 10 格藍色爆炸精靈圖。
  airExplosionSheet = loadImage("effect/3/explosion_air.png"); // 載入 10 格橘色空中爆炸。
  groundExplosionSheet = loadImage("effect/4/explosion_ground.png"); // 載入 10 格橘色地面爆炸。
} // 結束精靈圖載入設定。

function setup() { // 初始化全螢幕畫布與角色狀態。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CENTER); // 讓精靈圖以角色中心位置繪製。
  characterX = width * 2 / 3; // 將角色 2 放在畫布寬度的 2/3 位置。
  p1X = width * 0.88; // 將角色 1 放在畫面右側。
  if (/\.jpe?g$/i.test(runSpritePath)) { // JPG 沒有透明背景，需要把白色背景去掉。
    removeWhiteBackground(runSprite, runFrameCount); // 從每格邊緣往內清除相連的白色背景。
  } // 結束 JPG 背景處理。
  idleFrameOffsets = computeCenterOffsets(idleSprite, idleFrameCount); // 計算待機影格的置中補償值。
  frameRects.set(walkSprite, computeFrameRects(walkSprite, walkFrameCount)); // 依內容切出向右行走影格。
  frameRects.set(backwalkSprite, computeFrameRects(backwalkSprite, walkFrameCount)); // 依內容切出向左行走影格。
  frameRects.set(jumpPrepareSprite, computeFrameRects(jumpPrepareSprite, jumpPrepareFrameCount)); // 依內容切出預備影格。
  frameRects.set(jumpAirSprite, computeFrameRects(jumpAirSprite, jumpAirFrameCount)); // 依內容切出空中影格。
  frameRects.set(jumpLandSprite, computeFrameRects(jumpLandSprite, jumpLandFrameCount)); // 依內容切出落地影格。
  frameRects.set(runSprite, computeFrameRects(runSprite, runFrameCount)); // 依內容切出奔跑影格。
  frameRects.set(backrunSprite, computeFrameRects(backrunSprite, backrunFrameCount)); // 依內容切出翻滾影格。
  frameRects.set(spaceSprite, computeFrameRects(spaceSprite, spaceFrameCount)); // 依內容切出出招影格（這張圖的格子寬度不平均）。
  for (const sprite of [idleSprite, walkSprite, backwalkSprite, jumpPrepareSprite, jumpAirSprite, jumpLandSprite, runSprite, backrunSprite, spaceSprite]) { // 逐張計算底部留白。
    spriteBottomPadding.set(sprite, computeBottomPadding(sprite)); // 儲存這張圖的底部留白比例。
  } // 結束底部留白計算。
  for (const [sprite, count] of [[p1StandSprite, p1StandFrameCount], [p1WalkSprite, p1WalkFrameCount], [p1WalkbackSprite, p1WalkFrameCount], [p1RunSprite, p1RunFrameCount], [p1BackrunSprite, p1BackrunFrameCount], [p1JumpSprite, p1JumpFrameCount]]) { // 角色 1 的精靈圖。
    frameRects.set(sprite, computeFrameRects(sprite, count)); // 依內容切出影格。
    spriteBottomPadding.set(sprite, computeBottomPadding(sprite)); // 計算底部留白，讓腳貼齊底端。
  } // 結束底部留白計算。
  p1JumpFrameBottoms = computeFrameBottoms(p1JumpSprite, frameRects.get(p1JumpSprite)); // 逐格計算跳躍圖的腳底位置。
  backgroundCameraX = maxCameraX() / 2; // 開場時鏡頭放在長圖正中央（左右都還有背景可以捲）。
  setupThunderSound(); // 建立合成雷聲（找不到雷聲 mp3 時使用）。
  loadOptionalSounds(); // 嘗試載入雷聲 mp3 與背景音樂（沒有檔案也不影響執行）。
  setupVolumeControls(); // 建立音量按鈕、音量滑桿與換角色按鈕。
  lastFrameTime = millis(); // 記錄動畫開始時間。
} // 結束初始化設定。

function frameBounds(sprite, frameCount, frameIndex) { // 計算某一格在精靈圖中的左右邊界（處理寬度無法整除的情況）。
  const left = Math.floor(frameIndex * sprite.width / frameCount); // 計算目前影格的左邊界。
  const right = Math.floor((frameIndex + 1) * sprite.width / frameCount); // 計算目前影格的右邊界。
  return { left, right }; // 回傳左右邊界。
} // 結束影格邊界計算。

function computeCenterOffsets(sprite, frameCount) { // 逐格計算角色可見部分的水平中心補償值。
  sprite.loadPixels(); // 讀取精靈圖的像素。
  const offsets = []; // 建立補償值陣列。
  for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) { // 逐格處理。
    const { left, right } = frameBounds(sprite, frameCount, frameIndex); // 取得目前影格邊界。
    let visibleLeft = right - left; // 初始化角色可見範圍的左邊界。
    let visibleRight = -1; // 初始化角色可見範圍的右邊界。
    for (let y = 0; y < sprite.height; y++) { // 逐列掃描。
      for (let x = left; x < right; x++) { // 逐欄掃描。
        if (sprite.pixels[(y * sprite.width + x) * 4 + 3] > 16) { // 忽略透明像素。
          visibleLeft = Math.min(visibleLeft, x - left); // 更新可見範圍左邊界。
          visibleRight = Math.max(visibleRight, x - left); // 更新可見範圍右邊界。
        } // 結束可見像素判斷。
      } // 結束欄位掃描。
    } // 結束列掃描。
    offsets.push(visibleRight < 0 ? 0 : (visibleLeft + visibleRight + 1) / 2 - (right - left) / 2); // 儲存補償值。
  } // 結束逐格處理。
  return offsets; // 回傳全部補償值。
} // 結束置中補償計算。

function removeWhiteBackground(sprite, frameCount) { // 把每格中與邊緣相連的白色背景變成透明。
  sprite.loadPixels(); // 讀取像素。
  const w = sprite.width; // 圖片寬度。
  const h = sprite.height; // 圖片高度。
  const px = sprite.pixels; // 像素陣列。
  const isBackground = (i) => px[i] > 225 && px[i + 1] > 225 && px[i + 2] > 225; // 接近白色就視為背景。
  const visited = new Uint8Array(w * h); // 記錄已處理過的像素。
  for (let f = 0; f < frameCount; f++) { // 每一格分開處理，避免越過格子邊界。
    const { left, right } = frameBounds(sprite, frameCount, f); // 取得目前影格邊界。
    const stack = []; // 準備填色用的堆疊。
    for (let x = left; x < right; x++) { stack.push([x, 0], [x, h - 1]); } // 把上下邊緣加入起點。
    for (let y = 0; y < h; y++) { stack.push([left, y], [right - 1, y]); } // 把左右邊緣加入起點。
    while (stack.length) { // 從邊緣往內擴散。
      const [x, y] = stack.pop(); // 取出一個像素。
      if (x < left || x >= right || y < 0 || y >= h) continue; // 超出本格範圍就跳過。
      const p = y * w + x; // 計算像素編號。
      if (visited[p]) continue; // 已處理過就跳過。
      visited[p] = 1; // 標記為已處理。
      if (!isBackground(p * 4)) continue; // 不是白色背景就停止擴散（角色的白色衣領不會被清掉）。
      px[p * 4 + 3] = 0; // 把背景像素設為透明。
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]); // 繼續檢查上下左右。
    } // 結束擴散。
  } // 結束逐格處理。
  sprite.updatePixels(); // 寫回修改後的像素。
} // 結束背景移除。

function computeFrameRects(sprite, frameCount) { // 依照透明間隙找出每一格角色實際所在範圍，避免動作被格線切掉。
  sprite.loadPixels(); // 讀取精靈圖的像素。
  const columnHasPixel = []; // 記錄每一欄是否有角色像素。
  for (let x = 0; x < sprite.width; x++) { // 逐欄檢查。
    let found = false; // 這一欄是否有不透明像素。
    for (let y = 0; y < sprite.height && !found; y++) { // 逐列檢查。
      if (sprite.pixels[(y * sprite.width + x) * 4 + 3] > 16) found = true; // 找到不透明像素。
    } // 結束列檢查。
    columnHasPixel.push(found); // 儲存結果。
  } // 結束欄檢查。
  const segments = []; // 儲存連續有像素的區段。
  for (let x = 0; x < sprite.width; x++) { // 找出每一段連續區域。
    if (columnHasPixel[x] && (x === 0 || !columnHasPixel[x - 1])) segments.push({ left: x, right: x + 1 }); // 新區段開始。
    else if (columnHasPixel[x]) segments[segments.length - 1].right = x + 1; // 延伸目前區段。
  } // 結束區段搜尋。
  const rects = []; // 儲存每格的裁切範圍與位置補償。
  for (let i = 0; i < frameCount; i++) { // 逐格建立資料。
    const cell = frameBounds(sprite, frameCount, i); // 平均切格時的範圍。
    const cellCenter = (cell.left + cell.right) / 2; // 平均格子的中心，代表角色原本的站位。
    const box = segments.length === frameCount ? segments[i] : cell; // 區段數剛好等於影格數才使用實際範圍，否則退回平均切格。
    rects.push({ left: box.left, right: box.right, offset: (box.left + box.right) / 2 - cellCenter }); // 儲存範圍與相對站位的水平偏移。
  } // 結束逐格建立。
  return rects; // 回傳所有影格範圍。
} // 結束影格範圍計算。

function computeFrameBottoms(sprite, rects) { // 逐格找出最下面一列有像素的位置，回傳每格底部留白（原圖像素）。
  sprite.loadPixels(); // 讀取像素。
  return rects.map((rect) => { // 每一格分別計算。
    for (let y = sprite.height - 1; y >= 0; y--) { // 由下往上找。
      for (let x = rect.left; x < rect.right; x++) { // 只掃描這一格的範圍。
        if (sprite.pixels[(y * sprite.width + x) * 4 + 3] > 16) return sprite.height - 1 - y; // 找到腳底。
      } // 結束列掃描。
    } // 結束搜尋。
    return 0; // 整格透明時不補償。
  }); // 結束逐格計算。
} // 結束逐格腳底計算。

function computeBottomPadding(sprite) { // 找出精靈圖最下面一列有角色像素的位置，回傳底部留白佔圖高的比例。
  sprite.loadPixels(); // 讀取精靈圖的像素。
  for (let y = sprite.height - 1; y >= 0; y--) { // 從最底列往上找。
    for (let x = 0; x < sprite.width; x++) { // 掃描整列。
      if (sprite.pixels[(y * sprite.width + x) * 4 + 3] > 16) { // 找到不透明的像素。
        return (sprite.height - 1 - y) / sprite.height; // 回傳底部留白比例。
      } // 結束不透明判斷。
    } // 結束列掃描。
  } // 結束由下往上搜尋。
  return 0; // 整張透明時不補償。
} // 結束底部留白計算。

function layoutScale() { // 依畫布大小計算角色的放大倍率。
  const targetHeight = Math.min(height * bottomModeHeightRatio, width * bottomModeWidthRatio); // 依畫布高與寬取較小值，適應橫式與直式螢幕。
  return targetHeight / characterHeight; // 換算成相對原本大小的倍率。
} // 結束倍率計算。

function pingPongFrame(step, frameCount) { // 把動畫步數轉成來回播放的影格（0→最後→0）。
  const period = 2 * (frameCount - 1); // 一個完整來回需要的步數。
  const s = step % period; // 取得在來回週期中的位置。
  return s < frameCount ? s : period - s; // 前半段往前播，後半段倒著播。
} // 結束來回影格計算。

function draw() { // 每個畫面影格更新背景、移動與角色動畫。
  background(0); // 先塗黑底（背景圖會完整蓋住）。
  const char2Input = controlledCharacter === "p2" && inputEnabled(); // 角色 2 是玩家而且現在可以操作。
  const movingRight = char2Input && (keyIsDown(RIGHT_ARROW) || keyIsDown(68)); // 角色 2：→ 或 D 是否按住。
  const movingLeft = char2Input && (keyIsDown(LEFT_ARROW) || keyIsDown(65)); // 角色 2：← 或 A 是否按住。
  const walkingRight = movingRight && !movingLeft; // 判斷角色是否只向右移動。
  const walkingLeft = movingLeft && !movingRight; // 判斷角色是否只向左移動。
  const isWalking = walkingRight || walkingLeft; // 判斷角色目前是否正在移動。
  const sizeScale = layoutScale(); // 取得目前的放大倍率。
  const displayHeight = characterHeight * sizeScale; // 計算角色實際顯示高度。
  applyKnockback(displayHeight, sizeScale); // 答錯被擊退時，先把玩家往後推。
  updateCharacter1(displayHeight, sizeScale); // 先更新角色 1 的移動（可能會推動鏡頭）。
  drawBackground(); // 依鏡頭位置畫出 3 張串接的背景。
  updateAndDrawLightning(); // 背景到最右端時的閃電與爆炸特效。

  let char2Dx = 0; // 角色 2 這個畫面想移動的距離。
  if (isRunning) { // 奔跑期間不受按鍵影響。
    if (animationStep < runMoveFrames) char2Dx = runSpeed * char2Facing * sizeScale; // 第 12 格前朝面向的方向衝，之後停在原地播完。
  } else if (isBackrunning) { // 向後翻滾期間不受按鍵影響。
    if (animationStep < backrunMoveFrames) char2Dx = -backrunSpeed * char2Facing * sizeScale; // 第 23 格前往背後退，之後停在原地播完。
  } else if (isAttacking) { // 出招時站在原地不移動。
  } else if (walkingRight) { // 按住右鍵時向右走。
    char2Dx = movementSpeed * sizeScale; // 往右移動。
  } else if (walkingLeft) { // 只有按住左鍵時才向左移動。
    char2Dx = -movementSpeed * sizeScale; // 往左移動。
  } // 結束移動判斷。
  const halfWidth = characterWidth * sizeScale / 2; // 角色保留的半寬。
  if (controlledCharacter === "p2") moveControlled(char2Dx, halfWidth); // 角色 2 是玩家：依中央捲動規則移動。
  else characterX += char2Dx; // 角色 2 不是玩家：直接移動（只會在播完動作時發生）。
  characterX = constrain(characterX, halfWidth, width - halfWidth); // 限制角色不要移出畫布。
  updateFacing(); // 非控制角色轉向面對玩家。

  if (jumpPhase === "airborne") { // 只有空中階段才更新跳躍物理。
    jumpOffset += verticalVelocity * sizeScale; // 依目前垂直速度更新角色高度（跳躍高度隨角色大小調整）。
    verticalVelocity += gravity; // 逐漸增加向下的重力速度。
    if (jumpOffset >= 0) { // 角色回到地面。
      jumpOffset = 0; // 將角色放回地面。
      verticalVelocity = 0; // 清除垂直速度。
      jumpPhase = "landing"; // 進入落地收尾動作。
    } // 結束落地判斷。
  } // 結束跳躍物理更新。

  let activeSprite, activeFrameCount, frameDuration; // 宣告目前使用的精靈圖、影格數與每格時間。
  if (jumpPhase === "prepare") { // 跳躍預備（角色還在地面）。
    activeSprite = jumpPrepareSprite; activeFrameCount = jumpPrepareFrameCount; frameDuration = jumpPrepareFrameDuration; // 預備設定。
  } else if (jumpPhase === "airborne") { // 空中。
    activeSprite = jumpAirSprite; activeFrameCount = jumpAirFrameCount; frameDuration = jumpAirFrameDuration; // 空中設定。
  } else if (jumpPhase === "landing") { // 落地收尾。
    activeSprite = jumpLandSprite; activeFrameCount = jumpLandFrameCount; frameDuration = jumpLandFrameDuration; // 落地設定。
  } else if (isRunning) { // 奔跑。
    activeSprite = runSprite; activeFrameCount = runFrameCount; frameDuration = runFrameDuration; // 奔跑設定。
  } else if (isBackrunning) { // 向後翻滾。
    activeSprite = backrunSprite; activeFrameCount = backrunFrameCount; frameDuration = backrunFrameDuration; // 向後翻滾設定。
  } else if (isAttacking) { // 出招。
    activeSprite = spaceSprite; activeFrameCount = spaceFrameCount; frameDuration = spaceFrameDurations[animationStep] || 60; // 出招設定（每格時間不同）。
  } else if (isWalking && (walkingRight ? 1 : -1) !== char2Facing) { // 往背後的方向走：後退。
    activeSprite = backwalkSprite; activeFrameCount = walkFrameCount; frameDuration = 80; // 後退設定。
  } else if (isWalking) { // 往面向的方向走：前進。
    activeSprite = walkSprite; activeFrameCount = walkFrameCount; frameDuration = 80; // 前進設定。
  } else { // 待機。
    activeSprite = idleSprite; activeFrameCount = idleFrameCount; frameDuration = 90; // 待機設定。
  } // 結束動作選擇。

  if (activeSprite !== previousSprite) { // 切換動作時從新精靈圖的第一格開始。
    animationStep = 0; // 重設動畫步數。
    lastFrameTime = millis(); // 重設動畫影格計時。
    previousSprite = activeSprite; // 記錄目前使用的精靈圖。
  } // 結束動作切換處理。
  if (millis() - lastFrameTime >= frameDuration) { // 到達切換時間時前進一步。
    if (jumpPhase === "prepare") { // 預備動作播完才真正起跳。
      if (animationStep + 1 >= activeFrameCount) { // 預備最後一格已播完。
        jumpPhase = "airborne"; // 進入空中階段。
        verticalVelocity = -jumpStrength; // 設定向上的起跳速度。
      } else { // 還沒播完。
        animationStep++; // 前進一格。
      } // 結束預備判斷。
    } else if (jumpPhase === "airborne") { // 空中動作播到最後一格後停住，直到落地。
      animationStep = min(animationStep + 1, activeFrameCount - 1); // 前進一格並限制在最後影格。
    } else if (jumpPhase === "landing") { // 落地動作只播一次。
      if (animationStep + 1 >= activeFrameCount) { // 落地最後一格已播完。
        jumpPhase = "none"; // 結束整個跳躍，下一個畫面回到待機或行走。
      } else { // 還沒播完。
        animationStep++; // 前進一格。
      } // 結束落地判斷。
    } else if (isRunning) { // 奔跑只播放一次。
      if (animationStep + 1 >= activeFrameCount) { // 已播完最後一格。
        isRunning = false; // 結束奔跑，下一個畫面回到待機或行走。
      } else { // 還沒播完。
        animationStep++; // 前進一格。
      } // 結束奔跑播放判斷。
    } else if (isBackrunning) { // 向後翻滾只播放一次。
      if (animationStep + 1 >= activeFrameCount) { // 已播完最後一格。
        isBackrunning = false; // 結束翻滾，下一個畫面回到待機或行走。
      } else { // 還沒播完。
        animationStep++; // 前進一格。
      } // 結束翻滾播放判斷。
    } else if (isAttacking) { // 出招只播放一次。
      if (animationStep + 1 >= activeFrameCount) { // 已播完最後一格。
        isAttacking = false; // 結束出招，下一個畫面回到待機或行走。
      } else { // 還沒播完。
        animationStep++; // 前進一格。
        if (animationStep === effectStartFrame) { // 到了揮刀的影格。
          effectDir = char2Facing; // 刀光朝角色 2 面向的方向飛。
          effectActive = true; // 開始播放刀光特效。
          effectStep = 0; // 從特效第一格開始。
          effectLastTime = millis(); // 重設特效計時。
          effectX = null; // 位置在下方繪製時依角色目前位置決定。
          effectTraveled = 0; // 重設飛行距離。
        } // 結束特效觸發判斷。
      } // 結束出招播放判斷。
    } else { // 其他動畫持續前進。
      animationStep++; // 前進一步。
    } // 結束步數更新。
    lastFrameTime = millis(); // 記錄這次切換影格的時間。
  } // 結束動畫計時判斷。

  let frameIndex; // 實際要顯示的影格編號。
  if (activeSprite === idleSprite) { // 待機用來回播放：1→12→1。
    frameIndex = pingPongFrame(animationStep, activeFrameCount); // 計算來回影格。
  } else if (jumpPhase !== "none") { // 跳躍各階段不循環。
    frameIndex = min(animationStep, activeFrameCount - 1); // 直接使用步數。
  } else { // 行走與奔跑循環播放。
    frameIndex = animationStep % activeFrameCount; // 循環回到開頭。
  } // 結束影格編號計算。

  const rect = frameRects.has(activeSprite) ? frameRects.get(activeSprite)[frameIndex] : { ...frameBounds(activeSprite, activeFrameCount, frameIndex), offset: 0 }; // 取得影格在圖中的實際位置。
  const left = rect.left; // 裁切左邊界。
  const frameWidth = rect.right - rect.left; // 計算單格寬度。
  const keepPixelScale = activeSprite !== idleSprite && activeSprite !== walkSprite && activeSprite !== backwalkSprite; // 翻滾、出招、三段跳躍的圖高度和待機圖不同，依原圖像素比例縮放。
  const spriteHeight = keepPixelScale ? displayHeight * activeSprite.height / idleSprite.height : displayHeight; // 依原圖比例放大，角色才不會突然變小。
  const displayWidth = spriteHeight * frameWidth / activeSprite.height; // 依精靈圖比例計算角色顯示寬度。
  const idleCenterOffset = activeSprite === idleSprite ? idleFrameOffsets[frameIndex] * spriteHeight / activeSprite.height : 0; // 計算待機影格的顯示位置補償。
  const padding = (spriteBottomPadding.get(activeSprite) || 0) * spriteHeight; // 換算這張圖底部透明留白的顯示高度。
  const groundY = groundLevel() - spriteHeight / 2 + padding; // 角色站在地面時的中心高度：往下補回留白，讓腳底剛好踩在背景的道路上。
  const frameShift = rect.offset * spriteHeight / activeSprite.height; // 依原本站位補回這一格的水平偏移，動作才不會左右亂跳。
  push(); // 保存繪圖設定。
  translate(characterX + (frameShift - idleCenterOffset) * char2Facing, groundY + jumpOffset); // 移到角色 2 的位置（翻轉時偏移也要反向）。
  scale(char2Facing, 1); // 面向左時水平翻轉圖片。
  image(activeSprite, 0, 0, displayWidth, spriteHeight, left, 0, frameWidth, activeSprite.height); // 裁切影格並以目前大小繪製角色 2。
  pop(); // 還原繪圖設定。

  if (effectActive) { // 播放會往前飛的刀光特效。
    const pixelScale = displayHeight / idleSprite.height; // 原圖每像素對應的顯示大小，與角色一致。
    if (effectX === null) { // 剛觸發時，從角色前方出現。
      const feetY = groundY + jumpOffset + spriteHeight / 2 - (spriteBottomPadding.get(activeSprite) || 0) * spriteHeight; // 角色腳底在畫面上的高度。
      effectX = characterX + effectOffsetX * pixelScale * effectDir; // 起始水平位置（在角色面前）。
      effectY = feetY - effectOffsetY * pixelScale; // 起始垂直位置（之後固定高度飛行）。
    } // 結束起始位置設定。
    const flying = effectStep < effectFlyFrames; // 前幾格為飛行階段。
    if (flying) { // 飛行中持續往前。
      effectX += effectSpeed * sizeScale * effectDir; // 朝出招方向飛。
      effectTraveled += effectSpeed * sizeScale; // 累計飛行距離。
    } // 結束飛行移動。
    if (effectActive && millis() - effectLastTime >= effectFrameDuration) { // 到達換格時間（已命中消失的刀光不用再換格）。
      effectLastTime = millis(); // 記錄換格時間。
      const reachedEnd = effectTraveled >= effectRange * sizeScale || effectX > width + 100 * pixelScale || effectX < -100 * pixelScale; // 飛到設定距離或從左右飛出畫面。
      if (flying && !reachedEnd) { // 還在飛，循環播放完整刀光。
        effectStep = (effectStep + 1) % effectFlyFrames; // 在前幾格之間循環。
      } else { // 開始或繼續消散。
        effectStep = flying ? effectFlyFrames : effectStep + 1; // 跳到消散影格或往下播。
      } // 結束換格判斷。
    } // 結束特效計時。
    if (!effectActive) { // 已經命中消失。
    } else if (effectStep >= effectFrameCount) { // 消散動畫播完。
      effectActive = false; // 停止特效。
    } else { // 特效還在播。
      const fx = frameBounds(effectSprite, effectFrameCount, effectStep); // 取得特效影格在圖中的位置。
      const fw = fx.right - fx.left; // 特效單格寬度。
      push(); // 保存繪圖設定。
      translate(effectX, effectY); // 移到刀光位置。
      scale(effectDir, 1); // 往左飛時水平翻轉。
      image(effectSprite, 0, 0, fw * pixelScale, effectSprite.height * pixelScale, fx.left, 0, fw, effectSprite.height); // 繪製刀光。
      pop(); // 還原繪圖設定。
    } // 結束特效繪製。
  } // 結束特效處理。
  drawCharacter1(displayHeight); // 繪製角色 1。
  drawPenaltyStrikes(); // 答錯時打在玩家身上的閃電。
  drawOrangeExplosions(); // 橘色爆炸畫在角色前面。
  drawFloatingTexts(); // 角色頭上的 +1、答錯文字。
  updateQuizTrigger(sizeScale); // 玩家靠近非控制角色時出題。
  drawHurtFlash(); // 答錯時畫面閃紅光。
  if (!quizActive) drawInstructions(); // 答題時隱藏操作說明，畫面比較乾淨。
  if (!quizActive) drawScore(); // 右上角顯示答對、答錯題數（答題時隱藏，避免和方框重疊）。
  if (quizActive) drawQuizBox(); // 畫面上方的答題方框。
  if (controlledCharacter === null) drawSelectionScreen(); // 還沒選角色時顯示選角畫面。
} // 結束每影格更新與繪製。

function updateCharacter1(displayHeight, sizeScale) { // 角色 1：讀取方向鍵、計算移動距離與跳躍物理。
  const pixelScale = displayHeight / idleSprite.height; // 與角色 2 使用相同的像素比例，兩人大小一致。
  const p1Input = controlledCharacter === "p1" && inputEnabled(); // 角色 1 是玩家而且現在可以操作。
  const left = p1Input && (keyIsDown(LEFT_ARROW) || keyIsDown(65)); // 是否按住 ← 或 A。
  const right = p1Input && (keyIsDown(RIGHT_ARROW) || keyIsDown(68)); // 是否按住 → 或 D。
  const p1Busy = p1Running || p1Backrunning; // 是否正在播放跑步或快速後退。
  const walkingLeft = left && !right && !p1Busy; // 只往左（特殊動作中不走路）。
  const walkingRight = right && !left && !p1Busy; // 只往右（特殊動作中不走路）。
  const character2RunTime = runMoveFrames * runFrameDuration; // 角色 2 奔跑（及翻滾）實際移動的時間。
  const p1RunSpeed = runSpeed * character2RunTime / (p1RunMoveFrames * p1RunFrameDuration); // 角色 1 跑步速度：總移動距離和角色 2 奔跑一樣。
  const p1BackrunSpeed = runSpeed * character2RunTime / (p1BackrunMoveFrames * p1BackrunFrameDuration); // 角色 1 快速後退速度：總移動距離和角色 2 翻滾一樣。
  let dx = 0; // 這個畫面角色 1 想移動的距離（正數往右、負數往左）。
  if (p1Running) { // 跑步期間不受按鍵影響，自動往左衝。
    if (p1Step < p1RunMoveFrames) dx = p1RunSpeed * p1Facing * sizeScale; // 第 20 格前朝面向的方向跑，之後停在原地播完。
  } else if (p1Backrunning) { // 快速後退期間不受按鍵影響，自動往右退。
    if (p1Step < p1BackrunMoveFrames) dx = -p1BackrunSpeed * p1Facing * sizeScale; // 第 23 格前往背後退，之後停在原地播完。
  } else if (walkingLeft) { // 左鍵：面向左往前走（walk）。
    dx = -movementSpeed * sizeScale; // 往左移動。
  } else if (walkingRight) { // 右鍵：面向左往後退（walkback）。
    dx = movementSpeed * sizeScale; // 往右移動。
  } // 結束移動判斷。
  const halfWidth = 35 * pixelScale; // 角色 1 保留的半寬。
  if (controlledCharacter === "p1") moveControlled(dx, halfWidth); // 角色 1 是玩家：依「中央捲動」規則，把移動分給角色或鏡頭。
  else p1X += dx; // 角色 1 不是玩家：直接移動（只會在播完動作時發生）。
  p1X = constrain(p1X, halfWidth, width - halfWidth); // 不要走出畫布。

  if (p1JumpPhase === "air") { // 角色 1 在空中時更新跳躍物理（和角色 2 使用相同的重力與起跳速度）。
    p1JumpOffset += p1VerticalVelocity * sizeScale; // 依垂直速度更新高度，跳躍高度隨角色大小調整。
    p1VerticalVelocity += gravity; // 重力讓角色往下掉。
    p1AirFrames++; // 累計滯空畫面數。
    if (p1JumpOffset >= 0) { // 回到地面。
      p1JumpOffset = 0; // 放回地面。
      p1VerticalVelocity = 0; // 清除垂直速度。
      p1JumpPhase = "landing"; // 進入落地動作。
      p1Step = 0; // 從落地第一格開始。
      p1LastFrameTime = millis(); // 重設計時。
    } // 結束落地判斷。
  } // 結束跳躍物理。
  p1WalkingLeft = walkingLeft; // 記下是否往左走，給繪製時使用。
  p1WalkingRight = walkingRight; // 記下是否往右走，給繪製時使用。
} // 結束角色 1 移動更新。

function drawCharacter1(displayHeight) { // 角色 1：依目前狀態選擇動作、更新影格並繪製。
  const pixelScale = displayHeight / idleSprite.height; // 與角色 2 使用相同的像素比例，兩人大小一致。
  const walkingLeft = p1WalkingLeft; // 這個畫面是否往左走。
  const walkingRight = p1WalkingRight; // 這個畫面是否往右走。
  const p1Busy = p1Running || p1Backrunning; // 是否正在播放跑步或快速後退。
  const walking = walkingLeft || walkingRight; // 是否正在走。
  const sprite = p1Running ? p1RunSprite : p1Backrunning ? p1BackrunSprite : p1Jumping ? p1JumpSprite : walking ? ((walkingRight ? 1 : -1) === p1Facing ? p1WalkSprite : p1WalkbackSprite) : p1StandSprite; // 跑步優先；往面向的方向走用 walk，往背後走用 walkback；沒按則站立。
  const count = p1Running ? p1RunFrameCount : p1Backrunning ? p1BackrunFrameCount : p1Jumping ? p1JumpFrameCount : walking ? p1WalkFrameCount : p1StandFrameCount; // 影格數。
  const duration = p1Running ? p1RunFrameDuration : p1Backrunning ? p1BackrunFrameDuration : p1JumpPhase === "prepare" ? p1JumpPrepareDuration : p1JumpPhase === "landing" ? p1JumpLandDuration : p1Jumping ? 1000 : walking ? p1WalkFrameDuration : p1StandFrameDuration; // 每格時間。
  if (sprite !== p1PreviousSprite) { // 切換動作時從第一格開始。
    p1Step = 0; // 重設步數。
    p1LastFrameTime = millis(); // 重設計時。
    p1PreviousSprite = sprite; // 記錄目前動作。
  } // 結束動作切換。
  if (millis() - p1LastFrameTime >= duration) { // 到時間就前進一格。
    if (p1Busy && p1Step + 1 >= count) { // 跑步或快速後退最後一格已播完。
      p1Running = false; // 結束跑步。
      p1Backrunning = false; // 結束快速後退，下一個畫面回到站立或行走。
    } else if (p1JumpPhase === "prepare") { // 預備動作。
      if (p1Step >= p1JumpPrepareFrames[1] - p1JumpPrepareFrames[0]) { // 預備最後一格已播完，起跳。
        p1JumpPhase = "air"; // 進入空中。
        p1VerticalVelocity = -jumpStrength; // 設定向上的起跳速度。
        p1AirFrames = 0; // 重設滯空計數。
      } else { // 還沒播完。
        p1Step++; // 前進一格。
      } // 結束預備判斷。
    } else if (p1JumpPhase === "landing") { // 落地動作。
      if (p1Step >= p1JumpLandFrames[1] - p1JumpLandFrames[0]) { // 落地最後一格已播完。
        p1JumpPhase = "none"; // 結束整個跳躍。
        p1Jumping = false; // 下一個畫面回到站立或行走。
      } else { // 還沒播完。
        p1Step++; // 前進一格。
      } // 結束落地判斷。
    } else if (p1Jumping) { // 空中由滯空進度決定影格，這裡不用前進。
    } else { // 一般情況。
      p1Step++; // 前進。
    } // 結束跑步播放判斷。
    p1LastFrameTime = millis(); // 記錄時間。
  } // 結束計時。
  const totalAirFrames = 2 * jumpStrength / gravity; // 整個跳躍在空中的畫面數。
  const airFrameCount = p1JumpAirFrames[1] - p1JumpAirFrames[0] + 1; // 空中階段的影格數。
  const frameIndex = p1JumpPhase === "prepare" ? p1JumpPrepareFrames[0] + Math.min(p1Step, p1JumpPrepareFrames[1] - p1JumpPrepareFrames[0]) // 預備：第 1～7 格。
    : p1JumpPhase === "landing" ? p1JumpLandFrames[0] + Math.min(p1Step, p1JumpLandFrames[1] - p1JumpLandFrames[0]) // 落地：第 23～27 格。
    : sprite === p1JumpSprite && !p1Jumping ? p1JumpLandFrames[1] // 跳躍剛在這個畫面結束：停在最後一格（站立），避免閃出別的影格。
    : p1Jumping ? p1JumpAirFrames[0] + Math.min(Math.floor(p1AirFrames / totalAirFrames * airFrameCount), airFrameCount - 1) // 空中：第 8～22 格跟著滯空進度播放。
    : p1Busy ? Math.min(p1Step, count - 1) : walking ? p1Step % count : pingPongFrame(p1Step, count); // 跑步只播一次，站立來回播放（1→24→1），行走循環播放。

  const rect = frameRects.get(sprite)[frameIndex]; // 取得影格範圍。
  const srcWidth = rect.right - rect.left; // 原圖影格寬度。
  const drawHeight = sprite.height * pixelScale; // 顯示高度。
  const drawWidth = srcWidth * pixelScale; // 顯示寬度。
  const padding = sprite === p1JumpSprite ? p1JumpFrameBottoms[frameIndex] * pixelScale // 跳躍圖逐格對齊腳底。
    : (spriteBottomPadding.get(sprite) || 0) * drawHeight; // 其他圖使用整張的底部透明留白。
  const centerY = groundLevel() - drawHeight / 2 + padding; // 腳底踩在背景的道路上。
  push(); // 保存繪圖設定。
  translate(p1X + rect.offset * pixelScale * p1Facing, centerY + p1JumpOffset); // 移到角色位置（翻轉時偏移也要反向）。
  scale(p1Facing, 1); // 面向左時水平翻轉圖片。
  image(sprite, 0, 0, drawWidth, drawHeight, rect.left, 0, srcWidth, sprite.height); // 繪製角色 1。
  pop(); // 還原繪圖設定。
} // 結束角色 1 繪製。

function playerX() { // 玩家角色目前的畫面位置。
  return controlledCharacter === "p1" ? p1X : characterX; // 依選擇的角色回傳。
} // 結束玩家位置。

function setPlayerX(x) { // 設定玩家角色的畫面位置。
  if (controlledCharacter === "p1") p1X = x; // 玩家是角色 1。
  else characterX = x; // 玩家是角色 2。
} // 結束設定玩家位置。

function npcX() { // 非控制角色目前的畫面位置。
  return controlledCharacter === "p1" ? characterX : p1X; // 依選擇的角色回傳另一個角色。
} // 結束非控制角色位置。

function playerHalfWidth(displayHeight) { // 玩家角色保留的半寬（碰到視窗邊緣時用）。
  return controlledCharacter === "p1" ? 35 * displayHeight / idleSprite.height : characterWidth * displayHeight / characterHeight / 2; // 兩個角色的寬度不同。
} // 結束半寬計算。

function inputEnabled() { // 玩家現在能不能操作。
  return controlledCharacter !== null && !quizActive && knockbackRemaining === 0; // 選角中、答題中、被擊退時都不能操作。
} // 結束操作判斷。

function moveControlled(dx, halfWidth) { // 中央捲動：玩家在中央時改由背景移動，背景到盡頭才讓玩家走到邊緣。
  const center = width / 2; // 畫面中央的位置。
  let x = playerX(); // 玩家目前位置。
  let remainingMovement = Math.abs(dx); // 還沒分配完的移動距離。
  if (dx > 0) { // 往右移動。
    if (x < center - 0.5) { // 玩家在中央左邊：先走回中央。
      const step = Math.min(remainingMovement, center - x); // 最多走到中央。
      x += step; // 玩家往右走。
      remainingMovement -= step; // 扣掉已經走的距離。
    } // 結束走回中央。
    if (Math.abs(x - center) <= 0.5 && remainingMovement > 0) { // 玩家在中央：改由鏡頭往右（背景往左）。
      x = center; // 對齊中央。
      const scrollDistance = Math.min(remainingMovement, maxCameraX() - backgroundCameraX); // 最多捲到長圖最右端。
      backgroundCameraX += scrollDistance; // 鏡頭往右移。
      shiftWorld(scrollDistance); // 非控制角色與特效跟著背景一起移動。
      remainingMovement -= scrollDistance; // 扣掉鏡頭吃掉的距離。
    } // 結束鏡頭捲動。
    x = Math.min(width - halfWidth, x + remainingMovement); // 背景到盡頭後，剩下的距離由玩家走，停在視窗邊緣。
  } else if (dx < 0) { // 往左移動。
    if (x > center + 0.5) { // 玩家在中央右邊：先走回中央。
      const step = Math.min(remainingMovement, x - center); // 最多走到中央。
      x -= step; // 玩家往左走。
      remainingMovement -= step; // 扣掉已經走的距離。
    } // 結束走回中央。
    if (Math.abs(x - center) <= 0.5 && remainingMovement > 0) { // 玩家在中央：改由鏡頭往左（背景往右）。
      x = center; // 對齊中央。
      const scrollDistance = Math.min(remainingMovement, backgroundCameraX); // 最多捲到長圖最左端。
      backgroundCameraX -= scrollDistance; // 鏡頭往左移。
      shiftWorld(-scrollDistance); // 非控制角色與特效跟著背景一起移動。
      remainingMovement -= scrollDistance; // 扣掉鏡頭吃掉的距離。
    } // 結束鏡頭捲動。
    x = Math.max(halfWidth, x - remainingMovement); // 背景到盡頭後，剩下的距離由玩家走，停在視窗邊緣。
  } // 結束方向判斷。
  setPlayerX(x); // 寫回玩家位置。
} // 結束中央捲動。

function shiftWorld(cameraDelta) { // 鏡頭移動時，讓站在背景上的東西跟著背景反方向移動。
  if (controlledCharacter === "p1") characterX -= cameraDelta; // 非控制角色（角色 2）跟著背景移動。
  else p1X -= cameraDelta; // 非控制角色（角色 1）跟著背景移動。
  for (const strike of penaltyStrikes) strike.x -= cameraDelta; // 懲罰閃電跟著背景移動。
  for (const t of floatingTexts) t.x -= cameraDelta; // 飄字跟著背景移動。
  if (effectX !== null) effectX -= cameraDelta; // 飛行中的刀光也跟著背景移動。
  for (const boom of orangeExplosions) boom.x -= cameraDelta; // 橘色爆炸也跟著背景移動。
} // 結束世界位移。

function groundLevel() { // 地面（背景道路）在畫面上的高度。
  return height * groundRatio; // 背景高度填滿畫布，所以道路一律在畫布高 0.935 的位置。
} // 結束地面高度計算。

function backgroundTileWidth() { // 依畫布高度等比例計算一張背景的寬度。
  return (backgroundImage.width / backgroundImage.height) * height; // 背景高度填滿畫布，寬度照原圖比例。
} // 結束背景寬度計算。

function maxCameraX() { // 鏡頭能到的最右位置。
  return Math.max(0, backgroundTileWidth() * backgroundTileCount - width); // 長圖總寬減掉一個視窗寬。
} // 結束鏡頭最右位置計算。

function drawBackground() { // 依鏡頭位置畫出 3 張串接的背景。
  backgroundCameraX = constrain(backgroundCameraX, 0, maxCameraX()); // 鏡頭不能超出長圖範圍，右邊就不會露出黑色。
  const tileWidth = backgroundTileWidth(); // 一張背景的寬度。
  push(); // 保存繪圖設定。
  imageMode(CORNER); // 背景用左上角定位比較好算。
  for (let i = 0; i < backgroundTileCount; i++) { // 依序畫 3 張背景。
    const x = i * tileWidth - backgroundCameraX; // 第 i 張在畫面上的左邊位置。
    image(backgroundImage, Math.floor(x), 0, Math.ceil(tileWidth) + 1, height); // 多畫 1 像素重疊，接縫不會出現細縫。
  } // 結束背景繪製。
  pop(); // 還原繪圖設定。
} // 結束背景繪製。

function updateAndDrawLightning() { // 背景到最右端時：3 次閃電＋1 次藍色爆炸，不斷重複；背景往回捲時跟著退場。
  const atRightEnd = maxCameraX() > 0 && backgroundCameraX >= maxCameraX() - 0.5; // 鏡頭是否已在長圖最右端。
  if (atRightEnd && !lightningActive) { // 第一次到達最右端：開始特效。
    lightningActive = true; // 開始閃電。
    lightningStartedAt = millis(); // 記下開始時間。
    lightningWorldX = backgroundCameraX + width * lightningScreenRatio; // 記下閃電在背景長圖上的位置（世界座標）。
    lastThunderStrikeId = -1; // 重設雷聲紀錄。
    lastAirBoomCycle = -1; // 重設橘色空中爆炸紀錄。
  } // 結束觸發判斷。
  if (!lightningActive) return; // 沒有特效就不用畫。

  const effectX = lightningWorldX - backgroundCameraX; // 世界座標換算回畫面座標：背景往右捲，閃電也往右移。
  const lightningWidth = (lightningSheet.width / lightningFrameCount) * height / lightningSheet.height; // 閃電顯示寬度。
  const explosionWidth = (explosionSheet.width / explosionFrameCount) * (height * explosionHeightRatio) / explosionSheet.height; // 爆炸顯示寬度。
  const effectDisplayWidth = Math.max(lightningWidth, explosionWidth); // 取較寬的當作特效寬度（用來判斷是否完全離開畫面）。
  const effectHasExited = effectX - effectDisplayWidth / 2 > width; // 特效左邊緣已超過視窗右邊＝完全離開。
  if (effectHasExited) { // 已經退出畫面。
    lightningActive = false; // 停止特效（音效也不會再播）。
    return; // 結束。
  } // 結束退場判斷。

  const elapsed = millis() - lightningStartedAt; // 特效開始後經過的時間。
  const cycleElapsed = elapsed % lightningCycleDuration; // 在目前這個 4 秒循環裡經過的時間。
  const strikeId = Math.floor(elapsed / lightningStrikeDuration); // 從開始算起的第幾個 1 秒時段（每個時段不同）。
  const strikeNumber = Math.floor(cycleElapsed / lightningStrikeDuration); // 這個循環裡的第幾段：0、1、2 是閃電，3 是爆炸。
  if (strikeNumber < lightningStrikeCount) { // 閃電階段。
    if (strikeId !== lastThunderStrikeId) { // 這道閃電還沒響過。
      playThunder(); // 播一次雷聲。
      lastThunderStrikeId = strikeId; // 記下來，同一道閃電不會重複播放。
      spawnOrangeExplosion("ground", effectX, groundLevel(), height * 0.25 / 0.7); // 閃電打到道路：在落點播橘色地面爆炸（高約畫布 1/4）。
    } // 結束音效判斷。
    const frame = Math.floor((cycleElapsed % lightningStrikeDuration) / lightningStrikeDuration * lightningFrameCount); // 換算成 0～13 格。
    drawLightningBolt(effectX, frame); // 畫閃電：從畫面最上方打到最下方。
  } else { // 爆炸階段。
    const t = cycleElapsed - lightningStrikeCount * lightningStrikeDuration; // 爆炸開始後經過的時間。
    const cycleIndex = Math.floor(elapsed / lightningCycleDuration); // 目前是第幾個循環。
    if (cycleIndex !== lastAirBoomCycle) { // 這個循環的爆炸階段剛開始。
      lastAirBoomCycle = cycleIndex; // 記下來，同一個循環只播一次。
      spawnOrangeExplosion("air", effectX, groundLevel() - height * explosionHeightRatio, height * 0.4 / 0.9); // 和藍色爆炸一起，在上方播橘色空中爆炸（高約畫布 0.4）。
    } // 結束橘色空中爆炸判斷。
    const frame = Math.min(explosionFrameCount - 1, Math.floor(t / 1000 * explosionFrameCount)); // 換算成 0～9 格。
    drawExplosion(effectX, frame); // 畫藍色爆炸：貼齊畫面底端。
  } // 結束階段判斷。
} // 結束閃電特效。

function drawLightningBolt(x, frame) { // 畫一格閃電精靈圖：高 = 畫布高，從 y = 0 開始。
  const fw = lightningSheet.width / lightningFrameCount; // 閃電單格寬。
  const drawHeight = groundLevel(); // 閃電顯示高度：從畫面最上方打到道路上。
  const drawWidth = fw * drawHeight / lightningSheet.height; // 寬度依原圖比例縮放。
  if (frame < 2) { // 剛打下來的前 2 格：整個畫面閃一下白光。
    noStroke(); // 不畫邊框。
    fill(200, 220, 255, 45 * (2 - frame)); // 淡藍白色半透明。
    rect(0, 0, width, height); // 蓋住整個畫面。
  } // 結束閃光。
  push(); // 保存繪圖設定。
  imageMode(CORNER); // 用左上角定位。
  image(lightningSheet, x - drawWidth / 2, 0, drawWidth, drawHeight, frame * fw, 0, fw, lightningSheet.height); // 切出第 frame 格並畫出來。
  pop(); // 還原繪圖設定。
} // 結束閃電繪製。

function drawExplosion(x, frame) { // 畫一格藍色爆炸精靈圖：高 = 畫布高 × 0.2，貼齊畫面底端。
  const fw = explosionSheet.width / explosionFrameCount; // 爆炸單格寬。
  const drawHeight = height * explosionHeightRatio; // 爆炸顯示高度。
  const drawWidth = fw * drawHeight / explosionSheet.height; // 寬度依原圖比例縮放。
  push(); // 保存繪圖設定。
  imageMode(CORNER); // 用左上角定位。
  image(explosionSheet, x - drawWidth / 2, groundLevel() - drawHeight, drawWidth, drawHeight, frame * fw, 0, fw, explosionSheet.height); // y = 道路高度 − 爆炸高，爆炸底部貼在道路上。
  pop(); // 還原繪圖設定。
} // 結束爆炸繪製。

function spawnOrangeExplosion(type, x, y, displayHeight) { // 新增一個橘色爆炸：air 以 (x, y) 為中心，ground 底部貼齊 y。
  orangeExplosions.push({ type, x, y, size: displayHeight, startedAt: millis() }); // 記下種類、位置、大小與開始時間。
} // 結束新增爆炸。

function drawOrangeExplosions() { // 播放所有橘色爆炸，播完就移除。
  orangeExplosions = orangeExplosions.filter((boom) => { // 逐一處理，回傳 false 的會被移除。
    const frame = Math.floor((millis() - boom.startedAt) / orangeExplosionFrameDuration); // 目前播到第幾格。
    if (frame >= orangeExplosionFrameCount) return false; // 10 格播完就移除。
    const sheet = boom.type === "air" ? airExplosionSheet : groundExplosionSheet; // 選擇空中或地面爆炸圖。
    const fw = sheet.width / orangeExplosionFrameCount; // 單格寬。
    const drawHeight = boom.type === "air" ? boom.size * 0.9 : boom.size * 0.7; // 空中爆炸約角色高度，地面爆炸小一點。
    const drawWidth = fw * drawHeight / sheet.height; // 寬度依原圖比例。
    const top = boom.type === "air" ? boom.y - drawHeight / 2 : boom.y - drawHeight; // 空中以中心定位，地面底部貼齊。
    push(); // 保存繪圖設定。
    imageMode(CORNER); // 用左上角定位。
    image(sheet, boom.x - drawWidth / 2, top, drawWidth, drawHeight, frame * fw, 0, fw, sheet.height); // 畫出這一格。
    pop(); // 還原繪圖設定。
    return true; // 還沒播完，保留。
  }); // 結束逐一處理。
} // 結束橘色爆炸繪製。

function setupThunderSound() { // 用 p5.sound 合成雷聲（素材資料夾沒有音效檔時使用）。
  try { // p5.sound 載入失敗時不讓整個程式停止。
    thunderRumble = new p5.Noise("brown"); // 低沉的布朗噪音當作轟隆聲。
    thunderRumbleFilter = new p5.LowPass(); // 建立低通濾波器。
    thunderRumble.disconnect(); // 先斷開預設輸出。
    thunderRumble.connect(thunderRumbleFilter); // 改接到濾波器。
    thunderRumbleFilter.freq(350); // 只留下 350Hz 以下的低音。
    thunderRumble.amp(0); // 平常不出聲。
    thunderRumble.start(); // 開始產生噪音（音量 0）。
    thunderCrack = new p5.Noise("white"); // 尖銳的白噪音當作劈啪聲。
    thunderCrack.amp(0); // 平常不出聲。
    thunderCrack.start(); // 開始產生噪音（音量 0）。
    thunderRumbleEnvelope = new p5.Envelope(0.02, 1.0 * thunderVolume, 0.4, 0.6 * thunderVolume, 1.6, 0); // 轟隆聲：0.02 秒變大、慢慢消失（音量乘上 25%）。
    thunderCrackEnvelope = new p5.Envelope(0.003, 0.5 * thunderVolume, 0.08, 0.1 * thunderVolume, 0.15, 0); // 劈啪聲：非常短（音量乘上 25%）。
    audioReady = true; // 合成雷聲建立完成。
  } catch (err) { // 建立失敗時。
    audioReady = false; // 不播放雷聲，畫面照常運作。
  } // 結束例外處理。
} // 結束雷聲設定。

function playThunder() { // 播一次雷聲。
  if (thunderFile) { // 有雷聲 mp3 就用檔案。
    thunderFile.setVolume(thunderVolume); // 音量 25%。
    thunderFile.play(); // 播放一次。
    return; // 不再播合成雷聲。
  } // 結束 mp3 播放。
  if (!audioReady) return; // 沒有建立成功就跳過。
  thunderCrackEnvelope.play(thunderCrack, 0, 0.02); // 先劈啪一聲。
  thunderRumbleEnvelope.play(thunderRumble, 0.05, 0.3); // 接著轟隆聲。
} // 結束雷聲播放。

function loadOptionalSounds() { // 在 setup 裡非同步載入音效檔：找不到檔案也不會卡住畫面。
  try { // p5.sound 有問題時不讓程式停止。
    loadSound(thunderFilePath, (sound) => { thunderFile = sound; }, () => { thunderFile = null; }); // 載入成功就改用 mp3 雷聲，失敗就維持合成雷聲。
    loadBgm(0); // 從第一個檔名開始嘗試載入背景音樂。
  } catch (err) { // 載入過程出錯。
    thunderFile = null; // 使用合成雷聲。
    bgmSound = null; // 不播放背景音樂。
  } // 結束例外處理。
} // 結束音效檔載入。

function loadBgm(index) { // 依序嘗試 bgmFilePaths 裡的檔名，找到第一個存在的就使用。
  if (index >= bgmFilePaths.length) return; // 全部都找不到就不播放背景音樂。
  loadSound(bgmFilePaths[index], (sound) => { // 載入成功。
    bgmSound = sound; // 記下背景音樂。
    startBgm(); // 如果使用者已經按過鍵，就直接開始播放。
  }, () => loadBgm(index + 1)); // 載入失敗就換下一個檔名。
} // 結束背景音樂載入。

function startBgm() { // 開始循環播放背景音樂。
  if (!bgmSound || bgmSound.isPlaying()) return; // 沒有檔案或已經在播就跳過。
  if (getAudioContext().state !== "running") return; // 使用者還沒操作過，瀏覽器不允許播放。
  bgmSound.setVolume(bgmVolume); // 設定背景音樂音量。
  bgmSound.loop(); // 循環播放。
} // 結束背景音樂播放。

function setupVolumeControls() { // 在畫面左下角建立靜音按鈕、音量滑桿與換角色按鈕（上方中央留給答題方框）。
  muteButton = createButton("🔊"); // 靜音按鈕。
  volumeSlider = createSlider(0, 100, defaultMasterVolume, 1); // 音量滑桿：0～100，預設 50。
  masterVolume = defaultMasterVolume / 100; // 整體音量從 50% 開始。
  switchButton = createButton("換角色"); // 回到選角畫面的按鈕。
  for (const el of [muteButton, volumeSlider, switchButton]) { // 三個元件共同樣式。
    el.style("position", "fixed"); // 固定在畫面上。
    el.style("bottom", "16px"); // 距離下方 16 像素。
    el.style("z-index", "10"); // 顯示在畫布上面。
  } // 結束共同樣式。
  muteButton.style("left", "16px"); // 按鈕放在左下角。
  muteButton.style("font-size", "18px"); // 圖示大小。
  muteButton.style("padding", "4px 10px"); // 按鈕內距。
  muteButton.style("border", "none"); // 不要邊框。
  muteButton.style("border-radius", "8px"); // 圓角。
  muteButton.style("background", "rgba(255,255,255,0.85)"); // 半透明白底，和操作說明一致。
  muteButton.style("cursor", "pointer"); // 滑鼠移上去顯示手指。
  volumeSlider.style("left", "66px"); // 滑桿接在按鈕右邊。
  volumeSlider.style("width", "130px"); // 滑桿寬度。
  volumeSlider.style("margin-bottom", "8px"); // 和按鈕垂直置中。
  switchButton.style("left", "212px"); // 換角色按鈕接在滑桿右邊。
  switchButton.style("font-size", "15px"); // 文字大小。
  switchButton.style("padding", "6px 12px"); // 按鈕內距。
  switchButton.style("border", "none"); // 不要邊框。
  switchButton.style("border-radius", "8px"); // 圓角。
  switchButton.style("background", "rgba(255,255,255,0.85)"); // 半透明白底。
  switchButton.style("cursor", "pointer"); // 滑鼠移上去顯示手指。
  switchButton.mousePressed(() => { // 按下換角色。
    controlledCharacter = null; // 回到選角畫面。
    quizActive = false; // 關閉答題方框。
    knockbackRemaining = 0; // 停止擊退。
    switchButton.elt.blur(); // 移開焦點，避免空白鍵又按到按鈕。
  }); // 結束按鈕事件。
  muteButton.mousePressed(() => { // 按下靜音按鈕。
    isMuted = !isMuted; // 切換靜音。
    applyVolume(); // 套用音量。
    muteButton.elt.blur(); // 移開焦點，避免空白鍵又按到按鈕。
  }); // 結束按鈕事件。
  volumeSlider.input(() => { // 拖動滑桿時。
    masterVolume = volumeSlider.value() / 100; // 換算成 0～1。
    isMuted = false; // 調整音量時自動取消靜音。
    applyVolume(); // 套用音量。
  }); // 結束滑桿事件。
  volumeSlider.changed(() => volumeSlider.elt.blur()); // 放開滑桿後移開焦點，方向鍵才不會去改到音量。
  applyVolume(); // 先套用一次預設音量。
} // 結束音量控制建立。

function applyVolume() { // 依滑桿與靜音狀態設定整體音量（雷聲與背景音樂都會跟著變）。
  const volume = isMuted ? 0 : masterVolume; // 靜音時音量為 0。
  outputVolume(volume); // 設定 p5.sound 的總音量。
  muteButton.html(volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"); // 依音量換圖示。
} // 結束音量套用。

function drawInstructions() { // 左上角只顯示玩家角色的操作說明（玩家會面向對方，前進鍵跟著面向改變）。
  if (controlledCharacter === null) return; // 選角畫面不顯示。
  const facing = controlledCharacter === "p1" ? p1Facing : char2Facing; // 玩家目前面向。
  const forwardKey = facing === -1 ? "← / A" : "→ / D"; // 朝對方走的按鍵。
  const backKey = facing === -1 ? "→ / D" : "← / A"; // 背對對方走的按鍵。
  const forwardArrow = facing === -1 ? "←" : "→"; // 朝對方的方向鍵。
  const backArrow = facing === -1 ? "→" : "←"; // 背對對方的方向鍵。
  const rows = [ // 共同的操作。
    [forwardKey, "向前走（朝對方）"], // 前進。
    [backKey, "往後退"], // 後退。
    [forwardArrow + " 連按兩下", controlledCharacter === "p1" ? "向前跑" : "向前奔跑"], // 衝刺。
    [backArrow + " 連按兩下", controlledCharacter === "p1" ? "快速後退" : "向後翻滾"], // 後退衝刺。
    ["↑ / W", "跳躍"], // 跳躍。
  ]; // 結束共同操作。
  if (controlledCharacter === "p2") rows.push(["空白鍵", "出招"]); // 只有角色 2 會出招。
  rows.push(["靠近另一個角色", "回答問題"]); // 答題。
  drawPanel(controlledCharacter === "p1" ? "角色 1 操作" : "角色 2 操作", rows, false); // 靠左。
} // 結束操作說明繪製。

function drawScore() { // 右上角顯示答題成績。
  if (controlledCharacter === null) return; // 選角畫面不顯示。
  drawPanel("答題成績", [["答對", String(quizCorrectCount)], ["答錯", String(quizWrongCount)]], true); // 用和操作說明一樣的面板。
} // 結束成績繪製。

function updateFacing() { // 非控制角色永遠面向玩家；玩家角色維持自己的方向。
  if (controlledCharacter === "p1") { // 玩家是角色 1。
    if (!p1Running && !p1Backrunning && !p1Jumping) p1Facing = characterX < p1X ? -1 : 1; // 玩家也面向非控制角色（衝刺、跳躍中先不轉身，避免方向突然改變）。
    char2Facing = p1X < characterX ? -1 : 1; // 角色 2 看向角色 1：玩家在左邊就翻轉朝左。
  } else if (controlledCharacter === "p2") { // 玩家是角色 2。
    if (!isRunning && !isBackrunning && !isAttacking && jumpPhase === "none") char2Facing = p1X < characterX ? -1 : 1; // 玩家也面向非控制角色（奔跑、翻滾、出招、跳躍中先不轉身）。
    p1Facing = characterX < p1X ? -1 : 1; // 角色 1 看向角色 2：玩家在左邊就朝左。
  } else { // 選角畫面。
    p1Facing = -1; // 角色 1 朝左。
    char2Facing = 1; // 角色 2 朝右。
  } // 結束面向判斷。
} // 結束面向更新。

function selectCharacter(who) { // 選定玩家角色，並把非控制角色放到畫面中央。
  controlledCharacter = who; // 記下玩家角色。
  isRunning = false; isBackrunning = false; isAttacking = false; // 停止角色 2 的特殊動作。
  p1Running = false; p1Backrunning = false; // 停止角色 1 的特殊動作。
  if (who === "p1") { // 玩家是角色 1。
    characterX = width / 2; // 非控制角色（角色 2）站在畫面中央。
    p1X = width * 0.85; // 玩家從右邊出發，面向左走過來。
  } else { // 玩家是角色 2。
    p1X = width / 2; // 非控制角色（角色 1）站在畫面中央。
    characterX = width * 0.15; // 玩家從左邊出發，面向右走過來。
  } // 結束位置設定。
  quizActive = false; // 關閉答題方框。
  quizArmed = false; // 先離開範圍才會出題。
  knockbackRemaining = 0; // 停止擊退。
  updateFacing(); // 立刻轉向。
} // 結束選角。

function drawSelectionScreen() { // 選角畫面：兩張卡片，點選或按 1、2 選擇。
  push(); // 保存繪圖設定。
  noStroke(); // 不畫邊框。
  fill(20, 10, 30, 170); // 半透明深色遮罩。
  rect(0, 0, width, height); // 蓋住整個畫面。
  textFont("sans-serif"); // 系統字型。
  textAlign(CENTER, CENTER); // 置中對齊。
  fill(255); // 白字。
  textStyle(BOLD); // 粗體。
  textSize(constrain(width * 0.035, 20, 36)); // 標題字級。
  text("選擇要控制的角色", width / 2, height * 0.16); // 標題。
  textStyle(NORMAL); // 一般字。
  textSize(constrain(width * 0.018, 13, 18)); // 說明字級。
  text("點選卡片，或按鍵盤 1、2　｜　另一個角色會站在畫面中央，靠近他就要答題", width / 2, height * 0.16 + 40); // 說明。
  const cardW = Math.min(240, width * 0.38); // 卡片寬。
  const cardH = cardW * 1.3; // 卡片高。
  const gap = Math.min(60, width * 0.06); // 卡片間距。
  const top = height * 0.3; // 卡片上緣。
  const cards = [ // 兩張卡片的內容。
    { who: "p1", label: "1　角色 1（金髮）", sprite: p1StandSprite, rect: frameRects.get(p1StandSprite)[0], flip: -1 }, // 角色 1。
    { who: "p2", label: "2　角色 2（藍髮）", sprite: idleSprite, rect: frameBounds(idleSprite, idleFrameCount, 0), flip: 1 }, // 角色 2。
  ]; // 結束卡片內容。
  selectionCards = []; // 重新記錄卡片位置。
  cards.forEach((card, i) => { // 逐張繪製。
    const x = width / 2 + (i === 0 ? -gap / 2 - cardW : gap / 2); // 卡片左邊位置。
    const hover = mouseX > x && mouseX < x + cardW && mouseY > top && mouseY < top + cardH; // 滑鼠是否在卡片上。
    fill(255, 255, 255, hover ? 235 : 190); // 滑鼠移上去更亮。
    rect(x, top, cardW, cardH, 14); // 卡片底。
    const srcW = card.rect.right - card.rect.left; // 原圖單格寬。
    const drawH = cardH * 0.68; // 角色圖高度。
    const drawW = srcW * drawH / card.sprite.height; // 角色圖寬度。
    push(); // 保存設定。
    imageMode(CENTER); // 以中心定位。
    translate(x + cardW / 2, top + cardH * 0.42); // 移到卡片中上方。
    scale(card.flip, 1); // 角色 1 翻轉朝左。
    image(card.sprite, 0, 0, drawW, drawH, card.rect.left, 0, srcW, card.sprite.height); // 畫出角色第一格。
    pop(); // 還原設定。
    fill(40); // 深色字。
    textStyle(BOLD); // 粗體。
    textSize(constrain(cardW * 0.075, 13, 18)); // 卡片字級。
    text(card.label, x + cardW / 2, top + cardH * 0.88); // 角色名稱。
    selectionCards.push({ who: card.who, x, y: top, w: cardW, h: cardH }); // 記下卡片範圍給滑鼠用。
  }); // 結束卡片繪製。
  pop(); // 還原繪圖設定。
} // 結束選角畫面。

function updateQuizTrigger(sizeScale) { // 玩家走進非控制角色附近就出題。
  if (controlledCharacter === null || quizActive) return; // 選角中或已在答題就不用判斷。
  const range = characterWidth * sizeScale * quizRangeRatio; // 觸發範圍。
  const distance = Math.abs(playerX() - npcX()); // 兩個角色的距離。
  if (!quizArmed && distance > range * 1.3) quizArmed = true; // 離開範圍後才能再觸發下一題。
  if (quizArmed && distance < range) { // 走進範圍。
    quizArmed = false; // 這一題觸發後先關閉。
    startQuiz(); // 出題。
  } // 結束觸發判斷。
} // 結束出題判斷。

function startQuiz() { // 出一題簡單的加減法，產生四個選項。
  const a = Math.floor(random(1, 21)); // 第一個數字 1～20。
  const b = Math.floor(random(1, 21)); // 第二個數字 1～20。
  const isPlus = random() < 0.5; // 一半機率出加法。
  const big = Math.max(a, b); // 減法用較大的數當被減數，答案不會是負數。
  const small = Math.min(a, b); // 較小的數。
  const answer = isPlus ? a + b : big - small; // 正確答案。
  quizQuestion = isPlus ? `${a} + ${b} = ?` : `${big} − ${small} = ?`; // 題目文字。
  const options = new Set([answer]); // 用 Set 確保選項不重複。
  while (options.size < 4) { // 補滿四個選項。
    const wrong = answer + Math.floor(random(-5, 6)); // 在正確答案附近產生錯誤選項。
    if (wrong >= 0 && wrong !== answer) options.add(wrong); // 不要負數、不要和答案一樣。
  } // 結束選項產生。
  quizOptions = shuffle([...options]); // 打亂選項順序。
  quizAnswerIndex = quizOptions.indexOf(answer); // 記下正確答案的位置。
  quizChosenIndex = -1; // 還沒作答。
  quizActive = true; // 顯示答題方框。
  isRunning = false; isBackrunning = false; // 玩家正在衝刺也要停下來答題。
  p1Running = false; p1Backrunning = false; // 角色 1 也一樣。
} // 結束出題。

function answerQuiz(index) { // 玩家選了第 index 個選項。
  if (!quizActive || quizChosenIndex !== -1) return; // 已經作答就不能再選。
  quizChosenIndex = index; // 記下選擇。
  quizAnsweredAt = millis(); // 記下作答時間。
  if (index === quizAnswerIndex) { // 答對。
    quizCorrectCount++; // 答對題數 +1。
    rewardAction(); // 播放獎勵動作。
  } else { // 答錯。
    quizWrongCount++; // 答錯題數 +1。
    penaltyAction(); // 執行懲罰。
  } // 結束對錯判斷。
} // 結束作答。

function rewardAction() { // 答對：玩家開心跳起來，頭上飄出 +1，旁邊冒出慶祝爆炸。
  if (controlledCharacter === "p1") startP1Jump(); // 角色 1 跳起來。
  else startP2Jump(); // 角色 2 跳起來。
  const size = characterHeight * layoutScale(); // 角色顯示高度。
  floatingTexts.push({ text: "答對！+1", x: playerX(), y: groundLevel() - size * 1.1, color: [60, 220, 120], startedAt: millis() }); // 綠色飄字。
  spawnOrangeExplosion("air", npcX(), groundLevel() - size * 1.2, size * 0.6); // 非控制角色頭上冒出慶祝的煙火。
} // 結束獎勵。

function penaltyAction() { // 答錯：閃電打在玩家身上、畫面閃紅光、玩家被擊退。
  const x = playerX(); // 玩家位置。
  penaltyStrikes.push({ x, startedAt: millis() }); // 在玩家身上打一道閃電。
  playThunder(); // 雷聲。
  spawnOrangeExplosion("ground", x, groundLevel(), height * 0.2 / 0.7); // 腳下冒出地面爆炸。
  hurtFlashAt = millis(); // 畫面閃紅光。
  const size = characterHeight * layoutScale(); // 角色顯示高度。
  floatingTexts.push({ text: "答錯！", x, y: groundLevel() - size * 1.1, color: [255, 80, 80], startedAt: millis() }); // 紅色飄字。
  const away = x < npcX() ? -1 : 1; // 往遠離非控制角色的方向推。
  knockbackRemaining = away * characterWidth * layoutScale() * knockbackDistanceRatio; // 設定擊退距離。
} // 結束懲罰。

function applyKnockback(displayHeight, sizeScale) { // 每個畫面把玩家往後推一點，直到推完。
  if (knockbackRemaining === 0 || controlledCharacter === null) return; // 沒有擊退就跳過。
  const step = Math.sign(knockbackRemaining) * Math.min(Math.abs(knockbackRemaining), 16 * sizeScale); // 這個畫面推多遠。
  moveControlled(step, playerHalfWidth(displayHeight)); // 依中央捲動規則移動玩家。
  knockbackRemaining -= step; // 扣掉已推的距離（碰到邊緣也照樣扣，避免卡住）。
  if (Math.abs(knockbackRemaining) < 0.5) knockbackRemaining = 0; // 推完歸零。
} // 結束擊退。

function startP1Jump() { // 角色 1 開始跳躍。
  if (p1Jumping || p1Running || p1Backrunning) return; // 已經在跳或在衝刺就不重複。
  p1Jumping = true; // 開始跳躍。
  p1JumpPhase = "prepare"; // 先在地面蹲下預備，播完才起跳。
  p1VerticalVelocity = 0; // 預備時不離地。
  p1Step = 0; // 從跳躍第一格開始。
  p1LastFrameTime = millis(); // 重設影格計時。
} // 結束角色 1 跳躍。

function startP2Jump() { // 角色 2 開始跳躍。
  if (jumpPhase !== "none" || isRunning || isBackrunning || isAttacking) return; // 已經在跳或有其他動作就不重複。
  jumpPhase = "prepare"; // 先播放預備動作，播完才起跳。
  verticalVelocity = 0; // 預備期間角色不離地。
  animationStep = 0; // 從跳躍動畫的第一格開始播放。
  lastFrameTime = millis(); // 重設跳躍動畫的切換時間。
} // 結束角色 2 跳躍。

function drawPenaltyStrikes() { // 播放答錯時打在玩家身上的閃電，播完移除。
  penaltyStrikes = penaltyStrikes.filter((strike) => { // 逐一處理。
    const t = millis() - strike.startedAt; // 經過時間。
    if (t >= penaltyStrikeDuration) return false; // 播完移除。
    drawLightningBolt(strike.x, Math.floor(t / penaltyStrikeDuration * lightningFrameCount)); // 用閃電精靈圖畫出來。
    return true; // 保留。
  }); // 結束逐一處理。
} // 結束懲罰閃電。

function drawHurtFlash() { // 答錯後 0.25 秒內畫面閃紅光。
  if (millis() - hurtFlashAt >= 250) return; // 超過時間就不畫。
  noStroke(); // 不畫邊框。
  fill(255, 40, 40, 90 * (1 - (millis() - hurtFlashAt) / 250)); // 紅色慢慢變淡。
  rect(0, 0, width, height); // 蓋住整個畫面。
} // 結束紅光。

function drawFloatingTexts() { // 飄字：1 秒內往上飄並淡出。
  floatingTexts = floatingTexts.filter((t) => { // 逐一處理。
    const age = (millis() - t.startedAt) / 1000; // 經過秒數。
    if (age >= 1) return false; // 1 秒後移除。
    push(); // 保存設定。
    textFont("sans-serif"); // 系統字型。
    textAlign(CENTER, CENTER); // 置中。
    textStyle(BOLD); // 粗體。
    textSize(constrain(height * 0.04, 18, 34)); // 字級。
    stroke(0, 160 * (1 - age)); // 黑色描邊，看得比較清楚。
    strokeWeight(4); // 描邊粗細。
    fill(t.color[0], t.color[1], t.color[2], 255 * (1 - age)); // 文字顏色慢慢變透明。
    text(t.text, t.x, t.y - age * 50); // 往上飄。
    pop(); // 還原設定。
    return true; // 保留。
  }); // 結束逐一處理。
} // 結束飄字。

function drawQuizBox() { // 畫面上方的答題方框：中心對準畫布中央，透明度 40%。
  if (quizChosenIndex !== -1 && millis() - quizAnsweredAt > quizResultTime) { // 結果顯示夠久了。
    quizActive = false; // 關閉方框，玩家可以繼續移動。
    return; // 不再繪製。
  } // 結束關閉判斷。
  const size = constrain(Math.min(width, height) * 0.03, 14, 22); // 基本字級。
  const boxW = Math.min(width - 32, 560); // 方框寬度。
  const pad = size; // 內距。
  const optionH = size * 2.3; // 選項按鈕高度。
  const gap = size * 0.6; // 選項間距。
  const twoColumns = boxW >= 360; // 夠寬就排成 2×2，太窄就排成一直列。
  const rows = twoColumns ? 2 : 4; // 選項列數。
  const boxH = pad * 2 + size * 1.4 + size * 2.6 + rows * optionH + (rows - 1) * gap + size * 2.2; // 方框高度。
  const boxX = width / 2 - boxW / 2; // 方框左邊：讓方框中心對準畫布中央。
  const boxY = 16; // 方框放在畫布上方。
  push(); // 保存繪圖設定。
  textFont("sans-serif"); // 系統字型。
  noStroke(); // 不畫邊框。
  fill(255, 255, 255, quizBoxOpacity); // 白色、透明度 40%。
  rect(boxX, boxY, boxW, boxH, 12); // 畫方框。
  textAlign(CENTER, TOP); // 文字置中。
  fill(70, 40, 100); // 紫色小標題。
  textSize(size * 0.9); // 小標題字級。
  text(`靠近了！答對才能通過　（第 ${quizCorrectCount + quizWrongCount + (quizChosenIndex === -1 ? 1 : 0)} 題）`, width / 2, boxY + pad); // 小標題。
  fill(20); // 深色題目。
  textStyle(BOLD); // 粗體。
  textSize(size * 1.9); // 題目字級。
  text(quizQuestion, width / 2, boxY + pad + size * 1.4); // 題目。
  textStyle(NORMAL); // 一般字。
  quizOptionRects = []; // 重新記錄選項位置。
  const optionsTop = boxY + pad + size * 1.4 + size * 2.6; // 選項區上緣。
  const optionW = twoColumns ? (boxW - pad * 2 - gap) / 2 : boxW - pad * 2; // 選項寬度。
  quizOptions.forEach((value, i) => { // 逐一畫出四個選項。
    const col = twoColumns ? i % 2 : 0; // 第幾欄。
    const row = twoColumns ? Math.floor(i / 2) : i; // 第幾列。
    const x = boxX + pad + col * (optionW + gap); // 選項左邊。
    const y = optionsTop + row * (optionH + gap); // 選項上緣。
    const hover = quizChosenIndex === -1 && mouseX > x && mouseX < x + optionW && mouseY > y && mouseY < y + optionH; // 滑鼠是否在選項上。
    let bg = hover ? [255, 255, 255, 230] : [255, 255, 255, 150]; // 預設半透明白底。
    if (quizChosenIndex !== -1 && i === quizAnswerIndex) bg = [90, 200, 120, 220]; // 作答後正確答案變綠色。
    else if (i === quizChosenIndex) bg = [235, 90, 90, 220]; // 選錯的變紅色。
    fill(bg[0], bg[1], bg[2], bg[3]); // 選項底色。
    stroke(120, 80, 160, 120); // 淡紫色邊框。
    strokeWeight(1.5); // 邊框粗細。
    rect(x, y, optionW, optionH, 10); // 畫選項按鈕。
    noStroke(); // 文字不描邊。
    fill(30); // 深色字。
    textAlign(CENTER, CENTER); // 置中。
    textSize(size * 1.2); // 選項字級。
    text(`${i + 1}.　${value}`, x + optionW / 2, y + optionH / 2); // 例如「1.　12」。
    quizOptionRects.push({ x, y, w: optionW, h: optionH }); // 記下位置給滑鼠點選。
  }); // 結束選項繪製。
  textAlign(CENTER, TOP); // 底部提示置中。
  textSize(size * 0.95); // 提示字級。
  const hintY = optionsTop + rows * optionH + (rows - 1) * gap + size * 0.7; // 提示文字位置。
  if (quizChosenIndex === -1) { // 還沒作答。
    fill(60); // 灰色字。
    text("按鍵盤 1～4 或用滑鼠點選答案", width / 2, hintY); // 操作提示。
  } else if (quizChosenIndex === quizAnswerIndex) { // 答對。
    fill(20, 140, 60); // 綠字。
    textStyle(BOLD); // 粗體。
    text("答對了！角色開心地跳起來", width / 2, hintY); // 答對訊息。
  } else { // 答錯。
    fill(200, 40, 40); // 紅字。
    textStyle(BOLD); // 粗體。
    text(`答錯了！正確答案是 ${quizOptions[quizAnswerIndex]}，被雷打中並擊退`, width / 2, hintY); // 答錯訊息。
  } // 結束結果訊息。
  pop(); // 還原繪圖設定。
} // 結束答題方框。

function mousePressed() { // 滑鼠點選：選角色或選答案。
  userStartAudio().then(startBgm); // 點選也算使用者操作，可以啟用音訊。
  if (controlledCharacter === null) { // 選角畫面。
    for (const card of selectionCards) { // 檢查每張卡片。
      if (mouseX > card.x && mouseX < card.x + card.w && mouseY > card.y && mouseY < card.y + card.h) selectCharacter(card.who); // 點到就選這個角色。
    } // 結束卡片檢查。
    return; // 選角時不處理其他點擊。
  } // 結束選角點擊。
  if (quizActive && quizChosenIndex === -1) { // 答題中而且還沒作答。
    quizOptionRects.forEach((r, i) => { // 檢查每個選項。
      if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) answerQuiz(i); // 點到就作答。
    }); // 結束選項檢查。
  } // 結束答題點擊。
} // 結束滑鼠點選。

function drawPanel(title, rows, alignRight) { // 繪製一個操作說明面板。
  const size = constrain(Math.min(width, height) * 0.025, 13, 18); // 依畫面大小調整字級，手機也看得清楚。
  const lineHeight = size * 1.6; // 行高。
  const padding = size * 0.9; // 面板內距。
  const gap = size * 1.2; // 按鍵欄與動作欄之間的距離。
  push(); // 保存目前的繪圖設定。
  textFont("sans-serif"); // 使用系統字型以正確顯示中文。
  textSize(size); // 設定字級。
  textStyle(BOLD); // 先用粗體量標題寬度。
  let keyWidth = 0; // 按鍵欄寬度。
  let actionWidth = 0; // 動作欄寬度。
  const titleWidth = textWidth(title); // 標題寬度。
  textStyle(NORMAL); // 內文樣式。
  for (const [k, a] of rows) { keyWidth = Math.max(keyWidth, textWidth(k)); actionWidth = Math.max(actionWidth, textWidth(a)); } // 找出兩欄最寬的文字。
  const boxWidth = padding * 2 + Math.max(titleWidth, keyWidth + gap + actionWidth); // 面板寬度。
  const boxHeight = padding * 2 + lineHeight * (rows.length + 1) - (lineHeight - size); // 面板高度（含標題列）。
  const boxX = alignRight ? width - 16 - boxWidth : 16; // 面板左邊位置。
  noStroke(); // 面板不畫邊框。
  fill(255, 255, 255, 215); // 半透明白色底。
  rect(boxX, 16, boxWidth, boxHeight, 8); // 繪製圓角面板。
  textAlign(LEFT, TOP); // 文字從左上角開始排列。
  const x = boxX + padding; // 文字起點。
  const y = 16 + padding; // 文字起點。
  fill(20); textStyle(BOLD); // 標題樣式。
  text(title, x, y); // 繪製標題。
  textStyle(NORMAL); // 內文樣式。
  rows.forEach(([k, a], i) => { // 逐列繪製。
    const rowY = y + (i + 1) * lineHeight; // 這一列的高度。
    fill(30, 60, 140); text(k, x, rowY); // 按鍵用藍色。
    fill(60); text(a, x + keyWidth + gap, rowY); // 動作用深灰色。
  }); // 結束逐列繪製。
  pop(); // 還原繪圖設定。
} // 結束面板繪製。

function keyPressed(event) { // 處理按鍵按下事件。
  userStartAudio().then(startBgm); // 瀏覽器規定音訊要在使用者操作後才能啟用，啟用後開始背景音樂。
  if (event && event.repeat) return false; // 長按時瀏覽器會連續送出按鍵，忽略這些重複事件，避免被當成「連按兩下」。
  if (controlledCharacter === null) { // 選角畫面。
    if (key === "1") selectCharacter("p1"); // 按 1 選角色 1。
    if (key === "2") selectCharacter("p2"); // 按 2 選角色 2。
    return false; // 選角時不處理其他按鍵。
  } // 結束選角按鍵。
  if (quizActive) { // 答題中。
    if (["1", "2", "3", "4"].includes(key)) answerQuiz(Number(key) - 1); // 按 1～4 作答。
    return false; // 答題時角色不能動。
  } // 結束答題按鍵。
  if (!inputEnabled()) return false; // 被擊退時不能操作。
  const isLeft = keyCode === LEFT_ARROW || keyCode === 65; // ← 或 A。
  const isRight = keyCode === RIGHT_ARROW || keyCode === 68; // → 或 D。
  const isUp = keyCode === UP_ARROW || keyCode === 87; // ↑ 或 W。
  const now = millis(); // 現在時間。
  if (controlledCharacter === "p1") { // 玩家是角色 1。
    if (isUp) startP1Jump(); // 跳躍。
    if (isLeft) { // 判斷左鍵是否連按兩次。
      if (now - p1LastLeftTapTime <= doubleTapWindow && !p1Running && !p1Backrunning && !p1Jumping) { // 兩次按下間隔夠短，且目前沒有其他特殊動作。
        if (p1Facing === -1) p1Running = true; // 面向左：連按左鍵是向前跑。
        else p1Backrunning = true; // 面向右：連按左鍵是快速後退。
        p1Step = 0; // 從跑步第一格開始。
        p1LastFrameTime = now; // 重設影格計時。
        p1LastLeftTapTime = -1000; // 清除紀錄，避免連按三下又觸發一次。
      } else { // 一般的單次按下。
        p1LastLeftTapTime = now; // 記錄這次按下左鍵的時間。
      } // 結束連按判斷。
    } // 結束左鍵判斷。
    if (isRight) { // 判斷右鍵是否連按兩次。
      if (now - p1LastRightTapTime <= doubleTapWindow && !p1Running && !p1Backrunning && !p1Jumping) { // 兩次按下間隔夠短，且目前沒有其他特殊動作。
        if (p1Facing === 1) p1Running = true; // 面向右：連按右鍵是向前跑。
        else p1Backrunning = true; // 面向左：連按右鍵是快速後退。
        p1Step = 0; // 從第一格開始。
        p1LastFrameTime = now; // 重設影格計時。
        p1LastRightTapTime = -1000; // 清除紀錄，避免連按三下又觸發一次。
      } else { // 一般的單次按下。
        p1LastRightTapTime = now; // 記錄這次按下右鍵的時間。
      } // 結束連按判斷。
    } // 結束右鍵判斷。
  } else { // 玩家是角色 2。
    if (key === " " && jumpPhase === "none" && !isRunning && !isBackrunning && !isAttacking) { // 空白鍵出招。
      isAttacking = true; // 開始出招，播完一次後自動停止。
      animationStep = 0; // 從出招第一格開始。
      lastFrameTime = now; // 重設影格計時。
    } // 結束出招判斷。
    if (isUp) startP2Jump(); // 跳躍。
    if (isRight) { // 判斷右鍵是否連按兩次。
      if (now - lastRightTapTime <= doubleTapWindow && !isRunning && !isBackrunning && jumpPhase === "none" && !isAttacking) { // 兩次按下間隔夠短，且目前沒在奔跑或跳躍。
        if (char2Facing === 1) isRunning = true; // 面向右：連按右鍵是向前奔跑。
        else isBackrunning = true; // 面向左：連按右鍵是向後翻滾。
        animationStep = 0; // 從奔跑第一格開始。
        lastFrameTime = now; // 重設影格計時。
        lastRightTapTime = -1000; // 清除紀錄，避免連按三下又觸發一次。
      } else { // 一般的單次按下。
        lastRightTapTime = now; // 記錄這次按下右鍵的時間。
      } // 結束連按判斷。
    } // 結束右鍵判斷。
    if (isLeft) { // 判斷左鍵是否連按兩次。
      if (now - lastLeftTapTime <= doubleTapWindow && !isRunning && !isBackrunning && jumpPhase === "none" && !isAttacking) { // 兩次按下間隔夠短，且目前沒有其他特殊動作。
        if (char2Facing === -1) isRunning = true; // 面向左：連按左鍵是向前奔跑。
        else isBackrunning = true; // 面向右：連按左鍵是向後翻滾。
        animationStep = 0; // 從翻滾第一格開始。
        lastFrameTime = now; // 重設影格計時。
        lastLeftTapTime = -1000; // 清除紀錄，避免連按三下又觸發一次。
      } else { // 一般的單次按下。
        lastLeftTapTime = now; // 記錄這次按下左鍵的時間。
      } // 結束連按判斷。
    } // 結束左鍵判斷。
  } // 結束角色判斷。
  return false; // 阻止方向鍵與空白鍵觸發瀏覽器預設捲動畫面。
} // 結束鍵盤按下事件處理。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
  const oldWidth = width; // 記住調整前的畫布寬度。
  const oldMaxCamera = maxCameraX(); // 記住調整前鏡頭的最右位置。
  const cameraRatio = oldMaxCamera > 0 ? backgroundCameraX / oldMaxCamera : 0.5; // 鏡頭在長圖上的相對位置。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿瀏覽器視窗。
  backgroundCameraX = cameraRatio * maxCameraX(); // 依比例保持鏡頭位置。
  if (lightningActive) lightningWorldX = backgroundCameraX + width * lightningScreenRatio; // 閃電位置跟著新視窗大小調整。
  characterX = characterX / oldWidth * width; // 依比例保持角色 2 的水平位置（原本在 2/3 就仍在 2/3）。
  p1X = p1X / oldWidth * width; // 依比例保持角色 1 的水平位置。
  const halfWidth = characterWidth * layoutScale() / 2; // 角色保留的半寬。
  characterX = constrain(characterX, halfWidth, width - halfWidth); // 調整角色水平位置以避免超出新畫布。
} // 結束視窗尺寸調整處理。