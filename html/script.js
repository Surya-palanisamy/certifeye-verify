document.addEventListener("DOMContentLoaded", () => {
  // Section Elements
  const verificationSection = document.getElementById("verification-section");
  const analysisSection = document.getElementById("analysis-section");
  const resultsSection = document.getElementById("results-section");

  // Button & Interaction Elements
  const getStartedBtnNav = document.getElementById("get-started-btn-nav");
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  const browseBtn = document.getElementById("browse-btn");
  const verifyAnotherBtn = document.getElementById("verify-another-btn");

  // Display Elements
  const fileNameDisplay = document.getElementById("file-name-display");
  const analysisStatus = document.getElementById("analysis-status");
  const verdictText = document.getElementById("verdict-text");
  let authenticityChart = null;

  // --- Event Listeners ---

  // 'Get Started' button (in nav) - although the page loads directly, this could be for other flows
  getStartedBtnNav.addEventListener("click", () => {
    showSection("verification");
  });

  // 'Browse Files' button
  browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // File input change (after browsing)
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  // --- Drag and Drop Logic ---
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      // Validate file type
      const file = e.dataTransfer.files[0];
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (allowedTypes.includes(file.type)) {
        fileInput.files = e.dataTransfer.files;
        handleFile(file);
      } else {
        alert("Invalid file type. Please upload a PDF, JPG, or PNG.");
      }
    }
  });

  // 'Verify Another' button on results page
  verifyAnotherBtn.addEventListener("click", () => {
    showSection("verification");
    fileInput.value = ""; // Reset file input
  });

  // --- Core Functions ---

  /**
   * Hides all sections and shows the specified one
   * @param {string} sectionId - The ID of the section to show ('verification', 'analysis', 'results')
   */
  function showSection(sectionId) {
    verificationSection.classList.remove("active");
    analysisSection.classList.remove("active");
    resultsSection.classList.remove("active");

    document.getElementById(`${sectionId}-section`).classList.add("active");
  }

  /**
   * Handles the uploaded file and starts the analysis simulation
   * @param {File} file - The file to be analyzed
   */
  function handleFile(file) {
    fileNameDisplay.textContent = `Analyzing ${file.name}...`;
    showSection("analysis");
    simulateAnalysis();
  }

  /**
   * Simulates a multi-step AI analysis process
   */
  function simulateAnalysis() {
    const statuses = [
      "Extracting text and images...",
      "Scanning for signs of digital tampering...",
      "Analyzing font and layout consistency...",
      "Cross-referencing with known templates...",
      "Verifying digital signatures (if present)...",
      "Finalizing report...",
    ];

    let currentStatus = 0;
    analysisStatus.textContent = statuses[currentStatus];

    const interval = setInterval(() => {
      currentStatus++;
      if (currentStatus < statuses.length) {
        analysisStatus.textContent = statuses[currentStatus];
      } else {
        clearInterval(interval);
        displayResults();
      }
    }, 1500);
  }

  /**
   * Displays the final results with randomized data
   */
  function displayResults() {
    showSection("results");

    // Randomize the result for demonstration
    const isReal = Math.random() > 0.3; // 70% chance of being real

    const verdictEl = document.getElementById("verdict-text");
    const verdictSubtextEl = document.querySelector(".verdict-subtext");

    if (isReal) {
      verdictEl.textContent = "✓ Real";
      verdictEl.className = "verdict-text verdict-real";
      verdictSubtextEl.textContent =
        "This document appears to be authentic and has not been tampered with.";
      document.getElementById("summary-tampering").className = "status-ok";
    } else {
      verdictEl.textContent = "✗ Fake";
      verdictEl.className = "verdict-text verdict-fake";
      verdictSubtextEl.textContent =
        "This document shows signs of tampering or is inconsistent with our records.";
      document.getElementById("summary-tampering").className = "status-danger";
    }

    // Generate data and render the chart
    const authenticityScore = isReal
      ? Math.floor(Math.random() * 15) + 85
      : Math.floor(Math.random() * 40) + 20; // 85-100 for real, 20-60 for fake
    renderAuthenticityChart(authenticityScore);
  }

  /**
   * Renders the doughnut chart using Chart.js
   * @param {number} score - The authenticity score (0-100)
   */
  function renderAuthenticityChart(score) {
    const ctx = document.getElementById("authenticityChart").getContext("2d");
    const chartData = {
      datasets: [
        {
          data: [score, 100 - score],
          backgroundColor: [
            "#5E72E4", // primary color
            "#2D3748", // border color
          ],
          borderWidth: 0,
          borderRadius: 5,
        },
      ],
    };

    if (authenticityChart) {
      authenticityChart.destroy();
    }

    document.querySelector(
      ".chart-container h3"
    ).textContent = `Authenticity Score: ${score}%`;

    authenticityChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });
  }

  // --- Initial State ---
  showSection("verification"); // Start on the verification page
});
