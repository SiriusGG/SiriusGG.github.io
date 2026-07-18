"use strict";

/**
 * Drives the "Calculate the Effectiveness" mode: generating random
 * attacker vs. one-or-two-defender questions, showing multiple-choice
 * multiplier options, grading answers, and tracking the running score.
 */
class CalculationMode {
  /**
   * @param {Chart} chart
   */
  constructor(chart) {
    this.chart = chart;
    this.answerOptions = [0, 0.25, 0.5, 1, 2, 4];
    this.score = { correct: 0, total: 0 };
    this.currentQuestion = null;

    this.attackerElement = document.getElementById("calc-attacker");
    this.defendersElement = document.getElementById("calc-defenders");
    this.optionsElement = document.getElementById("calc-options");
    this.feedbackElement = document.getElementById("calc-feedback");
    this.scoreElement = document.getElementById("calc-score");
    this.nextButton = document.getElementById("calc-next");

    this.initialize();
  }

  initialize() {
    this.nextButton.addEventListener("click", () => this.startNewQuestion());
    this.startNewQuestion();
    this.updateScoreDisplay();
  }

  pickRandomType() {
    return TYPE_LIST[Math.floor(Math.random() * TYPE_LIST.length)];
  }

  /**
   * Picks a second defender type guaranteed to differ from the first.
   * @param {string} firstDefenderType
   * @returns {string}
   */
  pickSecondDefenderType(firstDefenderType) {
    let secondType;
    do {
      secondType = this.pickRandomType();
    } while (secondType === firstDefenderType);
    return secondType;
  }

  /**
   * Builds a new random question: one attacking type vs. one or two
   * defending types, with the correct combined multiplier as the answer.
   * @returns {{attackerType: string, defenderTypes: string[], answer: number}}
   */
  generateQuestion() {
    const attackerType = this.pickRandomType();
    const includeSecondType = Math.random() < 0.5;
    const firstDefenderType = this.pickRandomType();
    const defenderTypes = [firstDefenderType];
    if (includeSecondType) {
      defenderTypes.push(this.pickSecondDefenderType(firstDefenderType));
    }

    const rawAnswer = this.chart.getCombinedMultiplier(attackerType, defenderTypes);
    const answer = Math.round(rawAnswer * 100) / 100;

    return { attackerType, defenderTypes, answer };
  }

  startNewQuestion() {
    this.currentQuestion = this.generateQuestion();
    this.renderQuestion();
  }

  renderQuestion() {
    this.attackerElement.innerHTML = "";
    this.attackerElement.appendChild(createTypeBadge(this.currentQuestion.attackerType));

    this.defendersElement.innerHTML = "";
    this.currentQuestion.defenderTypes.forEach((defenderType) => {
      this.defendersElement.appendChild(createTypeBadge(defenderType));
    });

    this.renderOptions();

    this.feedbackElement.textContent = "";
    this.feedbackElement.className = "calc-feedback";
    this.setNextButtonEnabled(false);
  }

  /**
   * Enables/disables the "Next question" button. While disabled, a
   * tooltip prompts the user to pick an answer first.
   * @param {boolean} isEnabled
   */
  setNextButtonEnabled(isEnabled) {
    this.nextButton.disabled = !isEnabled;
    this.nextButton.title = isEnabled ? "" : "Select an answer to continue";
  }

  renderOptions() {
    this.optionsElement.innerHTML = "";
    this.optionsElement.dataset.answered = "false";
    this.answerOptions.forEach((optionValue) => {
      const optionButton = createElement("button", {
        className: "opt-btn",
        text: formatMultiplier(optionValue)
      });
      optionButton.addEventListener("click", () => this.handleAnswer(optionValue, optionButton));
      this.optionsElement.appendChild(optionButton);
    });
  }

  handleAnswer(chosenValue, chosenButtonElement) {
    if (!this.currentQuestion || this.optionsElement.dataset.answered === "true") {
      return;
    }
    this.optionsElement.dataset.answered = "true";

    const isCorrect = chosenValue === this.currentQuestion.answer;
    this.score.total++;
    if (isCorrect) {
      this.score.correct++;
    }

    this.markOptionButtons(isCorrect, chosenButtonElement);
    this.renderFeedback(isCorrect);
    this.updateScoreDisplay();
    this.setNextButtonEnabled(true);
  }

  markOptionButtons(isCorrect, chosenButtonElement) {
    Array.from(this.optionsElement.children).forEach((optionButton, optionIndex) => {
      optionButton.disabled = true;
      if (this.answerOptions[optionIndex] === this.currentQuestion.answer) {
        optionButton.classList.add("correct");
      }
    });
    if (!isCorrect) {
      chosenButtonElement.classList.add("incorrect");
    }
  }

  renderFeedback(isCorrect) {
    const { attackerType, defenderTypes, answer } = this.currentQuestion;
    this.feedbackElement.textContent = isCorrect
      ? `Correct! ${attackerType} vs ${defenderTypes.join("/")} is ${formatMultiplier(answer)}.`
      : `Not quite. The correct answer is ${formatMultiplier(answer)}.`;
    this.feedbackElement.classList.add(isCorrect ? "correct" : "incorrect");
  }

  updateScoreDisplay() {
    const percentageText =
      this.score.total === 0 ? "\u2014" : `${formatPercentage(this.score.correct, this.score.total)}%`;
    this.scoreElement.textContent = `Score: ${this.score.correct}/${this.score.total} (${percentageText})`;
  }
}
