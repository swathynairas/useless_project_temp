/* =====================================================
   PROCRASTI-NATION
   Pure JavaScript
   No external libraries required
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     ELEMENTS
  ========================= */

  const loginScreen = document.getElementById("loginScreen");
  const mainApp = document.getElementById("mainApp");
  const studentName = document.getElementById("studentName");
  const enterBtn = document.getElementById("enterBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  const motivation = document.getElementById("motivation");
  const motivationValue = document.getElementById("motivationValue");

  const calculateBtn = document.getElementById("calculateBtn");

  const resultEmpty = document.getElementById("resultEmpty");
  const resultContent = document.getElementById("resultContent");

  const panicValue = document.getElementById("panicValue");
  const panicBar = document.getElementById("panicBar");
  const panicStatus = document.getElementById("panicStatus");
  const panicQuote = document.getElementById("panicQuote");

  const scoreValue = document.getElementById("scoreValue");
  const scoreCircle = document.getElementById("scoreCircle");
  const scoreLevel = document.getElementById("scoreLevel");

  const timeRemaining = document.getElementById("timeRemaining");
  const productiveHours = document.getElementById("productiveHours");
  const scrollingTime = document.getElementById("scrollingTime");
  const foodTime = document.getElementById("foodTime");
  const stareTime = document.getElementById("stareTime");
  const sleepTime = document.getElementById("sleepTime");
  const randomTime = document.getElementById("randomTime");

  const aiMessage = document.getElementById("aiMessage");
  const aiSubMessage = document.getElementById("aiSubMessage");

  const timeline = document.getElementById("timeline");

  const excuseBtn = document.getElementById("excuseBtn");
  const excuseText = document.getElementById("excuseText");

  const startWorking = document.getElementById("startWorking");

  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");

  const simStart = document.getElementById("simStart");
  const simGame = document.getElementById("simGame");
  const simEnd = document.getElementById("simEnd");
  const startSimulation = document.getElementById("startSimulation");
  const restartSimulation = document.getElementById("restartSimulation");
  const simCounter = document.getElementById("simCounter");
  const simPanic = document.getElementById("simPanic");
  const simQuestion = document.getElementById("simQuestion");
  const simChoices = document.getElementById("simChoices");

  const totalWasted = document.getElementById("totalWasted");
  const assignmentsDelayed = document.getElementById("assignmentsDelayed");
  const averageScore = document.getElementById("averageScore");
  const commonDistraction = document.getElementById("commonDistraction");
  const personalRecord = document.getElementById("personalRecord");

  const certificateName = document.getElementById("certificateName");
  const certificateWasted = document.getElementById("certificateWasted");
  const certificateAvailable = document.getElementById("certificateAvailable");
  const certificateEfficiency = document.getElementById("certificateEfficiency");

  const productivityTimer = document.getElementById("productivityTimer");
  const timerProgress = document.getElementById("timerProgress");


  /* =========================
     DEFAULT DATA
  ========================= */

  let appStartTime = Date.now();
  let workingClicks = 0;
  let simulationMinutes = 0;

  let storedStats = {
    wasted: 0,
    assignments: 0,
    scores: [],
    distractions: {},
    longest: 0
  };


  /* =========================
     LOCAL STORAGE
  ========================= */

  try {
    const saved = localStorage.getItem("procrastinationStats");

    if (saved) {
      storedStats = JSON.parse(saved);

      if (!Array.isArray(storedStats.scores)) {
        storedStats.scores = [];
      }

      if (!storedStats.distractions) {
        storedStats.distractions = {};
      }
    }
  } catch (error) {
    console.log("Local storage unavailable.");
  }


  function saveStats() {
    try {
      localStorage.setItem(
        "procrastinationStats",
        JSON.stringify(storedStats)
      );
    } catch (error) {
      console.log("Could not save statistics.");
    }
  }


  /* =========================
     LOGIN
  ========================= */

  enterBtn.addEventListener("click", login);

  studentName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      login();
    }
  });


  function login() {

    let name = studentName.value.trim();

    if (!name) {
      showToast("Please enter your name first. We need someone to blame. 🤡");
      studentName.focus();
      return;
    }

    certificateName.textContent = name;

    loginScreen.style.opacity = "0";
    loginScreen.style.transform = "scale(1.03)";
    loginScreen.style.transition = "opacity .5s ease, transform .5s ease";

    setTimeout(function () {
      loginScreen.classList.add("hidden");
      mainApp.classList.remove("hidden");

      updateStats();

      showToast(
        "Welcome, " + name + ". Your productivity has been compromised. 🛋️"
      );
    }, 500);
  }


  logoutBtn.addEventListener("click", function () {

    mainApp.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    loginScreen.style.opacity = "1";
    loginScreen.style.transform = "scale(1)";

    showToast("You escaped. Unfortunately, your assignment remains. 💀");
  });


  /* =========================
     NAVIGATION
  ========================= */

  const navigationButtons =
    document.querySelectorAll("[data-section]");

  navigationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const sectionId = button.getAttribute("data-section");
      const target = document.getElementById(sectionId);

      if (!target) {
        return;
      }

      document.querySelectorAll(".nav-link").forEach(function (nav) {
        nav.classList.remove("active");
      });

      document
        .querySelectorAll('.nav-link[data-section="' + sectionId + '"]')
        .forEach(function (nav) {
          nav.classList.add("active");
        });

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

  });


  const goButtons = document.querySelectorAll("[data-go]");

  goButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const targetId = button.getAttribute("data-go");
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* =========================
     MOTIVATION SLIDER
  ========================= */

  function updateMotivation() {

    const value = Number(motivation.value);

    motivationValue.textContent = value + "%";

    motivation.style.background =
      "linear-gradient(90deg, #9b5cff " +
      value +
      "%, rgba(255,255,255,.08) " +
      value +
      "%)";
  }

  motivation.addEventListener("input", updateMotivation);

  updateMotivation();


  /* =========================
     DATE DEFAULT
  ========================= */

  function toDateTimeLocal(date) {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minutes
    );
  }


  const currentTimeInput =
    document.getElementById("currentTime");

  const deadlineInput =
    document.getElementById("deadline");

  const now = new Date();

  currentTimeInput.value = toDateTimeLocal(now);

  const tomorrow = new Date(
    now.getTime() + 24 * 60 * 60 * 1000
  );

  tomorrow.setHours(9, 0, 0, 0);

  deadlineInput.value = toDateTimeLocal(tomorrow);


  /* =========================
     CALCULATOR
  ========================= */

  calculateBtn.addEventListener("click", calculateDisaster);


  function calculateDisaster() {

    const assignment =
      document.getElementById("assignmentName").value.trim()
      || "Unnamed Academic Disaster";

    const deadlineValue = deadlineInput.value;
    const currentValue = currentTimeInput.value;

    const work =
      Math.max(
        0.5,
        Number(document.getElementById("workHours").value) || 0.5
      );

    const motivationValueNumber =
      Number(motivation.value) || 0;

    const laterCount =
      Math.max(
        0,
        Number(document.getElementById("laterCount").value) || 0
      );

    const chapters =
      Math.max(
        0,
        Number(document.getElementById("chapters").value) || 0
      );

    const distraction =
      document.getElementById("distraction").value;


    if (!deadlineValue || !currentValue) {
      showToast("Please enter both times. Even procrastination needs data. 🧮");
      return;
    }


    const deadline = new Date(deadlineValue);
    const current = new Date(currentValue);

    let remainingMs = deadline.getTime() - current.getTime();

    if (remainingMs < 0) {
      remainingMs = 0;
    }

    const remainingHours =
      remainingMs / (1000 * 60 * 60);


    /*
      Deliberately ridiculous algorithm.
    */

    const sleepHours =
      Math.min(8, Math.max(4, remainingHours * 0.38));

    const scrollingHours =
      Math.min(
        Math.max(0, remainingHours - sleepHours),
        0.5 + (laterCount * 0.18) + ((100 - motivationValueNumber) / 100 * 2)
      );

    const foodHours =
      Math.min(
        Math.max(0, remainingHours - sleepHours - scrollingHours),
        0.5 + chapters * 0.08
      );

    const staringMinutes =
      Math.min(
        120,
        10 + (100 - motivationValueNumber) * 0.7
      );

    const randomMinutes =
      Math.min(
        90,
        8 + laterCount * 4
      );


    const unavailableHours =
      sleepHours +
      scrollingHours +
      foodHours +
      staringMinutes / 60 +
      randomMinutes / 60;

    const productive =
      Math.max(
        0,
        remainingHours - unavailableHours
      );


    /*
      Procrastination score
    */

    let score =
      100
      - motivationValueNumber
      + laterCount * 4
      + chapters * 1.5
      + Math.max(0, work - productive) * 7;

    score = Math.round(
      Math.min(100, Math.max(0, score))
    );


    /*
      Panic index
    */

    let panic =
      (work / Math.max(productive, 0.25)) * 45
      + (100 - motivationValueNumber) * 0.35
      + laterCount * 2.2;

    panic = Math.round(
      Math.min(100, Math.max(0, panic))
    );


    const level = getScoreLevel(score);

    const status = getPanicStatus(panic);

    const message = getAIMessage(
      remainingHours,
      productive,
      work,
      panic
    );


    /* Update report */

    resultEmpty.classList.add("hidden");
    resultContent.classList.remove("hidden");

    timeRemaining.textContent =
      formatHours(remainingHours);

    productiveHours.textContent =
      productive.toFixed(1) + "h";

    scrollingTime.textContent =
      scrollingHours.toFixed(1) + "h";

    foodTime.textContent =
      foodHours.toFixed(1) + "h";

    stareTime.textContent =
      Math.round(staringMinutes) + "m";

    sleepTime.textContent =
      sleepHours.toFixed(1) + "h";

    randomTime.textContent =
      Math.round(randomMinutes) + "m";


    panicValue.textContent = "0";
    panicBar.style.width = "0%";

    scoreValue.textContent = "0";
    scoreCircle.style.strokeDashoffset = "364.4";

    panicStatus.textContent = status.title;
    panicQuote.textContent = status.quote;

    scoreLevel.textContent = level;


    setTimeout(function () {

      animateNumber(
        panicValue,
        0,
        panic,
        900,
        function (value) {
          return String(Math.round(value));
        }
      );

      panicBar.style.width = panic + "%";

      animateNumber(
        scoreValue,
        0,
        score,
        1100,
        function (value) {
          return String(Math.round(value));
        }
      );

      const circumference = 364.4;

      scoreCircle.style.strokeDashoffset =
        circumference - (circumference * score / 100);

    }, 150);


    aiMessage.textContent = message;

    aiSubMessage.textContent =
      assignment +
      " has been analyzed by our extremely questionable AI.";

    generateTimeline(
      current,
      deadline,
      score,
      distraction
    );


    /*
      Certificate
    */

    const wasted =
      Math.max(
        0,
        remainingHours - productive
      );

    const efficiency =
      remainingHours > 0
        ? Math.min(100, (wasted / remainingHours) * 100)
        : 100;

    certificateWasted.textContent =
      formatHours(wasted);

    certificateAvailable.textContent =
      formatHours(remainingHours);

    certificateEfficiency.textContent =
      efficiency.toFixed(1) + "%";


    /*
      Save statistics
    */

    storedStats.wasted += wasted * 60;
    storedStats.assignments += 1;
    storedStats.scores.push(score);

    if (!storedStats.distractions[distraction]) {
      storedStats.distractions[distraction] = 0;
    }

    storedStats.distractions[distraction]++;

    if (wasted > storedStats.longest) {
      storedStats.longest = wasted;
    }

    saveStats();
    updateStats();

    unlockAchievements(score, wasted);

    showToast(
      "Disaster calculated successfully. This could have been avoided. 💀"
    );

    document.getElementById("results")
      .scrollIntoView({
        behavior: "smooth"
      });
  }


  /* =========================
     SCORE LEVEL
  ========================= */

  function getScoreLevel(score) {

    if (score <= 20) {
      return "🐣 Beginner Procrastinator";
    }

    if (score <= 40) {
      return "😌 Casual Waster";
    }

    if (score <= 60) {
      return "🛋️ Professional Procrastinator";
    }

    if (score <= 80) {
      return "💀 Deadline Enthusiast";
    }

    return "🗿 Academic Menace";
  }


  /* =========================
     PANIC
  ========================= */

  function getPanicStatus(panic) {

    if (panic < 25) {
      return {
        title: "🟢 UNDER CONTROL",
        quote: "You might actually finish this. Suspicious."
      };
    }

    if (panic < 50) {
      return {
        title: "🟡 MILD PANIC",
        quote: "The situation is questionable, but survivable."
      };
    }

    if (panic < 75) {
      return {
        title: "🟠 SERIOUS PANIC",
        quote: "You should probably stop reading this and start working."
      };
    }

    return {
      title: "🔴 ACADEMIC EMERGENCY",
      quote: "You are no longer studying for the assignment. You are studying for survival."
    };
  }


  /* =========================
     AI MESSAGE
  ========================= */

  function getAIMessage(
    remaining,
    productive,
    required,
    panic
  ) {

    if (remaining <= 0) {
      return "The deadline has already arrived. Bold strategy.";
    }

    if (productive >= required) {
      return "You have enough time. Unfortunately, this app has other plans.";
    }

    if (panic >= 85) {
      return "You had time. You chose chaos. Respect.";
    }

    if (panic >= 65) {
      return "Your assignment is no longer a task. It is now a boss battle.";
    }

    if (panic >= 45) {
      return "You have successfully converted a normal task into a cinematic crisis.";
    }

    return "Everything looks fine. Which is exactly when procrastination usually begins.";
  }


  /* =========================
     TIMELINE
  ========================= */

  function generateTimeline(
    current,
    deadline,
    score,
    distraction
  ) {

    timeline.innerHTML = "";

    const messages = [
      ["I'll start after dinner.", "🍛"],
      ["Just 5 minutes on my phone.", "📱"],
      ["One YouTube video.", "🎬"],
      ["Okay, seriously starting now.", "😤"],
      ["I'll wake up early.", "😌"],
      ["Why did I do this?", "💀"],
      ["I work best under pressure.", "🤡"],
      ["SUBMIT!!!", "🏃"]
    ];


    const totalMs =
      deadline.getTime() - current.getTime();

    for (let i = 0; i < messages.length; i++) {

      const ratio = i / (messages.length - 1);

      const pointTime =
        new Date(
          current.getTime() + totalMs * ratio
        );

      const timeString =
        pointTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

      const item =
        document.createElement("div");

      item.className = "timeline-item";

      item.style.animationDelay =
        (i * 0.08) + "s";

      item.innerHTML =
        '<div class="timeline-time">' +
        timeString +
        '</div>' +
        '<div class="timeline-text">' +
        messages[i][0] +
        " " +
        messages[i][1] +
        '</div>';

      timeline.appendChild(item);
    }


    if (score > 75) {

      const extra =
        document.createElement("div");

      extra.className = "timeline-item";

      extra.innerHTML =
        '<div class="timeline-time">???</div>' +
        '<div class="timeline-text">' +
        "You somehow started researching the history of " +
        distraction +
        ". 📚" +
        "</div>";

      timeline.appendChild(extra);
    }
  }


  /* =========================
     EXCUSE GENERATOR
  ========================= */

  const excuses = [
    "My motivation experienced unexpected technical difficulties.",
    "I completed the assignment mentally but forgot to save it physically.",
    "I misunderstood the meaning of 'deadline.'",
    "I had technical difficulties involving my motivation.",
    "I completed the assignment spiritually.",
    "My laptop and I are currently experiencing communication issues.",
    "I was mentally preparing to start.",
    "I accidentally opened Instagram for academic research.",
    "The document looked intimidating, so I gave it emotional space.",
    "I was waiting for the perfect productivity moment."
  ];


  excuseBtn.addEventListener("click", function () {

    const randomIndex =
      Math.floor(Math.random() * excuses.length);

    excuseText.textContent =
      excuses[randomIndex];

    excuseText.style.animation = "none";

    void excuseText.offsetWidth;

    excuseText.style.animation =
      "fadeUp .35s ease";

    showToast("Emergency excuse successfully generated. 🤡");
  });


  /* =========================
     SIMULATOR
  ========================= */

  const simulationQuestions = [
    "Your phone just buzzed. What do you do?",
    "You suddenly remember you haven't checked Instagram.",
    "A YouTube notification appears. This seems important.",
    "You feel slightly hungry. Surely studying while hungry is impossible.",
    "Your desktop icons look suspiciously unorganized.",
    "You suddenly remember that you wanted to research something completely unrelated.",
    "It's getting late. Maybe tomorrow is a better day."
  ];


  startSimulation.addEventListener("click", function () {

    simulationMinutes = 0;

    simCounter.textContent = "0";
    simPanic.textContent = "0%";

    simStart.classList.add("hidden");
    simEnd.classList.add("hidden");
    simGame.classList.remove("hidden");

    showToast("Simulation started. Productivity immediately decreased. 📉");
  });


  simChoices.addEventListener("click", function (event) {

    const choice =
      event.target.closest(".sim-choice");

    if (!choice) {
      return;
    }

    const minutes =
      Number(choice.getAttribute("data-minutes")) || 0;

    simulationMinutes += minutes;

    simCounter.textContent =
      simulationMinutes;

    const panic =
      Math.min(
        100,
        Math.round(simulationMinutes * 3.7)
      );

    simPanic.textContent =
      panic + "%";


    if (simulationMinutes >= 27) {

      simGame.classList.add("hidden");
      simEnd.classList.remove("hidden");

      document.getElementById("simResult").textContent =
        "Congratulations! You procrastinated for " +
        simulationMinutes +
        " minutes while using a procrastination website.";

      storedStats.wasted += simulationMinutes;
      storedStats.longest =
        Math.max(
          storedStats.longest,
          simulationMinutes / 60
        );

      saveStats();
      updateStats();

      showToast("Achievement unlocked: Professional Waster. 🛋️");

      return;
    }


    const nextQuestionIndex =
      Math.min(
        simulationQuestions.length - 1,
        Math.floor(simulationMinutes / 4)
      );

    simQuestion.textContent =
      simulationQuestions[nextQuestionIndex];
  });


  restartSimulation.addEventListener("click", function () {

    simEnd.classList.add("hidden");
    simStart.classList.remove("hidden");

  });


  /* =========================
     START WORKING EASTER EGG
  ========================= */

  startWorking.addEventListener("click", function () {

    workingClicks++;

    const messages = [
      "Excellent decision! Unfortunately, you have already spent 17 minutes using this application.",
      "Bold move. Your assignment is still waiting.",
      "Productivity detected. Quickly, hide it!",
      "Are you sure? You could calculate your procrastination again.",
      "Your assignment is becoming concerned.",
      "This button has now received more attention than your assignment."
    ];

    if (workingClicks >= 6) {

      showToast(
        "You have spent more time clicking this button than working. 💀"
      );

      startWorking.textContent =
        "YOU SHOULD ACTUALLY WORK 😭";

    } else {

      showToast(
        messages[
          Math.min(
            workingClicks - 1,
            messages.length - 1
          )
        ]
      );
    }
  });


  /* =========================
     PRODUCTIVITY TIMER
  ========================= */

  function updateProductivityTimer() {

    const elapsed =
      Math.floor(
        (Date.now() - appStartTime) / 1000
      );

    const hours =
      Math.floor(elapsed / 3600);

    const minutes =
      Math.floor((elapsed % 3600) / 60);

    const seconds =
      elapsed % 60;

    productivityTimer.textContent =
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");


    const progress =
      Math.min(100, 17 + elapsed / 12);

    timerProgress.style.width =
      progress + "%";
  }


  setInterval(updateProductivityTimer, 1000);


  /* =========================
     STATS
  ========================= */

  function updateStats() {

    const wastedMinutes =
      Math.round(storedStats.wasted || 0);

    totalWasted.textContent =
      formatMinutes(wastedMinutes);

    assignmentsDelayed.textContent =
      storedStats.assignments || 0;


    const scores =
      storedStats.scores || [];

    const average =
      scores.length
        ? Math.round(
            scores.reduce(
              function (sum, value) {
                return sum + value;
              },
              0
            ) / scores.length
          )
        : 0;

    averageScore.textContent =
      average;


    const distractions =
      storedStats.distractions || {};

    let mostCommon = "None";
    let highest = 0;

    Object.keys(distractions).forEach(
      function (key) {

        if (distractions[key] > highest) {
          highest = distractions[key];
          mostCommon = key;
        }

      }
    );

    commonDistraction.textContent =
      mostCommon;

    if (storedStats.longest > 0) {

      personalRecord.textContent =
        formatHours(storedStats.longest) +
        " wasted in one glorious session.";

    } else {

      personalRecord.textContent =
        "No record yet.";

    }
  }


  /* =========================
     ACHIEVEMENTS
  ========================= */

  function unlockAchievements(score, wasted) {

    const cards =
      document.querySelectorAll(".achievement-card");

    if (wasted >= 5) {
      unlockCard(cards[1]);
    }

    if (score >= 60) {
      unlockCard(cards[2]);
    }

    if (score >= 80) {
      unlockCard(cards[3]);
    }

    if (score >= 90) {
      unlockCard(cards[4]);
    }

    if (score >= 95) {
      unlockCard(cards[5]);
    }
  }


  function unlockCard(card) {

    if (!card) {
      return;
    }

    card.classList.add("unlocked");

    const lock =
      card.querySelector(".lock");

    if (lock) {
      lock.textContent = "UNLOCKED";
      lock.className = "unlock";
    }
  }


  /* =========================
     TOAST
  ========================= */

  let toastTimer;

  function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
      setTimeout(function () {
        toast.classList.remove("show");
      }, 3500);
  }


  /* =========================
     ANIMATED NUMBER
  ========================= */

  function animateNumber(
    element,
    start,
    end,
    duration,
    formatter
  ) {

    const startTime =
      performance.now();

    function update(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        start + (end - start) * eased;

      element.textContent =
        formatter(value);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }


  /* =========================
     FORMATTING
  ========================= */

  function formatHours(hours) {

    if (!isFinite(hours) || hours <= 0) {
      return "0h 0m";
    }

    const wholeHours =
      Math.floor(hours);

    const minutes =
      Math.round(
        (hours - wholeHours) * 60
      );

    if (wholeHours === 0) {
      return "0h " + minutes + "m";
    }

    return (
      wholeHours +
      "h " +
      minutes +
      "m"
    );
  }


  function formatMinutes(minutes) {

    if (minutes < 60) {
      return minutes + "m";
    }

    const hours =
      Math.floor(minutes / 60);

    const remaining =
      minutes % 60;

    return (
      hours +
      "h " +
      remaining +
      "m"
    );
  }


  /* =========================
     IDLE EASTER EGG
  ========================= */

  let lastActivity =
    Date.now();

  ["mousemove", "keydown", "click", "scroll"].forEach(
    function (eventName) {

      document.addEventListener(
        eventName,
        function () {
          lastActivity = Date.now();
        },
        { passive: true }
      );

    }
  );


  setInterval(function () {

    const idleSeconds =
      (Date.now() - lastActivity) / 1000;

    if (
      idleSeconds >= 35 &&
      !mainApp.classList.contains("hidden")
    ) {

      showToast(
        "Are you procrastinating from procrastinating? 🤨"
      );

      lastActivity = Date.now();
    }

  }, 5000);


  /* =========================
     INITIAL STATS
  ========================= */

  updateStats();

});