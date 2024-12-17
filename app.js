const Web3 = require('web3');
const web3 = new Web3("http://localhost:8545");

let votingContract;
let accounts;
let contractAddress = "CONTRACT_ADDRESS";
let abi = [ /* Contact ABI Array*/ ];

async function init() {
    accounts = await web3.eth.getAccounts();
    votingContract = new web3.eth.Contract(abi, contractAddress);

    const candidates = await votingContract.methods.candidateList().call();
    const candidateSelect = document.getElementById("candidates");
    candidates.forEach(candidate => {
        let option = document.createElement("option");
        option.value = candidate;
        option.textContent = candidate;
        candidateSelect.appendChild(option);
    });
}

async function voteForCandidate() {
    const selectedCandidate = document.getElementById("candidates").value;
    await votingContract.methods.voteForCandidate(selectedCandidate).send({ from: accounts[0] });
    getVotesForCandidate(selectedCandidate);
}

async function getVotesForCandidate(candidate) {
    const votes = await votingContract.methods.totalVotesFor(candidate).call();
    document.getElementById("votes").textContent = `${candidate}: ${votes}`;
}

window.onload = init;
