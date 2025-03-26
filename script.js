// Utility: Generate random user ID
function generateUserID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Set initial user ID
const userIDDisplay = document.getElementById('userID');
const userID = generateUserID();
userIDDisplay.textContent = "Your User ID: " + userID;

// Elements for request step
const sendRequestBtn = document.getElementById('sendRequestBtn');
const targetIDInput = document.getElementById('targetID');
const requestModal = document.getElementById('requestModal');
const modalTargetID = document.getElementById('modalTargetID');
const closeRequestModal = document.getElementById('closeRequestModal');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');

// Elements for soul selection step
const soulStep = document.getElementById('soulStep');
const soulSelect = document.getElementById('soulSelect');
const otherSoulDiv = document.getElementById('otherSoulDiv');
const transferBtn = document.getElementById('transferBtn');

// Elements for video playback
const videoStep = document.getElementById('videoStep');
const transferVideo = document.getElementById('transferVideo');

// Elements for completion modal
const completionModal = document.getElementById('completionModal');
const closeCompletionModal = document.getElementById('closeCompletionModal');
const completionOkBtn = document.getElementById('completionOkBtn');

// Step 1: Send request -> Show modal simulating target user's acceptance
sendRequestBtn.addEventListener('click', () => {
  const targetID = targetIDInput.value.trim();
  if (!targetID) {
    alert("Please enter a valid target User ID.");
    return;
  }
  modalTargetID.textContent = targetID;
  requestModal.style.display = 'block';
});

// Close request modal
closeRequestModal.addEventListener('click', () => {
  requestModal.style.display = 'none';
});

// Reject request action
rejectBtn.addEventListener('click', () => {
  alert("Transfer request rejected.");
  requestModal.style.display = 'none';
});

// If accepted, proceed to soul selection step
acceptBtn.addEventListener('click', () => {
  requestModal.style.display = 'none';
  document.getElementById('requestStep').classList.add('hidden');
  soulStep.classList.remove('hidden');
});

// Show additional input if "Other Soul" is chosen
soulSelect.addEventListener('change', () => {
  if (soulSelect.value === "other") {
    otherSoulDiv.classList.remove('hidden');
  } else {
    otherSoulDiv.classList.add('hidden');
  }
});

// When "Transfer" is clicked, proceed to video playback
transferBtn.addEventListener('click', () => {
  if (soulSelect.value === "other") {
    const otherSoulName = document.getElementById('otherSoulName').value.trim();
    if (!otherSoulName) {
      alert("Please enter the name of the other soul.");
      return;
    }
  }
  soulStep.classList.add('hidden');
  videoStep.classList.remove('hidden');
  // Video auto-plays; when it ends, show completion modal
  transferVideo.addEventListener('ended', () => {
    videoStep.classList.add('hidden');
    completionModal.style.display = 'block';
  });
});

// Close completion modal actions
closeCompletionModal.addEventListener('click', () => {
  completionModal.style.display = 'none';
  resetFlow();
});
completionOkBtn.addEventListener('click', () => {
  completionModal.style.display = 'none';
  resetFlow();
});

// Close modal when clicking outside content
window.addEventListener('click', (event) => {
  if (event.target === requestModal) {
    requestModal.style.display = 'none';
  }
  if (event.target === completionModal) {
    completionModal.style.display = 'none';
    resetFlow();
  }
});
