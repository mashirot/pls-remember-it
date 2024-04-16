export default class Result {
  constructor(question: string, correctAnswer: string, yourAnswer: string, isCorrect: boolean) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.yourAnswer = yourAnswer;
    this.isCorrect = isCorrect;
  }

  public question: string;
  public correctAnswer: string;
  public yourAnswer: string;
  public isCorrect: boolean;
}