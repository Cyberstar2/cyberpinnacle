import { challengesData } from "./challengesData";

export function getChallengeByTitle(title) {
  return challengesData.find((c) => c.title === title);
}

export function isUnlocked(challenge, score) {
  return score >= challenge.unlockScore;
}

export function validateFlag(challenge, input) {
  return input.trim() === challenge.flag;
}

export function getNextChallenge(currentId) {
  return challengesData.find((c) => c.id === currentId + 1);
}